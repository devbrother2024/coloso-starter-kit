import { PropsWithChildren } from 'react';

import PurchaseContainer from '@/components/templates/containers/PurchaseContainer';

import PaymentProvider from './paymentProvider';

const PurchasePageLayout = ({ children }: PropsWithChildren) => {
  return (
    <PaymentProvider>
      <PurchaseContainer>{children}</PurchaseContainer>
    </PaymentProvider>
  );
};

export default PurchasePageLayout;
