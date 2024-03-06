'use client';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { cx } from '@emotion/css';

import { IconArrowRoundDownRed } from '@/assets/icons';
import useTranslation from '@/hooks/client/useTranslation';

interface TypeDropdown {
  label: string;
  itemsObject: { [key: string]: string };
  item?: string | null;
  setItem: Dispatch<SetStateAction<any>>;
  disabled?: boolean;
  theme?: string;
  helperText?: string;
}

const Dropdown = ({ label, itemsObject, item, setItem, disabled, theme, helperText }: TypeDropdown) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const t = useTranslation({ scope: 'SiteGlobal' });

  const onCloseDropdown = () => {
    setShowDropdown(false);
  };

  const onToggleDropdown = () => {
    setShowDropdown((showDropdown) => !showDropdown);
  };

  useEffect(() => {
    if (!item) return;
    setItem(item);
  }, [item, setItem]);

  if (disabled) {
    return (
      <fieldset className="board-block__col">
        <label className="board-block__label">
          {t(label)}
          <span className="auth-dropdown__helper">* {helperText}</span>
        </label>
        <div className="board-block__item">
          <span>{item ? itemsObject[item] : '-'}</span>
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className="board-block__col">
      <div
        className={cx('auth-dropdown', {
          'auth-dropdown--hidden': !showDropdown,
        })}
        onClick={(event) => event.stopPropagation()}
      >
        <label
          className={cx('board-block__label', {
            'board-block__label-dark': theme === 'dark',
          })}
        >
          {t(label)}
          <span className="auth-dropdown__helper">* {helperText}</span>
        </label>

        <button
          type="button"
          className={cx('auth-dropdown__selected', {
            'auth-dropdown__selected-dark': theme === 'dark',
          })}
          onClick={onToggleDropdown}
          onBlur={onCloseDropdown}
        >
          <span
            className={cx('auth-dropdown__field', {
              'auth-dropdown__field-dark': theme === 'dark',
            })}
          >
            {item ? itemsObject[item] : '-'}
          </span>
          <IconArrowRoundDownRed className="icon icon--tail" />
        </button>

        <div
          className={cx('auth-dropdown__list', {
            'auth-dropdown__list-dark': theme === 'dark',
          })}
        >
          {Object.entries(itemsObject).map(([key, value]) => (
            <div
              className={cx('auth-dropdown__list-item', {
                'auth-dropdown__list-item-dark': theme === 'dark',
              })}
              key={key}
            >
              <input id={key} name="auth-group" className="a11y" type="radio" />
              <label
                htmlFor={key}
                className={cx('auth-dropdown__label', {
                  'auth-dropdown__label-dark': theme === 'dark',
                })}
                onPointerDown={(e) => {
                  e.preventDefault();
                  onCloseDropdown();
                  setItem(key);
                }}
              >
                {value}
              </label>
            </div>
          ))}
        </div>
      </div>
    </fieldset>
  );
};

export default Dropdown;
