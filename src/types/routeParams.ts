import type { ViewStateContext } from "@/context"

type DefaultSearchParams = { [key: string]: string | string[] | undefined }

/**
 * A type generic wrapper for implementing typed Next.js routes
 * 
 * Starting in Next.js 15, parameters are now asynchronous, they return
 * a Promise type
 * 
 * @template Params Route parameters
 * @template SearchParams URL search parameters
 */
export interface DefineRouteParams<Params extends object = Record<string, never>, SearchParams extends object = DefaultSearchParams> {
  params: Promise<Params>
  searchParams: Promise<SearchParams>
}


// Routes from `pages`
export type ChannelIdRouteParams = DefineRouteParams<
  { cid: string },
  Partial<{
    filters: string
    sort: string
    view: ViewStateContext["view"]
  }>
>
