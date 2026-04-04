import { Metadata } from 'next';
import { Hero, PageHeader } from '@/components/headers';

export const metadata: Metadata = {
  title: 'Sportsklubb Frem-31',
  description: 'Sportsklubb i Stabekk med fotballbane og treningsaktiviteter.',
};

export default function HomePage() {
  return (
    <>
      <Hero
        badge="Siden 1931"
        title="Frem-31 — "
        titleAccent="idrett for alle"
        description="Vi tilbyr fotball, bandy, lego og sjakk for barn, unge og voksne i lokalmiljøet. Bli med oss!"
        primaryButton={{
          label: 'Bli medlem',
          href: '/bli-medlem',
        }}
        secondaryButton={{
          label: 'Ta kontakt',
          href: '/kontakt',
        }}
      />
      <PageHeader
        title="Frem-31 — idrett for alle"
        description="Vi tilbyr fotball, bandy, lego og sjakk for barn, unge og voksne i lokalmiljøet. Bli med oss!"
      />
      <PageHeader
        title="Frem-31 — idrett for alle"
        description="Vi tilbyr fotball, bandy, lego og sjakk for barn, unge og voksne i lokalmiljøet. Bli med oss!"
        image={{
          src: '/images/_DSC6121.jpg',
          alt: 'img',
        }}
      />
    </>
  );
}
