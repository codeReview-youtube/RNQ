import { createClient, ErrorResponse, Photos, Collection } from 'pexels';
import { API_KEY } from '../../.env';
import { useQuery } from 'react-query';
import axios from 'axios';

const client = createClient(API_KEY ?? 'not_provided');
export const API_BASE = 'http://localhost:4000/api';

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
    ['photos', options?.id],
    // async () =>
    //   await client.photos.curated({
    //     per_page: 100,
    //   })
    () =>
      fetch(`${API_BASE}/photos`, {
        method: 'GET',
        headers: {
          Authorization: `whatever-you-can-send-for-now`,
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error('Message: Cannot get log ');
        }
        return res.json();
      })
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
