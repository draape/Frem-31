import { sva } from '@/styled-system/css';
import { Button } from '@/components/ui';
import { Section } from '@/components/section';

type CallToActionProps = {
  title: string;
  description?: string;
  cta: {
    label: string;
    href: string;
    external?: boolean;
  };
  variant?: 'blue' | 'yellow' | 'white';
};

export function CallToAction({ title, description, cta, variant = 'blue' }: CallToActionProps) {
  const s = styles({ variant });

  return (
    <Section maxWidth="layout" padding="lg">
      <div className={s.root}>
        <div className={s.textWrap}>
          <h2 className={s.title}>{title}</h2>
          {description && <p className={s.description}>{description}</p>}
        </div>
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
    </Section>
  );
}

const styles = sva({
  slots: ['root', 'textWrap', 'title', 'description', 'ctaWrap'],
  base: {
    root: {
      display: 'flex',
      flexDir: 'column',
      gap: '8',
      p: '8',
      borderRadius: 'lg',
      md: {
        gap: '8',
        p: '14',
      },
    },
    textWrap: {
      display: 'flex',
      flexDir: 'column',
      gap: '4',
    },
    title: {
      textStyle: 'titleLg',
      maxW: '30ch',
    },
    description: {
      textStyle: 'lead',
      maxW: '50ch',
    },
    ctaWrap: {
      flexShrink: '0',
    },
  },
  variants: {
    variant: {
      blue: {
        root: { bg: 'blue.800' },
        title: { color: 'white' },
        description: { color: 'blue.100' },
      },
      yellow: {
        root: { bg: 'yellow.400' },
        title: { color: 'blue.950' },
        description: { color: 'blue.800' },
      },
      white: {
        root: { bg: 'white' },
        title: { color: 'grey.950' },
        description: { color: 'grey.600' },
      },
    },
  },
  defaultVariants: {
    variant: 'blue',
  },
});
