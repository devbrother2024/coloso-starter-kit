import { getDisplayItems, getDisplaysById } from '@/apis/display';
import { getCategoryCurations } from '@/apis/operation';
import DisplayCards from '@/components/layouts/curation/DisplayCards';
import DisplayTagList from '@/components/layouts/curation/DisplayTagList';
import DynamicComponent from '@/components/templates/curation/DynamicComponent';
import { updateSiteMeta } from '@/utils/meta';

export enum DisplayItem {
  COURSE = 'course',
  PRODUCT = 'product',
  BANNER = 'banner',
}

interface TypeCategoryPage {
  params: {
    lang: string;
    categoryId: string;
  };
  searchParams: {
    sort?: string;
  };
}

export async function generateMetadata({ params: { lang, categoryId } }: TypeCategoryPage) {
  try {
    const primaryDisplay = await getDisplaysById({ id: Number(categoryId), language: lang });
    if (!primaryDisplay?.extras) return {};

    const {
      socialMetaTitle: title = primaryDisplay.title,
      socialMetaDescription: description,
      socialMetaImageAssetUrl: image,
    } = primaryDisplay.extras ?? {};
    const url = `/category/${categoryId}`;

    return updateSiteMeta({ title, description, image, url, lang });
  } catch (err) {
    return {};
  }
}

const CategoryPage = async ({ params: { lang, categoryId }, searchParams: { sort } }: TypeCategoryPage) => {
  const curationData = await getCategoryCurations({ type: `DISPLAY_${categoryId}`, language: lang });
  const displayItems = await getDisplayItems({
    id: Number(categoryId),
    target: DisplayItem.PRODUCT,
    sort,
    language: lang,
  });

  const [curation] = curationData ?? [];
  const courses = displayItems ?? [];

  return (
    <>
      <DisplayTagList categoryId={Number(categoryId)} />
      <DynamicComponent curations={curation?.extras} />
      <DisplayCards courses={courses} sort={sort} />
    </>
  );
};

export default CategoryPage;
