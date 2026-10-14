import type {CSSProperties, ReactNode} from 'react'
import {set, type StringInputProps} from 'sanity'
import {Card, Grid, Stack, Text} from '@sanity/ui'

type Option = {title?: string; value?: string}

// Rough stand-ins for the web's tokens (blue.800, yellow.500), so the
// skeletons read like the real headers.
const BLUE = '#0b2a5b'
const YELLOW = '#f5c400'

const bar = (width: string, height: number, background: string): CSSProperties => ({
  width,
  height,
  background,
  borderRadius: 3,
})

/** Light band, dark title, two description lines — like `PageHeader`. */
function StandardSkeleton() {
  return (
    <Skeleton background="#f3f4f6">
      <div style={bar('60%', 12, '#1f2937')} />
      <div style={bar('85%', 6, '#9ca3af')} />
      <div style={bar('55%', 6, '#9ca3af')} />
    </Skeleton>
  )
}

/** Dark blue band with badge, accented title, lines and two buttons — like `Hero`. */
function HeroSkeleton() {
  return (
    <Skeleton background={BLUE}>
      <div style={{...bar('22%', 8, YELLOW), borderRadius: 8}} />
      <div style={{display: 'flex', gap: 4}}>
        <div style={bar('40%', 12, '#ffffff')} />
        <div style={bar('30%', 12, YELLOW)} />
      </div>
      <div style={bar('80%', 6, '#9ca3af')} />
      <div style={bar('50%', 6, '#9ca3af')} />
      <div style={{display: 'flex', gap: 6, marginTop: 4}}>
        <div style={{...bar('24%', 10, YELLOW), borderRadius: 6}} />
        <div
          style={{...bar('24%', 10, 'transparent'), borderRadius: 6, border: '1px solid #ffffff'}}
        />
      </div>
    </Skeleton>
  )
}

function Skeleton({background, children}: {background: string; children: ReactNode}) {
  return (
    <div
      style={{
        background,
        borderRadius: 4,
        padding: 12,
        height: 96,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      {children}
    </div>
  )
}

const skeletons: Record<string, () => ReactNode> = {
  standard: StandardSkeleton,
  hero: HeroSkeleton,
}

/**
 * Picks the page's header as two clickable skeleton previews. The values and
 * titles come from the field's `options.list`, so the schema stays the source
 * of truth.
 */
export function HeaderPicker({value, onChange, schemaType, readOnly}: StringInputProps) {
  const options = (schemaType.options?.list ?? []) as Option[]

  return (
    <Grid columns={options.length} gap={3}>
      {options.map((option) => {
        if (!option.value) return null
        const selected = value === option.value
        const Preview = skeletons[option.value]
        return (
          <Card
            key={option.value}
            as="button"
            type="button"
            aria-pressed={selected}
            disabled={readOnly}
            onClick={() => onChange(set(option.value))}
            padding={2}
            radius={2}
            border
            tone={selected ? 'primary' : 'default'}
            style={{
              cursor: readOnly ? 'default' : 'pointer',
              textAlign: 'left',
              outline: selected ? '2px solid var(--card-focus-ring-color)' : undefined,
            }}
          >
            <Stack space={2}>
              {Preview && <Preview />}
              <Text size={1} weight={selected ? 'semibold' : 'regular'}>
                {option.title ?? option.value}
              </Text>
            </Stack>
          </Card>
        )
      })}
    </Grid>
  )
}
