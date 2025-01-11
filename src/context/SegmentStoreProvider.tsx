"use client"

import { VideoSegments } from "@/types"
import { noop } from "lodash-es"
import { createContext, useContext, useState } from "react"
import type { MapUseStateSetters } from "./context.types"

type SegmentStoreContextType = MapUseStateSetters<{
  segmentData: Partial<VideoSegments>
}>

const INITIAL_DATA: SegmentStoreContextType["segmentData"] = {
  submissionCount: 0,
  segments: [],
  lockReason: null,
  lockedSegments: {},
  hasLockedSegments: false,
}

const SegmentStoreContext = createContext<SegmentStoreContextType>({
  segmentData: INITIAL_DATA,
  setSegmentData: noop,
})

export const useSegmentStoreContext = () => {
  const context = useContext(SegmentStoreContext)

  if (!context) {
    throw new Error(
      "useSegmentStoreContext must be used within a SegmentStoreProvider",
    )
  }

  return context
}

export function SegmentStoreProvider({
  children,
  initialData,
}: Readonly<{
  children: React.ReactNode
  initialData: SegmentStoreContextType["segmentData"]
}>) {
  const [segmentData, setSegmentData] = useState(initialData)

  return (
    <SegmentStoreContext.Provider value={{ segmentData, setSegmentData }}>
      {children}
    </SegmentStoreContext.Provider>
  )
}
