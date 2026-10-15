import Link from 'next/link';

/**
 * Custom 404 for `/portfolio/[slug]` routes.
 *
 * Used when someone hits a project slug that isn't in
 * `src/data/portfolio/projects/{slug}/project.json` yet. We render a
 * quiet "case study coming soon" panel instead of Next.js's default
 * brutal 404 so the user gets a graceful hand-off back to the
 * portfolio listing.
 */
export default function ProjectNotFound() {
  return (
    <section className="flex min-h-[80dvh] items-center justify-center bg-[#F2EDE4] px-6 py-12 text-black md:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50 md:text-sm">
          Case Study
        </p>
        <h1 className="mt-6 font-serif text-4xl font-light leading-[1.1] sm:text-5xl md:text-6xl">
          Coming soon.
        </h1>
        <p className="mt-6 text-base font-light leading-relaxed text-neutral-700 md:text-lg md:leading-[1.7]">
          This project's full case study isn't published yet. In the
          meantime, browse the rest of our work.
        </p>
        <Link
          href="/portfolio"
          className="mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-black px-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#F2EDE4] transition-colors hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
        >
          <span>Back to Portfolio</span>
          <span
            aria-hidden
            className="block h-5 w-5 rounded-full border-[1.5px] border-[#F2EDE4]"
          />
        </Link>
      </div>
    </section>
  );
}