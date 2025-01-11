"use client"

import { createContext, useContext, useState } from "react"
import { noop } from "lodash-es"
import { contextProviderGuard } from "@/utils"

type TimelinePlayState = "stopped" | "paused" | "buffering" | "playing"
type SegmentBank = Array<Record<string, unknown> | never>

interface TimelineContextType {
  // To be tracked by the YT iframe API
  playerState: TimelinePlayState
  currentTime: number | null

  /** Stores all the submitted segments, including chapters */
  segmentBank: SegmentBank

  // setters
  setPlayerState: React.Dispatch<React.SetStateAction<TimelinePlayState>>
  setCurrentTime: React.Dispatch<React.SetStateAction<number | null>>
  setSegmentBank: React.Dispatch<React.SetStateAction<SegmentBank>>
}

const TimelineContext = createContext<Partial<TimelineContextType>>({
  currentTime: 0,
  playerState: "stopped",
  segmentBank: [],
  setCurrentTime: noop,
  setPlayerState: noop,
  setSegmentBank: noop,
})

export function TimelineClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [currentTime, setCurrentTime] =
    useState<TimelineContextType["currentTime"]>(null)
  const [playerState, setPlayerState] =
    useState<TimelineContextType["playerState"]>("stopped")

  return (
    <TimelineContext.Provider
      value={{
        currentTime,
        playerState,
        setCurrentTime,
        setPlayerState,
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
