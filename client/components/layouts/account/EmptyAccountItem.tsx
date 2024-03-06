'use client';

import { ReactElement } from 'react';

import useTranslation from '@/hooks/client/useTranslation';

interface TypeEmptyAccountItem {
  label: string;
  icon: ReactElement;
}

const EmptyAccountItem = ({ label, icon }: TypeEmptyAccountItem) => {
  const t = useTranslation({ scope: 'MyPage' });

  return (
    <p className="me-section__empty">
      {icon}
      <span data-newline={true}>{t(label)}</span>
    </p>
  );
};

export default EmptyAccountItem;
