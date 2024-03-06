import { MouseEvent, PropsWithChildren, Suspense } from 'react';

import Loader from '@/components/elements/Loader';

interface TypeDialogContainer {
  onClose: (event?: MouseEvent<HTMLElement>) => void;
}

const DialogContainer = ({ children, onClose }: PropsWithChildren<TypeDialogContainer>) => {
  return (
    <section className="modal-dialog" data-testid="modal-dialog" onClick={onClose}>
      <div className="modal-dialog__box">
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </div>
    </section>
  );
};

export default DialogContainer;
