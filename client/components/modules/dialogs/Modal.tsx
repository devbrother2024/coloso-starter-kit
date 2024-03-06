'use client';

import { PropsWithChildren, useEffect } from 'react';

import DialogContainer from '@/components/templates/containers/DialogContainer';
import { isActiveModal } from '@/policy/dialog';
import { TypeWithModalProps } from '@/types/modal';

import Portal from './Portal';

const Modal = ({ children, isActive, onClose }: PropsWithChildren<TypeWithModalProps>) => {
  useEffect(() => {
    const { classList } = document.body;

    if (isActive) {
      classList.add(isActiveModal);
    } else {
      classList.remove(isActiveModal);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <Portal>
      <DialogContainer onClose={onClose}>{children}</DialogContainer>
    </Portal>
  );
};

export default Modal;
