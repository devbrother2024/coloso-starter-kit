import { PropsWithChildren } from 'react';

import SearchContainer from '@/components/templates/containers/SearchContainer';

const SearchResultLayout = ({ children }: PropsWithChildren) => {
  return <SearchContainer>{children}</SearchContainer>;
};

export default SearchResultLayout;
