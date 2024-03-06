import { PropsWithChildren } from 'react';

import Footer from '@/components/layouts/common/Footer';
import Header from '@/components/layouts/common/Header';
import BaseContainer from '@/components/templates/containers/BaseContainer';

const CategoryLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <BaseContainer className="theme--category">{children}</BaseContainer>
      <Footer />
    </>
  );
};

export default CategoryLayout;
