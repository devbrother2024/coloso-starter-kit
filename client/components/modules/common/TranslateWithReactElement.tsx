'use client';
import { Fragment, ReactNode } from 'react';

type TypeTargetElement = Record<string, string | number | ReactNode>;

interface TypeTranslateWithElement {
  model: string;
  targetElement: TypeTargetElement;
}

const remainSplitterRegex = /(?:\{[^{}]*\}|[^{}]+)/g;

// NOTE: translate에 대체값으로 react component를 넣어야 하는 경우 사용
const TranslateWithReactElement = ({ model, targetElement }: TypeTranslateWithElement) => {
  const splitModel = model?.match(remainSplitterRegex) || [];
  const formattedElements: TypeTargetElement = Object.keys(targetElement).reduce((acc, key) => {
    return {
      ...acc,
      [`{${key}}`]: targetElement[key],
    };
  }, {});

  return (
    <>
      {splitModel.map((key: string, index: number) => {
        return <Fragment key={index}>{formattedElements[key] ?? key}</Fragment>;
      })}
    </>
  );
};

export default TranslateWithReactElement;
