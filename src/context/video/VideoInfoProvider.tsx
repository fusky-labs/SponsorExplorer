"use client"

import type { VideoInfoType, VideoSegments } from "@/types"
import { noop } from "lodash-es"
import type { MapUseStateSetters } from "../context.types"
import { createContext, useContext, useState } from "react"
import { usePathname } from "next/navigation"
import { VideoSidebarProvider } from "./VideoSidebarProvider"

type VideoInfoContextType = MapUseStateSetters<
  {
    videoDetails: VideoInfoType & { id: string }
    segmentData: Partial<VideoSegments>
  },
  "videoDetails"
>

const INITIAL_SEGMENT_DATA: VideoInfoContextType["segmentData"] = {
  submissionCount: 0,
  segments: [],
  lockReason: null,
  lockedSegments: {},
  hasLockedSegments: false,
}

const INITIAL_VIDEO_DATA: VideoInfoContextType["videoDetails"] = {
  state: "NOT_FOUND",
  hasSponsorDisclosure: false,
  nativeChapters: [],
  id: "",
  video: {
    channelId: "",
    channelTitle: "",
    publishedAt: "",
    title: "",
  },
}

const VideoInfoContext = createContext<VideoInfoContextType>({
  segmentData: INITIAL_SEGMENT_DATA,
  videoDetails: INITIAL_VIDEO_DATA,
  setSegmentData: noop,
})

const validVideoPathOnly = () => {
  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const pathname = usePathname()

  if (!pathname.startsWith("/video/")) {
    throw new Error(
      "useVideoInfoContext should only be used in `/video/*` routes only",
    )
  }
}

export const useVideoInfoContext = () => {
  const context = useContext(VideoInfoContext)

  if (!context) {
    throw new Error(
      "useVideoInfoContext must be used within a VideoInfoProvider",
    )
  }

  validVideoPathOnly()

  return context
}

export function VideoInfoProvider({
  children,
  videoData,
  initialSegmentData: initialData = INITIAL_SEGMENT_DATA,
}: Readonly<{
  children: React.ReactNode
  videoData: VideoInfoContextType["videoDetails"]
  initialSegmentData?: VideoInfoContextType["segmentData"]
}>) {
  const [segmentData, setSegmentData] = useState(initialData)

  validVideoPathOnly()

  return (
    <VideoInfoContext.Provider
      value={{ videoDetails: videoData, segmentData, setSegmentData }}
    >
      <VideoSidebarProvider>{children}</VideoSidebarProvider>
    </VideoInfoContext.Provider>
  )
}
