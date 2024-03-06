import { TypeCourseRank } from '@/types/course';
import { TypeBannerResponse } from '@/types/operation';

import { ExtendedLanguage } from './language';

export interface TypeSearch {
  activeSearchInput: boolean;
  onActiveState: (state: boolean) => void;
}

export interface TypeSearchResult extends TypeGetSearchResult {
  courses: TypeCourseRank[];
  total: number;
}

export interface TypeSearchNotFound {
  popularKeywords: string[];
  banners: TypeBannerResponse;
}

export interface TypeGetSearchResult extends ExtendedLanguage {
  keyword: string;
  sort?: string;
}
