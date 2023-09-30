import React from 'react'
import { fetchSimilarMovies } from "@/fetch-movies"
import Link from 'next/link';

export default async function SimilarMovies({ movieId }: { movieId: number }) {
  const similarMovies = await fetchSimilarMovies(movieId);
  return similarMovies.length === 0 ? (
    <></>
  ) : (
    <>
      <div className="text-xl font-bold mt-8 mb-4 flex justify-between">
        <div>Similar Movies</div>
      </div>
      <div className="flex flex-wrap space-x-5 p-4">
        {similarMovies.map((m, idx) => (
          <Link key={idx} href={"/movie/" + m.id}>
            <div className="flex flex-col p-3 my-1 border border-orange-700 text-sm">
              <div>{m.title}</div>
              <div>Avg. Vote: {m.vote_average}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
