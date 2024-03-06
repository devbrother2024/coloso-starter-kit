import http from '@/client/http';
import { ExtendedLanguage } from '@/types/language';
import { mapParams } from '@/utils/api';

interface TypeGetBanners extends ExtendedLanguage {
  type: string;
}

// TODO: 배너 컴포넌트 데이터 전달 방식 변경
export const getBanners = async ({ type, language }: TypeGetBanners) => {
  const params = mapParams({ type, language });
  const { data, meta } = await http.get('/banners', params);
  return { ...data, ...meta };
};
