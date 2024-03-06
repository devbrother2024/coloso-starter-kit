import { css } from '@emotion/css';

import { arrowTurnUp } from '@/styles/animation.style';
import { mq, transition } from '@/styles/mixins.style';
import { colors, float } from '@/styles/variables.style';

interface TypeLanguageDropdown {
  isActiveButton?: boolean;
}

const currentSelector = css`
  display: flex;
  align-items: center;
  width: inherit;
  height: 3.6rem;
  padding: 0.6rem 1.1rem;
  border-radius: 0.4rem;
  background-color: ${colors.dusk};
  color: inherit;
  cursor: pointer;
`;

const currentLabel = css`
  margin-right: 6rem;
`;

const arrowIcon = css`
  display: flex;

  svg {
    min-width: 1.7rem;

    path {
      stroke: ${colors.$secondary};
    }
  }
`;

const list = css`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: ${float.cloud};
  display: none;
  box-sizing: border-box;
  width: 100%;
  padding: 0 1.2rem;
  border-radius: 0.4rem;
  background-color: ${colors.dusk};
  white-space: nowrap;
`;

const buttonWrapper = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  &:not(:first-of-type) {
    border-top: 1px solid ${colors.disabled};
  }

  &:hover {
    color: ${colors.$secondary};

    svg {
      path {
        stroke: ${colors.$secondary};
      }
    }
  }

  ${transition()};
`;

const button = ({ isActiveButton }: TypeLanguageDropdown) => css`
  display: flex;
  width: 100%;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  cursor: pointer;

  font-weight: ${isActiveButton && 'bold'};
`;

const container = css`
  position: relative;
  width: max-content;
  padding-bottom: 0.5rem;
  font-size: 1.4rem;
  color: ${colors.white};
  user-select: none;

  &:hover ${`.${list}`} {
    display: block;
  }

  &:hover ${`.${arrowIcon}`} {
    svg {
      ${arrowTurnUp};
    }
  }

  ${mq('large')} {
    margin-left: 0;
  }
`;

const globeIcon = css`
  display: flex;
  margin-right: 0.8rem;
`;

const LanguageDropdownStyle = {
  currentSelector,
  currentLabel,
  buttonWrapper,
  container,
  arrowIcon,
  globeIcon,
  list,
  button,
};

export default LanguageDropdownStyle;
