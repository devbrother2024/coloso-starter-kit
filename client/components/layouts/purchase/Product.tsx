import { TypeProduct as TypeProductItem } from '@/types/product';
import { priceLocale } from '@/utils/price';

interface TypeProduct {
  product?: TypeProductItem | null;
  price: number;
}

const Product = ({ product, price }: TypeProduct) => {
  if (!product) return null;

  return (
    <div className="purchase-product">
      <strong className="purchase-product__title">{product.publicTitle}</strong>
      {product.description && (
        <p className="purchase-product__description" data-newline={true}>
          {product.description}
        </p>
      )}
      <p className="purchase-product__price">{priceLocale(price)}</p>
    </div>
  );
};

export default Product;
