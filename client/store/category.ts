import { proxy } from 'valtio';
import { devtools, proxyMap } from 'valtio/utils';

import { TypeCategoryMapItem } from '@/types/category';

interface TypeCategoryStore {
  categoryMap: Map<number, TypeCategoryMapItem>;
}

const initialCategoryStore: TypeCategoryStore = {
  categoryMap: proxyMap(),
};

const categoryStore = proxy<TypeCategoryStore>({ ...initialCategoryStore });

devtools(categoryStore, { name: 'category' });

export default categoryStore;
