import http from '@/client/http';
import { TypeGetOrderById, TypeOrder, TypeOrderDetail, TypeOrderUid } from '@/types/order';
import { mapParams } from '@/utils/api';
import getLogger from '@/utils/logger';

const logger = getLogger('api', 'order');

export const requestOrder = async (data: TypeOrder) => {
  const { data: order } = await http.post('/orders', data);
  if (!order?.impMerchantUid) {
    logger.error('failed to get impMerchantUid orderId=%s', order.id);
  }
  return order;
};

export const getOrderById = async ({
  orderId,
  language,
}: TypeGetOrderById): Promise<{ orderDetail: TypeOrderDetail[] }> => {
  const params = mapParams({ language });
  const { data } = await http.get(`/orders/${orderId}`, params);
  return data;
};

export const requestOrderCancel = async (data: Omit<TypeOrderUid, 'impUid'>) => {
  const { orderId, ...payload } = data;
  return await http.put(`/orders/${orderId}/cancel`, payload);
};

export const requestOrderSuccess = async (data: TypeOrderUid) => {
  const { orderId, ...payload } = data;
  return await http.post(`/orders/${orderId}/done`, payload);
};
