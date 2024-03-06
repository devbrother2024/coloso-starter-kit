import { useEffect, useState } from 'react';

const TIME_CONFIG = {
  SECONDS: 1000,
};

const useCountdown = (duration: number) => {
  const [count, setCount] = useState(duration);
  const [timer, setTimer] = useState('');
  const [isCounting, setIsCounting] = useState(false);
  const [isResetCount, setIsResetCount] = useState(false);

  useEffect(() => {
    if (!isCounting || count < 0) return;

    const min = Math.floor(count / 60);
    const sec = count % 60;
    setTimer(`${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`);

    const timeoutId = window.setTimeout(() => {
      setCount(count - 1);
    }, TIME_CONFIG.SECONDS);

    if (isResetCount) {
      clearTimeout(timeoutId);
      setCount(duration);
      setIsResetCount(false);
      return;
    }

    return () => {
      clearTimeout(timeoutId);

      if (count <= 0) {
        setCount(duration);
        setIsCounting(false);
      }
    };
  }, [isCounting, count, duration, isResetCount]);

  return { count, timer, isCounting, setIsCounting, setIsResetCount };
};

export default useCountdown;
