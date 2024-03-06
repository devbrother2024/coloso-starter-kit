import { css, keyframes } from '@emotion/css';

import { fadeIn } from '@/styles/animation.style';
import { ellipsis, mq } from '@/styles/mixins.style';
import { colors, transitions, typeface } from '@/styles/variables.style';

interface TypePagePanelTextStyle {
  isDDay?: boolean;
  isLastDay?: boolean;
  isFloating?: boolean;
  isValidPrice?: boolean;
  maxDiscountRate?: number;
  countdown?: string | null;
  isCourseBeingPrepared?: boolean;
  textColorByCoursePrepareState?: string;
}

const FLOATING_SPEED = '0.5s';

const container = ({ isFloating }: TypePagePanelTextStyle) => css`
  position: relative;
  width: 100%;
  height: 100%;

  ${mq('large')} {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${isFloating && `${floatingText} 0.6s ease-in forwards`};
  }
`;

const discountRateWrapper = ({ isFloating, maxDiscountRate, isDDay }: TypePagePanelTextStyle) => css`
  display: ${!isDDay && 'none'};
  align-items: center;
  margin-right: 0.2em;
  font-size: ${typeface.contents};

  ${mq('large')} {
    display: flex;
    margin: 0 0.2rem;
    opacity: 1;
    font-size: ${typeface.abstract};
    animation: none;

    ${isFloating &&
    css`
      display: ${!maxDiscountRate && 'none'};
      margin-right: 0.6em;
      font-weight: bold;
      font-size: ${typeface.contents};
      color: ${colors.hint};
      transition: all ease-out ${FLOATING_SPEED};
    `}
  }
`;

const discountRate = ({ isFloating, textColorByCoursePrepareState }: TypePagePanelTextStyle) => css`
  font-weight: bold;
  color: ${textColorByCoursePrepareState};

  ${mq('large')} {
    color: ${isFloating ? textColorByCoursePrepareState : colors.secondary};
  }
`;

// TODO: large media query animation 체크 -> 현재는 display 로 제어중
const priceLabel = ({ isFloating }: TypePagePanelTextStyle) => css`
  display: none;
  margin-right: 0.2em;

  ${mq('medium')} {
    font-size: ${isFloating && typeface.contents};
  }

  ${mq('large')} {
    display: ${isFloating ? 'none' : 'flex'};
    align-items: center;
    font-size: ${typeface.abstract};
  }
`;

const price = css`
  margin: 0 0.6rem;

  ${mq('large')} {
    font-size: ${typeface.title};
  }
`;

const priceInfo = ({ isFloating }: TypePagePanelTextStyle) => css`
  display: none;
  font-size: ${typeface.abstract};

  ${mq('large')} {
    display: ${!isFloating && 'flex'};
    align-items: center;
    margin-right: 0.4rem;
    font-size: ${typeface.title};
  }
`;

const priceWrapper = ({ isValidPrice, isFloating, countdown }: TypePagePanelTextStyle) => css`
  position: ${countdown ? 'absolute' : 'relative'};
  top: ${countdown && '50%'};
  display: flex;
  flex-direction: ${!countdown && 'column'};
  align-items: ${!countdown ? 'flex-start' : 'center'};
  font-weight: bold;
  animation: ${isValidPrice && !!countdown?.length && `${rollingText} 8s infinite`};

  ${isFloating &&
  css`
    display: ${!isValidPrice && 'none'};
  `}
  ${mq('medium')} {
    font-size: ${isFloating && typeface.contents};
  }

  ${mq('large')} {
    position: relative;
    flex-direction: ${!countdown && 'row'};
    align-items: ${!countdown && 'center'};
    margin-bottom: 1.6rem;
    font-size: ${typeface.abstract};
    animation: unset;

    ${isFloating &&
    css`
      flex: none;
      align-items: center;
      margin-bottom: 0;
      font-size: ${typeface.contents};
    `}
  }
`;

