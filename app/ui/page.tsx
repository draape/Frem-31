import { Football, Lightning, Trophy } from '@phosphor-icons/react/dist/ssr';
import { Hero } from '@/components/headers/hero';
import { PageHeader } from '@/components/headers/page-header';
import { CallToAction } from '@/components/content/call-to-action';
import { Card } from '@/components/content/card';
import { CardList } from '@/components/content/card-list';
import { Split } from '@/components/content/split';
import { RichText } from '@/components/content/rich-text';
import type { RichTextNode } from '@/components/content/rich-text';
import { PricingTiers } from '@/components/pricing/pricing-tiers';
import { FeeTable } from '@/components/pricing/fee-table';

export default function UiSandboxPage() {
  return (
    <main>
      <h1
        style={{
          fontFamily: 'sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          padding: '24px',
          borderBottom: '1px solid #e8e8e8',
          color: '#575757',
        }}
      >
        /ui — Component sandbox
      </h1>

      {/* ─── Hero ─── */}
      <section>
        <h2
          style={{
            fontFamily: 'sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#ABABAB',
            padding: '24px 24px 16px',
          }}
        >
          Hero
        </h2>

        <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: '#ABABAB', padding: '0 24px 8px' }}>
          Full — badge, titleAccent, both buttons
        </p>
        <Hero
          badge="Sesong 2025"
          title="Frem 31 —"
          titleAccent="idrett for alle"
          description="Vi er en idrettsklubb på Frøen i Oslo. Hos oss kan du spille fotball, gå på is med bandy eller bygge roboter med Lego League."
          primaryButton={{ label: 'Meld deg inn', href: '/innmelding' }}
          secondaryButton={{ label: 'Les om klubben', href: '/om-oss' }}
        />

        <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: '#ABABAB', padding: '16px 24px 8px' }}>
          Minimal — title, description, primary button only
        </p>
        <Hero
          title="Frembanen"
          description="Vår hjemmebane med kunstgress og bandyis — tilgjengelig for alle våre aktiviteter gjennom hele året."
          primaryButton={{ label: 'Om banen', href: '/frembanen' }}
        />

        <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: '#ABABAB', padding: '16px 24px 8px' }}>
          No buttons
        </p>
        <Hero
          title="Banekalender"
          description="Se alle kommende treninger, kamper og arrangementer på Frembanen."
        />
      </section>

      {/* ─── PageHeader ─── */}
      <section style={{ borderTop: '1px solid #e8e8e8' }}>
        <h2
          style={{
            fontFamily: 'sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#ABABAB',
            padding: '24px 24px 16px',
          }}
        >
          PageHeader
        </h2>

        <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: '#ABABAB', padding: '0 24px 8px' }}>
          Text only
        </p>
        <PageHeader
          title="Om Frem 31"
          description="Vi er en idrettsklubb på Frøen i Oslo med lange tradisjoner innen fotball og bandy."
        />

        <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: '#ABABAB', padding: '0 24px 8px' }}>
          With titleAccent
        </p>
        <PageHeader
          title="Frembanen —"
          titleAccent="vår hjemmebane"
          description="Et fullverdig anlegg med kunstgressbane, bandyis og fasiliteter for alle våre aktiviteter."
        />

        <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: '#ABABAB', padding: '0 24px 8px' }}>
          With image
        </p>
        <PageHeader
          title="Aktiviteter for alle aldre"
          description="Fra fotball og bandy til Lego League og sommerskole — vi har noe for alle."
          image={{ src: '/images/_DSC6121.jpg', alt: 'Frem 31 aktiviteter' }}
        />
      </section>

      {/* ─── CallToAction ─── */}
      <section style={{ padding: '24px 0' }}>
        <h2
          style={{
            fontFamily: 'sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#ABABAB',
            padding: '0 24px 16px',
          }}
        >
          CallToAction
        </h2>

        <CallToAction
          title="Bli med i Frem 31"
          description="Vi er en idrettsklubb for alle. Meld deg inn i dag og få tilgang til alle våre aktiviteter og arrangementer."
          cta={{ label: 'Meld deg inn', href: '/innmelding' }}
          variant="blue"
        />

        <div style={{ marginTop: '8px' }}>
          <CallToAction
            title="Se vår aktivitetskalender"
            description="Hold deg oppdatert på kommende treninger, kamper og arrangement."
            cta={{ label: 'Åpne kalender', href: '/banekalender' }}
            variant="yellow"
          />
        </div>

        <div style={{ marginTop: '8px' }}>
          <CallToAction
            title="Ta kontakt med oss"
            description="Har du spørsmål om medlemskap eller aktiviteter? Vi hjelper deg gjerne."
            cta={{ label: 'Kontakt oss', href: '/kontakt' }}
            variant="white"
          />
        </div>
      </section>
      {/* ─── Card + CardList ─── */}
      <section style={{ padding: '24px 0', borderTop: '1px solid #e8e8e8' }}>
        <h2
          style={{
            fontFamily: 'sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#ABABAB',
            padding: '0 24px 16px',
          }}
        >
          Card + CardList
        </h2>

        {/* 1 card — 50% wide */}
        <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: '#ABABAB', padding: '0 24px 8px' }}>1 card</p>
        <CardList>
          <Card
            kicker="Fotball"
            icon={<Football size={20} />}
            title="Fotball for alle aldre"
            description="Fra 6 år og oppover tilbyr vi fotballtrening tilpasset alle nivåer og aldersgrupper."
            link={{ label: 'Les mer', href: '/fotball' }}
          />
        </CardList>

        {/* 2 cards — 50/50 */}
        <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: '#ABABAB', padding: '16px 24px 8px' }}>2 cards</p>
        <CardList>
          <Card
            kicker="Fotball"
            icon={<Football size={20} />}
            title="Fotball for alle aldre"
            description="Fra 6 år og oppover tilbyr vi fotballtrening tilpasset alle nivåer og aldersgrupper."
            link={{ label: 'Les mer', href: '/fotball' }}
          />
          <Card
            kicker="Bandy"
            icon={<Lightning size={20} />}
            title="Bandy på Frembanen"
            description="Bandy er en av Frem 31s store aktiviteter. Vi har bane tilgjengelig gjennom hele vinteren."
            link={{ label: 'Les mer', href: '/bandy' }}
          />
        </CardList>

        {/* 3 cards — 1/3 each */}
        <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: '#ABABAB', padding: '16px 24px 8px' }}>3 cards</p>
        <CardList>
          <Card
            kicker="Fotball"
            icon={<Football size={20} />}
            title="Fotball"
            description="Fotballtrening for barn, ungdom og voksne gjennom hele sesongen."
          />
          <Card
            kicker="Bandy"
            icon={<Lightning size={20} />}
            title="Bandy"
            description="Bandytrening på vinterisen — for alle som elsker fart og lagspill."
          />
          <Card
            kicker="Lego"
            icon={<Trophy size={20} />}
            title="Lego League"
            description="Robotprogrammering og ingeniørtenkning for barn og unge."
          />
        </CardList>

        {/* 6 cards — 1/3 each, two rows */}
        <p style={{ fontFamily: 'sans-serif', fontSize: '11px', color: '#ABABAB', padding: '16px 24px 8px' }}>6 cards (no kicker/icon)</p>
        <CardList>
          <Card title="Fotball" description="Sesongbasert trening for alle aldersgrupper." />
          <Card title="Bandy" description="Vinteridretten på Frembanen." />
          <Card title="Lego League" description="Teknologi og samarbeid for unge." />
          <Card
            title="Sommerskole"
            description="Aktiviteter i skoleferien for barn mellom 6 og 12 år."
            link={{ label: 'Se program', href: '/sommerskole' }}
          />
          <Card
            title="Frembanen"
            description="Vår hjemmebane med kunstgress og bandyis."
            link={{ label: 'Om banen', href: '/frembanen' }}
          />
          <Card
            title="Bli medlem"
            description="Meld deg inn og støtt klubben."
            link={{ label: 'Meld deg inn', href: '/innmelding' }}
          />
        </CardList>
      </section>
      {/* ─── Split ─── */}
      <section style={{ borderTop: '1px solid #e8e8e8' }}>
        <h2
          style={{
            fontFamily: 'sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#ABABAB',
            padding: '24px 24px 0',
          }}
        >
          Split
        </h2>

        {/* image right (default) */}
        <Split
          title="Frembanen — vår hjemmebane"
          titleAccent="siden 1921"
          description="Et fullverdig anlegg med kunstgressbane, bandyis og gode fasiliteter for alle våre aktiviteter gjennom hele året."
          image={{ src: '/images/_DSC6121.jpg', alt: 'Frembanen' }}
          cta={{ label: 'Les om banen', href: '/frembanen' }}
        />

        {/* image left */}
        <Split
          title="Bli med i klubben"
          description="Frem 31 er for alle. Vi tilbyr fotball, bandy, Lego League og sommerskole. Meld deg inn i dag og bli en del av fellesskapet."
          image={{ src: '/images/_DSC6121.jpg', alt: 'Frem 31 aktiviteter' }}
          cta={{ label: 'Meld deg inn', href: '/innmelding' }}
          imageSide="left"
          variant="white"
        />

        {/* blue variant */}
        <Split
          title="Treningstilbud for"
          titleAccent="alle aldre"
          description="Fra de minste til de eldste — vi har et tilbud som passer deg, uansett nivå eller erfaring."
          image={{ src: '/images/_DSC6121.jpg', alt: 'Trening hos Frem 31' }}
          cta={{ label: 'Se treningstilbud', href: '/treningstilbud' }}
          imageSide="right"
          variant="blue"
        />
      </section>
      {/* ─── RichText + Image ─── */}
      <section style={{ borderTop: '1px solid #e8e8e8' }}>
        <h2
          style={{
            fontFamily: 'sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#ABABAB',
            padding: '24px 24px 0',
          }}
        >
          RichText + Image
        </h2>
        <RichText content={sampleRichText} />
      </section>
      {/* ─── PricingTiers ─── */}
      <section style={{ borderTop: '1px solid #e8e8e8' }}>
        <h2
          style={{
            fontFamily: 'sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#ABABAB',
            padding: '24px 24px 0',
          }}
        >
          PricingTiers
        </h2>
        <PricingTiers tiers={membershipTiers} />
      </section>
      {/* ─── FeeTable ─── */}
      <section style={{ borderTop: '1px solid #e8e8e8' }}>
        <h2
          style={{
            fontFamily: 'sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#ABABAB',
            padding: '24px 24px 0',
          }}
        >
          FeeTable
        </h2>
        <FeeTable groups={feeGroups} />
      </section>
    </main>
  );
}

