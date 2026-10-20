import {getCliClient} from 'sanity/cli'

/**
 * Moves the two hand-written pages, /frembanen and /banekalender, into the
 * dataset as `page` documents, and sets the site-settings navigation to what
 * the hand-written routes showed. The text is copied from the constants the
 * web used before the migration (#7).
 *
 * Needs a front page (run `pnpm seed:front-page` first). Run with the CLI,
 * which supplies project/dataset from sanity.cli.ts:
 *
 *   pnpm exec sanity exec scripts/migrateLegacyPages.ts --with-user-token
 *
 * `sanity exec` has no dataset flag; target another dataset with an env var:
 *
 *   DATASET=production pnpm exec sanity exec scripts/migrateLegacyPages.ts --with-user-token
 *
 * Re-running is safe for the pages: they are created with `createIfNotExists`
 * on fixed ids and never overwritten. The site-settings header, footer and
 * Facebook link are reset to the values below on every run.
 */

const FRONT_PAGE_FIX = 'Run `pnpm seed:front-page` first.'

const FREMBANEN_ID = 'page-frembanen'
const BANEKALENDER_ID = 'page-banekalender'
const SITE_SETTINGS_ID = 'siteSettings'

const ref = (id: string) => ({_type: 'reference', _ref: id})

type Span = string | {text: string; link: string}

// A Portable Text block as the `textBlock` editor produces it. A span with a
// `link` key gets the link annotation with that key.
function block(
  key: string,
  style: 'normal' | 'subtitle',
  spans: Span[],
  markDefs: Record<string, unknown>[] = [],
  listItem?: 'bullet',
) {
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs,
    ...(listItem && {listItem, level: 1}),
    children: spans.map((span, i) => {
      const [text, marks] = typeof span === 'string' ? [span, []] : [span.text, [span.link]]
      return {_type: 'span', _key: `${key}-${i}`, text, marks}
    }),
  }
}

const bullets = (key: string, items: string[]) =>
  items.map((item, i) => block(`${key}-${i}`, 'normal', [item], [], 'bullet'))

const textBlock = (key: string, content: unknown[]) => ({_type: 'textBlock', _key: key, content})

const banekalender = (rootId: string) => ({
  _id: BANEKALENDER_ID,
  _type: 'page',
  headerType: 'standard',
  title: 'Banekalender',
  description: 'Se når banen er ledig for trening og kamper.',
  seo: {
    title: 'Banekalender - Frembanen | Sportsklubb Frem-31',
    description:
      'Se når Frembanen er ledig. Banekalender for trening og kamper på kunstgressbanen.',
  },
  path: {
    slug: {_type: 'slug', current: 'banekalender'},
    parent: ref(rootId),
    // Normally written by the compute-full-path Function; seeded so the page
    // is reachable at once (see createFrontPage.ts).
    fullPath: '/banekalender',
  },
  content: [{_type: 'easyplayCalendar', _key: 'calendar'}],
})

const frembanen = (rootId: string) => ({
  _id: FREMBANEN_ID,
  _type: 'page',
  headerType: 'standard',
  title: 'Frembanen',
  description: 'Velkommen til Frembanen, trenings- og kampanlegget til Frem-31.',
  seo: {
    title: 'Frembanen - Sportsklubb Frem-31',
    description: 'Informasjon om Frembanen, trenings- og kampanlegget til Frem-31.',
  },
  path: {
    slug: {_type: 'slug', current: 'frembanen'},
    parent: ref(rootId),
    fullPath: '/frembanen',
  },
  content: [
    textBlock('welcome', [
      block(
        'welcome-body',
        'normal',
        [
          'Frembanen er åpen for alle og fungerer som en samlingsplass for nærmiljøet rundt Lysaker skole og Nedre Stabekk. Her møtes barn, unge og familier til aktivitet, lek og fotball – både organisert og uorganisert. Sjekk ',
          {text: 'banekalenderen', link: 'calendar-link'},
          ' for å se når banen er ledig.',
        ],
        [{_type: 'link', _key: 'calendar-link', type: 'internal', internal: ref(BANEKALENDER_ID)}],
      ),
    ]),
    textBlock('address', [
      block('address-heading', 'subtitle', ['Addresse']),
      block('address-text', 'normal', ['Nordraaks vei 67, 1369 Stabekk']),
    ]),
    {
      _type: 'mapEmbed',
      _key: 'map',
      url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.2982680992989!2d10.615837599999999!3d59.91059709999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416ce8a4b2c0c3%3A0x2b3c482baaaeb9cf!2sFrembanen%20kunstgress!5e0!3m2!1sen!2sno!4v1773009324276!5m2!1sen!2sno',
      title: 'Kart over Frembanen',
    },
    textBlock('parking', [
      block('parking-heading', 'subtitle', ['Parkering']),
      block('parking-intro', 'normal', [
        'For minst mulig forstyrrelse av annen trafikk, og for å redusere faren for ulykker, ber vi deg vennligst',
      ]),
      ...bullets('parking-rule', [
        'benytte parkeringsmulighetene oppe på skolen. Det er 100m å gå derfra til banen',
        'respektere parkeringsforbudet, følg skilting',
        'ikke bruke veien inn til banen som snuplass eller henteplass',
      ]),
      block('parking-cycling', 'normal', [
        'Sykle gjerne til trening og kamper! Det er fin oppvarming og reduserer antall biler. Fra Bekkestua tar det eksempelvis 7 min å sykle til banen, og 12 min hjem igjen.',
      ]),
    ]),
    textBlock('rules', [
      block('rules-heading', 'subtitle', ['Baneregler']),
      block('rules-intro', 'normal', [
        'Hjelp oss å ta vare på den fine banen vår! Følgende er ikke tillatt på kunstgresset',
      ]),
      ...bullets('rules-item', [
        'leking og klatring i mål og nett',
        'hunder – av hygieniske grunner',
        'snus og mat',
        'sykler og annet på hjul. Sykler bes parkert på asfalten i enden mot klubbhuset.',
      ]),
      block('rules-outro', 'normal', [
        'Vennligst ta med deg søppel av banen og kast det i søppeldunkene ved inngangene og ved klubbhuset.',
      ]),
    ]),
  ],
})

