import React, { CSSProperties } from 'react';

interface TypeLoader {
  primary: string;
  response: string;
  background: string;
}

const Loader = ({ primary = '50vh', response = '30vh', background = 'transparent' }: Partial<TypeLoader>) => {
  return (
    <i
      className="content-loader"
      style={
        {
          '--primary-ratio': primary,
          '--response-ratio': response,
          backgroundColor: background,
        } as CSSProperties & {
          '--primary-ratio': string;
          '--response-ratio': string;
        }
      }
    >
      <svg width="40" height="8">
        <circle cx="4" cy="50%" r="4" fill={'rgba(255, 178, 0, 0.7)'} />
        <circle cx="50%" cy="50%" r="4" fill={'rgba(255, 178, 0, 0.7)'} />
        <circle cx="36" cy="50%" r="4" fill={'rgba(255, 178, 0, 0.7)'} />
      </svg>
    </i>
  );
};

export default Loader;
