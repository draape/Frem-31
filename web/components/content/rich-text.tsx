import NextLink from 'next/link';
import { css } from '@/styled-system/css';
import { Section } from '@/components/section';
import { Image } from '@/components/content/image';

type InlineChild = {
  text: string;
  marks?: ('strong' | 'em' | 'underline')[];
};

export type RichTextNode =
  | { type: 'paragraph'; children: InlineChild[] }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; style: 'bullet' | 'number'; items: string[] }
  | { type: 'link'; href: string; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string; width?: number; height?: number };

type RichTextProps = {
  content: RichTextNode[];
};

export function RichText({ content }: RichTextProps) {
  return (
    <Section maxWidth="content" padding="md">
      <div className={prose}>{content.map((node, i) => renderNode(node, i))}</div>
    </Section>
  );
}

function renderNode(node: RichTextNode, key: number) {
  switch (node.type) {
    case 'paragraph':
      return (
        <p key={key} className={paragraph}>
          {node.children.map((child, j) => renderInline(child, j))}
        </p>
      );

    case 'heading':
      return node.level === 2 ? (
        <h2 key={key} className={h2}>
          {node.text}
        </h2>
      ) : (
        <h3 key={key} className={h3}>
          {node.text}
        </h3>
      );

    case 'list':
      return node.style === 'bullet' ? (
        <ul key={key} className={unorderedList}>
          {node.items.map((item, j) => (
            <li key={j} className={listItem}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <ol key={key} className={orderedList}>
          {node.items.map((item, j) => (
            <li key={j} className={listItem}>
              {item}
            </li>
          ))}
        </ol>
      );

    case 'link':
      return (
        <p key={key} className={paragraph}>
          <NextLink href={node.href} className={link}>
            {node.text}
          </NextLink>
        </p>
      );

    case 'image':
      return (
        <Image
          key={key}
          src={node.src}
          alt={node.alt}
          caption={node.caption}
          width={node.width}
          height={node.height}
        />
      );
  }
}

function renderInline(child: InlineChild, key: number) {
  let el: React.ReactNode = child.text;
  if (child.marks?.includes('strong')) el = <strong key={`s-${key}`}>{el}</strong>;
  if (child.marks?.includes('em')) el = <em key={`e-${key}`}>{el}</em>;
  if (child.marks?.includes('underline')) el = <u key={`u-${key}`}>{el}</u>;
  return el;
}

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
