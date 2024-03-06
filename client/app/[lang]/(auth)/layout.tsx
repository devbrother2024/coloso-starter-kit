import { PropsWithChildren } from 'react';

import AuthContainer from '@/components/templates/containers/AuthContainer';

const AuthenticationLayout = ({ children }: PropsWithChildren) => {
  return <AuthContainer>{children}</AuthContainer>;
};

export default AuthenticationLayout;
