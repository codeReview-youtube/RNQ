import { createClient, ErrorResponse, Photos, Collection } from 'pexels';
import { API_KEY } from '../.env';
import { useQuery } from 'react-query';

const client = createClient(API_KEY ?? 'not_provided');

interface IUsePhotos {
  data?: Photos;
  isError?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  error?: ErrorResponse;
}
export function useSearchPhotos(
  collectionId: string,
  page: number,
  options?: { id?: string; enabled?: boolean }
): IUsePhotos {
  const { isError, isLoading, data, error, isSuccess } = useQuery(
    ['curated_collection', options?.id],
    async () =>
      await client.photos.search({
        per_page: 10,
        page,
        query: collectionId,
      }),
    {
      enabled: options?.enabled,
    }
  );

  if (isSuccess && !isError) {
    return {
      data: data as Photos,
      isLoading,
    };
  }
  return {
    isError,
    isLoading,
    error: error as ErrorResponse,
  };
}

interface ICollectionRes {
  per_page: number;
  page: number;
  collections: Collection[];
}

interface IUseCollection {
  data?: ICollectionRes;
  hasError?: boolean;
  isFetchingCollection?: boolean;
  error?: ErrorResponse;
}

export function useFetchCollection(perPage = 10): IUseCollection {
  const { isLoading, isError, error, data } = useQuery(
    'collection',
    async () =>
      await client.collections.featured({
        per_page: perPage,
      })
  );

  if (data && !isError) {
    return {
      data: data as ICollectionRes,
      isFetchingCollection: isLoading,
    };
  }
  return {
    isFetchingCollection: isLoading,
    hasError: isError,
    error: error as ErrorResponse,
  };
}
