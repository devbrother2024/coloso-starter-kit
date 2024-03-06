import { css } from '@emotion/css';

import { bp, grids, transitions } from '@/styles/variables.style';
// TODO: 믹스인 미완성 상태. 추후 전체 리팩토링 시 수정 필요.

/**
 * @param breakPoint small, medium, large, huge, full, wide
 * @param type until
 * */
const mq = (breakPoint: keyof typeof bp, type?: 'until') => {
  const viewport = {
    mobile: `max-width: ${bp[breakPoint] - 1}px`,
    desktop: `min-width: ${bp[breakPoint]}px`,
  };
  return `@media (${type ? viewport.mobile : viewport.desktop} )`;
};

const transition = (prop?: string, time?: string, ease?: string) => css`
  transition-timing-function: ${ease ?? transitions.easeCubicBezier};
  transition-duration: ${time ?? `${transitions.easeDuration}s`};
  transition-property: ${prop ?? 'all'};
`;

const ellipsis = (lines?: number) => {
  if (lines)
    return css`
      display: -webkit-box;
      overflow: hidden;

      text-overflow: ellipsis;
      word-wrap: normal;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${lines};
    `;
  else
    return css`
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    `;
};

const globalTransition = () => css`
  ${transition('all', '200ms', 'ease')}
`;

/**
 * @param size tiny, small, medium, large, huge, full, wide
 * */
const grid = (size: keyof typeof grids = 'medium') => css`
  padding-right: 2rem;
  padding-left: 2rem;

  ${mq('large')} {
    max-width: ${grids[size]};
    margin-right: auto;
    margin-left: auto;
    padding-right: ${`${(parseInt('4rem') / parseInt(grids[size])) * 100}%`};
    padding-left: ${`${(parseInt('4rem') / parseInt(grids[size])) * 100}%`};
  }
`;

export { mq, transition, ellipsis, grid, globalTransition };
