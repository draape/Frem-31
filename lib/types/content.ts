export interface ContentBlock {
  type: 'paragraph' | 'list' | 'emphasis';
  text?: string;
  items?: string[];
}

export interface ContentSection {
  /** Section heading */
  title: string;
  /** Main content (can be string or structured) */
  content: string | ContentBlock[];
}

export interface AddressInfo {
  /** Full street address */
  street: string;
  /** Postal code and city */
  postalCity: string;
  /** Google Maps embed URL */
  mapEmbedUrl: string;
  /** Coordinates for map centering */
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PitchZone {
  /** Zone identifier (e.g., "5er-A", "7er-B") */
  id: string;
  /** Display label */
  label: string;
  /** Zone type */
  type: '5er' | '7er' | 'parent-zone';
}

export interface PitchMapConfig {
  title: string;
  zones: PitchZone[];
  parentZones: PitchZone[];
}

export interface ParkingInfo {
  title: string;
  intro: string;
  rules: string[];
  cycling: string;
}

export interface RulesInfo {
  title: string;
  intro: string;
  prohibited: string[];
  outro: string;
}

export interface WelcomeInfo {
  title: string;
  subtitle: string;
  body: string;
}

export interface FrembanenContent {
  welcome: WelcomeInfo;
  address: AddressInfo;
  parking: ParkingInfo;
  rules: RulesInfo;
  pitchMap: PitchMapConfig;
}

export interface CalendarConfig {
  title: string;
  embedUrl: string;
  height: string;
  fallbackMessage: string;
  fallbackUrl: string;
}
