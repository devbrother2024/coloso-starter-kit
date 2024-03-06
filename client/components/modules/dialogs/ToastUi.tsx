'use client';
import React, { useEffect, useMemo, useState } from 'react';

import { useSnapshot } from 'valtio';

import { IconBangRed, IconCheckGreen } from '@/assets/icons';
import useTranslation from '@/hooks/client/useTranslation';
import notificationStore from '@/store/notification';

const ToastUi = () => {
  const [validToast, setValidToast] = useState(false);
  const { notifications } = useSnapshot(notificationStore);
  const keys = useMemo(() => Object.keys(notifications), [notifications]);
  const t = useTranslation({ scope: 'AccountSystem' });

  useEffect(() => {
    const [detect] = Object.keys(keys);
    setValidToast(!!detect);
  }, [keys]);

  if (!validToast) return null;

  return (
    <div className="toast-ui" data-testid="toast-ui">
      {keys.map((id) => {
        const timestamp = Number(id);
        const { notifications } = notificationStore;

        const { type: notificationType, message: notificationMessage } = notifications[timestamp];

        return (
          <div key={timestamp} className={`toast-ui__block is--${notificationType}`}>
            <span className="toast-ui__item">
              <i className={`icon icon--${notificationType}`}>
                {notificationType === 'confirm' ? <IconCheckGreen /> : <IconBangRed />}
              </i>
              <span data-newline={true}>{t(notificationMessage)}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ToastUi;
