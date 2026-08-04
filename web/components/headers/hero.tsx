import { sva } from '@/styled-system/css';
import { Badge, Button } from '@/components/ui';
import { Section } from '@/components/section';

type HeroProps = {
  badge?: string;
  title: string;
  titleAccent?: string;
  description: string;
  primaryButton?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryButton?: {
    label: string;
    href: string;
  };
};

export function Hero({
  badge,
  title,
  titleAccent,
  description,
  primaryButton,
  secondaryButton,
}: HeroProps) {
  const s = style();

  return (
    <section className={s.root}>
      <div className={s.stripes}>&nbsp;</div>
      <Section maxWidth="layout" padding="lg">
        <div className={s.container}>
          {badge && <Badge>{badge}</Badge>}

          <h1 className={s.title}>
            {title}
            {titleAccent && <span className={s.titleAccent}> {titleAccent}</span>}
          </h1>

          <p className={s.description}>{description}</p>

          {(primaryButton || secondaryButton) && (
            <div className={s.buttonGroup}>
              {primaryButton && (
                <Button
                  variant="primary"
                  href={primaryButton.href}
                  external={primaryButton.external}
                >
                  {primaryButton.label}
                </Button>
              )}
              {secondaryButton && (
                <Button variant="outlined" href={secondaryButton.href}>
                  {secondaryButton.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Section>
    </section>
  );
}

const style = sva({
  slots: ['root', 'stripes', 'container', 'title', 'titleAccent', 'description', 'buttonGroup'],
  base: {
    root: {
      bg: 'blue.800',
      width: '100%',
      pos: 'relative',
    },
    stripes: {
      pos: 'absolute',
      background:
        'repeating-linear-gradient(135deg, var(--colors-yellow-400) 0px, var(--colors-yellow-400) 2px, transparent 2px, transparent 40px)',
      opacity: 0.1,
      w: '100%',
      h: '100%',
      pointerEvents: 'none',
    },
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: '6',
    },
    title: {
      textStyle: 'titleLg',
      color: 'white',
      md: {
        textStyle: 'hero',
      },
    },
    titleAccent: {
      color: 'yellow.500',
    },
    description: {
      textStyle: 'lead',
      color: 'white',
      maxWidth: '40rem',
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
      sm: {
        flexDirection: 'row',
      },
    },
  },
});
