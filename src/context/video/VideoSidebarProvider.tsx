"use client"

import { createContext, useContext, useState } from "react"
import { noop } from "lodash-es"
import type { VideoInfoType } from "@/types"
import type { MapUseStateSetters } from "../context.types"

type VideoItem = Omit<VideoInfoType["video"], "channelId">

type VideoSidebarContextType = MapUseStateSetters<{
  videoList: VideoItem[]
  activeVideoId: string | null
}>

const VideoSidebarContext = createContext<VideoSidebarContextType>({
  videoList: [],
  activeVideoId: null,
  setVideoList: noop,
  setActiveVideoId: noop,
})

export const useVideoSidebarContext = () => useContext(VideoSidebarContext)

export function VideoSidebarProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [videoList, setVideoList] = useState<VideoSidebarContextType["videoList"]>([])
  const [activeVideoId, setActiveVideoId] = useState<VideoSidebarContextType["activeVideoId"]>(null)

  return (
    <VideoSidebarContext.Provider
      value={{ videoList, activeVideoId, setActiveVideoId, setVideoList }}
    >
      {children}
    </VideoSidebarContext.Provider>
  )
}
