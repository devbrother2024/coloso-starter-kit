import { PropsWithChildren } from 'react';

import AuthenticatedContainer from '@/components/templates/containers/AuthenticatedContainer';
import BoardContainer from '@/components/templates/containers/BoardContainer';

const PurchaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticatedContainer>
      <BoardContainer>{children}</BoardContainer>
    </AuthenticatedContainer>
  );
};

export default PurchaseLayout;
