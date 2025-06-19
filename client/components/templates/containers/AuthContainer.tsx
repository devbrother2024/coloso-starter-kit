'use client';

import { PropsWithChildren, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSnapshot } from 'valtio';

import Footer from '@/components/layouts/common/Footer';
import Header from '@/components/layouts/common/Header';
import useAuth from '@/hooks/client/useAuth';
import commonStore from '@/store/common';

const AuthContainer = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { isAuthorized } = useAuth();
  const { appURL } = useSnapshot(commonStore);
  const searchParams = useSearchParams();
  const redirectUri = searchParams.get('redirectUri') || '/';

  useEffect(() => {
    if (isAuthorized) {
      router.replace(redirectUri);
    }
  }, [isAuthorized, appURL, redirectUri, router]);

  return (
    <>
      <Header />
      <main className="theme--account" style={{ backgroundImage: 'url(https://placehold.co/152x36/00ff43/00ff43)' }}>
        <section className="theme--account__content">
          <div className="grid--x-small">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AuthContainer;
