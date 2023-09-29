"use client";
import useInfiniteMoviesSearchQuery from "@/queries/useInfiniteMoviesSearchQuery";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import MovieSummaryView from "@/components/MovieSummaryView";
import Error from "next/error";
import { Home } from "react-feather";
import Link from "next/link";

export function SearchResults({
  searchStr,
}: {
  searchStr: string;
}) {
  const { data, fetchNextPage, isFetching, isRefetching } =
    useInfiniteMoviesSearchQuery(searchStr);
  const pages = data?.pages ?? [];
  const ref = useRef<HTMLDivElement>(null);

  useScrollPosition(
    ({ currPos, prevPos }) => {
      if (
        currPos.y < prevPos.y &&
        Math.abs(currPos.y) > ((ref.current?.clientHeight ?? Infinity) * 4) / 5
      ) {
        !isFetching && !isRefetching && fetchNextPage();
      }
    },
    [pages, !isFetching, !isRefetching]
  );

  if (pages?.[0]?.movies.length === 0) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="flex flex-col" ref={ref}>
      {pages.map((page, idx) => {
        return (
          <div key={idx} className="space-y-6">
            {page.movies.map((movie, idx) => {
              return <MovieSummaryView  key={idx} movie={movie} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

const GoHomeButton = () => {
  return (
    <Link href="/">
      <div className="fixed bottom-5 right-5 p-3 bg-amber-900/50">
        <Home size={45} />
      </div>
    </Link>
  );
}

export default function page() {
  const searchParams = useSearchParams();
  const searchStr = searchParams.get("text")?.toString();

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center">Search Results for `{searchStr}`</h1>
      <SearchResults searchStr={searchStr ?? ""} />
      <GoHomeButton/>
    </div>
  );
}
