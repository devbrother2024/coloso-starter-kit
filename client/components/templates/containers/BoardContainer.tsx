'use client';

import { PropsWithChildren } from 'react';

import Footer from '@/components/layouts/common/Footer';
import Header from '@/components/layouts/common/Header';

const BoardContainer = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="theme--board">
        <div className="grid--small">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default BoardContainer;
