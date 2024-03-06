import { ExtendedLanguage } from '@/types/language';

export interface TypePage {
  id: number;
  site: string;
  type: string;
  state: string;
  flags: number;
  createdAt: string;
  updatedAt: string;
  code: string | null;
  slug: string;
  title: string;
  formatId: number | null;
  categoryId: number | null;
  subCategoryId: number | null;
  courseId: number;
  productId: number | null;
  headHtml: string;
  headJson: string | undefined;
  mainHtml: string | undefined;
  mainJson: string | undefined;
  footHtml: string;
  footJson: string | undefined;
  showAt: string;
  hideAt: string;
  socialMetaTitle: string;
  coverType: string;
  socialMetaDescription: string;
  socialMetaImageAssetId: number | null;
  designTheme: string;
  promotionTitle: string;
  promotionDescription: string;
  promotionBadgeAt: string | null;
  extras: TypePageExtras;
  socialAssetUrl: string;
  isExpiredPage: false;
}

export interface TypePageExtras {
  badgeDesktopAsset?: {
    url?: string;
  };
  badgeMobileAsset?: {
    url?: string;
  };
  promotionBadgeText: string;
  promotionBadgeShow: boolean;
  catalogCardBadgeType: string;
  catalogCardBadgeTitle: string;
  floatingBarDecorationType: string;
  floatingBarDecorationText2: string;
  promotionBadgeHideAfterOpeningCourse: boolean;
}

export interface TypePagePrice {
  salePrice: number;
  maxDiscountRate: number;
  maxDiscountPrice: number;
}

export interface TypeGetPageBySlug extends ExtendedLanguage {
  slug: string;
  type: string;
  state: string | string[];
}

export interface TypeGetPreviewPage extends ExtendedLanguage {
  pageId: number;
}