const defaultPrice = ({ isFloating }: TypePagePanelTextStyle) => css`
  display: none;
  font-weight: normal;
  color: ${colors.strong};

  ${mq('large')} {
    display: block;
    margin: 0 0.2rem;

    ${isFloating &&
    css`
      margin: 0;
      opacity: 0;
      font-weight: bold;
      color: ${colors.hint};
      transition: all ease-out ${FLOATING_SPEED};
      animation: ${floatingSalePrice} 1.5s forwards;
    `}
  }
`;

const message = ({ isFloating, countdown, isDDay, isValidPrice }: TypePagePanelTextStyle) => {
  return css`
    position: absolute;
    left: 0;
    top: 50%;
    overflow: ${isDDay && 'unset'};
    padding-right: 0.5rem;
    opacity: 0;
    font-size: ${!isDDay && typeface.footnote};
    text-align: left;
    animation: ${isValidPrice && !!countdown?.length && `${rollingText} 8s 4s infinite`};

    ${!isDDay && ellipsis(2)};

    &::before {
      content: attr(data-countdown-label);
      display: ${!countdown && 'none'};
      margin-right: 0.5rem;
      font-weight: bold;
    }

    ${mq('medium')} {
      font-size: ${typeface.contents};
    }

    ${mq('large')} {
      position: relative;
      display: ${!isFloating && 'none'};
      opacity: 1;
      animation: ${isFloating && `${fadeIn} 2s forwards`};
    }
  `;
};

const countdownWrapper = ({ isLastDay, textColorByCoursePrepareState }: TypePagePanelTextStyle) => css`
  display: inline-block;
  font-weight: bold;
  animation: ${!isLastDay && `${heartBeat(textColorByCoursePrepareState)} 4s infinite ${transitions.easeBalance}`};
`;

const countdown = ({ isLastDay, textColorByCoursePrepareState }: TypePagePanelTextStyle) => css`
  display: inline-block;

  ${isLastDay &&
  css`
    animation-name: ${wavy(textColorByCoursePrepareState)};
    animation-duration: 4s;
    animation-timing-function: ${transitions.easeBalance};
    animation-iteration-count: infinite;

    ${textAnimationDelay(30)}
  `}
`;

const textAnimationDelay = (limit: number) => {
  const length = Array(limit)
    .fill(0)
    .map((_, i) => ++i);
  return length.reduce((acc, cur) => {
    const delay = `&:nth-child(${cur}) { animation-delay: ${1 + cur * 0.1}s; }`;
    return acc + delay;
  }, '');
};

const wavy = (buttonColor?: string) => keyframes`
  0%, 26%, 100% {
    transform: translateY(0);
    color: ${colors.white};
  }
  13% {
    transform: translateY(-0.5rem);
    color: ${buttonColor};
  }
`;

const floatingText = keyframes`
  100% {
    flex-direction: row;
    margin: 0;
  }
`;

const heartBeat = (color?: string) => keyframes`
  10%, 100% {
    color: ${colors.white};
    transform: scale(1);
  }
  15% {
    color: ${color};
    transform: scale(1.05);
  }
  25% {
    color: ${colors.white};
    transform: scale(1);
  }
  35% {
    color: ${color};
    transform: scale(1.08);
  }
  50% {
    color: ${colors.white};
    transform: scale(1);
  }
  60% {
    color: ${color};
    transform: scale(1.08);
  }
  70% {
    color: ${colors.white};
    transform: scale(1);
  }
`;

const floatingSalePrice = keyframes`
  to {
    position: absolute;
    user-select: none;
    transform: translate3d(100%, 100%, 0);
  }
`;

const rollingText = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-30%);
  }

  5% {
    opacity: 1;
    transform: translateY(-50%);
  }

  45% {
    opacity: 1;
    transform: translateY(-50%);
  }

  50% {
    opacity: 0;
    transform: translateY(-70%);
  }

  100% {
    opacity: 0;
  }
`;

const PagePanelTextStyle = {
  discountRateWrapper,
  countdownWrapper,
  priceWrapper,
  discountRate,
  defaultPrice,
  priceLabel,
  container,
  countdown,
  priceInfo,
  message,
  price,
};

export default PagePanelTextStyle;
