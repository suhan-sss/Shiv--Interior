'use client';

import { useState } from 'react';
import Link from 'next/link';

import ProductsMenu from './ProductsMenu';
import OffcanvasMenu from '../navigation/OffcanvasMenu';
import MenuButton from '../navigation/MenuButton';

/**
 * Top navigation bar.
 *
 * Layout (desktop, lg+):
 *
 *   [Logo]                [Products] [Portfolio] [PV & LGST] [About Us]    [Contact Us]
 *
 * Layout (mobile, <lg):
 *
 *   [Logo]                                                                [☰]
 *
 * On mobile, the off-canvas menu takes over — its trigger button fades in
 * (`lg:hidden`) while the desktop nav and contact CTA hide.
 *
 * State is owned here so the trigger button and the off-canvas panel
 * share the same source of truth and either can close the menu.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 w-full bg-[#F2EDE4]">
        <div className="flex items-center justify-between gap-3 px-6 py-4 lg:gap-6 lg:px-10 lg:py-5">
          {/* Left — brand logo (links to home) */}
          <Link
            href="/"
            aria-label="Shiv Interior — home"
            className="block shrink-0 transition-opacity hover:opacity-80"
          >
            <img
              src="/images/header/shiv-logo-02.png"
              alt=""
              width={1499}
              height={343}
              loading="eager"
              decoding="async"
              draggable={false}
              className="h-10 w-auto select-none lg:h-12"
            />
          </Link>

          {/* Center — primary nav (desktop only). 5 items: justify-between on
              the parent flex spreads the three regions evenly; gap-6 on the
              nav keeps the links tight so they don't push the contact CTA off
              screen at narrower desktop widths. */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 lg:flex xl:gap-8"
          >
            <ProductsMenu />
            <NavLink href="/portfolio">Portfolio</NavLink>
            <NavLink href="/pv-lgst-structure">PV &amp; LGST Structure</NavLink>
            <NavLink href="/about">About Us</NavLink>
          </nav>

          {/* Right — Contact CTA (desktop) / Hamburger (mobile) */}
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-amber-700 lg:inline-flex"
            >
              Contact Us
            </Link>
            {/* Mobile only — `lg:hidden` on the trigger keeps it off the
                desktop layout entirely. `h-12 w-12` gives a generous 48px
                tap target (Apple HIG / WCAG 2.5.5). */}
            <MenuButton
              isOpen={isMenuOpen}
              onClick={openMenu}
              className="lg:hidden"
            />
          </div>
        </div>
      </header>

      {/* Spacer — ensures the page content clears the fixed header.
          Matches the header's mobile + desktop vertical padding. */}
      <div aria-hidden className="h-[64px] lg:h-[76px]" />

      {/* Off-canvas panel — rendered at the top level (escapes any wrapper's
          stacking context) so its z-index of [70] is taken above the [02]
          z-40 header context. */}
      <OffcanvasMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-900 transition-colors hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
    >
      {children}
    </Link>
  );
}