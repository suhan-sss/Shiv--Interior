import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import type { ProductDetail } from '@/types/product-detail';

import ProductHero from '@/components/sections/product-detail/01_ProductHero';
import ProductOverview from '@/components/sections/product-detail/02_ProductOverview';
import ProductFeatures from '@/components/sections/product-detail/03_ProductFeatures';
import ProductGallery from '@/components/sections/product-detail/04_ProductGallery';
import NextProduct from '@/components/sections/product-detail/05_NextProduct';
import ProductCTA from '@/components/sections/product-detail/06_ProductCTA';

/**
 * Product detail page — `/products/[slug]`.
 *
 * Data layout:
 *   src/data/products/
 *     {slug}/
 *       project.json     ← one file per product (schema: ProductDetail)
 *
 * Adding a new product = drop one folder + one project.json. No edits
 * to this file are needed; `generateStaticParams` reads the directory
 * at build time. Until a product's JSON exists, `/products/{slug}`
 * for that slug falls through to `not-found.tsx` ("coming soon").
 *
 * Sections (rendered in order, all share the same `ProductDetail`
 * data, lives in `src/components/sections/product-detail/`):
 *   01 ProductHero     — full-bleed cover + tag/title/tagline overlay
 *   02 ProductOverview — "Design Philosophy" + long intro paragraph
 *   03 ProductFeatures — features bullets + specs grid + materials + customization
 *   04 ProductGallery  — 4-image gallery (1 full-width + 3 paired)
 *   05 NextProduct     — closing hand-off to the next product
 *   06 ProductCTA      — "Book A Consultation" CTA band
 *
 * Next-product navigation: products are sorted by slug (lexical), so
 * the route at index `i` hands off to index `(i + 1) % length`. When
 * the list has only one product, the hand-off target is the current
 * product; `NextProduct` detects this via the `currentProductId` prop
 * and renders an "Explore the full catalog" variant linking to
 * `/products` instead.
 */

// Absolute path to the per-product data directory. Resolved at build
// time when this module is imported by Next.js's route compiler.
const PRODUCTS_DIR = join(process.cwd(), 'src/data/products');

// Defensive slug validation — only allow URL-safe characters so the
// path can't escape `PRODUCTS_DIR` via `../` or similar.
const SLUG_PATTERN = /^[a-z0-9-]+$/;

function listProductSlugs(): string[] {
  if (!existsSync(PRODUCTS_DIR)) return [];
  return readdirSync(PRODUCTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => SLUG_PATTERN.test(name))
    // localeCompare handles i18n / accented chars gracefully for future
    // products. The order here is what `NextProduct` uses for hand-offs.
    .sort((a, b) => a.localeCompare(b));
}

function loadProduct(slug: string): ProductDetail | null {
  const projectPath = join(PRODUCTS_DIR, slug, 'project.json');
  if (!existsSync(projectPath)) return null;
  try {
    const raw = readFileSync(projectPath, 'utf-8');
    return JSON.parse(raw) as ProductDetail;
  } catch {
    // Bad JSON in a product file — treat it as not-found rather than
    // crashing the whole build. The 404 panel will surface the issue.
    return null;
  }
}

export function generateStaticParams() {
  return listProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUG_PATTERN.test(slug)) return {};
  const product = loadProduct(slug);
  if (!product) return {};

  const description =
    product.tagline.length > 160
      ? `${product.tagline.slice(0, 157)}…`
      : product.tagline;

  return {
    title: product.title,
    description,
    openGraph: {
      title: product.title,
      description,
      type: 'article',
      images: [{ url: product.heroImage.src }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUG_PATTERN.test(slug)) notFound();

  const product = loadProduct(slug);
  if (!product) notFound();

  // Resolve the next product's slug for the closing hand-off band.
  // Sorted list → `currentIdx + 1`, wrapping back to 0 at the end.
  const slugs = listProductSlugs();
  const currentIdx = slugs.indexOf(slug);
  if (currentIdx === -1) notFound();

  const nextSlug = slugs[(currentIdx + 1) % slugs.length];
  const nextProduct = loadProduct(nextSlug);
  if (!nextProduct) notFound();

  return (
    <>
      <ProductHero product={product} />
      <ProductOverview product={product} />
      <ProductFeatures product={product} />
      <ProductGallery product={product} />
      <NextProduct nextProduct={nextProduct} currentProductId={product.id} />
      <ProductCTA />
    </>
  );
}