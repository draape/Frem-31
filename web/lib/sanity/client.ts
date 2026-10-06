import { createClient, type QueryParams } from 'next-sanity';
import { apiVersion, dataset, projectId } from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Published reads only: served from the CDN, drafts never leak into output.
  useCdn: true,
  perspective: 'published',
});

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
};

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
}: SanityFetchOptions): Promise<T> {
  return client.fetch<T>(query, params, { next: { revalidate } });
}
