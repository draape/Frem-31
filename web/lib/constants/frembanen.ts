import type { FrembanenContent } from '@/lib/types';

export const frembanenContent: FrembanenContent = {
  welcome: {
    title: 'Velkommen til Frembanen,',
    subtitle: 'trenings- og kampanlegget til Frem-31.',
    body: `Frembanen er åpen for alle og fungerer som en samlingsplass for nærmiljøet rundt Lysaker skole og Nedre Stabekk. Her møtes barn, unge og familier til aktivitet, lek og fotball – både organisert og uorganisert. Sjekk banekalenderen for å se når banen er ledig.`,
  },
  address: {
    street: 'Nordraaks vei 67',
    postalCity: '1369 Stabekk',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.2982680992989!2d10.615837599999999!3d59.91059709999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46416ce8a4b2c0c3%3A0x2b3c482baaaeb9cf!2sFrembanen%20kunstgress!5e0!3m2!1sen!2sno!4v1773009324276!5m2!1sen!2sno',
    coordinates: { lat: 59.9127, lng: 10.6089 },
  },
  parking: {
    title: 'Parkering',
    intro:
      'For minst mulig forstyrrelse av annen trafikk, og for å redusere faren for ulykker, ber vi deg vennligst',
    rules: [
      'benytte parkeringsmulighetene oppe på skolen. Det er 100m å gå derfra til banen',
      'respektere parkeringsforbudet, følg skilting',
      'ikke bruke veien inn til banen som snuplass eller henteplass',
    ],
    cycling:
      'Sykle gjerne til trening og kamper! Det er fin oppvarming og reduserer antall biler. Fra Bekkestua tar det eksempelvis 7 min å sykle til banen, og 12 min hjem igjen.',
  },
  rules: {
    title: 'Baneregler',
    intro: 'Hjelp oss å ta vare på den fine banen vår! Følgende er ikke tillatt på kunstgresset',
    prohibited: [
      'leking og klatring i mål og nett',
      'hunder – av hygieniske grunner',
      'snus og mat',
      'sykler og annet på hjul. Sykler bes parkert på asfalten i enden mot klubbhuset.',
    ],
    outro:
      'Vennligst ta med deg søppel av banen og kast det i søppeldunkene ved inngangene og ved klubbhuset.',
  },
  pitchMap: {
    title: 'Banekart',
    zones: [
      { id: '5er-A', label: '5er – A', type: '5er' },
      { id: '5er-B', label: '5er – B', type: '5er' },
      { id: '5er-C', label: '5er – C', type: '5er' },
      { id: '5er-D', label: '5er – D', type: '5er' },
      { id: '7er-A', label: '7er – A', type: '7er' },
      { id: '7er-B', label: '7er – B', type: '7er' },
    ],
    parentZones: [
      { id: 'parent-5er-A', label: 'Foreldresone 5er – A', type: 'parent-zone' },
      { id: 'parent-5er-B', label: 'Foreldresone 5er – B', type: 'parent-zone' },
      { id: 'parent-5er-C', label: 'Foreldresone 5er – C', type: 'parent-zone' },
      { id: 'parent-5er-D', label: 'Foreldresone 5er – D', type: 'parent-zone' },
      { id: 'parent-7er-A', label: 'Foreldresone 7er – A', type: 'parent-zone' },
      { id: 'parent-7er-B', label: 'Foreldresone 7er – B', type: 'parent-zone' },
    ],
  },
};
