import { useSnapshot } from 'valtio';

import categoryStore from '@/store/category';
import { validateCategory } from '@/utils/category';

const useCategory = (categoryId: number) => {
  const { categoryMap } = useSnapshot(categoryStore);
  const { primary, secondary } = validateCategory(categoryId, categoryMap);

  return { primary, secondary };
};

export default useCategory;
