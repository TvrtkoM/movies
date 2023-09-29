import { apiUrl } from "./app/constants";

export type MovieSummary = {
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  genre_ids: number[];
  id: number;
  overview: string;
};

export type MovieGenre = {
  id: number;
  name: string;
};

export type MovieDetails = {
  backdrop_path: string;
  genres: MovieGenre[];
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
  revenue: number;
  budget: number;
  video: boolean;
  popularity: number;
  id: number;
};

export type MovieCastMember = {
  name: string;
  profile_path: string;
  character: string;
};

export type MovieTrailer = {
  name: string;
  link: string;
  key: string
}

const defaultHeaders = new Headers();
defaultHeaders.set("accept", "application/json");
defaultHeaders.set(
  "Authorization",
  `Bearer ${process.env.NEXT_PUBLIC_API_READ_ACCESS_TOKEN}`
);

const options = {
  method: "GET",
  headers: defaultHeaders
};

const defaultSearchParams = {
  language: "en-US"
};

export const fetchTopRatedMovies = async (): Promise<MovieSummary[]> => {
  const request = new Request(
    `${apiUrl}/movie/top_rated?${new URLSearchParams({
      ...defaultSearchParams,
      page: "1"
    })}`,
    options
  );
  const response = await fetch(request);
  const data = await response.json();
  
  return data.results;
};

export const fetchUpcomingMovies = async (): Promise<MovieSummary[]> => {
  const request = new Request(
    `${apiUrl}/movie/upcoming?${new URLSearchParams({
      ...defaultSearchParams,
      page: "1"
    })}`,
    options
  );
  const response = await fetch(request);
  const data = await response.json();
  return data.results;
};

export const fetchMoviesSearch = async (
  search: string,
  page = 1
): Promise<{ page: number; movies: MovieSummary[]}> => {
  const request = new Request(
    `${apiUrl}/search/movie?${new URLSearchParams({
      ...defaultSearchParams,
      query: search,
      page: page.toString()
    })}`,
    options
  );
  const response = await fetch(request);
  const data = await response.json();
  return { page, movies: data.results};
};

export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  const request = new Request(
    `${apiUrl}/movie/${id}?${new URLSearchParams({
      ...defaultSearchParams,
    })}`,
    options
  );
  const response = await fetch(request);
  const data = await response.json();
  return data;
};

export const fetchMovieCast = async (
  id: number
): Promise<MovieCastMember[]> => {
  const request = new Request(
    `${apiUrl}/movie/${id}/credits?${new URLSearchParams({
      ...defaultSearchParams,
    })}`,
    options
  );
  const response = await fetch(request);
  const data = await response.json();
  return data.cast;
};

export const fetchTrailers = async (id: number): Promise<MovieTrailer[]> => {
  const request = new Request(
    `${apiUrl}/movie/${id}/videos?${new URLSearchParams({
      ...defaultSearchParams
    })}`,
    options
  );
  const response = await fetch(request);
  const data = await response.json();
  return data.results.map((result: any) => ({
    name: result.name,
    link: `https://www.youtube.com/watch?v=${result.key}`,
    key: result.key
  }))
}