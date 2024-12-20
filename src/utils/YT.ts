import { fetchWrapper } from "./fetchWrapper"
import type { AllEndpointParams, AllPartLiterals } from "./YT.types"

class APIKeyMissingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "APIKeyMissingError"
  }
}

class YTURLConstructor {
  private readonly YT_API_BASE_URL = "https://www.googleapis.com/youtube/v3"
  private YT_API_KEY = process.env.YT_API_KEY as string

  constructor() {
    if (!this.YT_API_KEY) {
      throw new APIKeyMissingError("YouTube API key not set, check your environment variables, cutie~")
    }
  }

  createEndpoint(route: `/${string}`, params: Partial<AllEndpointParams>) {
    const _params = new URLSearchParams()
    _params.append("key", this.YT_API_KEY)

    const { part, maxResults } = params

    // part params
    if (!part) _params.append("part", "contentDetails")
    if (part && typeof part === "string") _params.append("part", part)
    if (part && Array.isArray(part)) _params.append("part", part.join(","))

    // append the rest
    for (const [key, value] of Object.entries(params)) {
      if (key !== "part" && key !== "maxResults") {
        _params.append(key, value as string)
      }
    }

    const finalParams = `?${_params.toString()}`

    return `${this.YT_API_BASE_URL}${route}${finalParams}`
  }
}

const ytUrl = new YTURLConstructor()

/**
 * Retrieve video information.
 * 
 * @link https://developers.google.com/youtube/v3/docs/videos/list
 */
const fetchVideos = async (id: string, params?: Omit<Partial<AllEndpointParams>, "id">) => {
  const endpoint = ytUrl.createEndpoint("/videos", { id, ...params })

  return fetchWrapper(endpoint, { cache: "force-cache" })
}

/**
 * Retrieve channel information.
 * 
 * @link https://developers.google.com/youtube/v3/docs/channels/list
 */
const fetchChannels = async (id: string, params?: Omit<Partial<AllEndpointParams>, "id">) => {
  const endpoint = ytUrl.createEndpoint("/channel", { id, ...params })

  return fetchWrapper(endpoint)
}

const youtube = {
  videos: fetchVideos,
  channels: fetchChannels,
}

export { youtube }
