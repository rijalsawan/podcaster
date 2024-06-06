'use client'
import React, { useEffect } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useDebounce } from '@/lib/useDebounce'

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const router = useRouter()
    const pathname = usePathname()

    const debouncedValue = useDebounce(search, 500)

    useEffect(() => {
        if(debouncedValue){
            router.push(`/discover?search=${debouncedValue}`)
                
        }else if(!debouncedValue && pathname === '/discover'){
            router.push('/discover')
        }
    }, [router, pathname, debouncedValue])
  return (
    <div className='relative mt-8 block'>
        <Input
        className='input-class py-6 pl-12 focus-visible:ring-offset-orange-1'
        placeholder='Search podcasts'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch('')}
        />
        <Image src="/icons/search.svg" className='absolute left-4 top-3.5' width={20} height={20} alt="search icon"/>
    </div>
  )
}

export default SearchBar