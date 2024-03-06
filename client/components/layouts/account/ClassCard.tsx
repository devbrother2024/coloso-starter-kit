'use client';

import { useEffect, useState } from 'react';

import { cx } from '@emotion/css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/elements/Button';
import EnrollmentDateDialog from '@/components/modules/dialogs/EnrollmentDateDialog';
import useDialog from '@/hooks/client/useDialog';
import useTranslation from '@/hooks/client/useTranslation';
import { TypeEnrollment } from '@/types/enrollment';
import { formatUTC } from '@/utils/date';
import { catalogPeriodDate } from '@/utils/enrollment';

import ClassCardTheme from './themes/ClassCard.theme';

interface TypeMyClassCard {
  enrollment: TypeEnrollment;
}

interface TypeEnrollmentPeriod {
  isOpen: boolean;
  isActive: boolean;
  openAt: string | null;
  beginAt: string | null;
  endAt: string | null;
}

const initialEnrollmentPeriod = {
  isActive: false,
  isOpen: false,
  openAt: null,
  beginAt: null,
  endAt: null,
};

const ClassCard = ({ enrollment }: TypeMyClassCard) => {
  const t = useTranslation();
  const router = useRouter();
  const { isActiveDialog, onOpenDialog, onCloseDialog } = useDialog();

  const catalog = enrollment.course;
  const cardImage = catalog?.defaultCardAsset?.url || '';
  const catalogTitle = catalog?.publicTitle || '';
  const catalogLecture = catalog?.publicDescription || '';
  const catalogLink = `/classroom/${catalog?.id}`;
  const { label: timeZone } = formatUTC();

  const [enrollmentPeriod, setEnrollmentPeriod] = useState<TypeEnrollmentPeriod>(initialEnrollmentPeriod);
  const { isOpen, isActive, openAt, beginAt, endAt } = enrollmentPeriod;
  const periodDate = isOpen ? endAt : beginAt || openAt;

  const goToClassroom = () => {
    return onOpenDialog();
    /*     if (!isActive) {
      return onOpenDialog();
    }

    router.push(catalogLink); */
  };

  useEffect(() => {
    const { isOpen, isActive, openAt, beginAt, endAt } = catalogPeriodDate(enrollment);
    setEnrollmentPeriod({ isActive, isOpen, openAt, beginAt, endAt });
  }, [enrollment]);

  return (
    <>
      <figure className={ClassCardTheme.container}>
        <div className={ClassCardTheme.cardBlock}>
          <div className={ClassCardTheme.cardCatalog}>
            {cardImage && (
              <Image
                src={cardImage}
                className={ClassCardTheme.cardImage}
                width={78}
                height={78}
                loading="lazy"
                alt="card image"
              />
            )}
            <div className={ClassCardTheme.cardInfo}>
              <strong className={ClassCardTheme.cardTitle}>{catalogTitle}</strong>
              <p className={ClassCardTheme.cardLecture}>{catalogLecture}</p>
            </div>
          </div>

          <div className={ClassCardTheme.cardPeriod}>
            <p>
              <span className={ClassCardTheme.cardDate}>{t('StartDate', { scope: 'MyPage' })}</span>
              {beginAt || openAt} {timeZone}
            </p>
            <p>
              <span className={ClassCardTheme.cardDate}>{t('EndDate', { scope: 'MyPage' })}</span>
              {endAt ? `${endAt} ${timeZone}` : t('None', { scope: 'SiteGlobal' })}
            </p>
          </div>

          <Button
            data-testid="classroom-btn"
            className={cx('btn btn--small btn--wide btn--early')}
            callback={() => goToClassroom()}
          >
            {t('CoursePlay', { scope: 'MyPage' })}
          </Button>
        </div>
      </figure>
      <EnrollmentDateDialog
        isActive={isActiveDialog}
        isComing={!isOpen}
        periodDate={periodDate || ''}
        onClose={onCloseDialog}
      />
    </>
  );
};

export default ClassCard;
