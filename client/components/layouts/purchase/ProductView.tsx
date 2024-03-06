import { useEffect, useState } from 'react';

import { useSnapshot } from 'valtio';

import usePurchase from '@/hooks/client/usePurchase';
import { purchaseStore } from '@/store/purchase';

import Product from './Product';

const ProductView = () => {
  const { product, optionProduct } = useSnapshot(purchaseStore);
  const { paymentPrice } = usePurchase();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const optionSalePrice = optionProduct.map(({ salePrice }) => salePrice).reduce((acc, cur) => acc + cur, 0);
    const calcPrice = Math.abs(paymentPrice.salePrice - optionSalePrice);
    setPrice(calcPrice);
  }, [paymentPrice, optionProduct]);

  return <Product product={product} price={price} />;
};

export default ProductView;
