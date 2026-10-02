import React from 'react';

interface FarabiLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const FarabiLogo: React.FC<FarabiLogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
}) => {
  const isLight = variant === 'light';
  const logoSrc = isLight ? '/images/faraabee_logo_light.svg' : '/images/faraabee_logo.svg';

  // Restored to exact original dimensions:
  // sm: 42px, md: 56px, lg: 88px, xl: 120px
  const dimensions = {
    sm: { height: 42 },
    md: { height: 56 },
    lg: { height: 88 },
    xl: { height: 120 },
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{ lineHeight: 1 }}
    >
      <img
        src={logoSrc}
        alt="FARAABEE Logo"
        style={{ height: dimensions.height, width: 'auto' }}
        className="object-contain transition-transform"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
