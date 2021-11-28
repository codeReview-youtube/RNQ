import { useMutation } from 'react-query';
import { IPhoto } from '../PhotoModal';
import { API_BASE } from './queries';

export function useUpdatePhoto() {
  const { error, data, mutate, reset } = useMutation((photo: IPhoto) => {
    return fetch(`${API_BASE}/photo/${photo.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer',
      },
      body: JSON.stringify(photo),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      return res.json();
    });
  }, {
    onMutate: (photo) => {
      console.log('Mutation started '+ photo.id);
    },
    onError: (error) => { },
    onSettled: () => { },
    onSuccess: (data) => {
      
    }
  });

  return {
    photo: data,
    updatePhoto: mutate,
    reset,
    error,
  };
}
