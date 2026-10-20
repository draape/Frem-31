import {defineCliConfig} from 'sanity/cli'

// For CLI commands run from web/ (`sanity schema validate`, `sanity cors add`,
// `sanity exec`). The Studio itself is served by Next at /studio.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  },
})
