"use client"

import type { VideoInfoType, VideoSegments } from "@/types"
import { noop } from "lodash-es"
import { createContext, useContext, useState } from "react"
import type { MapUseStateSetters } from "../context.types"
import { usePathname } from "next/navigation"

type VideoInfoContextType = Omit<
  MapUseStateSetters<{
    videoDetails: VideoInfoType & { id: string }
    segmentData: Partial<VideoSegments>
  }>,
  "setVideoDetails"
>

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

const INITIAL_SEGMENT_DATA: VideoInfoContextType["segmentData"] = {
  submissionCount: 0,
  segments: [],
  lockReason: null,
  lockedSegments: {},
  hasLockedSegments: false,
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
    throw new Error("useVideoInfoContext should only be used in `/video/*` routes only")
  }
}

export const useVideoInfoContext = () => {
  const context = useContext(VideoInfoContext)

  if (!context) {
    throw new Error("useVideoInfoContext must be used within a VideoInfoProvider")
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
      {children}
    </VideoInfoContext.Provider>
  )
}
