import http from '@/client/http';
import { TypeCourse } from '@/types/course';
import { TypeDisplay } from '@/types/display';
import {
  TypeGetProductByCourseId,
  TypeGetProductOrders,
  TypeGetProductOrdersParam,
  TypeProduct,
} from '@/types/product';
import { mapParams } from '@/utils/api';

const initCatalog = {
  product: <TypeProduct>{},
  bundle: [],
  display: <TypeDisplay>{},
  course: <TypeCourse>{},
};

export const getProductOrders = async ({
  productId,
  bundleId,
  language,
}: TypeGetProductOrdersParam): Promise<TypeGetProductOrders> => {
  const params = bundleId ? mapParams({ optionalProductId: bundleId }) : mapParams({ language });
  const { data, meta } = await http.get(`/products/orders`, params);
  return { ...data, ...meta };
};

export const getProductByCourseId = async ({ courseId, language }: TypeGetProductByCourseId) => {
  const [{ data }] = await http.get(`/products?courseId=${courseId}&language=${language}`);

  if (Array.isArray(data)) {
    const [result] = data;
    return result ?? initCatalog;
  }

  if (data === null || Object.keys(data).length === 0) return initCatalog;

  return data;
};
