import { css } from '@emotion/css';

import { ellipsis } from '@/styles/mixins.style';
import { colors, typeface } from '@/styles/variables.style';

const container = css`
  box-sizing: border-box;
`;

const cardCatalog = css`
  display: flex;
`;

const cardBlock = css`
  overflow: hidden;
  padding: 1.6rem;
  border-radius: 1.6rem;
  background-color: ${colors.white};
  box-shadow: 0 0.4rem 1.6rem rgb(0 0 0 / 8%);
`;

const cardInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
`;

const cardImage = css`
  object-fit: cover;
  width: 7.8rem;
  height: 7.8rem;
  border-radius: 1rem;
`;

const cardTitle = css`
  ${ellipsis(3)}
  font-weight: bold;
  font-size: ${typeface.contents};
  color: ${colors.dark};
  line-height: 1.8rem;
`;

const cardLecture = css`
  ${ellipsis(1)}
  margin-top: 0.5rem;
  font-size: ${typeface.contents};
  color: ${colors.fog};
`;

const cardPeriod = css`
  margin: 1.2rem 0;
  padding: 1rem 0;
  border-radius: 0.5rem;
  background-color: #f2f2f2;
  font-size: ${typeface.footnote};
  color: ${colors.label};
  line-height: 1.5rem;
  text-align: center;
`;

const cardDate = css`
  margin-right: 0.6rem;
  font-weight: 500;
  color: ${colors.disabled};
`;

const MyClassCardStyle = {
  container,
  cardBlock,
  cardCatalog,
  cardInfo,
  cardImage,
  cardTitle,
  cardLecture,
  cardPeriod,
  cardDate,
};

export default MyClassCardStyle;
