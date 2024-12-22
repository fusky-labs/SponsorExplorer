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

export type AllPartLiterals = "snippet" | "contentDetails" | "statistics" | "status" | "paidProductPlacementDetails"
export type AllEndpointParams = StandardParams & VideoParams & ChannelParams & PlaylistItemsParams & SearchParams

interface VideoItems {
  snippet: {
    title: string
    publishedAt: string
    channelId: string
    channelTitle: string
    description: string
  }
  paidProductPlacementDetails: {
    hasPaidProductPlacement: boolean
  }
}

export interface YTVideoResponse {
  kind: "youtube#videoListResponse"
  etag: string
  nextPageToken: string
  prevPageToken: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: VideoItems[]
}

export interface ChannelItems {
  snippet: {
    title: string
    description: string
    publishedAt: string
    thumbnails: {
      default: {
        url: string
      }
      medium: {
        url: string
      }
      high: {
        url: string
      }
    }

  }
  contentDetails: {
    relatedPlaylists: {
      uploads: string
      watchHistory: string
      watchLater: string
    }
  }
}

export interface YTChannelResponse {
  kind: "youtube#channelListResponse"
  etag: string
  nextPageToken: string
  prevPageToken: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: ChannelItems[]
}
