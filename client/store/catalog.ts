import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { TypeBundle } from '@/types/bundle';
import { TypeCourse } from '@/types/course';
import { TypeDisplay } from '@/types/display';
import { TypePage, TypePagePrice } from '@/types/page';
import { TypeProduct } from '@/types/product';
import { TypeVoucherTemplate } from '@/types/voucher';

interface TypeCatalogStore {
  page: TypePage;
  course: TypeCourse;
  display: TypeDisplay;
  isFloating: boolean;
  isValidCatalog: boolean;
  invalidProduct: boolean;
  product: TypeProduct;
  isPanelHidden: boolean;
  isCourseBeingPrepared: boolean;
  isEnabledToRenderCatalogPrice: boolean;
  priceList: TypePagePrice;
  bundle: Array<TypeBundle>;
  welcomeVouchers: TypeVoucherTemplate[];
  downloadVouchers: TypeVoucherTemplate[];
}

const defaultCatalogStore: TypeCatalogStore = {
  bundle: [],
  isFloating: false,
  isValidCatalog: false,
  invalidProduct: false,
  page: <TypePage>{},
  welcomeVouchers: [],
  downloadVouchers: [],
  isPanelHidden: false,
  isCourseBeingPrepared: false,
  isEnabledToRenderCatalogPrice: false,
  course: <TypeCourse>{},
  product: <TypeProduct>{},
  display: <TypeDisplay>{},
  priceList: <TypePagePrice>{},
};

let catalogStore = proxy({ ...defaultCatalogStore });

const setCatalogStore = (state: Partial<TypeCatalogStore>) => {
  catalogStore = Object.assign(catalogStore, { ...state });
};

const resetCatalogStore = () => {
  catalogStore = Object.assign(catalogStore, { ...defaultCatalogStore });
};

devtools(catalogStore, { name: 'catalog' });

export { catalogStore, setCatalogStore, resetCatalogStore };
