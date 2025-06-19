'use client';

import { useCallback, useEffect, useState } from 'react';

import { cx } from '@emotion/css';
import { useQuery } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';

import Link from '@/components/elements/Link';
import useCategory from '@/hooks/client/useCategory';
import useHeaderControl from '@/hooks/client/useHeaderControl';
import useScrollCenter from '@/hooks/client/useScrollCenter';
import useTranslation from '@/hooks/client/useTranslation';
import { queryKey } from '@/policy/queryKey';
import headerStore from '@/store/header';
import i18nStore from '@/store/i18n';
import { TypeCategory } from '@/types/category';
import { throttleUsingRaf } from '@/utils/raf';

import DisplayTagListStub from './stubs/DisplayTagList.stub';

interface TypeDisplayTagList {
  categoryId: number;
}

const TAG = 'display__tag';

const DisplayTagList = ({ categoryId }: TypeDisplayTagList) => {
  const t = useTranslation({ scope: 'PageSystem' });
  const {
    header: { isSticky },
  } = useSnapshot(headerStore);
  const { lang } = useSnapshot(i18nStore);

  const { isFetched } = useQuery({ queryKey: [queryKey.I18N, lang] });

  const { primary, secondary } = useCategory(categoryId);
  const [primaryCategory, setPrimaryCategory] = useState<TypeCategory | null>(primary);
  const [tagList, setTagList] = useState<Array<TypeCategory>>(secondary);

  const { targetNavRef, setTargetOffsetTop } = useHeaderControl();
  const { targetContainerRef, targetItemRefs, scrollToCenter } = useScrollCenter();

  const resetTagScroll = useCallback(() => {
    const tagIndex = targetItemRefs.current.findIndex((target) => target?.className.includes('selected'));
    scrollToCenter(tagIndex);
  }, [scrollToCenter, targetItemRefs]);

  const resetTargetOffsetTop = useCallback(() => {
    if (!targetNavRef.current?.previousElementSibling) return;
    const { offsetTop, clientHeight } = targetNavRef.current.previousElementSibling as HTMLElement;
    const targetHeight = offsetTop + clientHeight;

    setTargetOffsetTop(targetHeight);
  }, [targetNavRef, setTargetOffsetTop]);

  const watchingResize = useCallback(() => {
    throttleUsingRaf(() => {
      resetTagScroll();
      resetTargetOffsetTop();
    });
  }, [resetTagScroll, resetTargetOffsetTop]);

  useEffect(() => {
    const { addEventListener, removeEventListener } = window;
    addEventListener('resize', watchingResize);
    return () => {
      removeEventListener('resize', watchingResize);
    };
  }, [watchingResize]);

  useEffect(() => {
    if (!primary) return;

    setPrimaryCategory(primary);
    setTagList(secondary);

    resetTagScroll();
    resetTargetOffsetTop();
  }, [primary, secondary, resetTagScroll, resetTargetOffsetTop]);

  if (!isFetched) return <DisplayTagListStub />;

  return (
    <>
      <h2 className="display-category__title">
        <span className="grid grid--large">{primaryCategory?.title ?? 'categories'}</span>
      </h2>
      <nav className={cx('display-category', { 'sticky-header': isSticky })} ref={targetNavRef}>
        <h3 className="a11y">category tag list</h3>
        <div className="grid--large">
          <ul className={`${TAG}-list`} ref={targetContainerRef}>
            <li
              className={cx(categoryId === primaryCategory?.id ? `${TAG}-item-selected` : `${TAG}-item`)}
              ref={(el: HTMLLIElement) => {
                targetItemRefs.current[0] = el;
              }}
            >
              <Link className={`${TAG}-anchor`} href={`/category/${primaryCategory?.id}`}>
                <span>{t('All')}</span>
              </Link>
            </li>
            {tagList?.map((tag, index) => (
              <li
                className={cx(categoryId === tag.id ? `${TAG}-item-selected` : `${TAG}-item`)}
                ref={(el: HTMLLIElement) => {
                  targetItemRefs.current[index + 1] = el;
                }}
                key={tag.id}
              >
                <Link className={`${TAG}-anchor`} href={`/category/${tag.id}`}>
                  <span>{tag.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default DisplayTagList;
