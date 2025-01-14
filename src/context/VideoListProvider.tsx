"use client"

import { createContext, useContext, useState } from "react"
import { noop } from "lodash-es"
import type { VideoInfoType } from "@/types"
import type { MapUseStateSetters } from "./context.types"

type VideoItem = Omit<VideoInfoType["video"], "channelId">

type VideoListPeekContextType = MapUseStateSetters<{
  videoList: VideoItem[]
  activeVideoId: string | null
}>

const VideoListPeekContext = createContext<VideoListPeekContextType>({
  videoList: [],
  activeVideoId: null,
  setVideoList: noop,
  setActiveVideoId: noop,
})

export const useVideoListPeekContext = () => {
  const context = useContext(VideoListPeekContext)

  if (!context) {
    throw new Error(
      "useVideoListPeekContext must be used within a VideoListProvider",
    )
  }

  return context
}

export function VideoListProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [videoList, setVideoList] = useState<
    VideoListPeekContextType["videoList"]
  >([])
  const [activeVideoId, setActiveVideoId] =
    useState<VideoListPeekContextType["activeVideoId"]>(null)

  return (
    <VideoListPeekContext.Provider
      value={{ videoList, activeVideoId, setActiveVideoId, setVideoList }}
    >
      {children}
    </VideoListPeekContext.Provider>
  )
}
