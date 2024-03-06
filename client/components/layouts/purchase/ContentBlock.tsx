import { ReactNode } from 'react';

import { cx } from '@emotion/css';

interface TypeContent {
  summary: string;
  children: ReactNode;
  isVisible?: boolean;
  isDivide?: boolean;
  isBold?: boolean;
  className?: string;
}

const ContentBlock = ({ summary, isBold = false, className, isVisible = true, isDivide, children }: TypeContent) => {
  if (!isVisible) return null;
  return (
    <div className={cx('board-block__item', className, { 'board-block__item--divide': isDivide })}>
      <span className={cx('board-block__name', { 'board-block__name--bold': isBold })}>
        <i>{summary}</i>
      </span>
      <p className="board-block__desc">{children}</p>
    </div>
  );
};

export default ContentBlock;
