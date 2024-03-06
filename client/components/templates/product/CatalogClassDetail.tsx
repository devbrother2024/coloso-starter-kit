import {
  IconPlayGraySmall,
  IconAudioGraySmall,
  IconGraphGraySmall,
  IconLayerGraySmall,
  IconSubtitleGraySmall,
} from '@/assets/icons';
import ClassPeriod from '@/components/layouts/product/ClassPeriod';
import serverTranslation from '@/hooks/server/useTranslation';
import { TypeCourse } from '@/types/course';
import { minutesToTime } from '@/utils/date';

interface TypeCatalogClassDetail {
  lang: string;
  course: TypeCourse;
}

const CatalogClassDetail = async ({ lang, course }: TypeCatalogClassDetail) => {
  const t = await serverTranslation({ locale: lang });

  const classDetails = [
    {
      icon: <IconGraphGraySmall />,
      text: 'Modify Text',
    },
    {
      icon: <IconPlayGraySmall />,
      text: 'Modify Text',
    },
    {
      icon: <IconAudioGraySmall />,
      text: 'Modify Text',
    },
    {
      icon: <IconSubtitleGraySmall />,
      text: 'Modify Text',
    },
    {
      icon: <IconLayerGraySmall />,
      text: 'Modify Text',
    },
  ];

  return (
    <section className="catalog-class__detail">
      <h3 className="catalog-class__detail-title">{t('ClassDetails', { scope: 'PageCover' })}</h3>
      <ul className="catalog-class__detail-meta">
        <ClassPeriod />
        {classDetails.map((data, index) => {
          const { icon, text } = data;
          return (
            <li className="item" key={index}>
              <i>{icon}</i>
              <span>{text}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CatalogClassDetail;
