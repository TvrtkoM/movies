'use client'
import { MovieSummary } from '@/fetch-movies'
import React from 'react'
import MovieSummaryView from './MovieSummaryView';
import useUpcomingMoviesQuery from '@/queries/useUpcomingMoviesQuery';

export default function UpcomingMovies({movies}: {movies: MovieSummary[]}) {
  const { data: upcomingMovies } = useUpcomingMoviesQuery();

  return (
    <div className='grid lg:grid-cols-2 gap-2 gap-x-2'>
      {(upcomingMovies ?? movies ?? []).map((movie, idx) => {
        return <div className="p-4 flex flex-col" key={idx}>
          <MovieSummaryView movie={movie}></MovieSummaryView>
        </div>;
      })}
    </div>
  );
}
