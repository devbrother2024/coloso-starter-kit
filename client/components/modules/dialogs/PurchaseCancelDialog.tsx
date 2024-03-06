import { useRouter } from 'next/navigation';

import Button from '@/components/elements/Button';
import { onStopPropagationDialog } from '@/hooks/client/useDialog';
import useTranslation from '@/hooks/client/useTranslation';
import { TypeWithModalProps } from '@/types/modal';

import Modal from './Modal';

const CancelDialog = ({ isActive, onClose }: TypeWithModalProps) => {
  const translateSiteGlobal = useTranslation({ scope: 'SiteGlobal' });
  const translatePurchase = useTranslation({ scope: 'PurchaseSystem' });
  const router = useRouter();

  return (
    <Modal isActive={isActive} onClose={onClose}>
      <div className="dialog-purchase__cancel modal-dialog__frame" onClick={onStopPropagationDialog}>
        <h4 className="modal-dialog__title">{translatePurchase('PaymentFailedDescription2')}</h4>
        <p className="modal-dialog__desc">{translatePurchase('PaymentFailedWarning')}</p>
        <div className="modal-dialog__btn modal-dialog__btn--row">
          <Button
            className="btn btn--invert"
            callback={() => {
              onClose();
              router.back();
            }}
          >
            {translatePurchase('PurchaseRetry')}
          </Button>
          <Button
            className="btn"
            callback={() => {
              onClose();
              router.push('/');
            }}
          >
            {translateSiteGlobal('ConfirmButton')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelDialog;
