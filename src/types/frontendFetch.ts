import type { Responses } from "@/utils/SponsorBlock.types"

export interface VideoSegments {
  totalIterations: number
  submissionCount: number
  hasLockedSegments: boolean
  lockReason: string | null
  lockedSegments: {
    skip: Responses.LockCategories[] | null
    mute: Responses.LockCategories[] | null
    full: Responses.LockCategories[] | null
  } | Record<string, never>
  segments: Responses.SearchSegments["segments"]
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
  videoState: "FOUND" | "NOT_FOUND"
  video: {
    title: string
    publishedAt: string
    channelId: string
    channelTitle: string
  }
  nativeChapters?: NativeVideoChapters[]
}
