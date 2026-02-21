import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ExternalBlob } from '../backend';

interface AddGameParams {
  name: string;
  image: ExternalBlob;
  trailerUrl: string;
  description: string;
  price: bigint;
}

export function useAddGame() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: AddGameParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addGame(params.name, params.image, params.trailerUrl, params.description, params.price);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });
}
