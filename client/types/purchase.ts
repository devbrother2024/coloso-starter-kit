import { ExtendedBundle, ExtendedProduct } from '@/types/product';
import { ExtendedVouchers } from '@/types/voucher';

export interface TypeImpData {
  impShopCode: string;
}

export interface TypePurchase extends ExtendedProduct, ExtendedVouchers, ExtendedBundle {
  impData: TypeImpData;
}
