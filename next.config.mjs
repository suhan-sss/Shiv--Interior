/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shivindustries.co',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Webpack 5's persistent filesystem cache uses an atomic rename of
      // `.pack.gz_` → `.pack.gz`. On Windows this races with Antivirus,
      // OneDrive, or indexer file locks and emits noisy
      // "Caching failed for pack: ENOENT…rename" warnings. The cache itself
      // isn't load-bearing in dev — use an in-memory cache so rebuilds
      // within the same dev session are still fast, but no files hit disk.
      config.cache = { type: 'memory' };
    }
    return config;
  },
};

export default nextConfig;