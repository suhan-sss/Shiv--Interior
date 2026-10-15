'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import SocialIcon, {
  socialPlatformFromLabel,
} from '@/components/ui/SocialIcon';
import products from '@/data/shared/products.json';
import footerData from '@/data/shared/footer.json';

/**
 * Site footer.
 *
 * Layout (desktop):
 *
 *   [ Studio + Legal  —  7 cols ]  [ Products — 5 cols (3-col grid) ]
 *   [ ─────────────────────────────────────────────────────────── ]
 *   [ Newsletter — full-width strip: copy (7 cols) + form (5 cols)   ]
 *   [ ─────────────────────────────────────────────────────────── ]
 *   [ Social ]                            [ © 2026 BRAND .  All Rights Reserved ]
 *
 *   [── masked interior photo, fades into the cream above ──]
 *
 * Background uses the header cream (#F2EDE4) so the page reads as one
 * continuous band from top to bottom. Text is dark for contrast.
 *
 * All link data lives in `src/data/footer.json` and `src/data/products.json`.
 */

const { studioLinks, legalLinks, socialLinks } = footerData;  

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-black/15 bg-[#F2EDE4] text-black">
      <div className=" px-6 lg:px-10 pt-5 pb-4 md:pt-6 md:pb-6">
        {/* Top content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12">
          {/* Left — Studio + Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="grid grid-cols-1 gap-12 md:col-span-7 md:grid-cols-2"
          >
            {/* Studio */}
            <div>
              <FooterHeading>Studio</FooterHeading>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4">
                <FooterLinkColumn items={studioLinks.left} />
                <FooterLinkColumn items={studioLinks.right} />
              </div>
            </div>

            {/* Legal */}
            <div>
              <FooterHeading>Legal</FooterHeading>
              <div className="mt-8 flex flex-col gap-3">
                <FooterLinkColumn items={legalLinks} />
              </div>
            </div>
          </motion.div>

          {/* Right — Products (sits where Newsletter used to be) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="md:col-span-5"
          >
            <FooterHeading>Products</FooterHeading>
            {/* Grid columns adapt to content width so longer labels like
                "Wardrobe & Storage" / "Cafeteria Furniture" never wrap.
                Each column is at least 150px and shares the row equally.
                On narrow md viewports (768–1023px) drops to 2 columns
                automatically via `md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]`
                resolving to fewer cols when each col can't fit at minmax. */}
            <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-6 gap-y-4">
              {products.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  className="whitespace-nowrap text-lg font-normal transition-colors hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                  {product.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Newsletter — full-width strip below (took over Products' slot) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-4 md:mt-8"
        >
          <FooterHeading>Newsletter</FooterHeading>
          <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-12">
            <p className="font-serif text-2xl font-normal leading-snug md:col-span-7 md:text-3xl md:leading-[1.25]">
              Our favorite finds this month — furniture, fabrics, and objects
              we can&rsquo;t stop thinking about.
            </p>

            <form
              className="grid grid-cols-1 gap-x-6 gap-y-4 md:col-span-5 md:grid-cols-12 md:items-end"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="md:col-span-7">
                <FooterField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="jane@shivinterior.com"
                />
              </div>
              <div className="md:col-span-5">
                <button
                  type="submit"
                  className="inline-flex h-[42px] w-full items-center justify-center rounded-full border border-neutral-900 px-5 text-sm font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-neutral-900 hover:text-[#F2EDE4]"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Bottom — Social + Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          className="mt-4 flex flex-col gap-5 border-t border-neutral-900/15 pt-3 md:mt-8 md:flex-row md:items-center md:justify-between md:gap-6 md:pt-4"
        >
          {/* Social row — icons only on mobile (5 icons comfortably fit a
              360px viewport), icons + uppercase label on sm+. `aria-label`
              on each link preserves the platform name for screen readers
              when the text is hidden. */}
          <ul className="flex flex-wrap items-center gap-2 sm:gap-3">
            {socialLinks.map((social) => {
              const platform = socialPlatformFromLabel(social.label);
              return (
                <li key={social.label}>
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full text-sm font-medium uppercase tracking-[0.18em] text-neutral-900 transition-colors hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-900/20 transition-colors group-hover:border-amber-700 group-hover:bg-amber-700 group-hover:text-[#F2EDE4]"
                    >
                      <SocialIcon
                        name={platform}
                        className="h-3.5 w-3.5"
                      />
                    </span>
                    <span className="hidden sm:inline">{social.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Copyright — stacks vertically on mobile (one item per line
              reads cleanly), horizontal with no gaps on sm+. The brand
              name is a link, the rest is plain text. */}
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-700 sm:text-sm">
            <span aria-label="Copyright">©</span> 2026{' '}
            <Link
              href="/"
              className="font-bold text-neutral-900 transition-colors hover:text-amber-700"
            >
              Shiv Industries &amp; Construction LLP&rsquo;s
            </Link>
            . All Rights Reserved.
          </p>
        </motion.div>
      </div>

      {/* Bottom masked image — fades from transparent at top to opaque at
          bottom, so the cream above blends seamlessly into the photo. */}
      <div
        aria-hidden
        className="relative w-full overflow-hidden"
        // aspect matches the reference footer image (≈16:7)
      >
        <img
          src="https://framerusercontent.com/images/EAxdx12nElHcdfP1HeHJaeVjL6Q.jpg?"
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-[280px] w-full select-none object-cover object-bottom md:h-[200px] lg:h-[280px]"
          style={{
           }}
        />
        {/* Subtle warm overlay so the photo sits inside the cream palette
            rather than feeling like a hard cut. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F2EDE4]/30 via-transparent to-transparent" />
      </div>
    </footer>
  );
}

/* ------------------------------ Pieces ------------------------------ */

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="inline text-sm font-medium uppercase tracking-[0.18em] text-black underline underline-offset-4">
      {children}
    </h3>
  );
}

function FooterLinkColumn({
  items,
}: {
  items: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <ul className="flex flex-col gap-3 text-base font-normal md:text-lg">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="whitespace-nowrap transition-colors hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FooterField({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-neutral-900/30 py-2 text-base font-normal text-black placeholder-neutral-900/50 outline-none transition-colors focus:border-neutral-900"
      />
    </label>
  );
}