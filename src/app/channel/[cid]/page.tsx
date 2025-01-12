import type { ChannelIdRouteParams } from "@/types"
import type { Metadata } from "next"
import { ViewStateProvider, type ViewStateContext } from "@/context"
import { VideoItemContainer } from "@/components/videoItems"

export async function generateMetadata(
  props: ChannelIdRouteParams,
): Promise<Metadata> {
  const params = await props.params

  return {
    title: `Channel ID: ${params.cid}`,
  }
}

export default async function ChannelPage(props: ChannelIdRouteParams) {
  const searchParams = await props.searchParams
  const params = await props.params

  const queryFilters = searchParams.filters
  const querySorts = searchParams.sort
  const queryView = searchParams.view

  return (
    <div>
      <VideoItemContainer queryView={queryView} />
    </div>
  )
}
