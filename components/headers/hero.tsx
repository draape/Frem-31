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

const heroStyles = sva({
  slots: ['root', 'container', 'title', 'titleAccent', 'description', 'buttonGroup'],
  base: {
    root: {
      backgroundColor: 'blue.800',
      width: '100%',
    },
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: '6', // 1.5rem
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

export function Hero({
  badge,
  title,
  titleAccent,
  description,
  primaryButton,
  secondaryButton,
}: HeroProps) {
  const styles = heroStyles();

  return (
    <section className={styles.root}>
      <Section maxWidth="layout" padding="lg">
        <div className={styles.container}>
          {badge && <Badge>{badge}</Badge>}

          <h1 className={styles.title}>
            {title}
            {titleAccent && <span className={styles.titleAccent}> {titleAccent}</span>}
          </h1>

          <p className={styles.description}>{description}</p>

          {(primaryButton || secondaryButton) && (
            <div className={styles.buttonGroup}>
              {primaryButton && (
                <Button variant="primary" href={primaryButton.href} external={primaryButton.external}>
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
