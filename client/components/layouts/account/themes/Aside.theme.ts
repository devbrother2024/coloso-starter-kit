import { css } from '@emotion/css';

import { mq } from '@/styles/mixins.style';
import { colors, typeface } from '@/styles/variables.style';

const container = css`
  position: relative;
  font-weight: bold;
  font-size: ${typeface.title};

  ${mq('large')} {
    flex-basis: 31.2rem;
  }
`;

const contents = css`
  padding-top: 7.2rem;
  padding-bottom: 4.8rem;
  color: ${colors.white};

  ${mq('large', 'until')} {
    margin: 0 -2rem;
    padding: 2.4rem 1.6rem 7rem;
    background-color: ${colors.dark};
  }
`;

const link = css`
  display: flex;
  align-items: center;
`;

const icon = css`
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  margin-top: 0.2rem;
  margin-left: 1.2rem;
`;

const AsideStyle = { container, contents, link, icon };

export default AsideStyle;
