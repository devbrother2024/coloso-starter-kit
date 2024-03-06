import { PropsWithChildren } from 'react';

import { cx } from '@emotion/css';

interface TypeBaseContainer {
  className?: string;
}

const BaseContainer = ({ children, className }: PropsWithChildren<TypeBaseContainer>) => {
  return <main className={cx(className || '__main')}>{children}</main>;
};

export default BaseContainer;
