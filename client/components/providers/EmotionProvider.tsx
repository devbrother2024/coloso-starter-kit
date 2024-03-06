'use client';

import { ReactNode, useRef } from 'react';

import { cache } from '@emotion/css';
import { useServerInsertedHTML } from 'next/navigation';

export default function EmotionProvider({ children }: { children: ReactNode }) {
  const usedOnce = useRef(false);

  useServerInsertedHTML(() => {
    if (usedOnce.current) return;
    usedOnce.current = true;
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(' '),
        }}
      />
    );
  });

  return <>{children}</>;
}
