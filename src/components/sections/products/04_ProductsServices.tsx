'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import servicesData from '@/data/products/services-grid.json';

/**
 * ProductsServices — `/products` fourth section.
 *
 * Catalog of all 10 product offerings, each with a 16:9 cover image,
 * stage label, title, description, and four short feature chips.
 * Renders as a 2-column responsive grid (1 column on mobile).
 *
 *   [ H2 "Our Service"                  ·   [ 04 ] tag ]
 *
 *   [ ........... ] [ right-aligned subtext paragraph ]
 *   [ CTA         ]
 *
 *   [ Service 1  ]  [ Service 2  ]                          <- row 1
 *   [ Service 3  ]  [ Service 4  ]                          <- row 2
 *   [ Service 5  ]  [ Service 6  ]                          <- row 3
 *   [ Service 7  ]  [ Service 8  ]                          <- row 4
 *   [ Service 9  ]  [ Service 10 ]                          <- row 5
 *
 * Background is the same cream (#F2EDE4) as the rest of the page —
 * one continuous cream flow with only the hero photo as a break.
 * Each service card uses a darker sand (#E8DCC4) so it sits one
 * notch deeper than the page field, with a thin black/10 border
 * for crisp separation.
 *
 * All content lives in `src/data/products/services-grid.json`.
 */

type Service = {
  slug: string;
  stage: string;
  title: string;
  description: string;
  image: string;
  href: string;
  chips: string[];
};

const {
  sectionNumber,
  heading,
  subtext,
  cta,
  services,
} = servicesData as {
  sectionNumber: string;
  heading: string;
  subtext: string;
  cta: { label: string; href: string };
  services: Service[];
};

/* ------------------------------ Pieces ------------------------------ */

/** The dark pill CTA with cream-bordered circle on the right. */
function PrimaryCTA({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-12 items-center gap-4 rounded-full bg-black px-6 text-[#F2EDE4] transition-colors duration-300 hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
    >
      <span className="text-sm font-semibold uppercase tracking-[0.18em]">
        {label}
      </span>
      <span
        aria-hidden
        className="block h-6 w-6 rounded-full border-[1.5px] border-[#F2EDE4] transition-transform duration-500 ease-out group-hover:rotate-45"
      />
    </Link>
  );
}

/** Single small dot+label chip used inside service cards. */
function ServiceChip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="block h-1.5 w-1.5 shrink-0 rounded-full bg-black"
      />
      <span className="text-sm font-light text-neutral-700 md:text-base">
        {children}
      </span>
    </div>
  );
}

/** One full service card — image on top, content row below it. */
function ServiceCard({
  service,
  delay = 0,
}: {
  service: Service;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className="group rounded-2xl border border-black/10 bg-[#E8DCC4] pb-8"
    >
      <Link href={service.href} className="block">
        {/* Cover image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-neutral-100">
          <Image
            src={service.image}
            alt={`${service.title} service image`}
            fill
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Below image: stage+title+description (8 cols) | chips (4 cols) */}
        <div className="mt-7 grid grid-cols-1 gap-8 px-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <p className="text-xs font-light uppercase tracking-[0.16em] text-neutral-500 md:text-sm">
              {service.stage}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-light leading-tight md:text-3xl md:leading-[1.15]">
              {service.title}
            </h3>
            <p className="mt-4 text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
              {service.description}
            </p>
          </div>

          
        </div>
      </Link>
    </motion.article>
  );
}

/* ------------------------------ Section ------------------------------ */

export default function ProductsServices() {
  return (
    <section
      id="service"
      className="w-full bg-[#F2EDE4] py-12 text-black md:py-16 lg:py-20"
    >
      <div className="flex flex-col px-6 lg:px-10">
        {/* Top row — H2 + numbered tag */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-serif text-4xl font-light leading-[1.05] sm:text-5xl md:text-7xl"
          >
            {heading}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="flex items-center gap-2 text-2xl font-medium text-black/60 sm:text-3xl md:text-4xl"
            aria-label={`Section ${sectionNumber}`}
          >
            <span>[</span>
            <span>{sectionNumber}</span>
            <span>]</span>
          </motion.div>
        </div>

        {/* Subtext + CTA — CTA on left, right-aligned paragraph on right */}
        <div className="mt-12 md:mt-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-base font-light leading-relaxed text-neutral-700 md:ml-auto md:w-2/5 md:text-right md:text-xl md:leading-[1.7]"
          >
            {subtext}
          </motion.p>
        </div>

        {/* Services grid — 2 cols × 5 rows = 10 services */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-2 md:gap-x-10 md:gap-y-14">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}