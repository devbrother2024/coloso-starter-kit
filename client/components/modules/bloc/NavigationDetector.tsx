'use client';

import { useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import commonStore from '@/store/common';

const NavigationDetector = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    commonStore.appURL = `${pathname}?${searchParams}`;
  }, [pathname, searchParams]);

  return <></>;
};

export default NavigationDetector;
