"use client";
import React from 'react'
import PodcastCard from '@/components/PodcastCard'


import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";




const Home = () => {
  const TrendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  return (
    <>
    <section className="flex flex-col gap-5">
 <h1 className='text-20 font-bold text-white-1'>Create podcasts using AI. To get started click create podcast</h1>
      <h1 className='text-20 font-bold text-white-1'>Trending Podcasts</h1>
     
      {TrendingPodcasts?.length === 0 && <div className='text-white-1 text-center text-20'>Create a Podcast to see here</div>}
      <div className='podcast_grid'>
      {TrendingPodcasts?.map(({_id, podcastTitle, podcastDescription, imageUrl}) => (
        <PodcastCard key={_id} imgUrl={imageUrl} title={podcastTitle} description = {podcastDescription} podcastId={_id}/>
      ))}
      </div>
      

    </section>
    </>
  )
}

export default Home