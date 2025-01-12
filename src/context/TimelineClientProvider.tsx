"use client"

import { createContext, useContext, useState } from "react"
import { noop } from "lodash-es"
import { contextProviderGuard } from "@/utils"
import type { MapUseStateSetters } from "./context.types"
import type { SegmentBank } from "@/types"

type TimelinePlayState = "stopped" | "paused" | "buffering" | "playing"

type TimelineContext = MapUseStateSetters<{
  youtubeId: string

  // To be tracked by the YT iframe API
  playerState: TimelinePlayState
  currentTime: number | null

  /** Stores all the submitted segments, including chapters */
  segmentBank: SegmentBank
}>

const INITIAL_SEGMENT_BANK_DATA: SegmentBank = {
  segments: [],
  submissionCount: 0,
}

const TimelineContext = createContext<Partial<TimelineContext>>({
  youtubeId: "",
  currentTime: 0,
  playerState: "stopped",
  segmentBank: INITIAL_SEGMENT_BANK_DATA,
  setYoutubeId: noop,
  setCurrentTime: noop,
  setPlayerState: noop,
  setSegmentBank: noop,
})

export function TimelineClientProvider({
  children,
  youtubeId,
}: Readonly<{
  children: React.ReactNode
  youtubeId: string
}>) {
  const [currentTime, setCurrentTime] =
    useState<TimelineContext["currentTime"]>(null)
  const [playerState, setPlayerState] =
    useState<TimelineContext["playerState"]>("stopped")
  const [segmentBank, setSegmentBank] = useState<
    TimelineContext["segmentBank"]
  >(INITIAL_SEGMENT_BANK_DATA)

  return (
    <TimelineContext.Provider
      value={{
        youtubeId,
        currentTime,
        playerState,
        segmentBank,
        setCurrentTime,
        setPlayerState,
        setSegmentBank,
      }}
    >
      {children}
    </TimelineContext.Provider>
  )
}

export const useTimelineContext = () => {
  const ctx = useContext(TimelineContext)

  contextProviderGuard(ctx, useTimelineContext, TimelineClientProvider)

  return ctx
}
