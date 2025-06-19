'use client';

import { useEffect, PropsWithChildren } from 'react';

import Loader from '@/components/elements/Loader';
import useAuth from '@/hooks/client/useAuth';

const AuthenticatedContainer = ({ children }: PropsWithChildren) => {
  const { isAuthorized, rejectAuthorize } = useAuth();

  useEffect(() => {
    if (!isAuthorized) rejectAuthorize('/sign-in');
  }, [isAuthorized, rejectAuthorize]);

  if (!isAuthorized) <Loader />;

  return <>{children}</>;
};

export default AuthenticatedContainer;
