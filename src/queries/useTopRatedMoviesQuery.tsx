import { fetchTopRatedMovies } from "@/fetch-movies";
import { useQuery } from "@tanstack/react-query";

export default function useTopRatedMoviesQuery() {
  return useQuery(["top-rated-movies"], async () => {
    const topRated = await fetchTopRatedMovies();
    return topRated;
  }, { refetchInterval: 1000 * 60 * 10});
}