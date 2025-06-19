'use client';
import { useEffect, useRef, useState } from 'react';

import { cx } from '@emotion/css';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useSnapshot } from 'valtio';

import Link from '@/components/elements/Link';
import Stub from '@/components/elements/Stub';
import HeaderSelector from '@/components/modules/common/HeaderSelector';
import SearchInput from '@/components/modules/common/SearchInput';
import useTranslation from '@/hooks/client/useTranslation';
import { isActiveModal } from '@/policy/dialog';
import { classroomStore } from '@/store/classroom';
import commonStore from '@/store/common';
import headerStore, { initialHeaderState } from '@/store/header';
import { a11y } from '@/styles/variables.style';

import Navigation from './Navigation';
import HeaderTheme from './themes/Header.theme';

interface TypeHeader {
  className?: string;
}

const Account = dynamic(() => import('@/components/modules/common/Account'), { ssr: false });

const Header = ({ className }: TypeHeader) => {
  const pathname = usePathname();
  const { isSearchPath } = useSnapshot(commonStore);
  const {
    header: { isSticky, targetOffset, scrollY, headerHeight },
  } = useSnapshot(headerStore);
  const {
    ui: { menu: isShowClassroomMenu },
  } = useSnapshot(classroomStore);
  const [activeNavigation, setActiveNavigation] = useState(false);
  const [activeSearchInput, setActiveSearchInput] = useState(false);

  const t = useTranslation({ scope: 'SiteGlobal' });

  const headerRef = useRef<HTMLHeadElement>(null);

  const headerRatio = ((scrollY - targetOffset) / headerHeight) * 100;
  const headerView = headerRatio > 0 && headerRatio < 100;

  const headerTransform = {
    transform: headerView ? `translateY(-${headerRatio}%)` : `translateY(-${headerHeight}px)`,
    transitionDuration: headerView ? '0s' : null,
    transitionDelay: headerView ? '0s' : null,
  };
  const headerStyle = isSticky || headerRatio <= 0 ? {} : headerTransform;

  const onChangeSearchInputState = (state: boolean) => {
    setActiveSearchInput(state);
  };

  const onChangeNavigationState = (state: boolean) => {
    setActiveNavigation(state);
  };

  useEffect(() => {
    return () => {
      headerStore.header = { ...initialHeaderState };
    };
  }, [pathname]);

  useEffect(() => {
    setActiveNavigation(false);
  }, [pathname]);

  useEffect(() => {
    if (!headerRef.current) return;
    headerStore.header.headerHeight = headerRef.current.offsetHeight;
  }, []);

  useEffect(() => {
    if (pathname?.includes('search')) {
      commonStore.isSearchPath = true;
    }

    return () => {
      commonStore.isSearchPath = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (activeNavigation) {
      headerStore.header.isSticky = true;
    }
  }, [isSticky, activeNavigation]);

  useEffect(() => {
    const { classList } = document.body;

    if (activeNavigation || activeSearchInput) {
      classList.add(isActiveModal);
    } else {
      classList.remove(isActiveModal);
    }
  }, [activeNavigation, activeSearchInput]);

  return (
    <header
      className={cx(HeaderTheme.container, className, { 'is--classroom': !isShowClassroomMenu })}
      style={headerStyle}
      ref={headerRef}
    >
      <section className={HeaderTheme.layout}>
        <h1 className={HeaderTheme.logo({ activeSearchInput, isSearchPath })}>
          <span className={a11y}>{t('SiteTitle')}</span>

          <Link href="/" ariaLabel={t('Description')}>
            <Stub size={'152x36'} />
          </Link>
        </h1>

        <SearchInput activeSearchInput={activeSearchInput} onActiveState={onChangeSearchInputState} />

        <Account activeNavigation={activeNavigation} activeSearchInput={activeSearchInput} />

        <HeaderSelector activeSearchInput={activeSearchInput} />
      </section>

      <Navigation
        activeNavigation={activeNavigation}
        activeSearchInput={activeSearchInput}
        onActiveState={onChangeNavigationState}
      />
    </header>
  );
};

export default Header;
