import { css } from '@/styled-system/css';

type MapEmbedProps = {
  src: string;
  title: string;
};

// A Google Maps embed in the same 16/9 box `Image` uses without dimensions.
export function MapEmbed({ src, title }: MapEmbedProps) {
  return (
    <figure className={figure}>
      <iframe
        src={src}
        title={title}
        className={iframe}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </figure>
  );
}

const figure = css({
  display: 'block',
  w: '100%',
  aspectRatio: '16/9',
  my: '6',
  borderRadius: 'xl',
  overflow: 'hidden',
});

const iframe = css({
  display: 'block',
  w: '100%',
  h: '100%',
  border: 'none',
});
