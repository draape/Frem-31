// Fail the build up front, rather than at request time, when Sanity is not
// configured. Kept in sync with lib/sanity/env.ts.
const requiredEnv = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'NEXT_PUBLIC_SANITY_API_VERSION',
];

for (const name of requiredEnv) {
  if (!process.env[name]) {
    throw new Error(`Missing environment variable: ${name} (see web/.env.example)`);
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
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
