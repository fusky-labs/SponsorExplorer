import type { ChannelIdRouteParams } from "@/types"
import type { Metadata } from "next"
import { VideoItemContainer } from "@/components/VideoItems"

export async function generateMetadata(
  props: ChannelIdRouteParams,
): Promise<Metadata> {
  const params = await props.params

  return {
    title: `Channel ID: ${params.cid}`,
  }
}

export default async function ChannelPage() {
  return <VideoItemContainer />
}
