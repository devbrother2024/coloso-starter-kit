'use client';
import { FormEvent, useState } from 'react';

import { cx } from '@emotion/css';
import { useMutation } from '@tanstack/react-query';

import { changeUserPassword } from '@/apis/user';
import Button from '@/components/elements/Button';
import useEvent from '@/hooks/client/useEvent';
import useForm from '@/hooks/client/useForm';
import useToast from '@/hooks/client/useToast';
import useTranslation from '@/hooks/client/useTranslation';
import { NotificationErrorLabels, NotificationLabels } from '@/policy/notificationLabels';
import getLogger from '@/utils/logger';
import { isValidPassword } from '@/utils/validate';

const logger = getLogger('pages', 'info/nameInput');

const initForm = {
  newPassword: '',
  newPasswordConfirm: '',
  openEditFiled: false,
};

const PasswordInput = () => {
  const { preventEnter } = useEvent();
  const executeNotifications = useToast();
  const [form, dispatchForm] = useForm(initForm);

  // TODO: isSameValue util 함수 추가 ( KR 참고 )
  const isInvalidPasswordConfirm = !!form.newPasswordConfirm && form.newPasswordConfirm !== form.newPassword;

  const translateSiteGlobal = useTranslation({ scope: 'SiteGlobal' });
  const translateAccount = useTranslation({ scope: 'AccountSystem' });

  const { mutate: mutationUpdatePassword } = useMutation({
    mutationFn: () => changeUserPassword(form.newPassword),
    onSuccess: () => {
      executeNotifications(NotificationLabels.CONFIRM_PASSWORD);
      onToggleButton();
    },
    onError: (err: Error) => {
      logger.warn('failed to mutate password', err.message);
    },
  });

  const onToggleButton = () => {
    dispatchForm({ ...initForm, openEditFiled: !form.openEditFiled });
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutationUpdatePassword();
  };

  return (
    <fieldset className="board-block__col" data-e2e="info-password">
      <label className="board-block__label" htmlFor="display-name">
        {translateAccount('PasswordLabel')}
      </label>
      <div className="board-block__item">
        <span>********</span>
        <Button className="btn--large btn--secondary" callback={onToggleButton}>
          {form.openEditFiled ? translateSiteGlobal('CancelButton') : translateSiteGlobal('ChangeButton')}
        </Button>
      </div>

      {form.openEditFiled && (
        <>
          <form className="board-block__item">
            <div className={cx('input__trigger', { invalid: !isValidPassword(form.newPassword) })}>
              <input
                className="input input-half"
                placeholder={translateAccount('NewPasswordLabel')}
                type="password"
                required
                autoComplete="off"
                onKeyDown={preventEnter}
                onChange={(event) => {
                  dispatchForm({ newPassword: event.target.value });
                }}
              />
            </div>
          </form>
          {!isValidPassword(form.newPassword) && (
            <p className="board-block__msg board-block__msg--error">
              {translateAccount(NotificationErrorLabels.INVALID_PASSWORD_LOGIN)}
            </p>
          )}

          <form className="board-block__item" onSubmit={submitForm}>
            <div className={cx('input__trigger', { invalid: isInvalidPasswordConfirm })}>
              <input
                className="input input-half"
                placeholder={translateAccount('ConfirmPasswordLabel')}
                type="password"
                required
                autoComplete="off"
                onKeyDown={preventEnter}
                onChange={(event) => {
                  dispatchForm({ newPasswordConfirm: event.target.value });
                }}
              />
            </div>
            <Button
              className="btn--large"
              disabled={
                !form.newPassword ||
                !(form.newPassword === form.newPasswordConfirm) ||
                !isValidPassword(form.newPassword)
              }
            >
              {translateSiteGlobal('SaveButton')}
            </Button>
          </form>

          {isInvalidPasswordConfirm && (
            <p className="board-block__msg board-block__msg--error">
              {translateAccount(NotificationErrorLabels.INVALID_PASSWORD_MATCH)}
            </p>
          )}
        </>
      )}
    </fieldset>
  );
};

export default PasswordInput;
