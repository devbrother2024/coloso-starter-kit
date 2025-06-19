'use client';
import { ReactElement, useEffect, useState } from 'react';

import { cx } from '@emotion/css';

import { IconArrowRoundDown, IconFeedback, IconKit, IconMyClass } from '@/assets/icons';
import useTranslation from '@/hooks/client/useTranslation';
import { ProductType } from '@/policy/product';
import { ExtendedProduct, TypeProduct } from '@/types/product';

interface TypeProductDetail extends ExtendedProduct {}

const ProductIcons: { [key: string]: ReactElement } = {
  COURSE: <IconMyClass />,
  GOODS: <IconKit />,
  COACHING: <IconFeedback />,
};
const OptionProductTypes = [ProductType.GOODS, ProductType.COACHING];

const ProductDetail = ({ product }: TypeProductDetail) => {
  const t = useTranslation({ scope: 'AccountSystem' });
  const { type, items = [], products = [] } = product;
  const [detailItems, setDetailItems] = useState<TypeProduct[]>([]);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const isSingleProduct = type === ProductType.COURSE && items.length === 0;

  const { type: productType } = items?.find(({ type }) => OptionProductTypes.includes(type)) ?? { type };

  const onClickDetail = () => {
    setIsOpenDetail((prev) => !prev);
  };

  useEffect(() => {
    const detailItemsMap: { [key: string]: TypeProduct[] } = {
      [ProductType.BUNDLE]: products,
      [ProductType.ELECTIVE]: items,
      [ProductType.GOODS]: [product, ...items],
      [ProductType.COACHING]: [product, ...items],
    };

    const detailItemsValue = detailItemsMap[productType];
    setDetailItems(detailItemsValue);
  }, [productType, items, products, product]);

  if (isSingleProduct) return null;

  return (
    <div className="payment-list__detail">
      <button onClick={onClickDetail}>
        {t('SeeDetails')}
        <i
          className={cx('icon', {
            icon__open: isOpenDetail,
            icon: !isOpenDetail,
          })}
        >
          <IconArrowRoundDown />
        </i>
      </button>

      {isOpenDetail && (
        <ul className="payment-list__course">
          {detailItems?.map((item) => (
            <li key={item.id} className="payment-list__course-item">
              <i className="icon">{ProductIcons[item.type]}</i>
              <div>
                <b className="title">{item.publicTitle}</b>
                <span className="sub-title">{item.subtitle}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductDetail;
