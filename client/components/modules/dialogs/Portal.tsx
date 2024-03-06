'use client';

import { PropsWithChildren } from 'react';

import { createPortal } from 'react-dom';

interface TypePortal {
  container?: Element | DocumentFragment;
}

const Portal = ({ children, container = document.body }: PropsWithChildren<TypePortal>) => {
  return createPortal(children, container);
};

export default Portal;
