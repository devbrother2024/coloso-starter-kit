import { TypeAsset } from '@/types/asset';

export interface TypeCategory {
  id: number;
  site: string;
  type: string;
  state: string;
  sequence: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  showAt: string;
  hideAt: string;
  children?: Array<TypeCategory>;
}

export interface TypeCategoryMapItem extends TypeCategory {
  parent?: TypeCategory | null;
}

export type TypeCategoryMapArray = [number, TypeCategoryMapItem];
