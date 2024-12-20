import { VideoInfo } from "@/components/headers"
import { SegmentClientWrapper } from "@/components/SegmentClientWrapper"
import type { DefineRouteParams, VideoSegments } from "@/types"
import { headers } from "next/headers"

type RouteParams = DefineRouteParams<{ id: string }>

async function fetchVideoData(id: string) {
  const urlBase = (await headers()).get("x-url-origin")
  const fetchVideoInfo = await fetch(`${urlBase}/api/yt/video?id=${id}&min=1`, {
    priority: "high",
  })

  return await fetchVideoInfo.json()
}

export async function generateMetadata(props: RouteParams) {
  const params = await props.params
  const { video } = await fetchVideoData(params.id)

  if (!video) {
    return {
      title: `Segments from video ID: ${params.id} `,
    }
  }

  return {
    title: `Segments from "${video.title}"`,
  }
}

export default async function VideoPage(props: RouteParams) {
  const searchParams = await props.searchParams
  const params = await props.params
  const urlBase = (await headers()).get("x-url-origin")

  const queryFilters = searchParams["filters"]
  const querySorts = searchParams["sort"]

  const [videoInfo, fetchSegments] = await Promise.all([
    fetchVideoData(params.id),
    fetch(`${urlBase}/api/sponsorblock/segments?id=${params.id}`, {
      priority: "high",
    }),
  ])

  const initialData = (await fetchSegments.json()) as VideoSegments

  return (
    <div className="mt-4 mx-auto px-6 max-w-screen-2xl">
      <VideoInfo
        id={params.id}
        videoState={videoInfo.state}
        video={videoInfo.video}
      />
      <SegmentClientWrapper {...initialData} />
    </div>
  )
}
