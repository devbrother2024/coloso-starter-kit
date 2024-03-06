'use client';

import { useEffect } from 'react';

import { cx } from '@emotion/css';
import Image from 'next/image';

import { TypeCompactCourse } from '@/types/course';

interface TypeCourse {
  course: TypeCompactCourse;
  isEmphasis?: boolean;
}

const Course = ({ course, isEmphasis }: TypeCourse) => {
  return (
    <figure className={cx('purchase-course', { 'purchase-course--emphasis': isEmphasis })}>
      <span className="purchase-course__thumb">
        <Image src={course.desktopCardAsset} width={50} height={50} loading="lazy" alt="" />
      </span>
      <figcaption className="purchase-course__caption">
        <dl>
          <dt>{course.publicTitle}</dt>
          {course.publicDescription && <dd>{course.publicDescription}</dd>}
        </dl>
      </figcaption>
    </figure>
  );
};

export default Course;
