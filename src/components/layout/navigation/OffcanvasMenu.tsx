'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from 'framer-motion';

import SocialIcon from '@/components/ui/SocialIcon';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';
import navigationData from '@/data/shared/navigation.json';
import type { NavItem, SocialLink } from '@/types/navigation';

const { navigation, socialLinks, brand } = navigationData as {
  navigation: NavItem[];
  socialLinks: SocialLink[];
  brand: {
    name: string;
    poweredBy: { name: string; href: string };
  };
};

interface OffcanvasMenuProps {
  /** Whether the panel is open. Controlled by the parent (Header). */
  isOpen: boolean;
  /** Called when the user dismisses the panel (close button, backdrop click, or Escape). */
  onClose: () => void;
  /** Path to the logo shown in the panel header. */
  logoSrc?: string;
  /** Alt text for the logo image. */
  logoAlt?: string;
}

/**
 * Right-side off-canvas mobile menu — controlled component.
 *
 * Drop into your layout alongside the trigger button:
 *
 *     const [isOpen, setIsOpen] = useState(false);
 *     <>
 *       <MenuButton isOpen={isOpen} onClick={() => setIsOpen(true)} className="lg:hidden" />
 *       <OffcanvasMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
 *     </>
 *
 * Behavior:
 *  - Slides in from the right (≈400ms, custom ease-out cubic)
 *  - Backdrop fades in/out, click-to-close, Escape-to-close
 *  - Body scroll is locked while open
 *  - Sub-menus are accordion-style (only one open at a time)
 *  - Sub-menu rows stagger-fade once the panel settles
 *  - A11y: `role="dialog"`, `aria-modal`, `aria-expanded`, focus-visible rings
 *  - No external icon library — social glyphs are inline SVG
 *
 * Scroll bug note (kept from the prior fix):
 *   The inner `<nav>` has `flex-1 min-h-0 overflow-y-auto` so the
 *   sub-menu can expand without pushing the panel past the viewport.
 *   Without `min-h-0`, flex children have `min-height: auto` by
 *   default and grow to fit content, which prevents the aside's
 *   `overflow-y-auto` from kicking in. We also keep
 *   `data-lenis-prevent` on the panel so Lenis (the smooth-scroll
 *   library) doesn't capture wheel events while the menu is open,
 *   `overscroll-contain` so nested scroll doesn't bubble to the
 *   (locked) body on iOS, and `touch-pan-y` so iOS Safari doesn't
 *   drop vertical touch-pan under the fixed ancestor.
 *
 * Rendered at the top level (NOT inside any wrapper) so its z-index of
 * `[70]` is taken above the header's `z-40` stacking context.
 */
export default function OffcanvasMenu({
  isOpen,
  onClose,
  logoSrc = '/images/header/shiv-logo-02.png',
  logoAlt = '',
}: OffcanvasMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Lenis smooth-scroll instance — paused while the off-canvas is open so
  // background content doesn't drift under the modal.
  const lenis = useSmoothScroll();

  // Lock body scroll while the panel is open so background content
  // doesn't move under the user's thumb. We also pause Lenis (it uses
  // CSS transforms, so `overflow: hidden` alone isn't enough).
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop();
    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [isOpen, lenis]);

  // Escape closes the panel — standard modal behavior.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Reset accordion state so it doesn't leak across open/close cycles.
  useEffect(() => {
    if (!isOpen) setOpenIndex(null);
  }, [isOpen]);

  const toggleSubMenu = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  // Custom cubic matches the easing on the original WordPress slide.
  const panelTransition: Transition = {
    type: 'tween',
    duration: 0.4,
    ease: [0.25, 0.8, 0.25, 1],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="offcanvas-backdrop"
            className="fixed inset-0 z-[60] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel — white surface. The scroll-bug fixes
              (`data-lenis-prevent`, `overscroll-contain`,
              `touch-pan-y`) are kept here so the panel behaves
              correctly on iOS and under Lenis, regardless of the
              surface color. */}
          <motion.aside
            key="offcanvas-panel"
            id="offcanvas-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            data-lenis-prevent
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col overscroll-contain bg-white shadow-2xl touch-pan-y"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={panelTransition}
          >
            <PanelHeader
              logoSrc={logoSrc}
              logoAlt={logoAlt}
              onClose={onClose}
            />

            <PanelNav
              items={navigation}
              openIndex={openIndex}
              onToggle={toggleSubMenu}
              onLinkClick={onClose}
            />

            <PanelSocial links={socialLinks} />

            <PanelFooter copyrightName={brand.name} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------- Sub-components ----------------------------- */

