import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import type { ProjectDetail } from '@/types/portfolio-detail';

import ProjectHero from '@/components/sections/portfolio-detail/01_ProjectHero';
import ProjectOverview from '@/components/sections/portfolio-detail/02_ProjectOverview';
import ProjectFacts from '@/components/sections/portfolio-detail/03_ProjectFacts';
import ProjectGallery from '@/components/sections/portfolio-detail/04_ProjectGallery';
import NextProject from '@/components/sections/portfolio-detail/05_NextProject';
import ProjectCTA from '@/components/sections/portfolio-detail/06_ProjectCTA';

/**
 * Portfolio detail page — `/portfolio/[slug]`.
 *
 * Data layout:
 *   src/data/portfolio/projects/
 *     {slug}/
 *       project.json     ← one file per project (schema: ProjectDetail)
 *
 * Adding a new project = drop one folder + one project.json. No edits
 * to this file are needed; `generateStaticParams` reads the directory
 * at build time. Until a project's JSON exists, `/portfolio/{slug}`
 * for that slug falls through to `not-found.tsx` ("coming soon").
 *
 * Sections (rendered in order, all share the same `ProjectDetail`
 * data, lives in `src/components/sections/portfolio-detail/`):
 *   01 ProjectHero     — full-bleed cover + tag/title/tagline overlay
 *   02 ProjectOverview — long intro + Challenge / Solution split
 *   03 ProjectFacts    — Year / Location / Area / Services grid
 *   04 ProjectGallery  — 4-image gallery (1 full-width + 3 paired)
 *   05 NextProject     — closing hand-off to the next project
 *   06 ProjectCTA      — "Inspired by this project?" CTA band
 *
 * Next-project navigation: the projects are sorted by slug (lexical),
 * so the route at index `i` hands off to index `(i + 1) % length`.
 * When the list has only one project, the hand-off target is the
 * current project; `NextProject` detects this via the `currentProjectId`
 * prop and renders the "See the full portfolio" variant instead.
 */

// Absolute path to the per-project data directory. Resolved at build
// time when this module is imported by Next.js's route compiler.
const PROJECTS_DIR = join(process.cwd(), 'src/data/portfolio/projects');

// Defensive slug validation — only allow URL-safe characters so the
// path can't escape `PROJECTS_DIR` via `../` or similar.
const SLUG_PATTERN = /^[a-z0-9-]+$/;

function listProjectSlugs(): string[] {
  if (!existsSync(PROJECTS_DIR)) return [];
  return readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => SLUG_PATTERN.test(name))
    // localeCompare handles i18n / accented chars gracefully for future
    // projects. The order here is what `NextProject` uses for hand-offs.
    .sort((a, b) => a.localeCompare(b));
}

function loadProject(slug: string): ProjectDetail | null {
  const projectPath = join(PROJECTS_DIR, slug, 'project.json');
  if (!existsSync(projectPath)) return null;
  try {
    const raw = readFileSync(projectPath, 'utf-8');
    return JSON.parse(raw) as ProjectDetail;
  } catch {
    // Bad JSON in a project file — treat it as not-found rather than
    // crashing the whole build. The 404 panel will surface the issue.
    return null;
  }
}

export function generateStaticParams() {
  return listProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUG_PATTERN.test(slug)) return {};
  const project = loadProject(slug);
  if (!project) return {};

  const description =
    project.tagline.length > 160
      ? `${project.tagline.slice(0, 157)}…`
      : project.tagline;

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: 'article',
      images: [{ url: project.coverImage.src }],
    },
  };
}

export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUG_PATTERN.test(slug)) notFound();

  const project = loadProject(slug);
  if (!project) notFound();

  // Resolve the next project's slug for the closing hand-off band.
  // Sorted list → `currentIdx + 1`, wrapping back to 0 at the end.
  const slugs = listProjectSlugs();
  const currentIdx = slugs.indexOf(slug);
  if (currentIdx === -1) notFound();

  const nextSlug = slugs[(currentIdx + 1) % slugs.length];
  const nextProject = loadProject(nextSlug);
  if (!nextProject) notFound();

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectFacts project={project} />
      <ProjectGallery project={project} />
      <NextProject nextProject={nextProject} currentProjectId={project.id} />
      <ProjectCTA />
    </>
  );
}