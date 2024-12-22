"use client"

import { VideoSegments } from "@/types"
import { noop } from "lodash-es"
import { createContext, useContext, useState } from "react"

type _VideoSegments = Partial<VideoSegments>

interface SegmentStoreContextType {
  segmentData: _VideoSegments
  setSegmentData: React.Dispatch<React.SetStateAction<_VideoSegments>>
}

const INITIAL_DATA: _VideoSegments = {
  submissionCount: 0,
  segments: [],
  lock: {
    full: [],
    mute: [],
    skip: [],
  },
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
}: Readonly<{ children: React.ReactNode; initialData: _VideoSegments }>) {
  const [segmentData, setSegmentData] = useState(initialData)

  return (
    <SegmentStoreContext.Provider value={{ segmentData, setSegmentData }}>
      {children}
    </SegmentStoreContext.Provider>
  )
}
