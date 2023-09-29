import TopRatedMovies from '@/components/TopRatedMovies';
import UpcomingMovies from '@/components/UpcomingMovies';
import { fetchTopRatedMovies, fetchUpcomingMovies } from '@/fetch-movies'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieSearch from '@/components/MovieSearch';

export default async function Home() {
  const topRated = await fetchTopRatedMovies()
  const upcoming = await fetchUpcomingMovies()

  return (
    <div className='container mx-auto'>
      <MovieSearch></MovieSearch>
      <h1 className='text-3xl my-3'>Top rated movies</h1>
      <TopRatedMovies movies={topRated}></TopRatedMovies>
      <h1 className='text-2xl mt-6'>Upcoming movies</h1>
      <UpcomingMovies movies={upcoming}></UpcomingMovies>
    </div>
  );
}
