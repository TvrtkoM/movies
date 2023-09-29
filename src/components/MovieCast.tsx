'use client'
import { MovieCastMember } from "@/fetch-movies";
import Image from "next/image";
import React from "react";

export default function MovieCast({ cast }: { cast: MovieCastMember[] }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 space-y-2 mt-1">
      {cast.length === 0 && <div>No available info.</div>}
      {cast.length > 0 && cast.map((c, i) => {
        return (
          <div className="flex items-center space-x-3"  key={`cast-${i}`}>
            {c.profile_path ? <Image
              src={`https://image.tmdb.org/t/p/original/${c.profile_path}`}
              width={100}
              blurDataURL="/film-placeholder.webp"
              height={100}
              alt={c.character}
              placeholder="blur"
            /> : <Image
              width={100}
              src="/film-placeholder.webp"
              height={100}
              alt={c.character}
            />}
            <div className="flex flex-col space-y-3">
              <div>
                <div className="font-medium">Actor:</div>
                {c.name}
              </div>
              <div>
                <div className="font-medium">Character:</div> {c.character}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