const sampleRichText: RichTextNode[] = [
  { type: 'heading', level: 2, text: 'Om Frem 31' },
  {
    type: 'paragraph',
    children: [
      { text: 'Frem 31 er en idrettsklubb på Frøen i Oslo med lange tradisjoner innen ' },
      { text: 'fotball og bandy', marks: ['strong'] },
      { text: '. Vi tilbyr aktiviteter for alle aldre og nivåer.' },
    ],
  },
  { type: 'heading', level: 3, text: 'Våre aktiviteter' },
  {
    type: 'list',
    style: 'bullet',
    items: [
      'Fotball — sommer og høst for barn, ungdom og voksne',
      'Bandy — vinteraktivitet på Frembanen',
      'Lego League — robotprogrammering for barn og unge',
      'Sommerskole — aktiviteter i skoleferien',
    ],
  },
  {
    type: 'image',
    src: '/images/_DSC6121.jpg',
    alt: 'Frembanen',
    caption: 'Frembanen — vår hjemmebane siden 1921',
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Anlegget holder høy standard med kunstgressbane og bandyis gjennom hele vinteren. ' },
      { text: 'Les mer om fasiliteter og åpningstider på siden for banen.', marks: ['em'] },
    ],
  },
  {
    type: 'list',
    style: 'number',
    items: [
      'Meld deg inn via innmeldingsskjema',
      'Velg ønsket aktivitet og aldersgruppe',
      'Betal treningsavgift',
      'Møt opp på første trening',
    ],
  },
  { type: 'link', href: '/frembanen', text: 'Les mer om Frembanen →' },
];

