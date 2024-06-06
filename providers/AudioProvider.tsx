'use client'

import React, { useEffect } from "react"
import { AudioContextType, AudioProps } from "@/types"
import { createContext } from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { useContext } from "react"

const AudioContext = createContext<AudioContextType | undefined>(undefined)

const AudioProvider = ({children}: {children: React.ReactNode}) => {
    const [audio, setAudio] = useState<AudioProps | undefined >()
    const pathname = usePathname();

    useEffect(() => {
        if(pathname === '/create-podcast') setAudio(undefined);
    }, [pathname])

    return(
        <AudioContext.Provider value={{audio, setAudio}}>
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => {
    const context = useContext(AudioContext);
  console.log('AudioContext:', context); // Add this line to debug
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

export default AudioProvider;