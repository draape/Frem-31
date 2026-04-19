import type { NavigationConfig } from '@/lib/types';

export const navigationConfig: NavigationConfig = {
  header: [
    { label: 'Frembanen', href: '/frembanen', variant: 'link' },
    { label: 'Banekalender', href: '/banekalender', variant: 'link' },
    {
      label: 'Treningstilbud',
      href: 'https://frem-31.no',
      variant: 'button',
      external: true,
    },
  ],
  footer: [
    {
      title: 'Aktiviteter',
      links: [
        { label: 'Fotball', href: 'https://frem-31.no/fotball/', variant: 'link' },
        { label: 'Bandy', href: 'https://frem-31.no/bandy/', variant: 'link' },
        { label: 'Lego', href: 'https://frem-31.no/robotklubben-2/', variant: 'link' },
        { label: 'Sommerskole', href: 'https://frem-31.no/sommerskole/', variant: 'link' },
      ],
    },
    {
      title: 'Klubben',
      links: [
        { label: 'Frembanen', href: '/frembanen', variant: 'link' },
        { label: 'Fremhuset', href: 'https://frem-31.no/fremhuset/', variant: 'link' },
        {
          label: 'Bli medlem',
          href: 'https://frem-31.no/bli-medlem/',
          variant: 'link',
          external: true,
        },
        { label: 'Kontakt', href: 'https://frem-31.no/kontaktpersoner/', variant: 'link' },
      ],
    },
  ],
};

export const socialLinks = {
  facebook: 'https://www.facebook.com/groups/293108129128966',
};
