import { css } from '@emotion/css';

import { fadeIn } from '@/styles/animation.style';
import { ellipsis, mq, transition } from '@/styles/mixins.style';
import { colors, float, layouts, transitions, typeface } from '@/styles/variables.style';

interface TypeSearchInput {
  keyword?: string;
  isKeyword?: boolean;
  isSearchPath?: boolean;
  activeSearchInput?: boolean;
  recommendedKeywords?: string[];
  isRecommendedKeywords?: boolean;
}

const INITIAL_FORM_WIDTH = '29rem';
const EXPANDED_FORM_WIDTH = '56rem';

const container = ({ activeSearchInput }: TypeSearchInput) => css`
  display: flex;
  align-items: center;
  justify-content: ${!activeSearchInput && 'flex-end'};
  width: 100%;
  margin-right: auto;

  ${mq('large')} {
    justify-content: space-between;

    ${transition()};
  }
`;

const form = ({ activeSearchInput, isSearchPath }: TypeSearchInput) => {
  const initialFormMargin = `calc(100% - ${INITIAL_FORM_WIDTH})`;
  const expandedFormMargin = `calc((100% - ${EXPANDED_FORM_WIDTH}) / 2)`;

  return css`
    display: ${activeSearchInput || isSearchPath ? 'flex' : 'none'};
    align-items: center;
    width: 100%;
    height: 2.4rem;
    padding: 0.5rem 0.9rem 0.5rem 0.6rem;
    border-radius: ${layouts.headerLaptop};
    background-color: ${colors.veiled};

    i {
      display: flex;
    }

    ${mq('large')} {
      display: flex;
      justify-content: normal;
      width: ${!activeSearchInput && INITIAL_FORM_WIDTH};
      margin-right: ${activeSearchInput ? expandedFormMargin : initialFormMargin};
      margin-left: ${activeSearchInput && expandedFormMargin};

      ${transition()};
    }
  `;
};

const input = css`
  width: 100%;
  border: 0;
  font-size: ${typeface.contents};
  color: ${colors.fog};
  caret-color: ${colors.secondary};

  &::placeholder {
    color: ${colors.label};
  }

  &:placeholder-shown {
    font-size: ${typeface.footnote};

    ${ellipsis(1)};
  }
`;

const panel = css`
  position: absolute;
  top: 5rem;
  left: 0;
  z-index: ${float.cloud};
  width: 100%;
  height: 100vh;
  background-color: ${colors.black};
  touch-action: none;

  ${mq('large')} {
    top: ${layouts.headerMobile};
    left: -100%;
    width: 300%;
    background-color: rgb(0 0 0 / 50%);
  }
`;

const panelLayout = ({ isRecommendedKeywords }: TypeSearchInput) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
  background-color: ${colors.black};
  visibility: ${isRecommendedKeywords ? 'visible' : 'hidden'};

  ${mq('large')} {
    padding: 2rem 0 2.2rem;
    animation: ${fadeIn} ${transitions.easeDuration}s ${transitions.easeBalance};
  }
`;

const panelTitle = css`
  display: flex;
  justify-content: center;
  padding-bottom: 2.4rem;
  font-size: ${typeface.abstract};
  color: ${colors.strong};

  ${mq('large')} {
    width: ${EXPANDED_FORM_WIDTH};
    padding-bottom: 2rem;
  }
`;

const keywordList = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 2rem;

  ${mq('large')} {
    width: ${EXPANDED_FORM_WIDTH};
    padding: 0;
  }
`;

const keyword = css`
  display: block;
  margin: 0.5rem 0.4rem;
  padding: 0.8rem 1.4rem;
  border: 0.1rem solid ${colors.disabled};
  border-radius: ${layouts.headerLaptop};
  font-size: ${typeface.footnote};
  color: ${colors.hint};
  cursor: pointer;
  transition: ${transitions.easeDuration}s;

  &:hover {
    background-color: ${colors.veiled};
    box-shadow: 0 0.3rem 0.8rem rgb(0 0 0 / 20%);
    color: ${colors.gray};
    transition: ${transitions.easeDuration}s;
  }
`;

const toggleButton = ({ activeSearchInput, isSearchPath }: TypeSearchInput) => css`
  display: flex;
  margin-right: ${activeSearchInput || isSearchPath ? '-0.5rem' : '3.2rem'};
  margin-left: 1rem;
  padding: 0.5rem;
  cursor: pointer;

  > i {
    display: flex;
  }

  ${mq('large')} {
    display: ${!activeSearchInput && 'none'};
    transform: translateX(6rem);
  }
`;

const SearchInputTheme = { container, form, input, panel, panelLayout, panelTitle, keywordList, keyword, toggleButton };

export default SearchInputTheme;
