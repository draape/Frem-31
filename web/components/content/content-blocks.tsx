import { css } from '@/styled-system/css';
import { Section } from '@/components/section';
import { Card } from '@/components/content/card';
import { CardList } from '@/components/content/card-list';
import { Image } from '@/components/content/image';
import { RichText } from '@/components/content/rich-text';
import { Split } from '@/components/content/split';
import {
  resolveLink,
  sanityImage,
  type CardSectionBlock,
  type ContentBlock,
  type ImageSectionBlock,
  type SplitBlock,
  type TextBlock,
} from '@/lib/sanity';

type ContentBlocksProps = {
  blocks: ContentBlock[];
};

// Renders `page.content` in Studio order, each block through its component.
export function ContentBlocks({ blocks }: ContentBlocksProps) {
  return <>{blocks.map((block) => renderBlock(block))}</>;
}

function renderBlock(block: ContentBlock) {
  // `ContentBlock` includes a catch-all for unknown types, so `_type` doesn't
  // narrow the union on its own.
  switch (block._type) {
    case 'textBlock':
      return <TextBlockView key={block._key} block={block as TextBlock} />;
    case 'imageSection':
      return <ImageSectionView key={block._key} block={block as ImageSectionBlock} />;
    case 'split':
      return <SplitView key={block._key} block={block as SplitBlock} />;
    case 'cardSection':
      return <CardSectionView key={block._key} block={block as CardSectionBlock} />;
    default:
      return <DevPlaceholder key={block._key} label={`Unknown block: ${block._type}`} />;
  }
}

function TextBlockView({ block }: { block: TextBlock }) {
  return <RichText content={block.content ?? []} />;
}

function ImageSectionView({ block }: { block: ImageSectionBlock }) {
  // Same 16/9 box `Image` uses without dimensions, cropped around the hotspot.
  const image = sanityImage(block.image, { aspectRatio: 16 / 9 });
  if (!image) {
    return null;
  }

  return (
    <Section maxWidth="content" padding="sm">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        caption={block.caption ?? undefined}
      />
    </Section>
  );
}

function SplitView({ block }: { block: SplitBlock }) {
  const image = sanityImage(block.image, { aspectRatio: 4 / 3 });
  if (!image) {
    return <DevPlaceholder label="split without an image" />;
  }

  const link = block.cta?.label ? resolveLink(block.cta) : null;
  const cta =
    link && block.cta?.label
      ? { label: block.cta.label, href: link.href, external: link.newTab }
      : undefined;

  return (
    <Split
      kicker={block.kicker ?? undefined}
      title={block.title ?? ''}
      description={block.lead ?? undefined}
      image={{ src: image.src, alt: image.alt }}
      cta={cta}
      imageSide={block.imagePosition ?? 'left'}
    />
  );
}

function CardSectionView({ block }: { block: CardSectionBlock }) {
  // A card with no title of its own whose page is unpublished has nothing to show.
  const cards = (block.cards ?? []).filter((card) => card.title);
  if (cards.length === 0) {
    return null;
  }

  return (
    <CardList title={block.title ?? undefined}>
      {cards.map((card) => (
        <Card
          key={card._key}
          title={card.title ?? ''}
          description={card.description ?? undefined}
          link={
            card.href
              ? { label: 'Les mer', href: card.href, ariaLabel: `Les mer om ${card.title}` }
              : undefined
          }
        />
      ))}
    </CardList>
  );
}

// Visible in development so a missing mapping is noticed; nothing in production.
function DevPlaceholder({ label }: { label: string }) {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <Section maxWidth="content" padding="sm">
      <div className={placeholder}>{label}</div>
    </Section>
  );
}

const placeholder = css({
  p: '4',
  border: '2px dashed',
  borderColor: 'grey.300',
  borderRadius: 'lg',
  fontFamily: 'sans',
  fontSize: 'sm',
  color: 'grey.500',
});
