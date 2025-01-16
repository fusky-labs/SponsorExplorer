import { fetchWrapper } from "./fetchWrapper"
import { parseURLSearchParams } from "./parsers"
import type { Category, sb } from "./SponsorBlock.types"

const SB_API_BASE_URL = "https://sponsor.ajay.app/api"

/**
 * Get segments for a video.
 * 
 * @link https://wiki.sponsor.ajay.app/w/API_Docs#GET_/api/skipSegments
 */
const skipSegments = async (props: sb.Props.SkipAndSearchSegments) => {
  return fetchWrapper<sb.Responses.SkipSegments>(
    parseURLSearchParams<typeof props>(`${SB_API_BASE_URL}/skipSegments`, props)
  )
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
  return fetchWrapper<sb.Responses.SearchSegments>(
    parseURLSearchParams<typeof props>(`${SB_API_BASE_URL}/searchSegments`, props)
  )
}

/**
 * Get locked categories for a video.
 * 
 * @link https://wiki.sponsor.ajay.app/w/API_Docs#GET_/api/lockCategories
 */
const lockCategories = async (props: sb.Props.LockedSegments) => {
  return fetchWrapper<sb.Responses.LockCategories>(
    parseURLSearchParams<typeof props>(`${SB_API_BASE_URL}/lockCategories`, props)
  )
}

const userID = async (props: sb.Props.UserID) => {
  return fetchWrapper(
    parseURLSearchParams<typeof props>(`${SB_API_BASE_URL}/userID`, props)
  )
}

const userInfo = async (props: sb.Props.UserInfo) => {
  return fetchWrapper(
    parseURLSearchParams<typeof props>(`${SB_API_BASE_URL}/userInfo`, props)
  )
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
