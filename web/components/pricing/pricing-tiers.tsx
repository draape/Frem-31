import { Check } from '@phosphor-icons/react/dist/ssr';
import { sva, css } from '@/styled-system/css';
import { Section } from '@/components/section';
import { Button } from '@/components/ui';

type Tier = {
  name: string;
  price: string;
  description?: string;
  features?: string[];
  cta?: { label: string; href: string };
  highlighted?: boolean;
};

type PricingTiersProps = {
  tiers: Tier[];
};

export function PricingTiers({ tiers }: PricingTiersProps) {
  return (
    <Section maxWidth="layout" padding="lg">
      <div className={grid}>
        {tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>
    </Section>
  );
}

const grid = css({
  display: 'grid',
  gap: '6',
  gridTemplateColumns: '1fr',
  md: { gridTemplateColumns: 'repeat(3, 1fr)' },
});

function TierCard({ tier }: { tier: Tier }) {
  const s = tierStyles({ highlighted: !!tier.highlighted });

  return (
    <div className={s.root}>
      <div className={s.header}>
        <p className={s.name}>{tier.name}</p>
        <p className={s.price}>{tier.price}</p>
        {tier.description && <p className={s.description}>{tier.description}</p>}
      </div>

      {tier.features && tier.features.length > 0 && (
        <ul className={s.features}>
          {tier.features.map((feature) => (
            <li key={feature} className={s.featureItem}>
              <span className={s.checkIcon}>
                <Check size={14} weight="bold" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {tier.cta && (
        <div className={s.ctaWrap}>
          <Button
            variant={tier.highlighted ? 'primary' : 'secondary'}
            href={tier.cta.href}
          >
            {tier.cta.label}
          </Button>
        </div>
      )}
    </div>
  );
}

const tierStyles = sva({
  slots: ['root', 'header', 'name', 'price', 'description', 'features', 'featureItem', 'checkIcon', 'ctaWrap'],
  base: {
    root: {
      display: 'flex',
      flexDir: 'column',
      gap: '6',
      p: '8',
      bg: 'white',
      border: '2px solid',
      borderColor: 'grey.200',
      borderRadius: 'xl',
      h: '100%',
    },
    header: {
      display: 'flex',
      flexDir: 'column',
      gap: '2',
    },
    name: {
      fontFamily: 'sans',
      fontSize: 'sm',
      fontWeight: 'semibold',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'grey.500',
    },
    price: {
      fontFamily: 'serif',
      fontSize: '3xl',
      fontWeight: 'bold',
      color: 'grey.950',
      lineHeight: '1.1',
    },
    description: {
      fontFamily: 'sans',
      fontSize: 'sm',
      color: 'grey.500',
      lineHeight: '1.6',
    },
    features: {
      display: 'flex',
      flexDir: 'column',
      gap: '3',
      flex: '1',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '2',
      fontFamily: 'sans',
      fontSize: 'sm',
      color: 'grey.700',
      lineHeight: '1.5',
    },
    checkIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      w: '5',
      h: '5',
      borderRadius: 'full',
      bg: 'blue.100',
      color: 'blue.700',
      flexShrink: '0',
      mt: '0.5',
    },
    ctaWrap: {
      mt: 'auto',
    },
  },
  variants: {
    highlighted: {
      true: {
        root: {
          borderColor: 'yellow.400',
          bg: 'yellow.50',
        },
        name: {
          color: 'blue.700',
        },
      },
      false: {},
    },
  },
});
