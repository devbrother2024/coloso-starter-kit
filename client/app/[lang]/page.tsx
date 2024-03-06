import { notFound } from 'next/navigation';

import { getCurations } from '@/apis/operation';
import Footer from '@/components/layouts/common/Footer';
import Header from '@/components/layouts/common/Header';
import BaseContainer from '@/components/templates/containers/BaseContainer';
import DynamicComponent from '@/components/templates/curation/DynamicComponent';
import { CustomerLanguageCode, LanguageCodes } from '@/policy/language';
import { OperationType } from '@/policy/operation';

interface TypeHomePage {
  params: { lang: CustomerLanguageCode };
}

const HomePage = async ({ params: { lang } }: TypeHomePage) => {
  const isValidLanguage = LanguageCodes.includes(lang);
  if (!isValidLanguage) return notFound();

  const curationData = await getCurations({ type: OperationType.MAIN_PAGE, language: lang });
  const [curation] = curationData ?? [];

  return (
    <>
      <Header />
      <BaseContainer className="theme--main">
        <article className="starter-kit-app-page">
          <h1 className="a11y">starter-kit. masterpiece collections</h1>
          <DynamicComponent curations={curation?.extras} />
        </article>
      </BaseContainer>
      <Footer />
    </>
  );
};

export default HomePage;
