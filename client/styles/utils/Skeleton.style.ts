import { css } from '@emotion/css';

import { mq } from '@/styles/mixins.style';
import { colors } from '@/styles/variables.style';

export const cssSkeleton = css`
  br {
    display: none;
  }

  &__container {
    margin: 0 auto;
    padding: 4rem 0;
  }

  &__contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0 10%;
  }

  &__title,
  &__video,
  &__image,
  &__text,
  &__icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 33.5rem;
  }

  &__title span {
    margin-bottom: 1rem;
  }

  &__video span,
  &__image span {
    height: 10rem;
    margin-bottom: 1rem;
  }

  &__image {
    flex-direction: row;
    margin-bottom: 1rem;

    span {
      margin: 0.3rem;
    }
  }

  &__text span {
    height: 1.5rem;
    margin-bottom: 1rem;
  }

  &__icon {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-bottom: 1rem;

    span {
      width: 5rem;
      height: 6rem;
      margin: 0 0.5rem;
    }
  }

  ${mq('large')} {
    &__title,
    &__video,
    &__image,
    &__text {
      max-width: 70rem;
    }

    &__video span {
      height: 25rem;
    }

    &__image span {
      height: 15rem;
    }

    &__icon {
      width: 100%;
      margin-top: 1.2rem;

      span {
        width: 6rem;
        height: 8rem;
        margin: 0 1.2rem;
      }
    }
  }
`;

export const cssSkeletonNavPromotion = css`
  max-width: none;
  margin: 1.3rem 1rem;

  span {
    height: 2rem;
    margin-bottom: 0;
  }
`;

export const cssSkeletonAccount = css`
  width: 20rem;

  span {
    height: 2rem;
    margin-bottom: 0;
  }

  ${mq('large')} {
    span {
      margin-right: 3.2rem;
    }
  }
`;

export const cssSkeletonPriceInfo = css`
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  &__title span {
    height: 4rem;
    margin-bottom: 1rem;
  }
`;

export const cssSkeletonPurchasePanel = css`
  width: 100%;
  max-width: none;
  margin-right: 3rem;

  span {
    display: flex;
    align-items: center;
    height: 1rem;
    margin: 0.5rem 0;
  }

  ${mq('medium')} {
    display: flex;
    flex-direction: row;

    span {
      height: 2rem;
      margin: 0;

      &:first-child {
        margin-right: 2rem;
      }
    }
  }

  ${mq('large')} {
    display: block;
    max-width: 28rem;
    margin: 0;
    padding: 2rem 0;

    span {
      &:nth-last-child(2) {
        display: none;
      }
    }

    &--floating {
      display: flex;
      align-items: center;
      max-width: none;
      margin: 0;

      span {
        &:nth-last-child(2) {
          display: block;
        }
      }
    }
  }
`;

export const cssSkeletonCatalogCaption = css`
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 37.4rem;
  }

  &__text {
    width: 15rem;
  }

  &__title {
    max-width: none;
    margin-top: 1rem;
    margin-bottom: 0.6rem;

    span {
      height: 4rem;
    }
  }

  &__instructor {
    max-width: none;
    margin-top: 0.6rem;
    margin-bottom: 0.9rem;
  }

  &__icon {
    width: 18rem;

    span {
      height: 8.5rem;
      margin: 0 0.8rem;
    }
  }

  ${mq('large')} {
    &__container {
      width: 41.4rem;
    }

    &__title {
      margin-top: 1.4rem;
      margin-bottom: 0.6rem;

      span {
        height: 4rem;
      }
    }

    &__instructor {
      margin-top: 0.6rem;
      margin-bottom: 1.2rem;
    }

    &__icon {
      width: 100%;
    }
  }
`;

export const cssSkeletonCategory = css`
  &__title {
    display: block;
    height: min-content;
    margin: 0;

    span {
      width: 10rem;
      height: 2.5rem;
      margin: 0;
    }

    ${mq('large')} {
      span {
        width: 30rem;
        height: 3.5rem;
      }
    }
  }

  &__tag {
    display: block;
    height: min-content;

    span {
      width: 7.1rem;
      height: 3rem;
      margin: 0 1rem 0 0;

      &:first-child {
        width: 3.7rem;
      }
    }
  }
`;
