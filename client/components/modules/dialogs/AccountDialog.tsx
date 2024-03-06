'use client';
import Button from '@/components/elements/Button';
import { onStopPropagationDialog } from '@/hooks/client/useDialog';
import useTranslation from '@/hooks/client/useTranslation';
import { DialogModalLabels, DialogModalType } from '@/policy/account';
import { TypeWithModalProps } from '@/types/modal';

import Modal from './Modal';

interface TypeAccountDialog {
  modalState: string;
  callback?: () => void;
}

const AccountDialog = ({
  modalState = DialogModalType.DEFAULT,
  isActive,
  onClose,
}: TypeWithModalProps<TypeAccountDialog>) => {
  const { title, description } = DialogModalLabels[modalState] ?? {};
  const t = useTranslation();

  const dialogTitle = () => {
    const defaultTitle = t(title, { scope: 'SiteGlobal' });
    const accountTitle = t(title, { scope: 'AccountSystem' });
    return defaultTitle === title ? accountTitle : defaultTitle;
  };

  return (
    <Modal isActive={isActive} onClose={onClose}>
      <div className="modal-dialog__frame" onClick={onStopPropagationDialog}>
        <h4 className="modal-dialog__title">{dialogTitle()}</h4>
        <p className="modal-dialog__desc" data-newline={true}>
          {t(description, { scope: 'AccountSystem' })}
        </p>

        <Button className="modal-dialog__btn btn--wide" callback={onClose}>
          {t('ConfirmButton', { scope: 'SiteGlobal' })}
        </Button>
      </div>
    </Modal>
  );
};
export default AccountDialog;
