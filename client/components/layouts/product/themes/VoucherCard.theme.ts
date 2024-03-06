import { css } from '@emotion/css';

import { ellipsis, mq } from '@/styles/mixins.style';
import { colors, transitions, typeface } from '@/styles/variables.style';

interface TypeVoucherCardStyle {
  isRedeemed?: boolean;
  activeModal?: boolean;
  downloadable?: boolean;
}

// TODO: 바우처 로딩 상태일 때 cursor, user-select 스타일 추가

const container = ({ isRedeemed, downloadable }: TypeVoucherCardStyle) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.2rem;
  padding: 0.8rem 1.6rem 0.8rem 1.2rem;
  border: 0.1rem solid ${colors.disabled};
  border-radius: 0.5rem;
  cursor: ${!downloadable && 'initial'};
  transition: ${transitions.easeDuration}s;

  &:hover {
    background-color: ${!downloadable && 'initial'};
  }

  ${isRedeemed &&
  css`
    border: none;
    background-color: rgb(255 255 255 / 15%);
    cursor: initial;
    user-select: none;

    &:hover {
      background-color: rgb(255 255 255 / 15%);
    }
  `}

  ${mq('medium')} {
    &:last-child {
      margin-bottom: unset;
    }
  }

  ${mq('large')} {
    &:hover {
      background-color: ${colors.fog};
      transition: ${transitions.easeDuration}s;
    }
  }
`;

const textWrapper = css`
  color: ${colors.white};
  text-align: left;
`;

const discountPrice = ({ isRedeemed, downloadable }: TypeVoucherCardStyle) => css`
  display: flex;
  align-items: center;
  height: 2.4rem;
  font-weight: bold;
  color: ${isRedeemed && downloadable ? colors.hint : colors.secondary};
`;

const title = ({ isRedeemed, downloadable }: TypeVoucherCardStyle) => css`
  font-weight: normal;
  font-size: ${typeface.footnote};
  color: ${isRedeemed && downloadable && colors.hint};
  white-space: normal;
  word-break: break-word;

  ${ellipsis(1)};
`;

const period = css`
  color: ${colors.strong};
`;

const icon = ({ isRedeemed }: TypeVoucherCardStyle) => css`
  svg path {
    stroke: ${isRedeemed && colors.hint};
  }
`;

const VoucherCardStyle = { container, textWrapper, discountPrice, title, period, icon };

export default VoucherCardStyle;
