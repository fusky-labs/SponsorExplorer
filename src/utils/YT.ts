import { fetchWrapper } from "./fetchWrapper"
import type { AllEndpointParams, YTChannelResponse, YTVideoResponse } from "./YT.types"

class APIKeyMissingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "APIKeyMissingError"
  }
}

class YTURLConstructor {
  private readonly YT_API_BASE_URL = "https://www.googleapis.com/youtube/v3"
  private YT_API_KEY = process.env.YT_API_KEY as string
  private searchParamsCollection: URLSearchParams

  constructor() {
    this.searchParamsCollection = new URLSearchParams()
  }

  createEndpoint(route: `/${string}`, params: AllEndpointParams) {
    if (!this.YT_API_KEY) {
      throw new APIKeyMissingError("YouTube API key not set, check your environment variables or .env file")
    }
    this.searchParamsCollection.append("key", this.YT_API_KEY)

    const { part } = params

    // part params
    if (!part) this.searchParamsCollection.append("part", "contentDetails")
    if (part && typeof part === "string") this.searchParamsCollection.append("part", part)
    if (part && Array.isArray(part)) this.searchParamsCollection.append("part", part.join(","))

    // append the rest
    Object.entries(params).forEach(([k, v]) => {
      if (k !== "part" && k !== "maxResults") {
        this.searchParamsCollection.append(k, v.toString())
      }
    })

    const finalParams = `?${this.searchParamsCollection.toString()}`

    return `${this.YT_API_BASE_URL}${route}${finalParams}`
  }
}

const ytUrl = new YTURLConstructor()

const _ytFetchOptions = { cache: "force-cache" } satisfies RequestInit

/**
 * @link https://developers.google.com/youtube/v3/docs/videos/list
 */
const fetchVideos = async (id: string, params?: AllEndpointParams) => {
  const endpoint = ytUrl.createEndpoint("/videos", { id, ...params })

  return fetchWrapper<YTVideoResponse>(endpoint, _ytFetchOptions)
}

/**
 * @link https://developers.google.com/youtube/v3/docs/channels/list
 */
const fetchChannels = async (params: AllEndpointParams) => {
  const endpoint = ytUrl.createEndpoint("/channel", { ...params })

  return fetchWrapper<YTChannelResponse>(endpoint, _ytFetchOptions)
}

/**
 * @link https://developers.google.com/youtube/v3/docs/playlists/list
 */
const fetchPlaylistItems = async (params: AllEndpointParams) => {
  const endpoint = ytUrl.createEndpoint("/playlistItems", { ...params })

  return fetchWrapper<YTChannelResponse>(endpoint, _ytFetchOptions)
}

/**
 * @link https://developers.google.com/youtube/v3/docs/search/list
 */
const fetchSearch = async (params: AllEndpointParams) => {
  const endpoint = ytUrl.createEndpoint("/search", { ...params })

  return fetchWrapper<YTChannelResponse>(endpoint, _ytFetchOptions)
}

const youtube = {
  videos: fetchVideos,
  channels: fetchChannels,
  playlistItems: fetchPlaylistItems,
  search: fetchSearch,
}

export { youtube }
