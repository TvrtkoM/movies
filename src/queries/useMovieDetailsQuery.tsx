import { fetchMovieDetails } from "@/fetch-movies";
import { useQuery } from "@tanstack/react-query";

function useMovieDetailsQuery(id: number) {
  return useQuery(["movie-details", id], async ({ queryKey }) => {
    const [_, _id] = queryKey;
    return fetchMovieDetails(_id as number);
  });
}

export default useMovieDetailsQuery;
