import { css } from '@emotion/css';

import { mq } from '@/styles/mixins.style';
import { colors, float, transitions, typeface } from '@/styles/variables.style';

const container = css`
  position: relative;
`;

const priceLabel = css`
  display: flex;
  flex: 1;
  min-width: 7.5rem;
  font-weight: bold;
  font-size: 1.3rem;
  white-space: nowrap;
  transition: ${transitions.easeDuration}s;

  ${mq('large')} {
    min-width: 8.1rem;
    font-size: ${typeface.contents};
  }
`;

const priceInfo = css`
  display: flex;
  flex: 1;
  font-size: 1.3rem;
  transition: ${transitions.easeDuration}s;

  ${mq('large')} {
    font-size: ${typeface.contents};
  }
`;

const priceIcon = css`
  display: flex;
  transition: ${transitions.easeDuration}s;
`;

const priceWrapper = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4.2rem;
  border-bottom: 1px solid rgb(255 255 255 / 20%);

  &:hover {
    ${`.${priceLabel}`}, ${`.${priceInfo}`} {
      transform: translateX(0.5rem);
    }

    ${`.${priceIcon}`} {
      transform: translateX(-0.5rem);
    }
  }
`;

const price = css`
  margin: 0 0.4rem;
  font-weight: bold;
  color: ${colors.secondary};
`;

const modalContainer = css`
  z-index: ${float.cloud};
  display: none;

  &::before {
    content: '';
    position: fixed;
    inset: 0;
  }
`;

const modal = css`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${float.space};
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  padding: 0 2rem 4.8rem;
  border: none;
  background-color: ${colors.black};

  ${mq('medium')} {
    position: absolute;
    top: calc(100% - 0.1rem);
    z-index: ${float.cloud};
    overflow-y: hidden;
    height: auto;
    padding: 1.2rem 1.6rem 1.6rem;
    background-color: ${colors.darkgray};
    font-size: ${typeface.footnote};
  }
`;

const modalHeader = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 1.3rem;
  font-weight: bold;
  color: ${colors.white};

  ${mq('medium')} {
    position: relative;
    flex-direction: row;
    align-items: initial;
    justify-content: space-between;
  }
`;

const modalTitle = css`
  order: 1;
  width: 100%;
  font-size: ${typeface.topic};

  ${mq('medium')} {
    order: initial;
    font-size: ${typeface.footnote};
  }
`;

const modalCloseButton = css`
  margin-right: -1rem;
  padding: 1.5rem;

  svg {
    width: 1.634rem;
    height: 1.634rem;
    transition: ${transitions.easeDuration * 2}s;
  }

  path {
    stroke-width: 2;
  }

  &:hover svg {
    transition: ${transitions.easeDuration * 2}s;
    transform: rotate(90deg);
  }

  ${mq('medium')} {
    position: absolute;
    display: inline-flex;
    top: 0;
    right: 0;
    margin: -0.7rem -1rem;
    padding: 1rem;

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }

    path {
      stroke-width: 1;
    }
  }
`;

const modalCardWrapper = css`
  overflow-y: auto;
  height: auto;

  ${mq('medium')} {
    position: relative;
    height: 13rem;
    padding-right: 1rem;
    padding-bottom: 3rem;

    &::-webkit-scrollbar {
      width: 0.4rem;
      border-radius: 10rem;
      background-color: #4c4c4c;
    }

    &::-webkit-scrollbar-thumb {
      height: 0.3rem;
      border-radius: 10rem;
      background-color: #888;
    }
  }

  ${mq('large')} {
    padding-right: 2rem;
  }
`;

const modalPolicy = css`
  background-color: inherit;
  font-weight: normal;
  color: ${colors.strong};

  ${mq('medium')} {
    margin-top: 1.6rem;
    position: relative;
    line-height: 1.9rem;

    &::after {
      content: '';
      position: absolute;
      top: -6rem;
      left: 0;
      right: 0.5rem;
      height: 6rem;
      background: linear-gradient(0, #222222 30%, transparent);
    }
  }
`;

const modalPolicyText = css`
  display: flex;

  &::before {
    content: '-';
    margin-right: 0.2rem;
  }
`;

const checkbox = css`
  &:checked {
    ~ ${`.${modalContainer}`} {
      display: block;
    }
  }
`;

const VoucherListStyle = {
  price,
  modal,
  checkbox,
  container,
  priceInfo,
  priceIcon,
  modalTitle,
  priceLabel,
  modalHeader,
  modalPolicy,
  priceWrapper,
  modalContainer,
  modalPolicyText,
  modalCardWrapper,
  modalCloseButton,
};

export default VoucherListStyle;
