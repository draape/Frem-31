import {page} from './page'
import {siteSettings} from './siteSettings'
import {link} from './objects/link'
import {textBlock} from './objects/textBlock'
import {imageSection} from './objects/imageSection'
import {split} from './objects/split'
import {card} from './objects/card'
import {cardSection} from './objects/cardSection'
import {navItem} from './objects/navItem'
import {footerColumn} from './objects/footerColumn'
import {seo, seoDefaults} from './objects/seo'

export const schemaTypes = [
  page,
  siteSettings,
  link,
  textBlock,
  imageSection,
  split,
  card,
  cardSection,
  navItem,
  footerColumn,
  seo,
  seoDefaults,
]
