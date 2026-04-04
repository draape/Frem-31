import { ark } from '@ark-ui/react';
import { sva, cx } from '@/styled-system/css';
import type { ReactNode } from 'react';

const buttonStyles = sva({
  slots: ['root'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'md',
      fontWeight: 'semibold',
      fontSize: 'sm',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      border: 'none',
      textDecoration: 'none',
      outline: 'none',
      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
      _focus: {
        outline: '2px solid',
        outlineColor: 'blue.300',
        outlineOffset: '2px',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        root: {
          bg: 'yellow.400',
          color: 'blue.800',
          _hover: { bg: 'yellow.200' },
          _active: { bg: 'yellow.200' },
        },
      },
      secondary: {
        root: {
          bg: 'blue.500',
          color: 'white',
          _hover: { bg: 'blue.600' },
          _active: { bg: 'blue.700' },
        },
      },
      outlined: {
        root: {
          bg: 'transparent',
          border: '2px solid',
          borderColor: 'gray.50',
          color: 'gray.50',
          _hover: { bg: 'blue.200/40' },
          _active: { bg: 'blue.200/40' },
        },
      },
    },
    size: {
      sm: { root: { px: '6', height: '36px' } },
      md: { root: { px: '8', height: '45px' } },
      lg: { root: { px: '10', height: '52px' } },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  external,
  onClick,
  disabled,
  type = 'button',
  className,
}: ButtonProps) {
  const styles = buttonStyles({ variant, size });

  if (href) {
    return (
      <ark.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cx(styles.root, className)}
        aria-disabled={disabled}
      >
        {children}
      </ark.a>
    );
  }

  return (
    <ark.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(styles.root, className)}
    >
      {children}
    </ark.button>
  );
}
