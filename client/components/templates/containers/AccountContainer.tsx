'use client';

import { PropsWithChildren } from 'react';

import Aside from '@/components/layouts/account/Aside';
import Footer from '@/components/layouts/common/Footer';
import Header from '@/components/layouts/common/Header';

const AccountLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="theme--me">
        <section className="me-layout">
          <Aside />
          {children}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AccountLayout;
