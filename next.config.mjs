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
