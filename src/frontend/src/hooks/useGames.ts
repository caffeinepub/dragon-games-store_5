import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Game } from '../backend';

export function useGames() {
  const { actor, isFetching } = useActor();

  return useQuery<Game[]>({
    queryKey: ['games'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGames();
    },
    enabled: !!actor && !isFetching,
  });
}
