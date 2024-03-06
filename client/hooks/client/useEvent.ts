import { KeyboardEvent } from 'react';

const useEvent = () => {
  const preventEnter = (event: KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
    event.key === 'Enter' && event.preventDefault();
  };

  return { preventEnter };
};

export default useEvent;
