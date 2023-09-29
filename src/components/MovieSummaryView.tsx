'use client'
import { PropsWithChildren } from "react";
import { MovieSummary } from "@/fetch-movies";
import Image from "next/image";
import useMovieGenres from "@/queries/useMovieGenresQuery";
import Link from "next/link";

const MovieLink = ({
  movieId,
  children
}: PropsWithChildren<{
  movieId: number;
  className?: string;
}>) => {
  return <Link href={`/movie/${movieId}`}>{children}</Link>;
};

const MovieSummaryView = ({ movie }: { movie: MovieSummary }) => {
  const { data: genres } = useMovieGenres(movie.id);
  return (
    <div className="flex flex-col">
      <MovieLink movieId={movie.id}>
        <div className="flex h-11 items-center font-medium text-xl">
          {movie.title}
        </div>
      </MovieLink>
      <div className="flex">
        <div className="h-56 w-36 relative flex-shrink-0 items-center hidden md:flex">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              blurDataURL="/film-placeholder.webp"
              fill
              style={{ objectFit: "cover" }}
              placeholder="blur"
            />
          ) : (
            <Image
              src="/film-placeholder.webp"
              alt={movie.title}
              fill
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        <div className="flex flex-col justify-center mb-8 ml-3">
          <div className="mb-5">{movie.overview}</div>
          {movie.release_date && (
            <div className="flex">
              <div className="mr-2 font-medium">Release date</div>
              <div>{movie.release_date}</div>
            </div>
          )}
          {movie.vote_average > 0 && (
            <div className="flex">
              <div className="mr-2 font-medium">Vote Average</div>
              <div>{movie.vote_average}</div>
            </div>
          )}
          <div className="flex italic space-x-3 mt-2 h-4 flex-wrap">
            {genres &&
              genres.map((g) => (
                <div key={g.id} className="bg-slate-800">
                  {g.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSummaryView;