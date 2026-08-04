import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: { value: 'var(--font-inter), system-ui, -apple-system, sans-serif' },
          serif: { value: 'var(--font-fraunces), Georgia, serif' },
        },
        fontWeights: {
          extralight: { value: '200' },
          normal: { value: '400' },
          medium: { value: '500' },
          semibold: { value: '600' },
          bold: { value: '700' },
        },
        fontSizes: {
          xs: { value: '12px' },
          sm: { value: '14px' },
          base: { value: '16px' },
          lg: { value: '18px' },
          xl: { value: '24px' },
          '2xl': { value: '32px' },
          '3xl': { value: '48px' },
          '4xl': { value: '60px' },
        },
        colors: {
          blue: {
            50: { value: '#F4FCFF' },
            100: { value: '#C8DEFF' },
            200: { value: '#9DBFFF' },
            300: { value: '#729EFF' },
            400: { value: '#487AFF' },
            500: { value: '#2854FF' },
            600: { value: '#1836E3' },
            700: { value: '#0F08C8' },
            800: { value: '#0C00A0' },
            900: { value: '#06006D' },
            950: { value: '#02003E' },
          },
          yellow: {
            50: { value: '#FFFDF0' },
            100: { value: '#FFFBD6' },
            200: { value: '#FFF7B3' },
            300: { value: '#FFF180' },
            400: { value: '#FFED57' },
            500: { value: '#FFE61A' },
            600: { value: '#E6CD00' },
            700: { value: '#B39F00' },
            800: { value: '#807200' },
            900: { value: '#4D4400' },
            950: { value: '#292600' },
          },
          grey: {
            50: { value: '#FAFAFA' },
            100: { value: '#F5F5F5' },
            200: { value: '#E8E8E8' },
            300: { value: '#D6D6D6' },
            400: { value: '#ABABAB' },
            500: { value: '#757575' },
            600: { value: '#575757' },
            700: { value: '#424242' },
            800: { value: '#2B2B2B' },
            900: { value: '#1A1A1A' },
            950: { value: '#000000' },
          },
        },
      },
      semanticTokens: {
        colors: {
          primary: { value: '{colors.blue.500}' },
          accent: { value: '{colors.yellow.500}' },
          background: { value: '{colors.grey.50}' },
          text: { value: '{colors.grey.900}' },
          muted: { value: '{colors.grey.500}' },
        },
      },
      textStyles: {
        hero: {
          description: 'Display/Hero - Large hero headings',
          value: {
            fontFamily: 'serif',
            fontSize: '4xl',
            fontWeight: 'bold',
            lineHeight: '1',
          },
        },
        titleLg: {
          description: 'Display/Title lg - Page titles',
          value: {
            fontFamily: 'serif',
            fontSize: '3xl',
            fontWeight: 'bold',
            lineHeight: '1',
          },
        },
        lead: {
          description: 'Text/Lead - Lead paragraphs and descriptions',
          value: {
            fontFamily: 'sans',
            fontSize: 'xl',
            fontWeight: 'extralight',
            lineHeight: '1.5',
          },
        },
        tag: {
          description: 'Text/Tag - Small tags and labels',
          value: {
            fontFamily: 'sans',
            fontSize: 'xs',
            fontWeight: 'bold',
            lineHeight: '1',
          },
        },
      },
    },
  },
  globalCss: {
    body: {
      fontFamily: 'sans',
      fontSize: 'base',
      fontWeight: 'normal',
    },
  },
  outdir: 'styled-system',
});
