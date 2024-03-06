import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

interface TypeCommonState {
  previousRoute: string;
  isSearchPath: boolean;
  appURL: string;
}

const initialCommonState: TypeCommonState = {
  previousRoute: '/',
  isSearchPath: false,
  appURL: '/',
};

/**
 * @note authorization, notification 을 개별 상태로 관리할 필요가 있을까?
 * 해당 스토어의 확장 가능성이 없다면, commonStore 에 병합하는 것에 대해 논의.
 */
const commonStore = proxy<TypeCommonState>({ ...initialCommonState });

devtools(commonStore, { name: 'common' });

export default commonStore;
