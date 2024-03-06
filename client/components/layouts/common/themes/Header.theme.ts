import { css } from '@emotion/css';

import { grid, mq } from '@/styles/mixins.style';
import { colors, float, typeface } from '@/styles/variables.style';

interface TypeHeader {
  activeSearchInput?: boolean;
  isSearchPath?: boolean;
}

const container = css`
  position: fixed;
  top: 0;
  z-index: calc(${float.space} - 1);
  width: 100%;
  background-color: ${colors.background};
  font-size: ${typeface.contents};
`;

const layout = css`
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;

  ${grid('huge')};

  ${mq('large')} {
    justify-content: space-between;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
  }
`;

const logo = ({ activeSearchInput, isSearchPath }: TypeHeader) => css`
  margin-right: 3.2rem;

  > a {
    display: block;
    padding: 0.8rem 0;
    line-height: 0;
  }

  ${mq('large', 'until')} {
    display: ${(activeSearchInput || isSearchPath) && 'none'};
  }
`;

const HeaderStyle = { container, layout, logo };

export default HeaderStyle;
