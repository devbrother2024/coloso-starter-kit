import { css } from '@emotion/css';

const grayscale = {
  ash: 'hsla(0, 0%, 15%, 1)', //#262626
  fog: 'hsla(0, 0%, 20%, 1)', //#333333
  dusk: 'hsla(0, 0%, 30%, 1)', //#4d4d4d
  dawn: 'hsla(0, 0%, 42%, 1)', //#6b6b6b
  haze: 'hsla(0, 0%, 63%, 1)', //#a1a1a1
  sunset: 'hsla(0, 0%, 95%, 1)', //#f2f2f2
  twilight: 'hsla(0, 0%, 7%, 1)', //#121212
  midnight: 'hsla(0, 0%, 0%, 1)', //#000000
  sunrise: 'hsla(0, 0%, 100%, 1)', //#ffffff
};

// @todo: color pallet key 변경.. early?? $secondary??
export const colors: { [key: string]: string } = {
  note: '#3498db',
  info: '#07bc0c',
  fog: '#333333',
  gray: '#252525',
  edge: '#ffb200',
  error: '#cf6679',
  early: '#4200ff',
  label: '#898989',
  strong: '#a0a0a0',
  danger: '#e74c3c',
  veiled: '#f2f2f2',
  warning: '#f1c40f',
  disabled: '#6c6c6c',
  readonly: '#e7e7e7',
  emphasis: '#c5c5c5',
  darkgray: '#222222',
  primary: '#de0220',
  secondary: '#ed2040',
  $secondary: '#f9858d',
  ash: grayscale.ash,
  dawn: grayscale.dawn,
  dusk: grayscale.dusk,
  sunrise: grayscale.fog,
  hint: grayscale.sunset,
  dark: grayscale.twilight,
  white: grayscale.sunrise,
  black: grayscale.midnight,
  background: grayscale.twilight,
  foreground: grayscale.sunset,
};

export const sizes = {
  tiny: 10,
  small: 12,
  large: 18,
  default: 16,
};

export const float = {
  space: 1001,
  cloud: 101,
  floor: 11,
  default: 1,
};

export const layouts = {
  nav: '38.8rem',
  header: '10.1rem',
  headerMobile: '5.8rem',
  headerTablet: '9.6rem',
  headerLaptop: '10.4rem',

  classroomHeader: '7.3rem',
};

export const typeface = {
  title: '2.4rem',
  subTitle: '2rem',
  topic: '1.8rem',
  notice: '3.2rem',
  headline: '4.8rem',
  abstract: '1.6rem',
  contents: '1.4rem',
  footnote: '1.2rem',
};

export const grids = {
  tiny: '37.5rem',
  small: '48rem',
  medium: '72rem',
  large: '98rem',
  huge: '112rem',
  full: '144rem',
  wide: '192rem',
};

export const transitions = {
  easeOut: 'ease-out',
  easeDuration: 0.2,
  easeBalance: 'ease-in-out',
  easeCubicBezier: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
};

export const bp = {
  small: 560,
  medium: 720,
  large: 960,
  huge: 1280,
  full: 1440,
  wide: 1600,
};

export const a11y = css`
  position: absolute !important;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  white-space: nowrap;
`;
