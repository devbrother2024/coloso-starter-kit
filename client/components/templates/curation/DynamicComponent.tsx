import { ReactElement } from 'react';

import { TypeCurationResponse } from '@/types/operation';

import CarouselCard from './CarouselCard';
import CarouselHero from './CarouselHero';
import CarouselPortrait from './CarouselPortrait';
import CarouselSquare from './CarouselSquare';
import CarouselWide from './CarouselWide';
// import NoticePost from './NoticePost';
import QuickLinks from './QuickLinks';
import RecommendCard from './RecommendCard';

interface TypeCustomComponentProps {
  curation: TypeCurationResponse;
  key: number;
}

const DynamicComponent = ({ curations }: { curations: Array<TypeCurationResponse> }) => {
  const loadDynamicComponent = ({ curation, key }: TypeCustomComponentProps) => {
    const composedComponentMap: { [key: string]: ReactElement } = {
      CarouselCard: <CarouselCard key={key} config={curation} />,
      CarouselHero: <CarouselHero key={key} config={curation} />,
      CarouselPortrait: <CarouselPortrait key={key} config={curation} />,
      CarouselSquare: <CarouselSquare key={key} config={curation} />,
      CarouselWide: <CarouselWide key={key} config={curation} />,
      // NoticePost: <NoticePost key={key} config={curation} />,
      QuickLinks: <QuickLinks key={key} config={curation} />,
      RecommendCard: <RecommendCard key={key} config={curation} />,

      // XXX: prod db 내 namespace 이관 확인 후 제거
      'CAROUSEL-CARD': <CarouselCard key={key} config={curation} />,
      'CURATION-CAROUSEL': <CarouselHero key={key} config={curation} />,
      'BANNER-CAROUSEL': <CarouselWide key={key} config={curation} />,
      // 'NOTICE-POST': <NoticePost key={key} config={curation} />,
      'QUICK-LINK': <QuickLinks key={key} config={curation} />,
      'RECOMMEND-CARD': <RecommendCard key={key} config={curation} />,
    };
    return composedComponentMap[curation?.meta.theme];
  };

  return (
    <>
      {curations?.map((curation, key) => {
        return loadDynamicComponent({ curation, key });
      })}
    </>
  );
};

export default DynamicComponent;
