import { useCallback, useEffect, useRef, useState } from 'react';

import { useSnapshot } from 'valtio';

import headerStore from '@/store/header';

const useHeaderControl = () => {
  const targetNavRef = useRef<HTMLElement>(null);
  const [targetHeight, setTargetOffsetTop] = useState(0);
  const [lastScroll, setLastScroll] = useState(0);

  const {
    header: { headerHeight, targetOffset, freeze },
  } = useSnapshot(headerStore);

  const detectHeaderSticky = useCallback(() => {
    const { scrollY } = window;
    const isScrollUp = !freeze && scrollY < lastScroll;
    const isBelowTarget = scrollY > targetOffset;
    const isSticky = isScrollUp && isBelowTarget;
    const currentScroll = freeze ? 0 : scrollY;

    setLastScroll(currentScroll);
    headerStore.header.scrollY = scrollY;
    headerStore.header.isSticky = isSticky;
  }, [freeze, targetOffset, lastScroll]);

  useEffect(() => {
    if (!targetNavRef.current) return;
    const { addEventListener, removeEventListener } = window;
    addEventListener('scroll', detectHeaderSticky);

    return () => {
      removeEventListener('scroll', detectHeaderSticky);
    };
  }, [detectHeaderSticky]);

  useEffect(() => {
    if (!targetHeight) return;
    headerStore.header.targetOffset = targetHeight - headerHeight;
  }, [targetHeight, headerHeight]);

  return { targetNavRef, setTargetOffsetTop };
};

export default useHeaderControl;
