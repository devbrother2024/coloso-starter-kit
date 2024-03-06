import { css } from '@emotion/css';

import { drawBackDrop, fadeIn, narrowBackDrop } from '@/styles/animation.style';
import { grid, mq, transition } from '@/styles/mixins.style';
import { colors, float, transitions, typeface } from '@/styles/variables.style';

interface TypeNavigation {
  isMain?: boolean;
  isPrimary?: boolean;
  focusStyle?: boolean;
  focusImage?: boolean;
  isSearchPath?: boolean;
  isAuthorized?: boolean;
  activeNavigation?: boolean;
  activeSearchInput?: boolean;
}

const container = ({ activeSearchInput, activeNavigation }: TypeNavigation) => css`
  display: flex;
  align-items: center;
  color: ${colors.white};

  ${grid('huge')};

  ${mq('large', 'until')} {
    display: ${activeSearchInput && 'none'};
    padding: 0;

    ${activeNavigation &&
    css`
      &::before {
        content: '';
        position: fixed;
        inset: 0;
        z-index: ${float.cloud};
        height: 100dvh;
        background-color: rgb(0 0 0 / 50%);
      }
    `}
  }
`;

const category = ({ activeNavigation }: TypeNavigation) => css`
  display: flex;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${mq('large', 'until')} {
    display: none;
    color: ${colors.black};

    ${activeNavigation &&
    css`
      position: fixed;
      inset: 0;
      left: unset;
      z-index: ${float.cloud};
      display: flex;
      flex-direction: column;
      overflow: scroll;
      width: 100%;
      max-width: 37.5rem;
      margin: 0;
      padding-top: 7rem;
      background-color: ${colors.white};
      transform-origin: right;
      animation: ${narrowBackDrop} ${transitions.easeDuration}s ${transitions.easeBalance};
    `}
  }

  ${mq('medium', 'until')} {
    max-width: none;
  }
`;

const promotionListWrapper = css`
  ${mq('large')} {
    display: none;
  }
`;

const promotionList = css`
  ${mq('large')} {
    display: flex;
  }
`;

const categoryMenu = ({ activeSearchInput }: TypeNavigation) => css`
  position: relative;
  display: flex;
  align-items: center;
  list-style: none;
  color: ${colors.black};
  cursor: pointer;
  pointer-events: none;

  &::-webkit-details-marker {
    display: none;
  }

  ${mq('large')} {
    z-index: ${!activeSearchInput && float.cloud + 1};
    margin-bottom: -0.1rem;
    border-bottom: 0.1rem solid transparent;
    color: ${colors.hint};
    pointer-events: auto;
  }
`;

const categoryMenuIcon = css`
  display: none;
  align-items: center;

  ${mq('large')} {
    display: inline-flex;

    > svg path {
      stroke: ${colors.hint};
    }
  }
`;

const categoryMenuText = css`
  display: inline-flex;
  align-items: baseline;
  padding: 1.8rem 2rem 0;
  font-weight: bold;
  font-size: ${typeface.subTitle};
  line-height: 1;

  ${mq('large')} {
    padding: 1.7rem 0.8rem;
    font-size: ${typeface.contents};
  }
`;

const categoryList = css`
  ${mq('large')} {
    position: absolute;
    z-index: 101;
    display: none;
    justify-content: space-between;
    width: 100%;
    max-width: 112rem;
    padding-top: 3.3rem;
    padding-bottom: 3rem;
    cursor: default;
    transform-origin: center top;
    animation: ${drawBackDrop} ${transitions.easeDuration}s ${transitions.easeBalance};

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      z-index: -1;
      width: 200vw;
      height: 100%;
      border-top: 0.1rem solid ${colors.fog};
      background-color: ${colors.black};
    }
  }
`;

const categoryContainer = css`
  padding-bottom: 1.6rem;

  ${mq('large')} {
    padding-bottom: 0;

    &:hover {
      ${`.${categoryMenu({})}`},
      ${`.${categoryMenuIcon}`} svg path {
        color: ${colors.white};
        stroke: ${colors.white};
      }

      ${`.${categoryMenu({})}`} {
        border-color: ${colors.secondary};

        ${transition()}
      }

      ${`.${categoryList}`} {
        display: flex;
      }
    }
  }
`;

const categoryItem = ({ isPrimary }: TypeNavigation) => css`
  margin-top: ${!isPrimary && '1.4rem'};
  margin-bottom: 1.4rem;
  font-size: ${typeface.abstract};
  color: ${colors.dusk};

  > a {
    display: block;
    padding: 0.5rem 0 0.5rem 3.6rem;
  }

  [data-show-all] {
    position: relative;
    color: transparent;

    &::after {
      content: attr(data-show-all);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: ${colors.dusk};
      white-space: nowrap;
    }
  }

  ${mq('large')} {
    margin: 0;
    font-weight: ${isPrimary && 'bold'};
    font-size: ${isPrimary ? typeface.contents : typeface.footnote};
    color: ${colors.hint};

    > a {
      padding: 0.4rem;
    }

    [data-show-all] {
      color: inherit;

      ::after {
        content: none;
      }
    }
  }
`;

