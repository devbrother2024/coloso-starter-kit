import { MouseEvent } from 'react';

export type TypeWithModalProps<P = unknown> = P & {
  isActive: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
};
