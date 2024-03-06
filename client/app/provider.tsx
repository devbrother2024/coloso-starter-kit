'use client';

import { ReactNode, useEffect, useState } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SkeletonTheme } from 'react-loading-skeleton';

import EmotionProvider from '@/components/providers/EmotionProvider';
import queryClient from '@/utils/queryClient';

import '@/styles/styles.scss';
import 'normalize.css';
import 'swiper/css';
import 'react-loading-skeleton/dist/skeleton.css';
import '@/styles/layout/common.css';

interface TypeProvider {
  children: ReactNode;
}

const Provider = ({ children }: TypeProvider) => {
  const [qc] = useState(queryClient);

  return (
    <>
      <QueryClientProvider client={qc}>
        <SkeletonTheme baseColor="#222222" highlightColor="#272727" duration={2} borderRadius={10}>
          <EmotionProvider>{children}</EmotionProvider>
        </SkeletonTheme>
        <div style={{ fontSize: 16 }}>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </div>
      </QueryClientProvider>
    </>
  );
};
export default Provider;
