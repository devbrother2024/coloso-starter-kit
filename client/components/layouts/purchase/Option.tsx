'use client';

import { TypeProductBundle } from '@/types/product';
import { priceLocale } from '@/utils/price';

interface TypeOption {
  product: TypeProductBundle;
}

const Option = ({ product }: TypeOption) => {
  return (
    <>
      <hr />
      <div className="purchase-product">
        <strong className="purchase-product__title">{product.publicTitle}</strong>
        {product.description && (
          <p className="purchase-product__description" data-newline={true}>
            {product.description}
          </p>
        )}
        <p className="purchase-product__price">{priceLocale(product.salePrice)}</p>
      </div>
    </>
  );
};

export default Option;
