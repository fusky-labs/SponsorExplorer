import type { DefineRouteParams } from "@/types"
import type { Metadata } from "next"
import { ViewStateProvider } from "@/context"

type RouteParams = DefineRouteParams<
  { cid: string },
  Partial<{
    filters: string
    sort: string
    tab: "all" | "videos" | "shorts"
  }>
>

export async function generateMetadata(props: RouteParams): Promise<Metadata> {
  const params = await props.params

  return {
    title: `Channel ID: ${params.cid}`,
  }
}

export default async function ChannelPage(props: RouteParams) {
  const searchParams = await props.searchParams
  const params = await props.params

  const queryFilters = searchParams.filters
  const querySorts = searchParams.sort
  const queryTab = searchParams.tab

  return (
    <div>
      <ViewStateProvider>
        <h1>Channel ID: {params.cid}</h1>
      </ViewStateProvider>
    </div>
  )
}
