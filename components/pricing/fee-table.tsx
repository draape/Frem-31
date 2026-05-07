import { css } from '@/styled-system/css';
import { Section } from '@/components/section';

type FeeRow = {
  label: string;
  price: string;
  note?: string;
};

type FeeGroup = {
  title: string;
  rows: FeeRow[];
};

type FeeTableProps = {
  groups: FeeGroup[];
};

export function FeeTable({ groups }: FeeTableProps) {
  return (
    <Section maxWidth="content" padding="md">
      <table className={table}>
        <thead>
          <tr>
            <th className={colHeader}>Aktivitet</th>
            <th className={colHeader} style={{ textAlign: 'right' }}>Pris</th>
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.title}>
            <tr>
              <td colSpan={2} className={groupHeading}>
                {group.title}
              </td>
            </tr>
            {group.rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? rowEven : rowOdd}>
                <td className={cell}>
                  {row.label}
                  {row.note && <span className={note}>{row.note}</span>}
                </td>
                <td className={cellPrice}>{row.price}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </Section>
  );
}

const table = css({
  w: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'sans',
  fontSize: 'sm',
});

const colHeader = css({
  pb: '3',
  fontWeight: 'semibold',
  fontSize: 'xs',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'grey.400',
  borderBottom: '2px solid',
  borderColor: 'grey.200',
  textAlign: 'left',
});

const groupHeading = css({
  pt: '8',
  pb: '2',
  fontFamily: 'serif',
  fontSize: 'lg',
  fontWeight: 'bold',
  color: 'grey.950',
});

const rowBase = css({
  borderBottom: '1px solid',
  borderColor: 'grey.100',
});

const rowEven = css(rowBase, {
  bg: 'transparent',
});

const rowOdd = css(rowBase, {
  bg: 'grey.50',
});

const cell = css({
  py: '3',
  pr: '4',
  color: 'grey.700',
  lineHeight: '1.4',
  verticalAlign: 'top',
});

const cellPrice = css({
  py: '3',
  color: 'grey.950',
  fontWeight: 'semibold',
  whiteSpace: 'nowrap',
  textAlign: 'right',
  verticalAlign: 'top',
});

const note = css({
  display: 'block',
  fontSize: 'xs',
  color: 'grey.400',
  mt: '0.5',
});
