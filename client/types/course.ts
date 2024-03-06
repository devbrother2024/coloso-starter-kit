import { ExtendedAssets, TypeAsset } from '@/types/asset';
import { TypeCategory } from '@/types/category';
import { TypeFormat } from '@/types/format';
import { ExtendedLanguage } from '@/types/language';

export interface TypeCourse {
  id: number;
  site: string;
  type: string;
  state: string;
  flags: number;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  subCategoryId: number | null;
  formatId: number;
  originCourseId: number | null;
  code: string | null;
  prerequisite: string;
  openAt: string;
  closeAt: string | null;
  classroom: string | null;
  classHours: string | null;
  totalClassHours: string | null;
  department: string | null;
  leaderName: string | null;
  plannerName: string | null;
  marketerName: string | null;
  managerName: string | null;
  currentPlanName: string | null;
  slug: string | null;
  instructor: string;
  curriculumDocumentUrl: string | null;
  curriculumAssetId: number | null;
  surveyUrl: string | null;
  evaluationUrl: string | null;
  mobileCoverAssetId: number;
  desktopCoverAssetId: number;
  desktopCardAssetId: number;
  publicNotice: string | null;
  publicTitle: string;
  publicDescription: string;
  keywords: string;
  keywordList: {
    text: string;
  }[];
  qualification: string | null;
  publicPeriod: string | null;
  publicSchedule: string | null;
  publicPlace: string | null;
  curriculum: string | null;
  clipCount: string;
  runningTime: string | null;
  contactName: string | null;
  contactPhone: number | null;
  contactEmail: string | null;
  publicPlaceCard: string | null;
  paidPeriod: string;
  freePeriod: string | null;
  extras: {
    assets?: string;
    captions?: string;
    displayKeywords?: string;
    coverVideoAssetId: number;
    instructorProfileAssetId: number;
    coverVideoPosterAssetId?: number;
    audio?: string;
    active?: {
      audio?: string;
      captions?: string;
    };
  };
  category: TypeCategory;
  format: TypeFormat;
  desktopCoverImage: string;
  mobileCoverImage: string;
  coverVideo: string;
  coverVideoPoster: string;
  socialMetaImageAssetId?: number;
  socialAssetUrl?: string;
  defaultCardAsset: TypeAsset | null;
  instructorProfileAsset: TypeAsset | null;
  imageBadge: string;
  badgeBackgroundColor: string;
  badgeTextColor: string;
  mobileCoverAsset: string;
  desktopCardAsset: string;
}

export interface TypeCourseRank extends TypeCourse {
  count: number;
}

export interface TypeCompactCourse extends Pick<TypeCourse, 'id' | 'type' | 'publicDescription' | 'publicTitle'> {
  desktopCardAsset: string;
  desktopCoverAsset: string;
  mobileCoverAsset: string;
}

export interface TypeGetCourseById extends ExtendedLanguage {
  courseId: number;
}
