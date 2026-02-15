import React from 'react';
import type { LucideIcon } from 'lucide-react';
// Ensure styles are loaded if used directly, or rely on global imort

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  isLoading,
  className = '',
  disabled,
  ...props
}) => {
  // Styles moved to inline to avoid unused variable errors since we aren't using Tailwind classes directly in this version

  const getStyle = () => {
    let style: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius)',
      fontWeight: 500,
      transition: 'background-color 0.2s, color 0.2s',
      cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: disabled || isLoading ? 0.5 : 1,
    };

    if (size === 'sm') {
      style.height = '2rem';
      style.padding = '0 0.75rem';
      style.fontSize = '0.875rem';
    } else if (size === 'md') {
      style.height = '2.5rem';
      style.padding = '0 1rem';
      style.fontSize = '1rem';
    } else {
      style.height = '3rem';
      style.padding = '0 2rem';
      style.fontSize = '1.125rem';
    }

    if (variant === 'primary') {
      style.backgroundColor = 'var(--primary)';
      style.color = 'var(--primary-foreground)';
    } else if (variant === 'secondary') {
      style.backgroundColor = 'var(--secondary)';
      style.color = 'var(--secondary-foreground)';
    } else if (variant === 'outline') {
      style.border = '1px solid var(--border)';
      style.backgroundColor = 'transparent';
      style.color = 'var(--foreground)';
    } else if (variant === 'ghost') {
      style.backgroundColor = 'transparent';
      style.color = 'var(--foreground)';
    }

    return style;
  };

  return (
    <button
      style={getStyle()}
      className={className}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span style={{ marginRight: '0.5rem' }}>Loading...</span>
      ) : Icon ? (
        <Icon size={18} style={{ marginRight: children ? '0.5rem' : 0 }} />
      ) : null}
      {children}
    </button>
  );
};
