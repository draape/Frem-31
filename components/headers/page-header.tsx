import Image from 'next/image';
import { sva } from '@/styled-system/css';
import { Section } from '@/components/section';

type PageHeaderProps = {
  title: string;
  titleAccent?: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
};

export function PageHeader({ title, titleAccent, description, image }: PageHeaderProps) {
  const s = styles();
  const hasImage = !!image;

  return (
    <Section maxWidth="layout" padding="lg">
      {hasImage ? (
        <div className={s.grid}>
          <div className={s.textContainer}>
            <h1 className={s.title}>
              {title}
              {titleAccent && <span className={s.titleAccent}> {titleAccent}</span>}
            </h1>
            <p className={s.description}>{description}</p>
          </div>
          <div className={s.imageContainer}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      ) : (
        <div className={s.textContainer}>
          <h1 className={s.title}>
            {title}
            {titleAccent && <span className={s.titleAccent}> {titleAccent}</span>}
          </h1>
          <p className={s.description}>{description}</p>
        </div>
      )}
    </Section>
  );
}

const styles = sva({
  slots: ['grid', 'textContainer', 'title', 'titleAccent', 'description', 'imageContainer'],
  base: {
    grid: {
      display: 'flex',
      flexDir: 'column',
      gap: '8',
      md: {
        flexDir: 'row',
        gap: '8',
        alignItems: 'flex-end',
      },
    },
    textContainer: {
      display: 'flex',
      flexDir: 'column',
      gap: '4',
    },
    title: {
      textStyle: 'titleLg',
      color: 'grey.950',
      maxW: '35ch',
    },
    titleAccent: {
      color: 'yellow.500',
    },
    description: {
      textStyle: 'lead',
      color: 'grey.950',
      maxW: '50ch',
    },
    imageContainer: {
      position: 'relative',
      w: '100%',
      aspectRatio: '4/3',
      borderRadius: 'xl',
      overflow: 'hidden',
      md: {
        maxW: '50%',
      },
    },
  },
});
