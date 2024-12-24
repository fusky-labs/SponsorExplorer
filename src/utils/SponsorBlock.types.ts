export type Category =
  | "chapter"
  | "poi_highlight"
  | "sponsor"
  | "selfpromo"
  | "preview"
  | "interaction"
  | "intro"
  | "outro"
  | "filler"
  | "music_offtopic"
  | "exclusive_access"

export type ActionType = "skip" | "full" | "mute" | "chapter"

export namespace sb.Props {
  export interface SkipAndSearchSegments {
    videoID: string
    categories?: Category[]
    actionTypes?: ActionType[]
    page?: number
    service?: "YouTube"
    minVotes?: number
    maxVotes?: number
    minViews?: number
    maxViews?: number
    locked?: boolean
    hidden?: boolean
    ignored?: boolean
  }

  export interface LockedSegments {
    videoID: string
    actionTypes?: Exclude<ActionType, "chapter">[]
  }

  export interface UserID {
    userName: string
    exact?: boolean
  }

  export interface UserInfo {
    userID: string
    publicUserID: string
    values?: string[]
  }
}

export namespace sb.Responses {
  export type SkipSegments = Array<{
    segment: number[]
    UUID: string
    category: string,
    videoDuration: number
    actionType: string,
    locked: number,
    votes: number,
    description: string,
  }>

  export interface SearchSegments {
    segmentCount: number
    page: number
    segments: Array<{
      UUID: string,
      timeSubmitted: string,
      startTime: number,
      endTime: number,
      category: string,
      actionType: string,
      votes: number,
      views: number,
      locked: number,
      hidden: number,
      shadowHidden: number,
      userID: string,
      description: string
    }>
  }

  export interface LockCategories {
    reason: string
    categories: Category[]
    actionTypes: Exclude<ActionType, "chapter">[]
  }
}
