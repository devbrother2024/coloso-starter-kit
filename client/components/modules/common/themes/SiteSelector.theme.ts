import { css } from '@emotion/css';

import { colors, typeface } from '@/styles/variables.style';

interface TypeLanguageSelector {
  isActiveLink?: boolean;
}

const container = css`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 3rem;
  font-size: ${typeface.footnote};
  color: ${colors.white};

  ul {
    display: flex;
  }

  p {
    font-weight: bold;
  }
`;

const siteItem = css`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0 1rem;

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

const link = ({ isActiveLink }: TypeLanguageSelector) => css`
  display: block;
  text-transform: capitalize;
  color: ${!isActiveLink && `${colors.label}`};
  font-weight: ${isActiveLink && 'bold'};
`;

const NewSiteSelectorTheme = { container, siteItem, link };

export default NewSiteSelectorTheme;
