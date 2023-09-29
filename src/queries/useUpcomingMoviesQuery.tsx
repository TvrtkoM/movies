import { fetchUpcomingMovies } from "@/fetch-movies";
import { useQuery } from "@tanstack/react-query";

export default function useUpcomingMoviesQuery() {
  return useQuery(["upcoming-movies"], async () => {
    const res = await fetchUpcomingMovies();
    return res;
  }, { refetchInterval: 1000 * 60 * 10});
}