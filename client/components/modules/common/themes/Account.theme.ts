import { css } from '@emotion/css';

import { dropdownMenu, narrowBackDrop } from '@/styles/animation.style';
import { mq, transition } from '@/styles/mixins.style';
import { colors, float, transitions, typeface } from '@/styles/variables.style';

interface TypeAccount {
  isAuthorized?: boolean;
  activeNavigation?: boolean;
  activeSearchInput?: boolean;
}

const container = ({ activeNavigation, isAuthorized, activeSearchInput }: TypeAccount) => css`
  display: flex;
  visibility: ${activeSearchInput && 'hidden'};
  color: ${colors.white};
  pointer-events: ${activeSearchInput && 'none'};

  ${mq('large', 'until')} {
    position: fixed;
    top: 0;
    right: 0;
    z-index: ${float.space};
    display: ${!activeNavigation && 'none'};
    align-items: center;
    width: 100%;
    max-width: 37.5rem;
    height: 5.4rem;
    background-color: ${isAuthorized ? colors.black : '#f9f9f9'};
    transform-origin: right;
    animation: ${narrowBackDrop} ${transitions.easeDuration}s ${transitions.easeBalance};
  }

  ${mq('medium', 'until')} {
    left: 0;
    max-width: none;
  }
`;

const classroomLink = ({ activeSearchInput }: TypeAccount) => css`
  display: none;
  align-items: center;
  padding: 0 1rem;
  white-space: nowrap;

  ${mq('large')} {
    display: ${!activeSearchInput && 'flex'};
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

const login = ({ isAuthorized, activeSearchInput }: TypeAccount) => css`
  display: flex;
  align-items: center;
  padding-left: 2rem;
  color: ${!isAuthorized && colors.black};

  ${`.${icon}`} {
    &:last-child {
      margin-left: 0.7rem;

      > svg path {
        stroke: ${isAuthorized && colors.white};
      }
    }
  }

  ${mq('large')} {
    margin-right: -0.3rem;
    padding: 0.5rem 0.5rem 0.5rem 1.5rem;
    color: ${colors.white};
    white-space: nowrap;

    ${`.${icon}`} {
      &:first-child {
        display: none;
      }

      &:last-child {
        display: ${!isAuthorized && 'none'};
        align-items: center;
        margin: 0;

        ${!activeSearchInput && transition()};

        > svg {
          width: 2.4rem;
          height: 2.4rem;
          transform: rotate(90deg);
        }
      }
    }
  }
`;

// TODO: after content 언어별로 변경
const loginText = ({ isAuthorized }: TypeAccount) => css`
  font-weight: bold;

  ${mq('large')} {
    font-weight: ${!isAuthorized && 'normal'};

    &::after {
      display: ${!isAuthorized && 'none'};
    }
  }
`;

const infoButton = css`
  display: block;
  padding: 0.6rem 1.8rem;
  font-size: ${typeface.footnote};
  color: ${colors.white};
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  transition: ${transitions.easeDuration}s;

  &:hover {
    text-shadow: 0 0 0.1rem ${colors.white};
    transition: ${transitions.easeDuration}s;
  }
`;

const AccountStyle = { container, classroomLink, wrapper, login, icon, loginText, info, infoButton };

export default AccountStyle;
