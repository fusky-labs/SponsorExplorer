interface StandardParams {
  part?: AllPartLiterals | AllPartLiterals[]
  maxResults: number
  pageToken: string
}

interface VideoParams {
  id: string
}

interface ChannelParams {
  id: string
  forHandle: `@${string}`
  forUsername: string
}

// We're limiting the search to channels only
interface SearchParams {
  id: string
  q: string
}

interface PlaylistItemsParams {
  id: string
  playlistId: string
}

export type AllPartLiterals = "snippet" | "contentDetails" | "statistics" | "status"
export type AllEndpointParams = StandardParams & VideoParams & ChannelParams & PlaylistItemsParams & SearchParams
