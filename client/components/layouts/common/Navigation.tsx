'use client';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import { useSnapshot } from 'valtio';
import { proxyMap } from 'valtio/utils';

import { getBanners } from '@/apis/banner';
import { getDisplayCategories } from '@/apis/display';
import { getGlobalNavigation } from '@/apis/operation';
import { IconCloseBlack, IconMenu } from '@/assets/icons';
import Link from '@/components/elements/Link';
import LanguageSelector from '@/components/modules/common/LanguageSelector';
import useAuth from '@/hooks/client/useAuth';
import useTranslation from '@/hooks/client/useTranslation';
import { bannerType } from '@/policy/banner';
import { queryKey } from '@/policy/queryKey';
import categoryStore from '@/store/category';
import commonStore from '@/store/common';
import i18nStore from '@/store/i18n';
import { cssSkeleton, cssSkeletonNavPromotion } from '@/styles/utils/Skeleton.style';
import { a11y } from '@/styles/variables.style';
import { TypeDisplay } from '@/types/display';
import { TypeNavigationItem } from '@/types/operation';
import { composeCategory, filterHideCategory } from '@/utils/category';

import NavigationTheme from './themes/Navigation.theme';

interface TypeNavigation {
  activeSearchInput: boolean;
  activeNavigation: boolean;
  onActiveState: (state: boolean) => void;
}

interface TypeCategoryItem {
  items: TypeNavigationItem[];
  isMobileHeaderMenu?: boolean;
}

const SignOut = dynamic(() => import('@/components/modules/common/SignOut'), { ssr: false });

const PromotionCategoryList = ({ items, isMobileHeaderMenu }: TypeCategoryItem) => {
  const pathname = usePathname();

  const persistScroll = (url: string) => {
    const [target] = url.split('?');
    return !pathname.includes(target);
  };

  return (
    <>
      {items?.map((item, index) => {
        const { focusStyle, titleLink, title, focusImage, linkTarget } = item;
        return (
          <li key={index} className={NavigationTheme.promotionItem({})}>
            <Link
              className={NavigationTheme.promotionItemLink({
                focusStyle,
                focusImage: !!focusImage,
              })}
              href={titleLink}
              target={linkTarget ? '_blank' : ''}
              scroll={persistScroll(titleLink)}
            >
              {isMobileHeaderMenu ? title : <strong>{title}</strong>}
            </Link>
          </li>
        );
      })}
    </>
  );
};

