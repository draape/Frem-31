import { cva, cx } from '@/styled-system/css';

const styles = cva({
  base: {
    width: '100%',
    marginX: 'auto',
    px: '6',
  },
  variants: {
    maxWidth: {
      content: { maxWidth: '800px' },
      layout: { maxWidth: '1280px' },
    },
    padding: {
      none: { py: '0' },
      sm: { py: '8' },
      md: { py: '12' },
      lg: { py: '16' },
    },
    background: {
      transparent: { bg: 'transparent' },
      white: { bg: 'white' },
      blue: { bg: 'blue.100' },
      yellow: { bg: 'yellow.100' },
    },
  },
  defaultVariants: {
    maxWidth: 'layout',
    padding: 'none',
    background: 'transparent',
  },
});

type SectionProps = {
  maxWidth?: 'content' | 'layout';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'transparent' | 'white' | 'blue' | 'yellow';
  children: React.ReactNode;
  className?: string;
};

export function Section({ maxWidth, padding, background, children, className }: SectionProps) {
  return (
    <div className={cx(styles({ maxWidth: maxWidth, padding, background }), className)}>
      {children}
    </div>
  );
}
