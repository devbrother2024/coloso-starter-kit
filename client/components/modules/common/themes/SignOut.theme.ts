import { css } from '@emotion/css';

import { mq } from '@/styles/mixins.style';
import { typeface } from '@/styles/variables.style';

const container = css`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1.6rem;
  font-size: ${typeface.footnote};

  > button {
    color: #666;
  }

  ${mq('large')} {
    display: none;
  }
`;

const SignOutTheme = { container };

export default SignOutTheme;
