import { css } from '@emotion/css';

import { mq, transition } from '@/styles/mixins.style';
import { colors, float, typeface } from '@/styles/variables.style';

interface TypeProductPrice {
  isPreview?: boolean;
}

const container = ({ isPreview = false }: TypeProductPrice) => css`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 1.4rem;
  border-bottom: ${isPreview ? 'none' : '1px solid rgb(255 255 255 / 20%)'};
  font-weight: bold;
  font-size: ${typeface.footnote};

  ${mq('large')} {
    font-size: ${typeface.contents};
  }
`;

const discountInfo = css`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-top: 0.6rem;
  font-weight: bold;
  font-size: 1.3rem;

  span {
    flex-shrink: 0;
  }

  ${mq('large')} {
    font-size: ${typeface.contents};
  }
`;

const discountPercent = css`
  font-weight: bold;
  color: ${colors.secondary};
`;

const coverPrice = css`
  font-weight: normal;
  font-size: 1.4rem;
  color: ${colors.strong};
`;

const priceLabel = css`
  font-size: ${typeface.contents};
`;

const price = css`
  font-size: ${typeface.topic};

  ${mq('large')} {
    font-size: ${typeface.title};
  }
`;

const currencyButton = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: ${colors.strong};
  line-height: 2;

  span {
    flex-shrink: 0;
  }
`;

const currencyIcon = css`
  display: flex;
  margin-left: 0.4rem;

  > svg path {
    fill: ${colors.strong};
  }
`;

const modalContainer = css`
  z-index: ${float.cloud};
  opacity: 0;
  visibility: hidden;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  ${mq('large', 'until')} {
    z-index: ${float.space};
  }
`;

const modal = css`
  position: fixed;
  inset: 0;
  min-width: 32rem;
  padding: 1.2rem 1.6rem;
  border: none;
  background-color: ${colors.darkgray};
  font-size: ${typeface.footnote};
  color: ${colors.white};

  ${mq('large')} {
    position: absolute;
    top: calc(100% - 0.1rem);
    bottom: initial;
    left: 0;
    width: calc(100% - 3.2rem);
  }
`;

const modalHeader = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const currencyWrapper = css`
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;
  font-weight: normal;
  font-size: ${typeface.abstract};
`;

const currencyTitle = css`
  min-width: 3.5rem;
  margin-right: 0.5rem;
  font-weight: bold;
`;

const modalPolicy = css`
  display: flex;
  flex-direction: column;
  font-weight: normal;
  color: ${colors.strong};
`;

const checkbox = css`
  &:checked {
    ~ ${`.${modalContainer}`} {
      opacity: 1;
      visibility: visible;

      ${transition('opacity')}
      ${mq('large', 'until')} {
        &::before {
          background-color: rgb(0 0 0 / 50%);
        }
      }
    }
  }
`;

const ProductPriceStyle = {
  price,
  modal,
  checkbox,
  container,
  priceLabel,
  coverPrice,
  modalPolicy,
  modalHeader,
  currencyIcon,
  discountInfo,
  currencyTitle,
  modalContainer,
  currencyButton,
  currencyWrapper,
  discountPercent,
};

export default ProductPriceStyle;
