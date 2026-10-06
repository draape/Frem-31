// Literal `process.env.NEXT_PUBLIC_*` accesses so Next inlines them into the
// client bundle. The same names are checked in next.config.mjs so a missing
// variable fails the build even before anything imports this module.
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
);

export const apiVersion = assertValue(
  process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  'Missing environment variable: NEXT_PUBLIC_SANITY_API_VERSION',
);

function assertValue<T>(value: T | undefined, message: string): T {
  if (value === undefined || value === '') {
    throw new Error(message);
  }
  return value;
}
