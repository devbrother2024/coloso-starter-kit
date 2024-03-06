import { PropsWithChildren } from 'react';

import Footer from '@/components/layouts/common/Footer';
import Header from '@/components/layouts/common/Header';

const SearchContainer = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="theme--search">{children}</main>
      <Footer />
    </>
  );
};

export default SearchContainer;
