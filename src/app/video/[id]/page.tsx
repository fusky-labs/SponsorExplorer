import { VideoInfo } from "@/components/headers"
import { SegmentClientWrapper } from "@/components/SegmentClientWrapper"
import type { VideoSegments } from "@/types"
import { headers } from "next/headers"

interface RouteParams {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: RouteParams) {
  return {
    title: `Segments from ${params.id}`,
    description: `Submissions by user id ${params.id}`,
  }
}

export default async function VideoPage({ params, searchParams }: RouteParams) {
  const urlBase = headers().get("x-url-origin")

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
