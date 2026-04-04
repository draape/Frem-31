'use client';

import { useState } from 'react';
import { css } from '@/styled-system/css';
import { calendarConfig } from '@/lib/constants/calendar';

const containerStyles = css({
  width: '100%',
  minHeight: '800px',
  position: 'relative',
  overflowX: 'auto',
  sm: {
    minHeight: '600px',
  },
});

const iframeStyles = css({
  width: '100%',
  height: '100%',
  minHeight: '800px',
  minWidth: '320px',
  border: 'none',
  borderRadius: '8px',
  sm: {
    minHeight: '600px',
  },
});

const fallbackStyles = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '400px',
  backgroundColor: 'grey.100',
  borderRadius: '8px',
  padding: '32px',
  textAlign: 'center',
});

const fallbackTextStyles = css({
  fontSize: 'base',
  color: 'grey.600',
  marginBottom: '16px',
});

const fallbackLinkStyles = css({
  color: 'primary',
  textDecoration: 'underline',
  _hover: {
    color: 'blue.600',
  },
});

const loadingStyles = css({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'grey.100',
  borderRadius: '8px',
});

export function CalendarEmbed() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={fallbackStyles}>
        <p className={fallbackTextStyles}>{calendarConfig.fallbackMessage}</p>
        <a
          href={calendarConfig.fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={fallbackLinkStyles}
        >
          Gå til EasyPlay
        </a>
      </div>
    );
  }

  return (
    <div className={containerStyles}>
      {isLoading && (
        <div className={loadingStyles}>
          <p>Laster kalender...</p>
        </div>
      )}
      <iframe
        src={calendarConfig.embedUrl}
        className={iframeStyles}
        onLoad={handleLoad}
        onError={handleError}
        title="Banekalender - Frembanen"
        allowFullScreen
      />
    </div>
  );
}
