import React from 'react'
import YoutubeEmbed from './YouTubeEmbed';
import { fetchTrailers } from '@/fetch-movies';


export default async function MovieVideo({ movieId }: { movieId: number }) {
  const videos = await fetchTrailers(movieId);

  return (
    <div className="flex flex-row space-x-3 flex-wrap space-y-3 mt-4">
      {videos.length === 0 && <div>No available trailers.</div>}
      {videos.length > 0 &&
        videos.slice(undefined, 3).map((v) => (
          <YoutubeEmbed key={v.link} embedId={v.key} />
        ))}
    </div>
  );
}
