import { CallToAction } from '@/components/content/call-to-action';

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
    </main>
  );
}
