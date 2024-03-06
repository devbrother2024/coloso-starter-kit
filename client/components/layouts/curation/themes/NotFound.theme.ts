import { css } from '@emotion/css';

import { grid, mq } from '@/styles/mixins.style';
import { colors, typeface } from '@/styles/variables.style';

const container = css`
  height: 100%;
  padding-top: 3.6rem;

  ${mq('medium')} {
    padding-top: 8rem;
  }
`;

const layout = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 3rem;

  ${grid('huge')};

  ${mq('medium')} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const info = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.9rem;
  font-size: ${typeface.abstract};

  ${mq('medium')} {
    margin: auto;
    font-size: ${typeface.subTitle};
  }
`;

const infoIcon = css`
  ${mq('medium', 'until')} {
    svg {
      width: 6rem;
      height: 6rem;
    }
  }
`;

const infoMessage = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.2rem;
  font-weight: bolder;
  text-align: center;

  ${mq('medium')} {
    margin-top: 2.4rem;
  }
`;

const rank = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: auto;
  padding: 3.6rem;
  border-radius: 1rem;
  background-color: #f6f6f6;

  ${mq('medium')} {
    align-items: normal;
    min-width: 33.4rem;
    padding: 3rem;
  }
`;

const rankTitle = css`
  font-size: ${typeface.contents};
  color: ${colors.secondary};

  ${mq('medium')} {
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
  }
`;

const list = css`
  display: block;
  margin-top: 2rem;
  font-weight: bolder;
  font-size: ${typeface.abstract};

  &::before {
    content: attr(data-contents);
    display: inline-block;
    min-width: 1.9rem;
    margin-right: 0.8rem;
    font-weight: normal;
    color: ${colors.strong};
    text-align: center;
  }
`;

const SearchNotFoundStyle = { container, layout, info, infoIcon, infoMessage, rank, rankTitle, list };

export default SearchNotFoundStyle;
