import {useMemo} from 'react'
import {useClient} from 'sanity'

// Pin a stable API version for all Studio-side client calls.
export const API_VERSION = '2023-05-03'

export const useSanityClient = (perspective: 'published' | 'drafts' | 'raw' = 'published') => {
  const client = useClient({apiVersion: API_VERSION})
  return useMemo(
    () => client.withConfig({apiVersion: API_VERSION, perspective}),
    [client, perspective],
  )
}
