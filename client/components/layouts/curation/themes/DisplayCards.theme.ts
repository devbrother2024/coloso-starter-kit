import { css } from '@emotion/css';

import { ellipsis, grid, mq, transition } from '@/styles/mixins.style';
import { colors, typeface } from '@/styles/variables.style';

interface TypeDisplayCardsStyle {
  isSearchResultPage?: boolean;
}

const container = ({ isSearchResultPage }: TypeDisplayCardsStyle) => css`
  margin-top: ${isSearchResultPage ? '0' : '2.4rem'};

  ${grid('huge')};

  ${mq('large')} {
    margin-top: ${isSearchResultPage ? '0' : '6rem'};
  }
`;

const title = css`
  display: flex;
  justify-content: space-between;
  font-size: ${typeface.abstract};

  ${mq('large')} {
    font-size: ${typeface.subTitle};
  }
`;

const cardWrapper = css`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.8rem -1.6rem;
  padding-top: 1.6rem;

  ${mq('large')} {
    padding-top: 2rem;
    margin: 0 -1.6rem -3.2rem;
  }
`;

const card = css`
  flex-grow: 0;
  flex-basis: 50%;
  box-sizing: border-box;
  margin-bottom: 1.6rem;
  padding: 0 0.8rem;

  ${mq('medium')} {
    flex-basis: 25%;
  }

  ${mq('large')} {
    margin-bottom: 3.2rem;
    padding: 0 1.6rem;
  }
`;

const cardInfo = css`
  overflow: hidden;
  margin-bottom: 1.2rem;
  border-radius: 0.6rem;

  ${mq('large')} {
    margin-bottom: 1.6rem;
  }
`;

const cardImage = css`
  &:hover {
    transform: scale(1.025);
  }

  ${transition()};
`;

const cardTitle = css`
  margin-bottom: 0.4rem;
  font-size: ${typeface.footnote};

  ${ellipsis(2)};

  ${mq('large')} {
    margin-bottom: 1rem;
    font-size: ${typeface.abstract};
  }
`;

const cardAuthor = css`
  font-size: ${typeface.footnote};
  color: ${colors.strong};

  ${ellipsis(1)};

  ${mq('large')} {
    font-size: ${typeface.contents};
  }
`;

const DisplayCardsStyle = { container, title, cardWrapper, card, cardInfo, cardImage, cardTitle, cardAuthor };

export default DisplayCardsStyle;