function PanelHeader({
  logoSrc,
  logoAlt,
  onClose,
}: {
  logoSrc: string;
  logoAlt: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-6 py-5">
      <Link
        href="/"
        onClick={onClose}
        aria-label="Shiv Interior — home"
        className="block min-w-0 shrink transition-opacity hover:opacity-80"
      >
        {/* Plain <img> keeps the menu drop-in without configuring
            next/image remotePatterns. Swap for next/image when you have
            the logo in /public and want optimization. Explicit
            width/height attributes prevent the browser from falling
            back to the image's intrinsic size (1499×343) before CSS
            applies, which can blow out the panel on first paint. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt={logoAlt}
          width={150}
          height={34}
          decoding="async"
          draggable={false}
          className="h-10 w-auto max-w-full object-contain select-none"
        />
      </Link>
      <CloseButton onClick={onClose} />
    </div>
  );
}

/**
 * Three stacked lines that morph into an X while the menu is open.
 * Lives inside the panel so the close affordance is always visible
 * while the menu is up.
 */
function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close menu"
      className="relative flex h-12 w-12 items-center justify-center text-neutral-900 transition-colors hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
    >
      <span className="relative block h-5 w-7">
        <motion.span
          aria-hidden
          className="absolute left-0 right-0 top-1 block h-[2px] bg-current"
          initial={false}
          animate={{ rotate: 45, y: 7 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
        <motion.span
          aria-hidden
          className="absolute left-0 right-0 top-1/2 block h-[2px] -translate-y-1/2 bg-current"
          initial={false}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
        <motion.span
          aria-hidden
          className="absolute left-0 right-0 bottom-1 block h-[2px] bg-current"
          initial={false}
          animate={{ rotate: -45, y: -7 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </span>
    </button>
  );
}

const navListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.18 },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: 'easeOut' },
  },
};

const subMenuTransition: Transition = {
  duration: 0.3,
  ease: [0.25, 0.8, 0.25, 1],
};

function PanelNav({
  items,
  openIndex,
  onToggle,
  onLinkClick,
}: {
  items: NavItem[];
  openIndex: number | null;
  onToggle: (index: number) => void;
  onLinkClick: () => void;
}) {
  return (
    // `min-h-0` is critical here: without it, flex items default to
    // `min-height: auto`, which lets this `<nav>` grow to fit its
    // children's intrinsic height. That means when the Products
    // submenu expands and pushes total content past the viewport,
    // the aside's `overflow-y-auto` doesn't kick in — the nav just
    // overflows the panel and there's no way to scroll to the items
    // below. With `min-h-0`, the nav is constrained to its flex-1
    // slot, and `overflow-y-auto` makes that slot scrollable.
    <nav
      aria-label="Primary"
      // Scrollbar is hidden visually but the element remains
      // scrollable via wheel / touch. Three rules cover every
      // modern engine:
      //   • `[scrollbar-width:none]`        — Firefox
      //   • `[-ms-overflow-style:none]`     — legacy Edge / IE
      //   • `[&::-webkit-scrollbar]:hidden` — Chromium / Safari
      className="flex-1 min-h-0 overflow-y-auto px-6 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <motion.ul
        className="flex flex-col"
        variants={navListVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, index) => (
          <NavRow
            key={item.href}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => onToggle(index)}
            onLinkClick={onLinkClick}
          />
        ))}
      </motion.ul>
    </nav>
  );
}

function NavRow({
  item,
  isOpen,
  onToggle,
  onLinkClick,
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}) {
  const hasChildren = !!item.children?.length;
  const subMenuId = `submenu-${item.label.toLowerCase().replace(/\s+/g, '-')}`;

  // Simple link row — no children.
  if (!hasChildren) {
    return (
      <motion.li
        variants={navItemVariants}
        className="border-b border-neutral-100"
      >
        <Link
          href={item.href}
          onClick={onLinkClick}
          className="block py-4 text-[15px] font-medium uppercase tracking-[0.18em] text-neutral-800 transition-colors hover:text-amber-700"
        >
          {item.label}
        </Link>
      </motion.li>
    );
  }

  // Row with an accordion toggle for the children.
  return (
    <motion.li
      variants={navItemVariants}
      className="border-b border-neutral-100"
    >
      <div className="flex items-stretch">
        <Link
          href={item.href}
          onClick={onLinkClick}
          className="flex-1 py-4 text-[15px] font-medium uppercase tracking-[0.18em] text-neutral-800 transition-colors hover:text-amber-700"
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={subMenuId}
          aria-label={`Toggle ${item.label} submenu`}
          className="px-4 text-neutral-700 transition-colors hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-amber-600"
        >
          <motion.svg
            viewBox="0 0 12 8"
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            aria-hidden
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && item.children && (
          <motion.div
            key="submenu-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={subMenuTransition}
            className="overflow-hidden"
          >
            <ul id={subMenuId} className="pb-2 pl-4">
              {item.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={onLinkClick}
                    className="block py-2.5 text-[13px] uppercase tracking-[0.18em] text-neutral-600 transition-colors hover:text-amber-700"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function PanelSocial({ links }: { links: SocialLink[] }) {
  return (
    <div className="border-t border-neutral-200 px-6 py-5">
      <ul className="flex items-center gap-3">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={
                link.href.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              aria-label={link.name}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-all hover:border-amber-700 hover:text-amber-700"
            >
              <SocialIcon name={link.name} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PanelFooter({ copyrightName }: { copyrightName: string }) {
  return (
    <div className="border-t border-neutral-200 px-6 py-4 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
      Copyright © {new Date().getFullYear()} {copyrightName} · Powered by{' '}
      <a
        href={brand.poweredBy.href}
        className="text-neutral-800 underline-offset-2 transition-colors hover:text-amber-700 hover:underline"
      >
        {brand.poweredBy.name}
      </a>
    </div>
  );
}