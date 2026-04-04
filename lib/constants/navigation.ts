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
      title: 'Topic',
      links: [
        { label: 'Page', href: '#', variant: 'link' },
        { label: 'Page', href: '#', variant: 'link' },
        { label: 'Page', href: '#', variant: 'link' },
      ],
    },
    {
      title: 'Topic',
      links: [
        { label: 'Page', href: '#', variant: 'link' },
        { label: 'Page', href: '#', variant: 'link' },
        { label: 'Page', href: '#', variant: 'link' },
      ],
    },
    {
      title: 'Topic',
      links: [
        { label: 'Page', href: '#', variant: 'link' },
        { label: 'Page', href: '#', variant: 'link' },
        { label: 'Page', href: '#', variant: 'link' },
      ],
    },
  ],
};

export const socialLinks = {
  facebook: 'https://www.facebook.com/groups/293108129128966',
  // instagram: 'https://www.instagram.com/frem31',
};
