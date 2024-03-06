import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';

import { getLocalToken, removeLocalToken, setLocalToken } from '@/client/auth';
import { queryKey } from '@/policy/queryKey';
import authorizationStore from '@/store/authorization';

const useAuth = () => {
  const router = useRouter();
  const { isAuthorized } = useSnapshot(authorizationStore);
  const queryClient = useQueryClient();

  const authorize = () => {
    const hasLocalToken = !!getLocalToken();
    authorizationStore.isAuthorized = hasLocalToken;

    if (!hasLocalToken) {
      removeLocalToken();
      router.replace('/');
    }
  };

  const successSignIn = ({ accessToken, callback }: { accessToken: string; callback?: VoidFunction }) => {
    setLocalToken(accessToken);
    authorizationStore.isAuthorized = true;

    callback && callback();
  };

  const removeUserQueries = () => {
    queryClient.removeQueries({ queryKey: [queryKey.IAM] });
    queryClient.removeQueries({ queryKey: [queryKey.USER_COURSES] });
    queryClient.removeQueries({ queryKey: [queryKey.USER_VOUCHERS] });
    queryClient.removeQueries({ queryKey: [queryKey.ORDERS] });
  };

  const rejectAuthorize = (redirectUri = '/') => {
    removeLocalToken();
    authorizationStore.isAuthorized = false;
    removeUserQueries();
    router.push(redirectUri);
  };

  const updateAuthorization = (isActive: boolean) => {
    !isActive && removeLocalToken();
    authorizationStore.isAuthorized = isActive;
  };

  return {
    isAuthorized,
    setIsAuthorized: updateAuthorization,
    successSignIn,
    authorize,
    rejectAuthorize,
  };
};

export default useAuth;
