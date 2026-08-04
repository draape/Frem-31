import { css, cx } from '@/styled-system/css';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

const baseStyles = css({
  textStyle: 'tag',
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 'full',
  px: '4',
  py: '2',
  textTransform: 'uppercase',
  bg: 'yellow.400',
  color: 'blue.800',
});

export function Badge({ children, className }: BadgeProps) {
  return <span className={cx(baseStyles, className)}>{children}</span>;
}
