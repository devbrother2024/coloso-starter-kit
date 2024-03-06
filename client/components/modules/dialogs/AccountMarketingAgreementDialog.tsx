'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/elements/Button';
import TranslateWithReactElement from '@/components/modules/common/TranslateWithReactElement';
import { onStopPropagationDialog } from '@/hooks/client/useDialog';
import useTranslation from '@/hooks/client/useTranslation';
import { DialogModalLabels, DialogModalType } from '@/policy/account';
import { TypeWithModalProps } from '@/types/modal';
import { queryString } from '@/utils/string';

import Modal from './Modal';

interface TypeAccountMarketingAgreementDialog {
  callback: ({ agreementFlag }: { agreementFlag: boolean }) => void;
}

const AccountMarketingAgreementDialog = ({
  isActive,
  onClose,
  callback,
}: TypeWithModalProps<TypeAccountMarketingAgreementDialog>) => {
  const router = useRouter();
  const { title, description } = DialogModalLabels[DialogModalType.MARKETING_AGREEMENT];
  const t = useTranslation({ scope: 'SiteGlobal' });
  const model = t(description);

  const TargetLink = () => (
    <button
      className="modal-dialog__link"
      onClick={() => {
        router.replace(`?${queryString({ redirectUri: '/account/info' })}`);
        callback({ agreementFlag: false });
      }}
    >
      {t('MarketingAgreementTargetLink')}
    </button>
  );

  const onClickAgreement = (agreementFlag: boolean) => {
    callback({ agreementFlag });
  };

  return (
    <Modal isActive={isActive} onClose={() => onClickAgreement(false)}>
      <div className="dialog-marketing modal-dialog__frame" onClick={onStopPropagationDialog}>
        <h4 data-newline={true} className="modal-dialog__title" dangerouslySetInnerHTML={{ __html: t(title) }} />
        <p className="modal-dialog__desc">
          <TranslateWithReactElement model={model} targetElement={{ targetLink: <TargetLink /> }} />
        </p>
        <div className="modal-dialog__btn modal-dialog__btn--row">
          <Button className="btn btn--invert" callback={() => onClickAgreement(false)}>
            {t('MarketingAgreementReject')}
          </Button>
          <Button className="btn" callback={() => onClickAgreement(true)}>
            {t('MarketingAgreementConfirm')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AccountMarketingAgreementDialog;
