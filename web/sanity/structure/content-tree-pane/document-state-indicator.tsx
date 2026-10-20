import {Box, Flex} from '@sanity/ui'

type DocumentStateIndicatorProps = {
  hasPublished: boolean
  hasDraft: boolean
}

export function DocumentStateIndicator({hasPublished, hasDraft}: DocumentStateIndicatorProps) {
  return (
    <Flex align="center">
      {hasPublished && <Box className="status-dot status-dot--published" title="Published" />}
      {hasDraft && <Box className="status-dot status-dot--draft" title="Draft" />}
    </Flex>
  )
}
