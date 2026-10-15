'use client';

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionValue,
} from 'framer-motion';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';

const SLIDE_DURATION_MS = 5000;
/** How far the image drifts up as the hero scrolls past — % of its own height.
 *  Kept small (10%) so the photo stays inside the mobile viewport — at 20%
 *  the offset was visibly eating into the top of the image on tall phones. */
const PARALLAX_MAX_PERCENT = 10;
/** Ken Burns end-state scale. 1.06 is enough motion to feel alive without
 *  pushing the image past the section's `overflow-hidden` boundary — the
 *  old 1.12 was cropping the top/bottom of the image quite aggressively on
 *  short hero heights (landscape phones, small laptops). */
const KEN_BURNS_END_SCALE = 1.06;

interface HeroSlide {
  id: string;
  image: string;
  imageAlt: string;
  content: ReactNode;
}

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const lenis = useSmoothScroll();

  // Lenis-driven scroll parallax (avoids framer-motion's useScroll warnings
  // that fire when Lenis hijacks native scroll events).
  const parallaxY = useMotionValue(0);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = (e: { scroll: number }) => {
      const progress = Math.min(
        1,
        Math.max(0, e.scroll / Math.max(1, window.innerHeight)),
      );
      parallaxY.set(progress * PARALLAX_MAX_PERCENT);
    };
    lenis.on('scroll', onScroll);
    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis, parallaxY]);

  // Auto-advance every 5s — still no prev/next arrows per your spec.
  // The interval is keyed on `activeIndex` so a manual click resets the
  // 5-second timer; otherwise a click 4s in would be followed by an
  // auto-advance just 1s later.
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [activeIndex]);

  // Text visibility is decoupled from the slide index so the copy and
  // image never overlap during a transition:
  //   t=0       — slide changes, image starts fading in (1.2s), text hidden
  //   t=1200ms  — image is fully loaded → text fades in
  //   t=4500ms  — text fades out (500ms BEFORE the next auto-advance)
  //   t=5000ms  — next slide's image starts fading in (text already gone)
  // The text is therefore only visible while the image is stable.
  const [textVisible, setTextVisible] = useState(false);
  useEffect(() => {
    setTextVisible(false);
    const showTimer = setTimeout(
      () => setTextVisible(true),
      /* IMAGE_FADE_MS */ 1200,
    );
    const hideTimer = setTimeout(
      () => setTextVisible(false),
      SLIDE_DURATION_MS - 500,
    );
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [activeIndex]);

  /**
   * Click anywhere on the hero:
   *   - left half  → previous slide (wraps to last)
   *   - right half → next slide (wraps to first)
   * Clicks that land on real interactive elements (a, button) are passed
   * through so links inside the text still work.
   */
  const handleSectionClick = (e: ReactMouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('a, button')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const isLeftHalf = clickX < rect.width / 2;

    setActiveIndex((prev) =>
      isLeftHalf
        ? prev === 0
          ? slides.length - 1
          : prev - 1
        : (prev + 1) % slides.length,
    );
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleSectionClick}
      className="relative h-[calc(100dvh-64px)] min-h-[480px] w-full cursor-pointer overflow-hidden bg-neutral-900 select-none md:h-[calc(100dvh-76px)] md:min-h-[640px] lg:min-h-[720px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      {/* Background slides — each new image crossfades + zooms from 1 → 1.06.
          `overflow-hidden` on the outer wrapper keeps the Ken Burns scale
          inside the section bounds (otherwise the image bleeds past the
          hero on landscape phones / short heights). */}
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === activeIndex ? (
            <motion.div
              key={slide.id}
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: {
                  duration: 1.2,
                  ease: [0.25, 0.8, 0.25, 1],
                },
              }}
              aria-hidden={index !== activeIndex}
            >
              <motion.div
                className="absolute inset-0 will-change-transform"
                initial={{ scale: 1 }}
                animate={{ scale: KEN_BURNS_END_SCALE }}
                transition={{
                  duration: SLIDE_DURATION_MS / 1000,
                  ease: 'linear',
                }}
              >
                <motion.div
                  className="absolute inset-0 will-change-transform"
                  style={{ y: parallaxY }}
                >
                  {/* `next/image` with `fill` + `sizes="100vw"` lets the
                      browser pull the right resolution for each viewport
                      (instead of decoding the full 4K pexels source for a
                      390px phone). `priority` on the first two slides keeps
                      the LCP image hot, the rest load eagerly so the
                      cross-fade never races the decode. */}
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    sizes="100vw"
                    priority={index < 2}
                    className="select-none object-cover"
                  />
                </motion.div>
              </motion.div>
              {/* Dark gradient for legibility */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>

      {/*
        Text overlay — single fixed anchor (bottom-left) so the copy never
        jumps position between slides. Text mount is gated by `textVisible`,
        which only flips true once the image has fully loaded.
      */}
      <div className="pointer-events-none relative z-10 flex h-full items-end justify-start px-6 pb-20 text-left sm:px-8 sm:pb-24 md:px-10 md:pb-32 lg:pb-40">
        <div className="w-full ">
          <AnimatePresence>
            {textVisible && (
              <motion.div
                key={slides[activeIndex].id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="text-white"
              >
                {slides[activeIndex].content}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Slides ------------------------------ */
/* Slides are ordered to match the on-disk filenames (slide-1 … slide-5) */
/* so swapping an image targets the right one. Every slide uses the same */
/* `max-w-2xl` text wrapper so the copy stays anchored in the same spot. */
/* Copy follows your spec for slides 1 and 2; slides 3–5 follow the same */
/* three-clause rhythm (statement / statement / closing line).            */

const slides: HeroSlide[] = [
  {
    id: 'workspace',
    image: '/images/hero/slide-1-workspace.jpg',
    imageAlt: 'Bright modern office interior with natural light',
    content: (
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-light leading-[1.1] sm:text-5xl md:text-6xl md:leading-[1.05] lg:text-7xl">
          your space. <span className="italic">your way.</span>
        </h1>
        <p className="mt-5 text-base font-light leading-snug sm:mt-6 sm:text-lg md:text-xl lg:text-2xl">
          your needs define our success.
        </p>
      </div>
    ),
  },
  {
    id: 'open-office',
    image: 'https://images.pexels.com/photos/11090937/pexels-photo-11090937.jpeg',
    imageAlt: 'Modern open-plan office with collaborative workstations',
    content: (
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-light leading-[1.1] sm:text-5xl md:text-6xl md:leading-[1.05] lg:text-7xl">
          modern workspaces, <span className="italic">reimagined.</span>
        </h1>
        <p className="mt-5 text-base font-light leading-snug sm:mt-6 sm:text-lg md:text-xl lg:text-2xl">
          where ideas take shape. designed to inspire collaboration.
        </p>
      </div>
    ),
  },
   {
    id: 'executive',
    image: 'https://images.pexels.com/photos/9301016/pexels-photo-9301016.jpeg',
    imageAlt: 'Modern executive boardroom with premium furniture',
    content: (
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-light leading-[1.1] sm:text-5xl md:text-6xl md:leading-[1.05] lg:text-7xl">
          executive presence, <span className="italic">redefined.</span>
        </h1>
        <p className="mt-5 text-base font-light leading-snug sm:mt-6 sm:text-lg md:text-xl lg:text-2xl">
          leadership deserves design. premium furniture for visionary leaders.
        </p>
      </div>
    ),
  },
  {
    id: 'ceo-desk',
    image: '/images/hero/slide-2-ceo-desk.jpg',
    imageAlt: 'Premium CEO executive desk in a modern office',
    content: (
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-light leading-[1.1] sm:text-5xl md:text-6xl md:leading-[1.05] lg:text-7xl">
          interior design solution.{' '}
          <span className="italic">from beginning to end.</span>
        </h1>
        <p className="mt-5 text-base font-light leading-snug sm:mt-6 sm:text-lg md:text-xl lg:text-2xl">
          for your residential and commercial.
        </p>
      </div>
    ),
  },
  {
    id: 'furniture',
    image: 'https://images.pexels.com/photos/27675673/pexels-photo-27675673.png',
    imageAlt: 'Curated collection of office furniture pieces',
    content: (
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl font-light leading-[1.1] sm:text-5xl md:text-6xl md:leading-[1.05] lg:text-7xl">
          thoughtfully crafted pieces.{' '}
          <span className="italic">made to last.</span>
        </h1>
        <p className="mt-5 text-base font-light leading-snug sm:mt-6 sm:text-lg md:text-xl lg:text-2xl">
          built for the way you work.
        </p>
      </div>
    ),
  },
  
 
];