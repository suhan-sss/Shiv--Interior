# Image assets

Drop any image files here (`.jpg`, `.png`, `.webp`, `.svg`, etc.) and reference them from components using the URL **`/images/<filename>`**.

## Examples

| File in folder | URL in code |
|----------------|-------------|
| `public/images/hero.jpg` | `/images/hero.jpg` |
| `public/images/team/office.webp` | `/images/team/office.webp` |

## Use with `next/image`

```tsx
import Image from 'next/image';

// Local file (no remotePatterns config needed):
<Image src="/images/hero.jpg" alt="..." width={1600} height={900} />

// Or with `fill` for responsive containers:
<div className="relative aspect-video w-full overflow-hidden">
  <Image src="/images/hero.jpg" alt="..." fill className="object-cover" />
</div>
```

Local images in `public/` are served from `/` and **do not** need an entry under `remotePatterns` in `next.config.mjs` — that allowlist is only for remote URLs (e.g. `pexels.com`, `framerusercontent.com`, `shivindustries.co`).

## Recommended conventions

- Filename in **kebab-case** (`office-reception.webp`)
- Prefer `.webp` for photos (smaller files, same quality)
- Group related images in subfolders (e.g. `team/`, `projects/`, `services/`)