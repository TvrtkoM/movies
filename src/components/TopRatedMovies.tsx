'use client'
import { MovieSummary } from '@/fetch-movies'
import useTopRatedMoviesQuery from '@/queries/useTopRatedMoviesQuery';
import React from 'react'
import MovieSummaryView from './MovieSummaryView';
import Slider from "react-slick";

export default function TopRatedMovies({ movies }: { movies: MovieSummary[] }) {
  const { data: queryMovies } = useTopRatedMoviesQuery();

  return (
    <div className="px-8 hidden md:block">
      <Slider autoplay>
        {(queryMovies ?? movies ?? []).map((movie, idx) => {
          return <MovieSummaryView key={idx} movie={movie}></MovieSummaryView>;
        })}
      </Slider>
    </div>
  );
}
