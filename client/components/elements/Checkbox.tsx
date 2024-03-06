import { ChangeEvent, InputHTMLAttributes } from 'react';

interface TypeCheckbox extends InputHTMLAttributes<HTMLInputElement> {
  callback: (event: ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
}

const Checkbox = ({
  value = 'Checkbox',
  checked = false,
  name = '',
  callback,
  children,
  className,
  ...props
}: TypeCheckbox) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    callback(event);
  };
  return (
    <label className="checkbox">
      <input
        {...props}
        type="checkbox"
        className="checkbox__trigger a11y"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        data-testid="checkbox"
      />
      <i className="checkbox__icon">
        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 5L5 9.5L12 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="a11y">{value}</span>
      </i>
      {/*<span className={cx('checkbox__label', { classname: classname })}>{children}</span>*/}
      <span className={`checkbox__label ${className ?? ''}`}>{children}</span>
    </label>
  );
};

export default Checkbox;
