'use client'
import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import Carousel from './Carousel'
import Header from './Header'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import LoaderSpinner from './LoaderSpinner'
import { useAudio } from '@/providers/AudioProvider'
import {cn} from '@/lib/utils'

const RightSidebar = () => {
  const router = useRouter()
  const {user} = useUser()
  const topPodcaster = useQuery(api.users.getTopUserByPodcastCount)

  const {audio} = useAudio();
  if(!topPodcaster) return <LoaderSpinner/>
  return (
    <section className={cn('right_sidebar h-[calc (100vh-5px]', {'h-[calc(100vh-140px)]' : audio?.audioUrl})}>
        <SignedIn> 
          <Link className='flex gap-3 pb-12' href={`/profile/${user?.id}`}>
            <UserButton/>
            <div className="flex w-full items-center justify-between">
              <h1 className='text-16 truncate font-semibold text-white-1'>{user?.firstName} {user?.lastName}</h1>
              <Image src='/icons/right-arrow.svg' width={24} height={24} alt='arrow right'/>
            </div>
          </Link>
        </SignedIn>
        <section>
          <Header headerTitle = "Fans Like You"/>
          <Carousel fansLikeDetail = {topPodcaster!}/>
        </section>
        <section className='flex flex-col gap-8 pt-12'>
          <Header headerTitle = "Top Podcasters"/>
          <div className='flex flex-col gap-6'>
            {topPodcaster?.slice(0,4).map((podcaster) => (
              <div key={podcaster._id} className='flex cursor-pointer justify-between' onClick={() => router.push(`/profile/${podcaster.clerkId}`)}>
                <figure className="flex items-center gap-2">
                  <Image src={podcaster.imageUrl} alt={podcaster.name} width={44} height={44} className='aspect-square rounded-lg' />
                  <h2 className='text-14 font-bold text-white-1'>{podcaster.name}</h2>
                </figure>
                <div className='flex items-center'>
                  <p className='text-12 font-normal'>{podcaster.totalPodcasts} {podcaster.totalPodcasts === 1 ? 'podcast' : 'podcasts'}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
    </section>
  )
}

export default RightSidebar