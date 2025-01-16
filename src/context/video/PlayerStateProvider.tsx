"use client"

import { createContext, useContext, useState } from "react"
import type { MapUseStateSetters } from "../context.types"
import { noop } from "lodash-es"

type TimelinePlayState = "stopped" | "paused" | "buffering" | "playing"

type PlayerStateContextType = MapUseStateSetters<{
  playerState: TimelinePlayState
  currentTime: number | null

  isPlayerPinned: boolean
}>

const PlayerStateContext = createContext<PlayerStateContextType>({
  currentTime: 0,
  isPlayerPinned: false,
  playerState: "stopped",

  setCurrentTime: noop,
  setIsPlayerPinned: noop,
  setPlayerState: noop,
})

export function PlayerStateProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [currentTime, setCurrentTime] = useState<PlayerStateContextType["currentTime"]>(0)
  const [playerState, setPlayerState] = useState<PlayerStateContextType["playerState"]>("stopped")

  const [isPlayerPinned, setIsPlayerPinned] = useState<PlayerStateContextType["isPlayerPinned"]>(false)

  return (
    <PlayerStateContext.Provider
      value={{
        currentTime,
        playerState,
        isPlayerPinned,
        setCurrentTime,
        setPlayerState,
        setIsPlayerPinned,
      }}
    >
      {children}
    </PlayerStateContext.Provider>
  )
}

export const usePlayerStateContext = () => {
  const context = useContext(PlayerStateContext)

  if (!context) {
    throw new Error(
      "usePlayerStateContext must be used within a PlayerStateProvider",
    )
  }

  return context
}
