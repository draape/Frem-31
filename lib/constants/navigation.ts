import type { NavigationConfig } from '@/lib/types';

export const navigationConfig: NavigationConfig = {
  header: [
    { label: 'Frembanen', href: '/', variant: 'link' },
    { label: 'Banekalender', href: '/banekalender', variant: 'link' },
    {
      label: 'Treningstilbud',
      href: 'https://www.frem31.no/treningstilbud',
      variant: 'button',
      external: true,
    },
  ],
  footer: [
    {
      title: 'Lenker',
      links: [
        { label: 'Frembanen', href: '/', variant: 'link' },
        { label: 'Banekalender', href: '/banekalender', variant: 'link' },
        {
          label: 'Treningstilbud',
          href: 'https://www.frem31.no/treningstilbud',
          variant: 'link',
          external: true,
        },
      ],
    },
    {
      title: 'Kontakt',
      links: [
        {
          label: 'Frem-31 Hovedside',
          href: 'https://www.frem31.no',
          variant: 'link',
          external: true,
        },
      ],
    },
  ],
};

export const socialLinks = {
  facebook: 'https://www.facebook.com/frem31',
  instagram: 'https://www.instagram.com/frem31',
};
