import { MouseEvent, useState } from 'react';

// TODO: 버블링 방지 event handler 정리 필요
export const onStopPropagationDialog = (event: MouseEvent<HTMLElement>) => {
  event.stopPropagation();
};

const useDialog = () => {
  const [isActive, setIsActive] = useState(false);

  const onCloseDialog = (event?: MouseEvent<HTMLElement | HTMLButtonElement>) => {
    event && event.stopPropagation();
    setIsActive(false);
  };

  const onOpenDialog = () => {
    setIsActive(true);
  };

  return {
    isActiveDialog: isActive,
    onCloseDialog,
    onOpenDialog,
  };
};

export default useDialog;
