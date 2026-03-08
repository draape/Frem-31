import { css } from '@/styled-system/css';
import type { NavigationItem } from '@/lib/types';

interface ButtonProps {
  item?: NavigationItem;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: 'primary' | 'accent';
  className?: string;
}

const baseButtonStyles = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  borderRadius: '9999px',
  fontWeight: '600',
  fontSize: '14px',
  textDecoration: 'none',
  cursor: 'pointer',
  border: 'none',
  transition: 'all 0.2s ease',
});

const primaryStyles = css({
  backgroundColor: 'blue.500',
  color: 'white',
  _hover: {
    backgroundColor: 'blue.600',
  },
});

const accentStyles = css({
  backgroundColor: 'yellow.500',
  color: 'grey.900',
  _hover: {
    backgroundColor: 'yellow.400',
  },
});

export function Button({ item, onClick, children, variant = 'accent', className }: ButtonProps) {
  const content = children ?? item?.label;
  const variantStyles = variant === 'primary' ? primaryStyles : accentStyles;

  if (item?.external && item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseButtonStyles} ${variantStyles} ${className ?? ''}`}
      >
        {content}
      </a>
    );
  }

  if (item?.href) {
    return (
      <a href={item.href} className={`${baseButtonStyles} ${variantStyles} ${className ?? ''}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseButtonStyles} ${variantStyles} ${className ?? ''}`}>
      {content}
    </button>
  );
}

export { baseButtonStyles, primaryStyles, accentStyles };
