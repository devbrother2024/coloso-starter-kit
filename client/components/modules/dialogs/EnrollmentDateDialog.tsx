'use client';

import Button from '@/components/elements/Button';
import { onStopPropagationDialog } from '@/hooks/client/useDialog';
import useTranslation from '@/hooks/client/useTranslation';
import { TypeWithModalProps } from '@/types/modal';
import { formatUTC } from '@/utils/date';

import Modal from './Modal';

interface TypeEnrollmentDateDialog {
  isComing: boolean;
  periodDate: string;
}

const EnrollmentDateDialog = ({
  isActive,
  isComing,
  periodDate,
  onClose,
}: TypeWithModalProps<TypeEnrollmentDateDialog>) => {
  const t = useTranslation({ scope: 'MyPage' });

  const messageContent = () => {
    const periodAt = `<mark>${periodDate} ${formatUTC().label}</mark>`;
    return isComing ? t('NoticeDescription1', { startAt: periodAt }) : t('NoticeDescription2', { endAt: periodAt });
  };

  const messageContact = () => {
    const email = '<em>help@starter-kit.global</em>';
    return t('NoticeDescription3', { email });
  };

  return (
    <Modal isActive={isActive} onClose={onClose}>
      <div className="modal-dialog__frame" onClick={onStopPropagationDialog}>
        <h4 className="modal-dialog__title">{t('NoticeTitle')}</h4>
        <p className="modal-dialog__desc">
          <span data-newline={true} dangerouslySetInnerHTML={{ __html: messageContent() }} />
          <br />
          <span data-newline={true} dangerouslySetInnerHTML={{ __html: messageContact() }} />
        </p>

        <Button className="modal-dialog__btn btn--wide" callback={onClose}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default EnrollmentDateDialog;
