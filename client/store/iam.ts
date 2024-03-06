import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { User } from '@/types/user';

const iamStore = proxy<{ iam: User }>({ iam: <User>{} });

devtools(iamStore, { name: 'iam' });

export default iamStore;
