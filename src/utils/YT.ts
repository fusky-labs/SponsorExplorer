import { fetchWrapper } from "./fetchWrapper"
import type { AllEndpointParams, AllPartLiterals } from "./YT.types"

class YTURLConstructor {
  private YT_API_BASE_URL = "https://youtube.googleapis.com/api/v3"
  private API_KEY = process.env.YT_API_KEY as string

  constructor() {
    if (!this.API_KEY) {
      throw new Error("No YouTube API key found.")
    }
  }

  createEndpoint(route: `/${string}`, params: AllEndpointParams) {
    const _params = new URLSearchParams(params as unknown as Record<string, string>)
    _params.append("key", this.API_KEY)

    const { part, maxResults } = params

    // part params
    if (!part) {
      _params.append("part", "contentDetails")
    }

    if (part && typeof part === "string") {
      _params.append("part", part)
    }

    if (part && Array.isArray(part)) {
      _params.append("part", part.join(","))
    }

    // maxResults params
    if (!maxResults) {
      _params.append("maxResults", "25")
    }

    return `${this.YT_API_BASE_URL}${route}?${_params}`
  }
}

const yt = new YTURLConstructor()

