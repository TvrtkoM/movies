'use client'
import { SearchResults } from '@/app/search-results/page';
import { useRouter } from 'next/navigation';
import React from 'react'

function MovieSearch() {
  const [searchVal, setSearchVal] = React.useState('');
  const router = useRouter();
  return (
    <div className="w-full flex space-x-4 items-center">
      <div>Search movie by Name</div>
      <input
        type="string"
        value={searchVal}
        className='text-slate-500'
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <button
        className="cursor-pointer bg-amber-800 p-1 disabled:bg-amber-900/50 disabled:cursor-default disabled:text-stone-600"
        onClick={() =>
          router.push(`/search-results?text=${encodeURIComponent(searchVal)}`)
        }
        disabled={searchVal.length === 0}
      >
        Search
      </button>
    </div>
  );
}

export default MovieSearch