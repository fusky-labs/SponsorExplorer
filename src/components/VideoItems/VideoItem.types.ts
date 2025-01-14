import type { VideoSegments } from "@/types"

export interface SharedVideoItemProps {
  title?: string
  date?: string
  segmentDisplay?: VideoSegments["segments"]
}
