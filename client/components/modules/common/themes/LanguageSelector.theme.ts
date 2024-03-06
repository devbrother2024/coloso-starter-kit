import { css } from '@emotion/css';

import { mq } from '@/styles/mixins.style';
import { colors, typeface } from '@/styles/variables.style';

interface TypeLanguageSelector {
  isActiveButton?: boolean;
}

const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 1.3rem;
  background-color: ${colors.white};
  font-size: ${typeface.contents};

  ul {
    display: flex;
  }

  ${mq('large')} {
    display: none;
  }
`;

const languageItem = css`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0 1rem;

  color: ${colors.gray};

  &:not(:last-of-type)::after {
    content: '';
    position: absolute;
    right: 0;
    width: 0.1rem;
    height: 1.2rem;
    margin: auto;
    background-color: ${colors.disabled};
  }
`;

const languageButton = ({ isActiveButton }: TypeLanguageSelector) => css`
  color: ${!isActiveButton && `${colors.label}`};
`;

const iconGlobe = css`
  display: flex;

  svg {
    filter: invert(100%);
  }
`;

const iconCheck = css`
  display: flex;
  padding-right: 0.6rem;

  svg > path {
    stroke: ${colors.gray};
  }
`;

const LanguageSelectorStyle = { container, languageItem, languageButton, iconGlobe, iconCheck };

export default LanguageSelectorStyle;
