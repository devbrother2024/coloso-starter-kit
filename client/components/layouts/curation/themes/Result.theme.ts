import { css } from '@emotion/css';

import { grid, mq, transition } from '@/styles/mixins.style';
import { colors, typeface } from '@/styles/variables.style';

const container = css`
  padding-top: 2.4rem;

  ${mq('large')} {
    padding-top: 6rem;
  }
`;

const header = css`
  display: flex;
  flex-direction: column;

  ${grid('huge')};
`;

const title = css`
  margin-bottom: 2rem;

  font-weight: bold;
  font-size: ${typeface.subTitle};
  color: ${colors.dark};

  &::after {
    content: attr(data-title);
    margin-left: 0.4rem;
    font-size: ${typeface.contents};
    color: ${colors.strong};
  }

  ${mq('large')} {
    margin-bottom: 3.5rem;
    font-size: 3rem;

    &::after {
      margin-left: 0.7rem;
      font-size: ${typeface.title};
    }
  }
`;

const info = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const infoTitle = css`
  font-weight: bold;
  font-size: ${typeface.contents};

  ${mq('large')} {
    font-size: ${typeface.subTitle};
  }
`;

const filterWrapper = css`
  position: relative;
  font-size: ${typeface.footnote};
`;

const filterLabel = css`
  margin-left: 1.4rem;
  font-size: ${typeface.contents};
  color: ${colors.strong};

  ${mq('large', 'until')} {
    margin: 0;
    padding: 0.6rem 1.2rem;
    font-size: ${typeface.footnote};
    color: ${colors.dusk};
  }
`;

const filterInput = css`
  display: none;

  &[aria-checked='true'] {
    + ${`.${filterLabel}`} {
      font-weight: bold;
      color: ${colors.gray};
    }
  }

  ${mq('large', 'until')} {
    &[aria-checked='true'] {
      + ${`.${filterLabel}`} {
        font-weight: normal;
      }
    }
  }
`;

const filter = css`
  display: flex;

  ${mq('large', 'until')} {
    position: absolute;
    top: 100%;
    right: -0.5rem;
    display: none;
    flex-direction: column;
    margin-top: 1rem;
    border-radius: 0.4rem;
    background-color: ${colors.white};
    box-shadow: 0 0.4rem 0.6rem rgb(0 0 0 / 12%);
    color: ${colors.dusk};
    white-space: nowrap;
  }
`;

const currentFilterIcon = css`
  margin-left: 0.8rem;

  ${transition()};
`;

const currentFilter = css`
  display: flex;
  color: ${colors.strong};

  &:focus {
    pointer-events: none;

    ~ ${`.${filter}`} {
      display: flex;
    }

    ${`.${currentFilterIcon}`} {
      transform: rotate(180deg);
    }
  }

  ${mq('large')} {
    display: none;
  }
`;

const SearchResultStyle = {
  info,
  title,
  header,
  filter,
  infoTitle,
  container,
  filterLabel,
  filterInput,
  currentFilter,
  filterWrapper,
  currentFilterIcon,
};

export default SearchResultStyle;