const external = (key: string, label: string, href: string, openInNewTab = false) => ({
  _type: 'link',
  _key: key,
  type: 'external',
  label,
  href,
  openInNewTab,
})

// What the hand-written routes showed, minus the header's external
// "Treningstilbud" button, which the header no longer supports.
const navigation = {
  header: [
    {_type: 'navItem', _key: 'frembanen', label: 'Frembanen', reference: ref(FREMBANEN_ID)},
    {
      _type: 'navItem',
      _key: 'banekalender',
      label: 'Banekalender',
      reference: ref(BANEKALENDER_ID),
    },
  ],
  'footer.columns': [
    {
      _type: 'footerColumn',
      _key: 'aktiviteter',
      title: 'Aktiviteter',
      links: [
        external('fotball', 'Fotball', 'https://frem-31.no/fotball/'),
        external('bandy', 'Bandy', 'https://frem-31.no/bandy/'),
        external('lego', 'Lego', 'https://frem-31.no/robotklubben-2/'),
        external('sommerskole', 'Sommerskole', 'https://frem-31.no/sommerskole/'),
      ],
    },
    {
      _type: 'footerColumn',
      _key: 'klubben',
      title: 'Klubben',
      links: [
        {
          _type: 'link',
          _key: 'frembanen',
          type: 'internal',
          label: 'Frembanen',
          internal: ref(FREMBANEN_ID),
          openInNewTab: false,
        },
        external('fremhuset', 'Fremhuset', 'https://frem-31.no/fremhuset/'),
        external('bli-medlem', 'Bli medlem', 'https://frem-31.no/bli-medlem/', true),
        external('kontakt', 'Kontakt', 'https://frem-31.no/kontaktpersoner/'),
      ],
    },
  ],
  'socialLinks.facebook': 'https://www.facebook.com/groups/293108129128966',
}

async function main() {
  const cliClient = getCliClient()
  const client = process.env.DATASET
    ? cliClient.withConfig({dataset: process.env.DATASET})
    : cliClient
  const {projectId, dataset} = client.config()
  const where = `${projectId}/${dataset}`

  const roots = await client.fetch<{_id: string}[]>(
    `*[_type == "page" && !defined(path.parent) && !(_id in path("drafts.**"))]{_id}`,
  )
  if (roots.length === 0) {
    throw new Error(`No front page in ${where}. ${FRONT_PAGE_FIX}`)
  }
  if (roots.length > 1) {
    const ids = roots.map((r) => r._id).join(', ')
    throw new Error(`More than one root page in ${where} (${ids}). Keep one and re-run.`)
  }
  const rootId = roots[0]._id

  // A page someone already made at one of the paths would be shadowed by, or
  // collide with, ours. Leave both alone and let a human decide.
  const conflicts = await client.fetch<{_id: string; fullPath: string}[]>(
    `*[_type == "page" && path.fullPath in $paths && !(_id in $ids)]{_id, "fullPath": path.fullPath}`,
    {
      paths: ['/frembanen', '/banekalender'],
      ids: [FREMBANEN_ID, BANEKALENDER_ID, `drafts.${FREMBANEN_ID}`, `drafts.${BANEKALENDER_ID}`],
    },
  )
  if (conflicts.length > 0) {
    const listed = conflicts.map((c) => `${c.fullPath} (${c._id})`).join(', ')
    throw new Error(`Pages already exist in ${where} at: ${listed}. Nothing was written.`)
  }

  const existing = await client.fetch<string[]>(`*[_id in $ids]._id`, {
    ids: [BANEKALENDER_ID, FREMBANEN_ID, SITE_SETTINGS_ID],
  })

  // Banekalender first: the Frembanen text links to it.
  await client
    .transaction()
    .createIfNotExists(banekalender(rootId))
    .createIfNotExists(frembanen(rootId))
    .createIfNotExists({_id: SITE_SETTINGS_ID, _type: 'siteSettings'})
    .patch(SITE_SETTINGS_ID, (patch) => patch.set(navigation))
    .commit()

  for (const id of [BANEKALENDER_ID, FREMBANEN_ID]) {
    console.log(`${existing.includes(id) ? 'Already present, left as is' : 'Created'}: ${id}`)
  }
  console.log(
    `${existing.includes(SITE_SETTINGS_ID) ? 'Updated' : 'Created'} ${SITE_SETTINGS_ID}: header, footer columns and Facebook link`,
  )
  console.log(`Done in ${where}.`)
}

main().catch((err) => {
  console.error('Failed to migrate the legacy pages:', err instanceof Error ? err.message : err)
  process.exit(1)
})
