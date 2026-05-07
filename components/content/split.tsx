import Image from 'next/image';
import { sva } from '@/styled-system/css';
import { Button } from '@/components/ui';
import { Section } from '@/components/section';

type SplitProps = {
  title: string;
  titleAccent?: string;
  description?: string;
  image: {
    src: string;
    alt: string;
  };
  cta: {
    label: string;
    href: string;
    external?: boolean;
  };
  imageSide?: 'left' | 'right';
  variant?: 'transparent' | 'white' | 'blue' | 'yellow';
};

export function Split({
  title,
  titleAccent,
  description,
  image,
  cta,
  imageSide = 'right',
  variant = 'transparent',
}: SplitProps) {
  const s = styles({ imageSide, variant });

  return (
    <Section maxWidth="layout" padding="lg" background={variant}>
      <div className={s.grid}>
        <div className={s.textContainer}>
          <h2 className={s.title}>
            {title}
            {titleAccent && <span className={s.titleAccent}> {titleAccent}</span>}
          </h2>
          {description && <p className={s.description}>{description}</p>}
          <div className={s.ctaWrap}>
            <Button
              variant={variant === 'blue' ? 'primary' : 'secondary'}
              href={cta.href}
              external={cta.external}
            >
              {cta.label}
            </Button>
          </div>
        </div>
        <div className={s.imageContainer}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </Section>
  );
}

const styles = sva({
  slots: ['grid', 'textContainer', 'title', 'titleAccent', 'description', 'ctaWrap', 'imageContainer'],
  base: {
    grid: {
      display: 'flex',
      flexDir: 'column',
      gap: '8',
      md: {
        flexDir: 'row',
        gap: '12',
        alignItems: 'center',
      },
    },
    textContainer: {
      display: 'flex',
      flexDir: 'column',
      gap: '5',
      flex: '1',
    },
    title: {
      textStyle: 'titleLg',
      maxW: '35ch',
    },
    titleAccent: {
      color: 'yellow.500',
    },
    description: {
      textStyle: 'lead',
      maxW: '50ch',
    },
    ctaWrap: {},
    imageContainer: {
      pos: 'relative',
      w: '100%',
      aspectRatio: '4/3',
      borderRadius: 'xl',
      overflow: 'hidden',
      md: {
        w: '50%',
        flexShrink: '0',
      },
    },
  },
  variants: {
    imageSide: {
      left: {
        grid: { md: { flexDir: 'row-reverse' } },
      },
      right: {
        grid: { md: { flexDir: 'row' } },
      },
    },
    variant: {
      transparent: {
        title: { color: 'grey.950' },
        description: { color: 'grey.600' },
      },
      white: {
        title: { color: 'grey.950' },
        description: { color: 'grey.600' },
      },
      blue: {
        title: { color: 'white' },
        titleAccent: { color: 'yellow.400' },
        description: { color: 'blue.100' },
      },
      yellow: {
        title: { color: 'blue.950' },
        description: { color: 'blue.800' },
      },
    },
  },
  defaultVariants: {
    imageSide: 'right',
    variant: 'transparent',
  },
});
