"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { noop } from "lodash-es"
import { VideoInfoType } from "@/types"

type VideoItem = Omit<VideoInfoType["video"], "channelId">

interface VideoListPeekContextType {
  videoList: VideoItem[]
  activeVideo: string | null
  setVideoList: React.Dispatch<React.SetStateAction<VideoItem[]>>
  setActiveVideo: React.Dispatch<React.SetStateAction<string | null>>
}

const VideoListPeekContext = createContext<VideoListPeekContextType>({
  videoList: [],
  activeVideo: "",
  setVideoList: noop,
  setActiveVideo: noop,
})

export const useVideoListPeekContext = () => {
  const context = useContext(VideoListPeekContext)

  if (!context) {
    throw new Error(
      "useVideoListPeekContext must be used within a VideoListPeekProvider",
    )
  }

  return context
}

export function VideoListPeekProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [videoList, setVideoList] = useState([] as VideoItem[])
  const [activeVideo, setActiveVideo] = useState(null as string | null)

  return (
    <VideoListPeekContext.Provider
      value={{ videoList, activeVideo, setActiveVideo, setVideoList }}
    >
      {children}
    </VideoListPeekContext.Provider>
  )
}
