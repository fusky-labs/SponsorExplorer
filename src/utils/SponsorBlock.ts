import type { Category, sb } from "./SponsorBlock.types"
import { fetchWrapper } from "./fetchWrapper"
import { URLConstructorFactory } from "./URLFactory"

class SponsorBlockURLFactory extends URLConstructorFactory {
  constructor() {
    super("https://sponsor.ajay.app/api", ([k, v]) => {
      if (k === "actionTypes" || k === "categories") return [k, this.unwrapArrayAsLiteral(v as string[])]
      return [k, v]
    })
  }

  private unwrapArrayAsLiteral(arr: string[]) {
    return `[${arr.map((x) => `"${x}"`).toString()}]`
  }
}

const sbUrl = new SponsorBlockURLFactory()

/**
 * Get segments for a video.
 * 
 * @link https://wiki.sponsor.ajay.app/w/API_Docs#GET_/api/skipSegments
 */
const skipSegments = async (props: sb.Props.SkipAndSearchSegments) => {
  const endpoint = sbUrl.createEndpoint<typeof props>("/skipSegments", props)

  return fetchWrapper<sb.Responses.SkipSegments>(endpoint)
}

/**
 * Get all segments of a video based on specified filters.
 * 
 * Note: It is suggested that you don't use this for knowing which segments
 * to skip on your client, as thresholds and values that determine which
 * segments are the best change over time. Using `skipSegments` ensures that
 * you will always get the best segments. 
 * 
 * @link https://wiki.sponsor.ajay.app/w/API_Docs#GET_/api/searchSegments
 */
const searchSegments = async (props: sb.Props.SkipAndSearchSegments) => {
  const endpoint = sbUrl.createEndpoint<typeof props>("/searchSegments", props)

  return fetchWrapper<sb.Responses.SearchSegments>(endpoint)
}

/**
 * Get locked categories for a video.
 * 
 * @link https://wiki.sponsor.ajay.app/w/API_Docs#GET_/api/lockCategories
 */
const lockCategories = async (props: sb.Props.LockedSegments) => {
  const endpoint = sbUrl.createEndpoint<typeof props>("/lockCategories", props)

  return fetchWrapper<sb.Responses.LockCategories>(endpoint)
}

const userID = async (props: sb.Props.UserID) => {
  const endpoint = sbUrl.createEndpoint<typeof props>("/userID", props)

  return fetchWrapper(endpoint)
}

const userInfo = async (props: sb.Props.UserInfo) => {
  const endpoint = sbUrl.createEndpoint<typeof props>("/userInfo", props)

  return fetchWrapper(endpoint)
}

const SponsorBlock = {
  skipSegments,
  searchSegments,
  lockCategories,
  userID,
  userInfo
}

const CategoryReadableLabels: Readonly<Record<Exclude<Category, "chapter">, string>> = {
  interaction: "Interaction Reminder",
  intro: "Intro/Intermission",
  music_offtopic: "Non-Music",
  outro: "Endcards/Credits",
  preview: "Preview/Recap/Hook",
  sponsor: "Sponsor",
  selfpromo: "Unpaid/Self Promotion",
  exclusive_access: "Exclusive Access",
  filler: "Tangents/Jokes",
  poi_highlight: "Highlight"
}

const allSegments: Category[] = [
  "chapter",
  "interaction",
  "intro",
  "outro",
  "filler",
  "preview",
  "interaction",
  "music_offtopic",
  "selfpromo",
  "sponsor",
  "exclusive_access",
  "poi_highlight"
]

export { SponsorBlock, CategoryReadableLabels, allSegments }
