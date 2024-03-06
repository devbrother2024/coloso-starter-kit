import { PropsWithChildren } from 'react';

import OrderContainer from '@/components/templates/containers/OrderContainer';

const PurchaseDoneLayout = ({ children }: PropsWithChildren) => {
  return <OrderContainer>{children}</OrderContainer>;
};

export default PurchaseDoneLayout;
