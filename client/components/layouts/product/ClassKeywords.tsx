'use client';

import { usePathname } from 'next/navigation';

import Link from '@/components/elements/Link';
import commonStore from '@/store/common';

interface TypeClassKeywords {
  displayKeywords?: string;
}

const ClassKeywords = ({ displayKeywords }: TypeClassKeywords) => {
  const pathname = usePathname();

  const onUpdateRoute = () => {
    if (!pathname) return;
    commonStore.previousRoute = pathname;
  };

  if (!displayKeywords) return null;

  return (
    <div className="catalog-keyword">
      {displayKeywords.split(',').map((keyword: string, index: number) => (
        <Link key={index} onClick={onUpdateRoute} href={`/search?keyword=${keyword}`}>
          {keyword}
        </Link>
      ))}
    </div>
  );
};

export default ClassKeywords;
