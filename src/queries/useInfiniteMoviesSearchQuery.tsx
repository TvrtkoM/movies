import { fetchMoviesSearch } from "@/fetch-movies"
import { useInfiniteQuery } from "@tanstack/react-query"

export default function useInfiniteMoviesSearchQuery(searchStr: string) {
  return useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const res = await fetchMoviesSearch(searchStr, pageParam);
      return res;
    },
    queryKey: ["movies-search", searchStr],
    getNextPageParam: (lastPage, movies) => {
      return lastPage.page + 1;
    },
  })
}
