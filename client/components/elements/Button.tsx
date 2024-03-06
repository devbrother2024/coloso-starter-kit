import React, { MouseEvent } from 'react';

interface TypeButton {
  className?: string;
  callback?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
}

// TODO: modal 적용 후 개선
const Button = ({ className, callback, children, disabled, type, ...props }: TypeButton) => {
  return (
    <button className={`btn ${className ?? ''}`} type={type} disabled={disabled} onClick={callback} {...props}>
      {children}
    </button>
  );
};

export default Button;
