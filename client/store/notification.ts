import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { TypeNotifications } from '@/types/notification';

interface TypeNotificationState {
  notifications: TypeNotifications;
}

const notificationStore = proxy<TypeNotificationState>({
  notifications: {},
});

devtools(notificationStore, { name: 'notifications' });

export default notificationStore;
