import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { Meta } from '@/utils/meta';

export const metadata: Metadata = Meta;

const RootLayout = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default RootLayout;
