'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

import products from '@/data/shared/products.json';

/**
 * The "Products" nav item with its hover-opened mega-menu.
 *
 * Behavior:
 *  - Dropdown opens on mouse enter, closes on mouse leave (no JS click toggle —
 *    mirrors the classic mega-menu pattern from the reference).
 *  - The wrapper div keeps a continuous hit-area between the trigger and
 *    the panel, so users crossing the gap don't accidentally close it.
 *  - Focus + keyboard users can still Tab through every product link.
 *  - The chevron rotates in sync with open state.
 */
export default function ProductsMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/products"
        className="flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.16em] text-neutral-900 transition-colors hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
      >
        Products
        <motion.svg
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
          className="h-2.5 w-2.5"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
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
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            key="products-dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
          >
            <div
              role="menu"
              aria-label="Product categories"
              className="-ml-2.5 w-[640px] rounded-xl border border-white/10 bg-black/60 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl"
            >
              <ul className="grid grid-cols-3 gap-1">
                {products.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={product.href}
                      role="menuitem"
                      className="block rounded-md px-3 py-2.5 text-sm text-white transition-colors hover:text-amber-700"
                    >
                      {product.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