const primaryCategoryTitle = css`
  position: relative;
  margin: 0.3rem 0;
  padding: 1.7rem 2rem;
  list-style: none;
  font-weight: bold;
  font-size: ${typeface.abstract};
  color: ${colors.dark};
  cursor: pointer;

  &::-webkit-details-marker {
    display: none;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 2rem;
    width: 1.3rem;
    height: 0.2rem;
    background-color: ${colors.black};
    transform: translateY(-50%);
  }

  &::after {
    transform: translateY(-50%) rotate(90deg);
  }

  ${mq('large')} {
    display: none;
  }
`;

const primaryCategoryList = css`
  display: none;

  ${mq('large')} {
    display: block;
  }
`;

const primaryCategory = css`
  [data-open='true'] {
    ${`.${primaryCategoryTitle}`} {
      &::after {
        display: none;
      }
    }

    ${`.${primaryCategoryList}`} {
      display: block;
    }
  }

  ${mq('large')} {
    animation: ${fadeIn} ${transitions.easeDuration}s ${transitions.easeBalance} forwards;

    ${`.${primaryCategoryList}`} > ${`.${categoryItem({})}`} {
      transition: ${transitions.easeDuration}s;

      &:hover {
        color: ${colors.white};
        transition: ${transitions.easeDuration}s;
      }
    }
  }
`;

const promotionMenu = ({ isSearchPath }: TypeNavigation) => css`
  display: ${isSearchPath ? 'none' : 'flex'};
  align-items: center;
  overflow-x: scroll;
  max-width: none;
  margin: 0 -0.8rem;
  padding: 0 2rem;
  color: ${colors.hint};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${mq('large')} {
    display: flex;
  }
`;

const promotionItem = ({ isMain }: TypeNavigation) => css`
  position: relative;
  display: flex;
  align-items: center;
  white-space: nowrap;

  ${transition('color')};

  ${isMain &&
  css`
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: calc(100% - 1.6rem);
      height: 0.2rem;
      background-color: ${colors.white};
      transform: translateX(-50%);
    }
  `}
  ${mq('large')} {
    &:first-child {
      display: none;
    }
  }
`;

const promotionItemLink = ({ focusStyle, focusImage, isMain }: TypeNavigation) => css`
  display: flex;
  align-items: baseline;
  width: 100%;
  padding: 1.2rem 0.8rem 1.3rem;
  font-weight: ${(isMain || focusStyle) && 'bold'};
  color: ${(isMain || focusStyle) && colors.white};

  ${focusImage &&
  css`
    &::after {
      content: '';
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin-left: 0.2rem;
      border-radius: 50%;
      background-color: ${colors.edge};
      transform: translateY(0.2rem);
    }
  `}
  > strong {
    padding: 0.3rem 0 0.2rem 1.2rem;
    font-weight: bold;
    font-size: ${typeface.subTitle};
    color: ${colors.black};
  }

  ${mq('large')} {
    margin: 0 1rem;
    padding-top: 1.7rem;
    padding-bottom: 1.7rem;
    line-height: 1;

    strong {
      padding-top: 0;
      font-size: ${typeface.contents};
      color: ${colors.white};
    }
  }
`;

const menuIcon = ({ activeSearchInput, isAuthorized, activeNavigation, isSearchPath }: TypeNavigation) => css`
  position: absolute;
  top: 0.75rem;
  right: 1.2rem;
  z-index: ${float.space};
  display: ${isSearchPath ? 'none' : 'flex'};
  align-items: center;
  justify-content: center;
  padding: 0.8rem;

  > i {
    display: ${activeSearchInput ? 'none' : 'flex'};
    align-items: center;

    > svg path {
      stroke: ${activeNavigation && isAuthorized && colors.white};
    }
  }

  ${mq('large')} {
    display: none;
  }
`;

const banner = css`
  position: relative;
  z-index: ${float.floor};
  display: none;
  width: 18.4rem;
  min-width: 18.4rem;
  height: 20rem;
  margin-right: 1rem;

  ${mq('full')} {
    display: block;
  }
`;

const NavigationStyle = {
  banner,
  category,
  menuIcon,
  container,
  categoryMenu,
  categoryItem,
  categoryList,
  promotionItem,
  promotionList,
  promotionMenu,
  primaryCategory,
  categoryMenuIcon,
  categoryMenuText,
  promotionItemLink,
  categoryContainer,
  primaryCategoryList,
  promotionListWrapper,
  primaryCategoryTitle,
};

export default NavigationStyle;
