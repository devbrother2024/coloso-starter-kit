import { useEffect, useState } from 'react';

import { TypePageExtras } from '@/types/page';
import { diff, durationAsDiff, secondsToTime } from '@/utils/date';

const decimal = 10;
const TIMER = {
  diffTime: 1,
  interval: 1000,
};
let timeId: ReturnType<typeof setInterval> | number = 0;
interface TypeUseTimer {
  hideAt?: string | Date | null;
  countdownBeginInDays: number;
  pageExtras?: Pick<TypePageExtras, 'floatingBarDecorationType'>;
}

const updateTimer = (id: typeof timeId, cb: () => void) => {
  clearInterval(id);
  timeId = setInterval(() => cb(), TIMER.interval);
};

const useTimer = ({ hideAt, pageExtras, countdownBeginInDays }: TypeUseTimer) => {
  const [countdown, setCountdown] = useState<string | null>();
  const [hideAtDiff, setHideAtDiff] = useState<number>();
  const [isLastDay, setIsLastDay] = useState(false);

  const validDecimal = (duration: number) => {
    return duration >= decimal ? duration : `0${duration}`;
  };

  useEffect(() => {
    if (!hideAtDiff) return;
    const duration = durationAsDiff(hideAtDiff);
    const days = duration.asDays();
    const hours = validDecimal(duration.daysToHours());
    const minutes = validDecimal(duration.minutes());
    const seconds = validDecimal(duration.seconds());

    const lastTime = Number(hours) < decimal ? `${hours}:${minutes}:${seconds}` : secondsToTime(hideAtDiff);

    setIsLastDay(days < countdownBeginInDays);
    setCountdown(isLastDay ? lastTime : `D-${Math.floor(days)}`);
  }, [countdownBeginInDays, hideAtDiff, isLastDay]);

  useEffect(() => {
    if (pageExtras?.floatingBarDecorationType === 'TEXT' || !hideAt) return;
    const now = new Date();
    let diffSeconds = diff(now, new Date(hideAt), 'second');
    const currentDuration = durationAsDiff(diffSeconds);

    if (currentDuration.seconds() < 0) {
      return setCountdown(null);
    }

    const getDDay = () => {
      diffSeconds = diffSeconds - TIMER.diffTime;
      setHideAtDiff(diffSeconds);
    };

    getDDay();
    updateTimer(timeId, getDDay);
    return () => clearInterval(timeId);
  }, [pageExtras, hideAt]);

  return { isLastDay, countdown };
};

export default useTimer;
