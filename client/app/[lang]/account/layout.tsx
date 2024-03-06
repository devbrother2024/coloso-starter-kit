import { PropsWithChildren } from 'react';

import AccountContainer from '@/components/templates/containers/AccountContainer';
import AuthenticatedContainer from '@/components/templates/containers/AuthenticatedContainer';

const MyPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <AuthenticatedContainer>
      <AccountContainer>{children}</AccountContainer>
    </AuthenticatedContainer>
  );
};

export default MyPageLayout;
