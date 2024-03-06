import React from 'react';

import { priceLocale } from '@/utils/price';

interface TypeDiscountPrice {
  title: string;
  price: number;
  isVisible?: boolean;
}

const DiscountPrice = ({ title, price = 0, isVisible = true }: TypeDiscountPrice) => {
  if (!isVisible) return null;
  return (
    <div className="board-block__item board-block__item-discount board-block__item-discount--emphasis">
      <span className="board-block__name">
        <i>{title}</i>
      </span>
      <p className="board-block__desc">{priceLocale(price, false)}</p>
    </div>
  );
};

export default DiscountPrice;
