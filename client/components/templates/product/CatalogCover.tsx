import ClassKeywords from '@/components/layouts/product/ClassKeywords';
import CourseMeta from '@/components/layouts/product/CourseMeta';
import CourseVisual from '@/components/layouts/product/CourseVisual';
import PagePanel from '@/components/layouts/product/PagePanel';
import ProductCategory from '@/components/layouts/product/ProductCategory';
import { TypeCourse } from '@/types/course';
import { TypeProduct } from '@/types/product';

interface TypeCatalogCover {
  course: TypeCourse;
  product: TypeProduct;
}

const CatalogCover = ({ course, product }: TypeCatalogCover) => {
  const publicTitle = course?.publicTitle ?? product.publicTitle;
  const publicDescription = course?.publicDescription ?? '';
  const displayKeywords = course?.extras?.displayKeywords ?? '';

  return (
    <figure className="catalog-cover">
      <CourseVisual />
      <figcaption className="catalog-cover__description">
        <section className="catalog-cover__caption">
          <h3 className="catalog-cover__caption-title">{publicTitle}</h3>
          <span className="catalog-cover__caption-instructor">{publicDescription}</span>
          <ProductCategory />
          <CourseMeta />
          <ClassKeywords displayKeywords={displayKeywords} />
        </section>
        <PagePanel />
      </figcaption>
    </figure>
  );
};

export default CatalogCover;