const membershipTiers = [
  {
    name: 'Vanlig',
    price: 'kr 800 / år',
    description: 'For enkeltmedlemmer som ønsker å støtte klubben og delta i våre aktiviteter.',
    features: [
      'Tilgang til alle treninger og kamper',
      'Klubbmedlemsblad og nyhetsbrev',
      'Stemmerett på årsmøtet',
    ],
    cta: { label: 'Meld deg inn', href: '/innmelding' },
  },
  {
    name: 'Familie',
    price: 'kr 1 400 / år',
    description: 'For familier med barn. Dekker to voksne og alle barn i husstanden.',
    features: [
      'Alt i Vanlig-medlemskap',
      'Dekker hele husstanden',
      'Rabatt på kurs og arrangementer',
      'Prioritert plass på populære aktiviteter',
    ],
    cta: { label: 'Meld familien inn', href: '/innmelding' },
    highlighted: true,
  },
  {
    name: 'Støttemedlem',
    price: 'kr 300 / år',
    description: 'Støtt klubben uten å delta aktivt. Perfekt for tidligere spillere og sympatisører.',
    features: [
      'Klubbmedlemsblad og nyhetsbrev',
      'Stemmerett på årsmøtet',
      'Invitasjon til klubbens arrangementer',
    ],
    cta: { label: 'Bli støttemedlem', href: '/innmelding' },
  },
];

const feeGroups = [
  {
    title: 'Fotball',
    rows: [
      { label: 'Barn og ungdom (6–12 år)', price: 'kr 1 200 / år' },
      { label: 'Junior (13–19 år)', price: 'kr 1 800 / år' },
      { label: 'Voksen (20+)', price: 'kr 2 400 / år' },
      { label: 'Treningstøy (valgfritt)', price: 'kr 600', note: 'Betales separat ved bestilling' },
    ],
  },
  {
    title: 'Bandy',
    rows: [
      { label: 'Barn og ungdom (6–12 år)', price: 'kr 1 000 / år' },
      { label: 'Junior (13–19 år)', price: 'kr 1 500 / år' },
      { label: 'Voksen (20+)', price: 'kr 2 000 / år' },
      { label: 'Bandystøvler (utlån)', price: 'Inkludert', note: 'Begrenset tilgjengelighet' },
    ],
  },
  {
    title: 'Annet',
    rows: [
      { label: 'Lego League', price: 'kr 800 / sesong', note: 'Oktober–januar' },
      { label: 'Sommerskole', price: 'kr 1 500 / uke', note: 'Per uke, søskenmoderasjon tilgjengelig' },
      { label: 'Baneleie (ekstern)', price: 'kr 500 / time', note: 'Kun tilgjengelig utenfor treningstider' },
    ],
  },
];
