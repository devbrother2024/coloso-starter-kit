import { TypeAsset } from '@/types/asset';
import { TypeBanner } from '@/types/banner';
import { TypeCourse } from '@/types/course';
import { TypePage } from '@/types/page';
import { TypeProduct } from '@/types/product';

export interface TypeNavigationItem {
  state: string;
  title: string;
  subtitle: string;
  titleLink: string;
  linkTarget?: string;
  showAt: string;
  hideAt: string;
  children: Array<TypeNavigationItem>;
  navigationPosterImageAssetId: number | null;
  posterImage?: TypeAsset;
  focusImage?: TypeAsset;
  focusStyle?: boolean;
  publicItem?: boolean;
}

export interface TypeCurationMeta {
  type: string;
  theme: string;
  publicTitle: string;
  publicSubtitle?: string;
  publicSubtitleLink?: string;
  isPublicTitle: boolean;
  isLightTheme?: boolean;
  isCarouselType?: boolean;
}

export interface TypeCatalog extends TypeCourse {
  page: TypePage;
  products: Array<TypeProduct>;
  defaultCardAsset: TypeAsset;
  instructorProfileAsset: TypeAsset;
}

export interface TypeCatalogResponse {
  data: Array<TypeCatalog>;
  meta: TypeCurationMeta;
}

export interface TypeBannerResponse {
  data: Array<TypeBanner>;
  meta: TypeCurationMeta;
}

export type TypeCurationResponse = TypeCatalogResponse & TypeBannerResponse;
