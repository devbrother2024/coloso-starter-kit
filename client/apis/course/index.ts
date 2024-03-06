import http from '@/client/http';
import { cache } from '@/policy/site';
import { TypeGetCourseById } from '@/types/course';
import { mapParams } from '@/utils/api';

export const getCourseById = async ({ courseId, language }: TypeGetCourseById) => {
  try {
    const params = mapParams({ courseId, language });
    const options = { cache: cache.noStore };
    const { data } = await http.get(`/courses/${courseId}`, params, options);
    return data;
  } catch (err: any) {
    console.warn('fail to get preview course', err?.message);
  }
};
