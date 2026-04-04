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

const pageHeaderStyles = sva({
  slots: ['grid', 'textContainer', 'title', 'titleAccent', 'description', 'imageContainer'],
  base: {
    grid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8',
      md: {
        flexDirection: 'row',
        gap: '8',
        alignItems: 'flex-end',
      },
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
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
      width: '100%',
      maxW: '50%',
      aspectRatio: '4/3',
      borderRadius: 'xl',
      overflow: 'hidden',
    },
  },
});

export function PageHeader({ title, titleAccent, description, image }: PageHeaderProps) {
  const styles = pageHeaderStyles();
  const hasImage = !!image;

  return (
    <Section maxWidth="layout" padding="lg">
      {hasImage ? (
        <div className={styles.grid}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>
              {title}
              {titleAccent && <span className={styles.titleAccent}> {titleAccent}</span>}
            </h1>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.imageContainer}>
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
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            {title}
            {titleAccent && <span className={styles.titleAccent}> {titleAccent}</span>}
          </h1>
          <p className={styles.description}>{description}</p>
        </div>
      )}
    </Section>
  );
}
