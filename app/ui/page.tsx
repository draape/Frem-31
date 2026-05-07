import { Football, Lightning, Trophy } from '@phosphor-icons/react/dist/ssr';
import { CallToAction } from '@/components/content/call-to-action';
import { Card } from '@/components/content/card';
import { CardList } from '@/components/content/card-list';

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
    </main>
  );
}
