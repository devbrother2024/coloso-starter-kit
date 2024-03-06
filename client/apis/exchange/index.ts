import http from '@/client/http';
import getLogger from '@/utils/logger';

const logger = getLogger('api', 'exchange');

export const getExchangeRate = async () => {
  try {
    const { data } = await http.get('/exchanges');
    return data;
  } catch (err) {
    const error = err as Error;
    logger.warn('failed to get catalogs', error?.message);
    throw new Error(error?.message);
  }
};
