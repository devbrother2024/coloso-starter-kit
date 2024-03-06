// import { diff } from '@/utils/date';

const isServer = !process.browser;

interface TypeStorageData {
  [key: string]: string;
}

const defaultStore = {
  data: <TypeStorageData>{},
  getItem(key: string) {
    return this.data[key];
  },
  setItem(key: string, value: string) {
    this.data[key] = value;
  },
  clear() {
    this.data = {};
  },
  removeItem(key: string) {
    this.data[key] = '';
  },
};

export const storage = isServer ? defaultStore : localStorage;
