import { fetchMovieDetails } from "@/fetch-movies";
import { useQuery } from "@tanstack/react-query";

function useMovieGenresQuery(id: number) {
  return useQuery(
    ["movie-genres", id],
    async ({ queryKey }) => {
      const [_, _id] = queryKey;
      const details = await fetchMovieDetails(_id as number);
      return details.genres;
    },
    { staleTime: Infinity }
  );
}

export default useMovieGenresQuery;
