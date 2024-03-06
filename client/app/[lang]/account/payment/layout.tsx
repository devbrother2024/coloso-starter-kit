import { PropsWithChildren } from 'react';

import PaymentMenu from '@/components/layouts/account/PaymentMenu';

const AccountPaymentLayout = ({ children }: PropsWithChildren) => {
  return <PaymentMenu>{children}</PaymentMenu>;
};

export default AccountPaymentLayout;
