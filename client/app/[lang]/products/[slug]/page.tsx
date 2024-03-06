import { notFound } from 'next/navigation';

import { getCourseById } from '@/apis/course';
import { getPageBySlug, getPreviewPage } from '@/apis/page';
import { getProductByCourseId } from '@/apis/product';
import CatalogClass from '@/components/templates/product/CatalogClass';
import CatalogClassDetail from '@/components/templates/product/CatalogClassDetail';
import CatalogCover from '@/components/templates/product/CatalogCover';
import CatalogPrice from '@/components/templates/product/CatalogPrice';
import serverTranslation from '@/hooks/server/useTranslation';
import { PageState, PageType } from '@/policy/page';
import { updateSiteMeta } from '@/utils/meta';

interface TypeCatalogPage {
  params: {
    lang: string;
    slug: string;
  };
}

export async function generateMetadata({ params: { lang, slug } }: TypeCatalogPage) {
  try {
    const pageId = Number(slug);
    const isValidSlug = !pageId;

    if (!isValidSlug) return {};

    const productResponse = await getPageBySlug({
      slug,
      type: PageType.COURSE,
      state: PageState.NORMAL,
      language: lang,
    });
    const {
      page: { courseId, socialMetaTitle: title, socialMetaDescription: description, socialAssetUrl: image },
    } = productResponse ?? {};
    const {
      course: {
        extras: { displayKeywords: keywords },
      },
    } = await getProductByCourseId({ courseId, language: lang });
    const url = `/products/${slug}`;

    return updateSiteMeta({ title, description, keywords, image, url, lang });
  } catch (err) {
    return {};
  }
}

const CatalogPage = async ({ params: { lang, slug } }: TypeCatalogPage) => {
  const pageId = Number(slug);
  const isValidSlug = !pageId;

  await serverTranslation({ locale: lang });

  const { page } = isValidSlug
    ? await getPageBySlug({ slug, type: PageType.COURSE, state: PageState.NORMAL, language: lang })
    : await getPreviewPage({ pageId, language: lang });

  if (!page) notFound();

  const { courseId } = page;
  const { course = {}, product } = isValidSlug
    ? await getProductByCourseId({ courseId, language: lang })
    : await getCourseById({ courseId, language: lang });

  return (
    <>
      <section className="catalog" data-page-id={page.id} data-course-id={course?.id} data-product-id={product.id}>
        <CatalogCover course={course} product={product} />
        <CatalogClass>
          <CatalogClassDetail lang={lang} course={course} />
          <CatalogPrice />
        </CatalogClass>
      </section>
    </>
  );
};

export default CatalogPage;
