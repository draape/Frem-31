import NextImage from 'next/image';
import { css } from '@/styled-system/css';

type ImageProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export function Image({ src, alt, caption, width, height }: ImageProps) {
  const hasDimensions = width !== undefined && height !== undefined;

  return (
    <figure className={figure}>
      {hasDimensions ? (
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={img}
        />
      ) : (
        <div className={fillWrap}>
          <NextImage src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
        </div>
      )}
      {caption && <figcaption className={figcaption}>{caption}</figcaption>}
    </figure>
  );
}

const figure = css({
  display: 'block',
  my: '6',
});

const img = css({
  display: 'block',
  w: '100%',
  h: 'auto',
  borderRadius: 'xl',
});

const fillWrap = css({
  pos: 'relative',
  w: '100%',
  aspectRatio: '16/9',
  borderRadius: 'xl',
  overflow: 'hidden',
});

const figcaption = css({
  mt: '2',
  fontFamily: 'sans',
  fontSize: 'sm',
  color: 'grey.500',
  textAlign: 'center',
});
