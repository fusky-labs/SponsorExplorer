import { VideoInfo } from "@/components/headers"
import { SegmentClientWrapper } from "@/components/SegmentClientWrapper"
import type { DefineRouteParams, VideoSegments } from "@/types"
import { headers } from "next/headers"

type RouteParams = DefineRouteParams<{ id: string }>

export async function generateMetadata(props: RouteParams) {
  const params = await props.params
  return {
    title: `Segments from ${params.id}`,
    description: `Submissions by user id ${params.id}`,
  }
}

export default async function VideoPage(props: RouteParams) {
  const searchParams = await props.searchParams
  const params = await props.params
  const urlBase = (await headers()).get("x-url-origin")

  const queryBypassCache = typeof searchParams["bypass-cache"] !== "undefined"
  const queryFilters = searchParams["filters"]
  const querySorts = searchParams["sort"]

  const fetchSegments = await fetch(
    `${urlBase}/api/sponsorblock/segments?id=${params.id}`,
    { priority: "high" },
  )

  const initialData = (await fetchSegments.json()) as VideoSegments

  return (
    <div className="mt-4 mx-auto px-6 max-w-screen-2xl">
      <VideoInfo id={params.id} />
      <SegmentClientWrapper {...initialData} />
    </div>
  )
}
