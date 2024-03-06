import { TypeCategory, TypeCategoryMapArray, TypeCategoryMapItem } from '@/types/category';

export const validateCategory = (id: number, categoryMap: Map<number, TypeCategoryMapItem>) => {
  const categoryMapData = categoryMap.get(id);
  if (!categoryMapData) {
    return { primary: null, secondary: [] };
  }
  const primary = categoryMapData?.parent ?? categoryMapData;
  const secondary = primary?.children ?? [];

  return { primary, secondary };
};

export const composeCategory = (categoryTree: TypeCategory[], parentNode?: TypeCategory): TypeCategoryMapArray[] => {
  return categoryTree?.reduce((acc: TypeCategoryMapArray[], cur) => {
    const { id, children } = cur;
    const { level } = cur.extras.sequenceInfo;

    const isParent = !Number(level.replace('DEPTH_', ''));
    const parent = isParent ? null : parentNode;
    const composedNode: TypeCategoryMapArray = [id, { ...cur, parent }];
    const hasChildren = !!children?.length;

    acc.push(composedNode);

    if (hasChildren) {
      const composedChildNodes = composeCategory(children, cur);
      acc.push(...composedChildNodes);
    }

    return acc;
  }, []);
};

export const filterHideCategory = (categoryTree: TypeCategory[]) => {
  const deepClonedCategory = structuredClone(categoryTree);

  return deepClonedCategory.filter((category) => {
    category.children = filterHideCategory(category?.children ?? []);

    return !category.extras?.hideMenu;
  });
};
