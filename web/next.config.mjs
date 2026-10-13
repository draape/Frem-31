// Fail the build up front, rather than at request time, when Sanity or the
// site URL is not configured. The Sanity names are kept in sync with
// lib/sanity/env.ts.
const requiredEnv = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'NEXT_PUBLIC_SANITY_API_VERSION',
  'NEXT_PUBLIC_SITE_URL',
];

for (const name of requiredEnv) {
  if (!process.env[name]) {
    throw new Error(`Missing environment variable: ${name} (see web/.env.example)`);
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Sanity images: crop, hotspot and target size are in the query string
    // (built by urlFor), so `search` is left open. The path is pinned to this
    // project's dataset.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/**`,
      },
    ],
  },
  async redirects() {
    // Only redirect when feature flag is disabled
    if (process.env.NEXT_PUBLIC_ENABLE_HOME_PAGE !== 'true') {
      return [
        {
          source: '/',
          destination: '/frembanen',
          permanent: false,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
