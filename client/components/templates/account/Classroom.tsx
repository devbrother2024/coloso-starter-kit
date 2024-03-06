'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';

import { getEnrollment } from '@/apis/account';
import { IconClass } from '@/assets/icons';
import ClassCard from '@/components/layouts/account/ClassCard';
import EmptyAccountItem from '@/components/layouts/account/EmptyAccountItem';
import { queryKey } from '@/policy/queryKey';
import i18nStore from '@/store/i18n';
import { TypeEnrollment } from '@/types/enrollment';

const placeholderData = {
  enrollments: [],
};

const Classroom = () => {
  const { lang } = useSnapshot(i18nStore);
  const router = useRouter();

  const { data: classroom } = useQuery({
    queryKey: [queryKey.USER_COURSES, { language: lang }],
    queryFn: () => getEnrollment({ language: lang }),
    placeholderData,
  });

  const { enrollments } = classroom ?? placeholderData;

  if (!enrollments?.length) return <EmptyAccountItem icon={<IconClass className="icon" />} label="EmptyClassroom" />;

  return (
    <ul className="grid grid-column">
      {enrollments?.map((enrollment: TypeEnrollment) => (
        <li key={enrollment.course?.id} className="grid-column__item">
          <ClassCard enrollment={enrollment} />
        </li>
      ))}
    </ul>
  );
};

export default Classroom;
