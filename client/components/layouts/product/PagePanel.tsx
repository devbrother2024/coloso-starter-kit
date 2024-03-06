'use client';

import { useEffect } from 'react';

import { cx } from '@emotion/css';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';

import Button from '@/components/elements/Button';
import useAuth from '@/hooks/client/useAuth';
import useTranslation from '@/hooks/client/useTranslation';
import { catalogStore, setCatalogStore } from '@/store/catalog';
import i18nStore from '@/store/i18n';
import { debounce } from '@/utils/debounce';

import PagePanelText from './PagePanelText';

const PagePanel = () => {
  const router = useRouter();
  const { isAuthorized } = useAuth();
  const t = useTranslation({ scope: 'PageCover' });

  const { page, isFloating, isPanelHidden } = useSnapshot(catalogStore);
  const {
    promotionBadgeText = null,
    promotionBadgeShow = false,
    promotionBadgeHideAfterOpeningCourse = false,
  } = page.extras ?? {};

  const isValidBadge = promotionBadgeShow && !!promotionBadgeText;
  const isHiddenBadgeAfterOpeningCourse = promotionBadgeHideAfterOpeningCourse;

  const goToPurchase = () => {
    const { lang } = i18nStore;
    const { product } = catalogStore;
    if (!product) return;
    if (!isAuthorized) return router.push(`/${lang}/sign-in`);
    router.push(`/${lang}/purchase/12312412`);
  };

  useEffect(() => {
    const { addEventListener, removeEventListener } = window;

    const watchingScroll = () => {
      debounce(() => {
        const { scrollY, screen } = window;
        const screenBottom = scrollY + screen.height;
        const footerTop = document.getElementById('footer')?.offsetTop ?? 0;

        const purchasePanelTrigger =
          document.getElementById('purchase-panel-trigger')?.getBoundingClientRect().top ?? 0;

        const isPanelHidden = screenBottom > footerTop;
        const isFloating = purchasePanelTrigger < 0 && !isPanelHidden;
        setCatalogStore({ isFloating, isPanelHidden });
      });
    };

    addEventListener('scroll', watchingScroll);
    addEventListener('resize', watchingScroll);

    return () => {
      removeEventListener('scroll', watchingScroll);
      removeEventListener('resize', watchingScroll);
    };
  }, []);

  return (
    <div
      className={cx('catalog-panel', {
        'catalog-panel--floating': isFloating,
        'catalog-panel--hidden': isPanelHidden,
      })}
    >
      <PagePanelText />
      <Button
        className={cx('catalog-panel__btn', {
          'catalog-panel__btn--floating': isFloating,
        })}
        callback={goToPurchase}
      >
        <span
          className={cx('catalog-panel__badge', {
            'catalog-panel__badge--floating': isFloating,
            'catalog-panel__badge--valid': isValidBadge,
          })}
          data-badge={!isHiddenBadgeAfterOpeningCourse && promotionBadgeText}
        >
          {t('PurchaseBestPrice')}
        </span>
      </Button>
    </div>
  );
};

export default PagePanel;
