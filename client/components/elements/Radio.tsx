import { InputHTMLAttributes, ChangeEvent } from 'react';

interface TypeRadio extends InputHTMLAttributes<HTMLInputElement> {
  callback: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({
  id,
  value = 'Radio',
  checked,
  defaultChecked,
  disabled = false,
  name = '',
  callback,
  children,
  className,
  ...props
}: TypeRadio) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    callback(event);
  };

  return (
    <div className={`radio ${className || ''}`} data-testid={value}>
      <input
        {...props}
        type="radio"
        className="radio-trigger a11y"
        defaultChecked={defaultChecked}
        checked={checked}
        value={value}
        id={id}
        name={name}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={id} className="radio-label">
        <i className="icon--radio">
          <span className="a11y">{value}</span>
        </i>
        {children}
      </label>
    </div>
  );
};

export default Radio;
