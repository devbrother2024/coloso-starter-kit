import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { isProd } from '@/client/policy';

interface TypeHeaderState {
  isSticky: boolean;
  freeze: boolean;
  scrollY: number;
  targetOffset: number;
  headerHeight: number;
}

export const initialHeaderState: TypeHeaderState = {
  isSticky: false,
  freeze: false,
  scrollY: 0,
  targetOffset: 0,
  headerHeight: 0,
};

const headerStore = proxy<{ header: TypeHeaderState }>({
  header: { ...initialHeaderState },
});

devtools(headerStore, { name: 'header' });

export default headerStore;
