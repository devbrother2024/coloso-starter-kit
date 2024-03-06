import { TypeAsset } from '@/types/asset';

export interface TypeBanner {
  type: string;
  categoryId: string | null;
  code: string | null;
  courseId: number | null;
  createdAt: Date | null;
  flags: number;
  formatId: number | null;
  hideAt: Date | null;
  id: number;
  isPublicTitle: number;
  productId: number | null;
  sequence: number;
  showAt: Date | null;
  site: string;
  state: string;
  subtitle: string | null;
  targetUrl: string;
  targetWindow: string;
  title: string;
  updatedAt: Date | null;
  assets: Record<string, Array<TypeAsset>>;
}
