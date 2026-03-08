import { css } from '@/styled-system/css/css';

const sectionStyles = css({
  backgroundColor: 'blue.100',
});

export function Section({ children }: { children: React.ReactNode }) {
  return <section className={sectionStyles}>{children}</section>;
}
