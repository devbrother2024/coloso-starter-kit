'use client';

import { ChangeEvent } from 'react';

import { useSnapshot } from 'valtio';

import Checkbox from '@/components/elements/Checkbox';
import useTranslation from '@/hooks/client/useTranslation';
import { purchaseStore, setPurchaseStore } from '@/store/purchase';

const Policy = () => {
  const t = useTranslation();
  const { agreements, isElective } = useSnapshot(purchaseStore);

  const onToggleAgreement = (event: ChangeEvent<HTMLInputElement>) => {
    const { agreements } = purchaseStore;
    const name = event.target.name as keyof typeof agreements;
    setPurchaseStore({
      agreements: {
        ...purchaseStore.agreements,
        [name]: !purchaseStore.agreements[name],
      },
    });
  };

  const policyTemplate = (label: string, route: string) => {
    return `<a href="/info/${route}" target="_blank" rel="noreferrer">${t(label, {
      scope: 'PostSystem',
    })}</a>`;
  };

  const policyAgreementLabel = () => {
    let result = t('RegisterAgreement', { scope: 'AccountSystem' });
    const termLabel = `&nbsp;${policyTemplate('ServiceTerms', 'terms')}&nbsp;`;
    const privacyLabel = `&nbsp;${policyTemplate('PrivacyPolicy', 'privacy')}`;
    result = result.replace('{term}', termLabel);
    result = result.replace('{privacy}', privacyLabel);
    return result;
  };

  return (
    <div className="board-block__item purchase-policy">
      <p className="board-block__desc" dangerouslySetInnerHTML={{ __html: policyAgreementLabel() }} />
      <p className="board-block__desc">{t('PaymentDescription', { scope: 'AccountSystem' })}</p>
      {isElective && (
        <>
          <Checkbox
            name="elective"
            checked={agreements.elective}
            callback={onToggleAgreement}
            className="purchase-policy__agreement"
          >
            {t('CheckElectiveProduct', { scope: 'PurchaseSystem' })}
          </Checkbox>
          <p className="board-block__desc">{t('ElectiveProductInformation', { scope: 'PurchaseSystem' })}</p>
        </>
      )}
    </div>
  );
};

export default Policy;
