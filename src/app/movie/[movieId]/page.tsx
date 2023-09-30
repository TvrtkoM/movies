import MovieCast from '@/components/MovieCast';
import MovieVideo from '@/components/MovieVideo';
import SimilarMovies from '@/components/SimilarMovies';
import { fetchMovieCast, fetchMovieDetails } from '@/fetch-movies'
import Error from 'next/error';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { Home } from 'react-feather';

export default async function Page({
  params
}: {
  params: { movieId: string };
}) {
  const movie = await fetchMovieDetails(+params.movieId);
  const movieCast = await fetchMovieCast(+params.movieId);

  if (!movie?.title) return <div>No movie found for id {params.movieId}</div>;
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl mb-3 p-3 border border-orange-600 flex justify-between">
        <div>{movie.title}</div>
        <Link href="/"><Home className="cursor-pointer" size={36} /></Link>
      </h1>
      <section className="flex flex-col space-y-2">
        <div className="flex">
          {movie.poster_path && (
            <div className="w-56 h-[300px] relative flex-shrink-0">
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                blurDataURL="/film-placeholder.webp"
                fill
                style={{ objectFit: "cover" }}
                placeholder="blur"
              />
            </div>
          )}
          <div className="ml-3 flex flex-col mt-3 justify-center mb-6">
            <div>{movie.overview}</div>
            {movie.genres && (
              <div className="flex italic space-x-3 mt-2">
                {movie.genres.map((g) => (
                  <div key={g.id} className="bg-slate-800">
                    {g.name}
                  </div>
                ))}
              </div>
            )}
            {movie.budget > 0 && (
              <div className="flex">
                <div className="mr-2 font-medium">Budget</div>
                <div>{movie.budget} $</div>
              </div>
            )}
            {movie.revenue > 0 && (
              <div className="flex">
                <div className="mr-2 font-medium">Revenue</div>
                <div>{movie.revenue} $</div>
              </div>
            )}
            {movie.runtime > 0 && (
              <div className="flex">
                <div className="mr-2 font-medium">Runtime</div>
                <div>{movie.runtime} minutes</div>
              </div>
            )}
            {movie.release_date && (
              <div className="flex">
                <div className="mr-2 font-medium">Release date</div>
                <div>{movie.release_date}</div>
              </div>
            )}
            {movie.popularity > 0 && (
              <div className="flex">
                <div className="mr-2 font-medium">Popularity</div>
                <div>{movie.popularity} points</div>
              </div>
            )}
            {movie.vote_average > 0 && (
              <div className="flex">
                <div className="mr-2 font-medium">Vote average</div>
                <div>{movie.vote_average} points</div>
              </div>
            )}
          </div>
        </div>
      </section>
      <MovieVideo movieId={movie.id}></MovieVideo>
      <h2 className="text-xl my-3">Cast</h2>
      <MovieCast cast={movieCast}></MovieCast>
      <SimilarMovies movieId={movie.id}></SimilarMovies>
    </div>
  );
}
