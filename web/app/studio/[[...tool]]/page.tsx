/**
 * Mounts the Sanity Studio at /studio. The shell is the same for every user and
 * its data loads client-side, so the route is static.
 * https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs
 */
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
