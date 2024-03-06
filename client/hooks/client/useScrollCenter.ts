import { useRef } from 'react';

const useScrollCenter = () => {
  const targetContainerRef = useRef<HTMLUListElement>(null);
  const targetItemRefs = useRef<HTMLElement[]>([]);

  const scrollToCenter = (index: number) => {
    if (!targetContainerRef.current) return;
    const { scrollLeft, offsetWidth: containerWidth, clientWidth, scrollWidth } = targetContainerRef.current;

    if (scrollWidth <= clientWidth) return;
    const { offsetWidth: tabWidth } = targetItemRefs.current[index];

    const tabLeft = targetItemRefs.current[index].getBoundingClientRect().left;
    const containerLeft = targetContainerRef.current.getBoundingClientRect().left;
    const refineLeft = tabLeft - containerLeft;
    const targetScrollX = scrollLeft + refineLeft - containerWidth / 2 + tabWidth / 2;

    targetContainerRef.current.scroll({ left: targetScrollX, top: 0, behavior: 'smooth' });
  };

  return { targetContainerRef, targetItemRefs, scrollToCenter };
};

export default useScrollCenter;
