import { css, keyframes } from '@emotion/css';

import { colors, transitions } from '@/styles/variables.style';

const zoomOut = keyframes`
  from {
    transform: scale(1.05);
  }
  to {
    transform: scale(1);
  }
`;

const blurOut = keyframes`
  from {
    filter: blur(0.5rem);
  }
  to {
    filter: blur(0);
  }
`;

const arrowFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0) rotate(180deg);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(180deg);
  }
`;

const arrowFadeOut = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0) rotate(0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0);
  }
`;

const dropdownMenu = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -0.3rem, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 25%, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0%, 0);
  }
`;

const slideOut = keyframes`
  0% {
    opacity: 1;
    transform: translate3d(0, 0%, 0);
  }
  100% {
    opacity: 0;
    transform: translate3d(0, 25%, 0);
  }
`;

const slideDown = keyframes`
  0% {
    transform: translate3d(0, -50%, 0);
  }
  66% {
    transform: translate3d(0, 0%, 0);
  }
  100% {
    transform: translate3d(0, 0%, 0);
  }
`;

const heartBeat = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(1.75);
  }
`;

const gradient = keyframes`
  0%, 20% {
    background-position: 0 50%;
  }
  25%, 65% {
    background-position: 100% 50%;
  }
  70%, 100% {
    background-position: 0 50%;
  }
`;

const iconConfirm = keyframes`
  from {
    stroke-dashoffset: 20;
    stroke-dasharray: 20;
  }
  to {
    stroke-dashoffset: 0;
    stroke-dasharray: 20;
  }
`;

const iconReject = keyframes`
  0% {
    fill: transparent;
    stroke-dashoffset: 50;
    stroke-dasharray: 50;
  }
  75% {
    fill: transparent;
    stroke-dashoffset: 0;
    stroke-dasharray: 50;
  }
  100% {
    fill: ${colors.secondary};
    stroke-dashoffset: 0;
    stroke-dasharray: 50;
  }
`;

const iconBlink = keyframes`
  0% {
    opacity: 0;
  }
  34% {
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  45% {
    opacity: 0;
  }
  74% {
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
  85% {
    opacity: 0;
  }
  94% {
    opacity: 0;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const shrinkX = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
`;

const placeholderGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const drawBackDrop = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;

const narrowBackDrop = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const arrowTurnUp = css`
  animation: ${arrowFadeIn} ${transitions.easeDuration}s ${transitions.easeBalance} forwards;
`;

export {
  fadeIn,
  zoomOut,
  slideIn,
  blurOut,
  fadeOut,
  shrinkX,
  gradient,
  slideOut,
  slideDown,
  iconBlink,
  heartBeat,
  iconReject,
  arrowTurnUp,
  arrowFadeIn,
  iconConfirm,
  drawBackDrop,
  dropdownMenu,
  arrowFadeOut,
  narrowBackDrop,
  placeholderGradient,
};
