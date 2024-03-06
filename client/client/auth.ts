// TODO: substitute bluestone utils
import { site } from '@/client/policy';
import { storage } from '@/client/util';

export const setLocalToken = (token: string) => {
  storage?.setItem(site.LOCAL_ACCESS_TOKEN, token);
};
export const getLocalToken = () => {
  return storage?.getItem(site.LOCAL_ACCESS_TOKEN);
};
export const removeLocalToken = () => {
  storage?.removeItem(site.LOCAL_ACCESS_TOKEN);
};

export const clearLocalStorageItems = () => storage?.clear();
