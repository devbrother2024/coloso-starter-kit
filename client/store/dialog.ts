import { ReactElement } from 'react';

import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

interface TypeDialogStore {
  isActive: boolean;
  render: ReactElement | null;
  type: string | null;
}

const initialDialogStore: TypeDialogStore = {
  isActive: false,
  render: null,
  type: null,
};

let dialogStore = proxy<TypeDialogStore>({ ...initialDialogStore });

const initializeDialogStore = () => {
  dialogStore = Object.assign(dialogStore, { ...initialDialogStore });
};

devtools(dialogStore, { name: 'dialog' });

export { dialogStore, initializeDialogStore };