const Navigation = ({ activeSearchInput, activeNavigation, onActiveState }: TypeNavigation) => {
  const pathname = usePathname();
  const { isAuthorized } = useAuth();
  const { lang } = useSnapshot(i18nStore);
  const segment = useSelectedLayoutSegment();
  const currentCategoryId = Number(segment);
  const { isSearchPath } = useSnapshot(commonStore);
  const { categoryMap } = useSnapshot(categoryStore);
  const [targetCategoryId, setTargetCategoryId] = useState(0);
  const [filteredCategories, setFilteredCategories] = useState<TypeDisplay[]>([]);

  const t = useTranslation();

  const { data: categories } = useQuery({
    queryKey: [queryKey.DISPLAY_CATEGORY, { language: lang }],
    queryFn: () => getDisplayCategories({ language: lang }),
    placeholderData: [],
  });

  const { data: navigations, isFetched } = useQuery({
    queryKey: [queryKey.GLOBAL_NAVIGATION, { language: lang }],
    queryFn: () => getGlobalNavigation({ language: lang }),
    placeholderData: [],
  });

  const { data: navigationCoverBanner } = useQuery({
    queryKey: [queryKey.GLOBAL_NAVIGATION_COVER, { language: lang }],
    queryFn: () => getBanners({ type: bannerType.NAVIGATION_COVER, language: lang }),
    placeholderData: {},
  });

  const [navigationCover] = navigationCoverBanner?.NAVIGATION_COVER ?? [];

  const navigationCoverTitle = navigationCover?.subtitle?.replace(/\|/g, '');
  const promotionPublicItems = navigations?.filter((nav: TypeNavigationItem) => nav.publicItem);

  const isMain = pathname === `/${lang}`;

  const onToggleMenu = () => {
    onActiveState(!activeNavigation);
  };

  useEffect(() => {
    categoryStore.categoryMap = proxyMap(composeCategory(categories));
  }, [categories]);

  useEffect(() => {
    if (!categories?.length) return;
    const validCategories = filterHideCategory(categories);
    setFilteredCategories(validCategories);

    const categoryMapData = categoryMap.get(currentCategoryId);

    if (categoryMapData) {
      const categoryMapDataId = categoryMapData.parent?.id ?? categoryMapData.id;
      return setTargetCategoryId(categoryMapDataId);
    }

    const [initialPrimaryCategory] = validCategories;
    setTargetCategoryId(initialPrimaryCategory.id);

    return () => setTargetCategoryId(0);
  }, [categories, categoryMap, currentCategoryId]);

  return (
    <nav className={NavigationTheme.container({ activeSearchInput, activeNavigation })}>
      <h2 className={a11y}>Starter Kit Menu</h2>

      <menu className={NavigationTheme.category({ activeNavigation })}>
        <li className={NavigationTheme.promotionListWrapper}>
          <ul className={NavigationTheme.promotionList}>
            <PromotionCategoryList items={promotionPublicItems} />
          </ul>
        </li>

        <li>
          <details className={NavigationTheme.categoryContainer} onClick={(e) => e.preventDefault()} open>
            <summary className={NavigationTheme.categoryMenu({ activeSearchInput })}>
              <i className={NavigationTheme.categoryMenuIcon}>
                <IconMenu />
              </i>
              <strong className={NavigationTheme.categoryMenuText}>{t('QuickLink', { scope: 'PageSystem' })}</strong>
            </summary>

            <ul className={NavigationTheme.categoryList}>
              {filteredCategories.map((primaryCategory) => {
                const { id, title, children: secondaryCategories } = primaryCategory;
                return (
                  <li key={id} className={NavigationTheme.primaryCategory}>
                    <details
                      open
                      onClick={(e) => {
                        e.preventDefault();
                        setTargetCategoryId(id);
                      }}
                      data-open={id === targetCategoryId}
                    >
                      <summary className={NavigationTheme.primaryCategoryTitle}>{title}</summary>
                      <ul className={NavigationTheme.primaryCategoryList}>
                        <li className={NavigationTheme.categoryItem({ isPrimary: true })}>
                          <Link href={`/category/${id}`}>
                            <span data-show-all={t('ShowAll', { scope: 'GlobalNavigation' })}>{title}</span>
                          </Link>
                        </li>

                        {secondaryCategories?.map((secondaryCategory) => {
                          const { id, title } = secondaryCategory;
                          return (
                            <li className={NavigationTheme.categoryItem({})} key={id}>
                              <Link href={`/category/${id}`}>{title}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  </li>
                );
              })}

              {navigationCover?.assets?.DESKTOP && (
                <li className={NavigationTheme.banner}>
                  <Link href={navigationCover.targetUrl ?? '/'} target={navigationCover.targetWindow}>
                    <Image
                      src={navigationCover.assets.DESKTOP[0].url}
                      loading="lazy"
                      width={256}
                      height={256}
                      alt={navigationCoverTitle ?? ''}
                    />
                  </Link>
                </li>
              )}

              <LanguageSelector />
              <SignOut />
            </ul>
          </details>
        </li>
      </menu>

      {isFetched ? (
        <menu className={NavigationTheme.promotionMenu({ isSearchPath })}>
          <li className={NavigationTheme.promotionItem({ isMain })}>
            <Link className={NavigationTheme.promotionItemLink({ isMain })} href="/">
              {t('Home', { scope: 'PageSystem' })}
            </Link>
          </li>

          <PromotionCategoryList items={navigations} isMobileHeaderMenu={true} />
        </menu>
      ) : (
        <Skeleton containerClassName={`${cssSkeleton} ${cssSkeleton}__text ${cssSkeletonNavPromotion}`} />
      )}

      <button
        className={NavigationTheme.menuIcon({ activeSearchInput, isAuthorized, isSearchPath, activeNavigation })}
        onClick={onToggleMenu}
        aria-label="menu icon"
      >
        <i>{activeNavigation ? <IconCloseBlack /> : <IconMenu />}</i>
      </button>
    </nav>
  );
};

export default Navigation;
