'use client';

import { motion } from 'framer-motion';

interface MenuButtonProps {
  /** Whether the menu is currently open (used to fade this trigger out). */
  isOpen: boolean;
  /** Click handler — parent decides what "open" means. */
  onClick: () => void;
  /** Optional extra classes to merge with the trigger's own layout classes. */
  className?: string;
}

/**
 * Hamburger trigger that lives in the header. While the off-canvas panel is
 * open this button fades out and hands control to the panel's own
 * `CloseButton`, so the user always has exactly one visible close affordance.
 *
 * Three lines stack into a 48×48 hit area (the parent passes `h-12 w-12` via
 * className) — meets the 44px minimum tap-target guidelines.
 */
export default function MenuButton({
  isOpen,
  onClick,
  className = '',
}: MenuButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="offcanvas-menu"
      animate={{
        opacity: isOpen ? 0 : 1,
        pointerEvents: isOpen ? 'none' : 'auto',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`relative flex h-12 w-12 items-center justify-center rounded text-neutral-900 transition-colors hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${className}`}
    >
      <span className="relative block h-5 w-7">
        <span className="absolute left-0 right-0 top-1 block h-[2px] bg-current" />
        <span className="absolute left-0 right-0 top-1/2 block h-[2px] -translate-y-1/2 bg-current" />
        <span className="absolute left-0 right-0 bottom-1 block h-[2px] bg-current" />
      </span>
    </motion.button>
  );
}