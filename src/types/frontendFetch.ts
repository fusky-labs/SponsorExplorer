import type { sb } from "@/utils/SponsorBlock.types"

export interface VideoSegments {
  totalIterations: number
  submissionCount: number
  hasLockedSegments: boolean
  lockReason: string | null
  lockedSegments: {
    skip: sb.Responses.LockCategories[] | null
    mute: sb.Responses.LockCategories[] | null
    full: sb.Responses.LockCategories[] | null
  } | Record<string, never>
  segments: sb.Responses.SearchSegments["segments"]
}

export interface SegmentBank {
  submissionCount: number
  segments: sb.Responses.SearchSegments["segments"]
}

/**
 * This is when the creator supplies chapters from their descriptions,
 * and can be appended with SponsorBlock chapters
 * */
export interface NativeVideoChapters {
  timestamp: number | [number, number]
  title: string
}

export interface VideoInfoType {
  state: "FOUND" | "NOT_FOUND"
  hasSponsorDisclosure?: boolean
  video: {
    title: string
    publishedAt: string
    channelId: string
    channelTitle: string
  }
  nativeChapters?: (NativeVideoChapters | never)[]
}
