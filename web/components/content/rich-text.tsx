import NextLink from 'next/link';
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from 'next-sanity';
import { css } from '@/styled-system/css';
import { Section } from '@/components/section';
import { resolveLink, type SanityLink } from '@/lib/sanity';

type RichTextProps = {
  content: PortableTextBlock[];
};

export function RichText({ content }: RichTextProps) {
  return (
    <Section maxWidth="content" padding="md">
      <div className={prose}>
        <PortableText value={content} components={components} />
      </div>
    </Section>
  );
}

type LinkMark = SanityLink & { _type: 'link'; _key: string };

function LinkAnnotation({ value, children }: PortableTextMarkComponentProps<LinkMark>) {
  const resolved = resolveLink(value);

  // A link whose target is gone (e.g. an unpublished page) reads as plain text.
  if (!resolved) {
    return <>{children}</>;
  }

  const newTabProps = resolved.newTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  if (value?.type === 'internal') {
    return (
      <NextLink href={resolved.href} className={link} {...newTabProps}>
        {children}
      </NextLink>
    );
  }

  return (
    <a href={resolved.href} className={link} {...newTabProps}>
      {children}
    </a>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={paragraph}>{children}</p>,
    title: ({ children }) => <h2 className={h2}>{children}</h2>,
    subtitle: ({ children }) => <h3 className={h3}>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className={unorderedList}>{children}</ul>,
    number: ({ children }) => <ol className={orderedList}>{children}</ol>,
  },
  listItem: ({ children }) => <li className={listItem}>{children}</li>,
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    'strike-through': ({ children }) => <s>{children}</s>,
    sup: ({ children }) => <sup>{children}</sup>,
    sub: ({ children }) => <sub>{children}</sub>,
    link: LinkAnnotation,
  },
};

const prose = css({
  display: 'flex',
  flexDir: 'column',
  gap: '4',
});

const paragraph = css({
  fontFamily: 'sans',
  fontSize: 'base',
  lineHeight: '1.7',
  color: 'grey.700',
});

const h2 = css({
  fontFamily: 'serif',
  fontSize: '2xl',
  fontWeight: 'bold',
  color: 'grey.950',
  lineHeight: '1.2',
  mt: '4',
});

const h3 = css({
  fontFamily: 'serif',
  fontSize: 'xl',
  fontWeight: 'bold',
  color: 'grey.950',
  lineHeight: '1.2',
  mt: '2',
});

const list = {
  fontFamily: 'sans',
  fontSize: 'base',
  lineHeight: '1.7',
  color: 'grey.700',
  pl: '6',
  display: 'flex',
  flexDir: 'column',
  gap: '1',
};

const unorderedList = css({
  ...list,
  listStyleType: 'disc',
});

const orderedList = css({
  ...list,
  listStyleType: 'decimal',
});

const listItem = css({
  listStyleType: 'inherit',
});

const link = css({
  fontFamily: 'sans',
  fontSize: 'base',
  color: 'blue.600',
  textDecoration: 'underline',
  _hover: { color: 'blue.800' },
});
