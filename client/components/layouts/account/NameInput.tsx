'use client';
import { useEffect, useState, FormEvent } from 'react';

import { cx } from '@emotion/css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';

import { updateUserInfos } from '@/apis/user';
import Button from '@/components/elements/Button';
import useEvent from '@/hooks/client/useEvent';
import useForm from '@/hooks/client/useForm';
import useToast from '@/hooks/client/useToast';
import useTranslation from '@/hooks/client/useTranslation';
import { NotificationLabels } from '@/policy/notificationLabels';
import { NotificationErrorLabels } from '@/policy/notificationLabels';
import { queryKey } from '@/policy/queryKey';
import userStore from '@/store/iam';
import getLogger from '@/utils/logger';
import { isValidName } from '@/utils/validate';

const logger = getLogger('pages', 'info/nameInput');

const NameInput = () => {
  const [form, dispatchForm] = useForm({
    userName: '',
    newName: '',
    openEditFiled: false,
  });
  const { iam: user } = useSnapshot(userStore, { sync: true });
  const { preventEnter } = useEvent();
  const executeNotifications = useToast();
  const queryClient = useQueryClient();
  const translateSiteGlobal = useTranslation({ scope: 'SiteGlobal' });
  const translateAccount = useTranslation({ scope: 'AccountSystem' });

  const { mutate: mutationUpdateUserInfos } = useMutation({
    mutationFn: (content: { [key: string]: string }) => updateUserInfos(content),
    onSuccess: () => {
      executeNotifications(NotificationLabels.CONFIRM_SUBMIT);
      getUserAccount();
      onToggleButton();
    },
    onError: (err: Error) => {
      logger.warn('failed to mutate delivery', err.message);
      executeNotifications(NotificationLabels.REJECT_SUBMIT);
    },
  });

  const getUserAccount = () => {
    queryClient.invalidateQueries({ queryKey: [queryKey.IAM] });
  };

  const onToggleButton = () => {
    dispatchForm({ newName: '', openEditFiled: !form.openEditFiled });
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutationUpdateUserInfos({
      name: form.newName,
    });
  };

  useEffect(() => {
    if (!user.name) return;
    dispatchForm({ userName: user.name });
  }, [user.name, dispatchForm]);

  return (
    <fieldset>
      <label className="board-block__label" htmlFor="display-name">
        {translateAccount('NameLabel')}
      </label>
      <div className="board-block__item">
        <span>{form.userName || ''}</span>
        <Button className="btn--large btn--secondary" callback={onToggleButton}>
          {form.openEditFiled ? translateSiteGlobal('CancelButton') : translateSiteGlobal('ChangeButton')}
        </Button>
      </div>

      {form.openEditFiled && (
        <>
          <form className="board-block__item" onSubmit={submitForm}>
            <div className={cx('input__trigger', { invalid: !isValidName(form.newName) })}>
              <input
                className="input input-half"
                value={form.newName}
                placeholder={translateAccount('NameLabel')}
                type="text"
                required
                onKeyDown={preventEnter}
                onChange={(event) => {
                  dispatchForm({ newName: event.target.value });
                }}
              />
            </div>

            <Button className="btn--large" disabled={!form.newName || !isValidName(form.newName)}>
              {translateSiteGlobal('SaveButton')}
            </Button>
          </form>
          {!isValidName(form.newName) && (
            <p className="board-block__msg board-block__msg--error">
              {translateAccount(NotificationErrorLabels.INVALID_NAME)}
            </p>
          )}
        </>
      )}
    </fieldset>
  );
};

export default NameInput;
