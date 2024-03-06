import { css } from '@emotion/css';

import { dropdownMenu } from '@/styles/animation.style';
import { mq, transition } from '@/styles/mixins.style';
import { colors, float, transitions, typeface } from '@/styles/variables.style';

interface TypeHeaderSelector {
  isActiveButton?: boolean;
  activeSearchInput?: boolean;
}

const container = ({ activeSearchInput }: TypeHeaderSelector) => css`
  display: ${activeSearchInput ? 'none' : 'flex'};
  color: ${colors.white};
  cursor: pointer;

  ${mq('large', 'until')} {
    display: none;
  }
`;

const icon = css`
  display: flex;
  margin-right: 0.5rem;
`;

const info = css`
  position: absolute;
  z-index: ${float.floor};
  top: 100%;
  display: none;
  flex-direction: column;
  padding: 0.4rem 0;
  background-color: ${colors.fog};
  animation: ${dropdownMenu} ${transitions.easeDuration}s ${transitions.easeBalance} forwards;
`;

const wrapper = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;

  ${mq('large')} {
    &:hover {
      ${`.${info}`} {
        display: flex;
      }

      ${`.${icon}`} {
        &:last-child {
          transform: rotate(180deg);
        }
      }
    }
  }
`;

const currentLanguage = ({ activeSearchInput }: TypeHeaderSelector) => css`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  color: ${colors.white};
  white-space: nowrap;

  ${`.${icon}`} {
    &:last-child {
      align-items: center;
      margin: 0;

      ${!activeSearchInput && transition()};

      > svg {
        width: 2.4rem;
        height: 2.4rem;
        transform: rotate(90deg);

        path {
          stroke: ${colors.white};
        }
      }
    }
  }
`;

const infoButton = ({ isActiveButton }: TypeHeaderSelector) => css`
  display: block;
  padding: 0.6rem 1.8rem;
  font-weight: ${isActiveButton ? 'bold' : 'normal'};
  font-size: ${typeface.footnote};
  color: ${isActiveButton ? colors.white : colors.hint};
  text-align: left;
  white-space: nowrap;
  transition: ${transitions.easeDuration}s;

  &:hover {
    color: ${colors.white};
    transition: ${transitions.easeDuration}s;
  }

  svg {
    margin-right: 0.8rem;
  }
`;

const HeaderSelectorStyle = { container, wrapper, icon, info, currentLanguage, infoButton };

export default HeaderSelectorStyle;
