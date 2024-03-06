import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { getLocalToken } from '@/client/auth';

interface TypeAuthorizationState {
  isAuthorized: boolean;
}

const authorizationStore = proxy<TypeAuthorizationState>({
  isAuthorized: !!getLocalToken(),
});

devtools(authorizationStore, { name: 'authorization' });

export default authorizationStore;
