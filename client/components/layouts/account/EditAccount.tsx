'use client';

import EmailInput from './EmailInput';
import NameInput from './NameInput';
import PasswordInput from './PasswordInput';

const EditAccount = () => {
  return (
    <div className="me-info board-block">
      <NameInput />
      <EmailInput />
      <PasswordInput />
    </div>
  );
};

export default EditAccount;
