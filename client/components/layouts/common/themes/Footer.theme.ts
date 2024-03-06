import { css } from '@emotion/css';

import { grid, mq, transition } from '@/styles/mixins.style';
import { colors, typeface } from '@/styles/variables.style';

const container = css`
  padding: 4rem 0;
  background-color: ${colors.fog};
  color: ${colors.strong};

  ${mq('large')} {
    padding-top: 4.8rem;
  }
`;

const layout = css`
  ${grid('huge')};
`;

const infoLayout = css`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 2.1rem;
  padding-bottom: 2rem;

  ${mq('large')} {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 2rem;
    border-bottom: 0.1rem solid ${colors.disabled};
  }
`;

const infoWrapper = css`
  position: relative;
  padding: 1rem 0;
  font-size: ${typeface.contents};
  color: ${colors.hint};

  ${mq('large')} {
    padding: 0 1.35rem;

    &:not(&:last-child)::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 0.1rem;
      height: 1.2rem;
      margin: auto;
      background-color: ${colors.disabled};
    }
  }
`;

const infoContainer = css`
  li {
    flex-shrink: 0;
  }

  ${mq('medium')} {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(2, max-content);
    grid-auto-flow: column;
    column-gap: 10.7rem;
  }

  ${mq('large')} {
    display: flex;
    flex-direction: row;
    column-gap: unset;

    ${`.${infoWrapper}`} {
      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border: 0;
      }
    }
  }
`;

const info = css`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0.1rem;
    background-color: ${colors.hint};

    ${transition()};
  }

  &:hover,
  &:focus {
    color: ${colors.white};

    &::before {
      width: 100%;
    }
  }
`;

const languageSelector = css`
  margin-bottom: 2rem;
  font-size: ${typeface.contents};
  color: ${colors.white};

  ${mq('large')} {
    margin-bottom: 0;
  }
`;

const mailContainer = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;

  ${mq('large')} {
    flex-direction: row;
  }
`;

const mailWrapper = css`
  margin-right: 3.2rem;
  font-weight: bold;
  font-size: ${typeface.footnote};
  color: ${colors.label};

  ${mq('large')} {
    padding: 0;
    border: none;
  }
`;

const mail = css`
  ${info};

  margin-left: 1.2rem;
  font-weight: normal;
  color: ${colors.veiled};
`;

const contactLayout = css`
  ${mq('large')} {
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: 1fr auto;
  }
`;

const serviceLayout = css`
  display: flex;
  flex-direction: column;

  ${mq('large')} {
    flex-direction: column;
    grid-row-end: span 2;
    align-items: flex-end;
    justify-content: normal;
  }
`;

const appStoreIconWrapper = css`
  margin-bottom: 3rem;

  ${mq('large')} {
    margin-bottom: 0;
  }
`;

const appStoreIcon = css`
  &:last-child {
    margin-left: 1.3rem;
  }
`;

const companyLayout = css`
  display: flex;
  flex-direction: column-reverse;
  padding-top: 3rem;
  border-top: 0.1rem solid ${colors.disabled};

  ${mq('medium')} {
    flex-direction: row;
    justify-content: space-between;
  }

  ${mq('large')} {
    padding: 0;
    border: none;
  }
`;

const companyInfoWrapper = css`
  display: flex;
  flex-wrap: wrap;
  max-width: 25rem;

  ${mq('medium')} {
    max-width: 55rem;
    font-size: ${typeface.footnote};
  }
`;

const companyInfo = css`
  position: relative;
  display: flex;
  align-items: center;
  height: min-content;
  margin-bottom: 0.3rem;
  padding-right: 1.6rem;

  &:not(&:last-child)::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0.8rem;
    bottom: 0;
    width: 0.1rem;
    height: 1.2rem;
    margin: auto;
    background-color: ${colors.disabled};
  }

  ${mq('medium')} {
    &:nth-child(3)::after {
      display: none;
    }
  }
`;

const snsContainer = css`
  display: flex;
  height: min-content;
  margin-bottom: 2.4rem;

  ${mq('medium')} {
    margin-bottom: 0;
  }
`;

const snsIcon = css`
  display: flex;
  align-items: center;
  margin: 0 1rem;

  &:first-child {
    margin-left: 0;
  }

  ${mq('large')} {
    &:last-child {
      margin-right: 2.6rem;
    }
  }
`;

const dropdownContainer = css`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  ${mq('large')} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0;

    a {
      padding-bottom: 1.4rem;
    }
  }
`;

const FooterStyle = {
  container,
  layout,
  infoLayout,
  infoContainer,
  infoWrapper,
  info,
  mailContainer,
  mailWrapper,
  mail,
  languageSelector,
  contactLayout,
  serviceLayout,
  appStoreIconWrapper,
  appStoreIcon,
  companyLayout,
  companyInfoWrapper,
  companyInfo,
  snsContainer,
  snsIcon,
  dropdownContainer,
};

export default FooterStyle;
