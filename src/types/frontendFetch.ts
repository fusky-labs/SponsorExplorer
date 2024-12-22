import type { Responses } from "@/utils/SponsorBlock.types"

export interface VideoSegments {
  totalIterations: number
  submissionCount: number
  segments: Responses.SearchSegments["segments"]
  lock: {
    skip: (Responses.LockCategories | never[]) & unknown[]
    mute: (Responses.LockCategories | never[]) & unknown[]
    full: (Responses.LockCategories | never[]) & unknown[]
  }
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
