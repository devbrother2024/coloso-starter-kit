import { QueryClient } from '@tanstack/react-query';

const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 59,
      retry: 1,
    },
  },
};

const queryClient = new QueryClient(queryClientOptions);

export default queryClient;
