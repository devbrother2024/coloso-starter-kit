import { css } from '@emotion/css';

import { mq } from '@/styles/mixins.style';
import { colors, typeface } from '@/styles/variables.style';

const container = css`
  flex: 1;
  padding-bottom: 4.8rem;
  background-color: ${colors.veiled};

  ${mq('large')} {
    min-height: calc(100vh - 6rem);
    margin-left: 3.6rem;
    padding-bottom: 10rem;
    padding-left: 3.6rem;
  }
`;

const title = css`
  display: none;

  ${mq('large')} {
    display: block;
    margin-top: 11.5rem;
    margin-bottom: 4rem;
    font-size: ${typeface.topic};
  }
`;

const tab = css`
  display: flex;
  margin-bottom: 3.2rem;
  border-bottom: 0.1rem solid ${colors.emphasis};

  .tab {
    display: block;
    width: 50%;
    padding: 1rem 1rem 0.8rem;
    border-bottom: 0.2rem solid transparent;
    font-weight: bold;
    font-size: ${typeface.contents};
    color: ${colors.fog};
    text-align: center;

    &.is-link--active {
      border-color: ${colors.secondary};
      color: ${colors.secondary};
    }
  }

  ${mq('large')} {
    justify-content: start;
    margin-bottom: 2.6rem;

    .tab {
      width: inherit;
    }
  }
`;

const PaymentMenuStyle = { container, title, tab };

export default PaymentMenuStyle;
