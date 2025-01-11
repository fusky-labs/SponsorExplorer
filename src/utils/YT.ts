import { fetchWrapper } from "./fetchWrapper"
import { URLConstructorFactory } from "./URLFactory"
import type { AllEndpointParams, yt } from "./YT.types"

class APIKeyMissingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "APIKeyMissingError"
  }
}

class YTURLFactory extends URLConstructorFactory {
  private readonly YT_API_KEY = process.env.YT_API_KEY as string

  constructor() {
    super("https://www.googleapis.com/youtube/v3")
  }

  createEndpoint<EndpointParams extends object = Required<AllEndpointParams>>(route: string, params: EndpointParams) {
    if (!this.YT_API_KEY) {
      throw new APIKeyMissingError("YouTube API key not set. Check your environment variables or .env file.");
    }

    // @ts-ignore
    params.key = this.YT_API_KEY

    // @ts-ignore
    if (!params.part) {
      // @ts-ignore
      params.part = "contentDetails"
    }

    return super.createEndpoint(route, params)
  }
}

const ytUrl = new YTURLFactory()

const _ytFetchOptions = { cache: "force-cache" } satisfies RequestInit

/**
 * @link https://developers.google.com/youtube/v3/docs/videos/list
 */
const fetchVideos = async (params?: AllEndpointParams) => {
  const endpoint = ytUrl.createEndpoint("/videos", { ...params })

  return fetchWrapper<yt.Responses.VideoList>(endpoint, _ytFetchOptions)
}

/**
 * @link https://developers.google.com/youtube/v3/docs/channels/list
 */
const fetchChannels = async (params: AllEndpointParams) => {
  const endpoint = ytUrl.createEndpoint("/channel", { ...params })

  return fetchWrapper<yt.Responses.ChannelList>(endpoint, _ytFetchOptions)
}

/**
 * @link https://developers.google.com/youtube/v3/docs/playlists/list
 */
const fetchPlaylistItems = async (params: AllEndpointParams) => {
  const endpoint = ytUrl.createEndpoint("/playlistItems", { ...params })

  return fetchWrapper<yt.Responses.ChannelList>(endpoint, _ytFetchOptions)
}

/**
 * @link https://developers.google.com/youtube/v3/docs/search/list
 */
const fetchSearch = async (params: AllEndpointParams) => {
  const endpoint = ytUrl.createEndpoint("/search", { ...params })

  return fetchWrapper<yt.Responses.ChannelList>(endpoint, _ytFetchOptions)
}

const youtube = {
  videos: fetchVideos,
  channels: fetchChannels,
  playlistItems: fetchPlaylistItems,
  search: fetchSearch,
}

export { youtube }
