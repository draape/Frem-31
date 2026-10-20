import type {ReactNode} from 'react'

function Svg({children, name}: {children: ReactNode; name: string}) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 25 25"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      data-sanity-icon={name}
    >
      {children}
    </svg>
  )
}

/** Rich text — a few paragraph lines of varying length. */
export function TextBlockIcon() {
  return (
    <Svg name="text-block">
      <line x1="5" y1="7" x2="16" y2="7" />
      <line x1="5" y1="11" x2="20" y2="11" />
      <line x1="5" y1="15" x2="20" y2="15" />
      <line x1="5" y1="19" x2="12" y2="19" />
    </Svg>
  )
}

/** Standalone image with a caption — framed picture (sun + mountain) over a line. */
export function ImageSectionIcon() {
  return (
    <Svg name="image-section">
      <rect x="4" y="4" width="17" height="12" rx="2" />
      <circle cx="8.5" cy="8" r="1.4" />
      <polyline points="5,15.5 9,11 12,14 15,10 20,15.5" />
      <line x1="6" y1="19.5" x2="16" y2="19.5" />
    </Svg>
  )
}

/** Map embed — a framed area with a location pin. */
export function MapEmbedIcon() {
  return (
    <Svg name="map-embed">
      <rect x="4" y="4" width="17" height="12" rx="2" />
      <path d="M12.5 13.5s-3-2.6-3-4.8a3 3 0 0 1 6 0c0 2.2-3 4.8-3 4.8z" />
      <circle cx="12.5" cy="8.7" r="0.9" />
      <line x1="6" y1="19.5" x2="16" y2="19.5" />
    </Svg>
  )
}

/** EasyPlay calendar — a calendar page with a ring binding and a grid of days. */
export function EasyplayCalendarIcon() {
  return (
    <Svg name="easyplay-calendar">
      <rect x="4" y="6" width="17" height="14" rx="2" />
      <line x1="4" y1="10" x2="21" y2="10" />
      <line x1="8.5" y1="4" x2="8.5" y2="7.5" />
      <line x1="16.5" y1="4" x2="16.5" y2="7.5" />
      <line x1="7.5" y1="13.5" x2="9" y2="13.5" />
      <line x1="11.75" y1="13.5" x2="13.25" y2="13.5" />
      <line x1="16" y1="13.5" x2="17.5" y2="13.5" />
      <line x1="7.5" y1="16.5" x2="9" y2="16.5" />
      <line x1="11.75" y1="16.5" x2="13.25" y2="16.5" />
    </Svg>
  )
}

/** 50/50 split — a framed area divided in two: image on one side, text on the other. */
export function SplitIcon() {
  return (
    <Svg name="split">
      <rect x="3.5" y="5" width="18" height="14" rx="2" />
      <line x1="12.5" y1="5" x2="12.5" y2="19" />
      <circle cx="6.9" cy="9" r="1.2" />
      <polyline points="4.8,14.5 8,10.2 11.2,14.5" />
      <line x1="14.8" y1="9" x2="19.8" y2="9" />
      <line x1="14.8" y1="12" x2="19.8" y2="12" />
      <line x1="14.8" y1="15" x2="18.3" y2="15" />
    </Svg>
  )
}

/** Card grid — a row of equal cards. */
export function CardSectionIcon() {
  return (
    <Svg name="card-section">
      <rect x="4" y="7" width="4.8" height="11" rx="1" />
      <rect x="10.1" y="7" width="4.8" height="11" rx="1" />
      <rect x="16.2" y="7" width="4.8" height="11" rx="1" />
    </Svg>
  )
}

/** Fee table — a framed table with a header line, rows and a right-hand price column. */
export function FeeTableIcon() {
  return (
    <Svg name="fee-table">
      <rect x="3.5" y="5" width="18" height="15" rx="2" />
      <line x1="3.5" y1="9.5" x2="21.5" y2="9.5" />
      <line x1="3.5" y1="14.5" x2="21.5" y2="14.5" />
      <line x1="15.5" y1="5" x2="15.5" y2="20" />
      <line x1="6" y1="12" x2="12" y2="12" />
      <line x1="6" y1="17" x2="11" y2="17" />
    </Svg>
  )
}

/** Call to action — a framed banner with two text lines and a small button. */
export function CallToActionIcon() {
  return (
    <Svg name="call-to-action">
      <rect x="3.5" y="5" width="18" height="15" rx="2" />
      <line x1="6.5" y1="9" x2="16.5" y2="9" />
      <line x1="6.5" y1="12" x2="13.5" y2="12" />
      <rect x="6.5" y="14.5" width="6" height="2.5" rx="1" />
    </Svg>
  )
}

/** Pricing tiers — three columns, the highlighted middle one taller, each with a price line. */
export function PricingTiersIcon() {
  return (
    <Svg name="pricing-tiers">
      <rect x="3.5" y="8" width="5.5" height="11" rx="1" />
      <rect x="9.75" y="5" width="5.5" height="14" rx="1" />
      <rect x="16" y="8" width="5.5" height="11" rx="1" />
      <line x1="5" y1="11" x2="7.5" y2="11" />
      <line x1="11.25" y1="8" x2="13.75" y2="8" />
      <line x1="17.5" y1="11" x2="20" y2="11" />
    </Svg>
  )
}

/** Single card — a framed image over a couple of title lines. */
export function CardIcon() {
  return (
    <Svg name="card">
      <rect x="6.5" y="4.5" width="12" height="16" rx="2" />
      <line x1="6.5" y1="12" x2="18.5" y2="12" />
      <circle cx="10" cy="8" r="1.1" />
      <polyline points="8,11.5 10.5,8.8 12.5,10.5 15,8 17,11.5" />
      <line x1="9" y1="15.5" x2="16" y2="15.5" />
      <line x1="9" y1="17.8" x2="13" y2="17.8" />
    </Svg>
  )
}
