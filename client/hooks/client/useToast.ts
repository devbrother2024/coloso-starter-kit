import { useCallback, useEffect } from 'react';

import { VISIBLE_TOAST_TIMEOUT } from '@/policy/toast';
import notificationStore from '@/store/notification';
import { TypeNotification } from '@/types/notification';

const useToast = () => {
  const timeId = Date.now();

  const cleanupNotifications = useCallback(() => {
    delete notificationStore.notifications[timeId];
  }, [timeId]);

  const executeNotifications = useCallback(
    (payload: TypeNotification) => {
      notificationStore.notifications[timeId] = payload;

      setTimeout(() => {
        cleanupNotifications();
      }, VISIBLE_TOAST_TIMEOUT);
    },
    [cleanupNotifications, timeId],
  );

  return executeNotifications;
};

export default useToast;
