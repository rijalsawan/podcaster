'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SignedOut } from '@clerk/nextjs'
import { Button } from './ui/button'
import { SignedIn } from '@clerk/nextjs'
import { useClerk } from '@clerk/nextjs'
import { useAudio } from '@/providers/AudioProvider'

const LeftSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { signOut } = useClerk();
    const {audio} = useAudio();
  return (
    <section className={cn('left_sidebar h-[calc (100vh-5px]', {'h-[calc(100vh-140px)]' : audio?.audioUrl})}>
        <nav className='flex flex-col gap-6'>
            <Link href='/' className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center'>
                <Image src='/icons/logo.svg' alt='' width={23} height={27}/>
                <h1 className="text-24 font-extrabold max-lg:hidden text-white">Podcastr</h1>
            </Link>

            {sidebarLinks.map(({route, label, imgURL}) => {
                const isActive = pathname === route || pathname.startsWith(`${route}/`)
                return <Link key={label} className={cn('flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start', {
                    'bg-nav-focus border-r-4 border-orange-1': isActive,
                })} href={route}>
                <Image src={imgURL} alt='label' width={24} height={24}/>
                <p>{label}</p>
                </Link>
            })}
        </nav>
        <SignedOut>
            <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
                <Button className='text-16 w-full bg-orange-1 font-extrabold' asChild>
                    <Link href="/sign-in" >Sign In With Google</Link>
                </Button>
            </div>    
        </SignedOut>
        <SignedIn>
            <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
                <Button className='text-16 w-full bg-orange-1 font-extrabold' onClick={() => {signOut(()=> router.push('/'))}}>
                    Logout
                </Button>
            </div>    
        </SignedIn>
    </section>
  )
}

export default LeftSidebar