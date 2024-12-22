import { VideoInfo } from "@/components/headers"
import { SegmentClientWrapper } from "@/components/SegmentClientWrapper"
import { SegmentStoreProvider, TabStateProvider } from "@/context"
import type { DefineRouteParams, VideoInfoType, VideoSegments } from "@/types"
import { fetchWrapper } from "@/utils/fetchWrapper"
import type { Metadata } from "next"
import { headers } from "next/headers"

type RouteParams = DefineRouteParams<
  { id: string },
  Partial<{
    filters: string
    sort: string
    tab: "all" | "chapters" | "segments"
    compareModal: boolean
    historyModal: boolean
    segmentLockModal: boolean
    list: string
  }>
>

async function fetchVideoData(id: string) {
  const urlBase = (await headers()).get("x-url-origin")
  const [fetchVideoInfo] = await fetchWrapper<VideoInfoType>(
    `${urlBase}/api/yt/video?id=${id}&min=1`,
    {
      priority: "high",
    },
  )

  return fetchVideoInfo
}

export async function generateMetadata(props: RouteParams): Promise<Metadata> {
  const params = await props.params
  const { video } = await fetchVideoData(params.id)

  if (!video) {
    return {
      title: `Segments from video ID: ${params.id} `,
    }
  }

  return {
    title: `Segments from "${video.title}" by ${video.channelTitle}`,
  }
}

export default async function VideoPage(props: RouteParams) {
  const searchParams = await props.searchParams
  const params = await props.params

  const queryFilters = searchParams.filters
  const querySorts = searchParams.sort
  const queryTab = searchParams.tab
  // Will include a sidebar for any playlist or channel uploads to be displayed
  const list = searchParams.list

  const urlBase = (await headers()).get("x-url-origin")

  const [videoInfo, [initialData]] = await Promise.all([
    fetchVideoData(params.id),
    fetchWrapper<VideoSegments>(
      `${urlBase}/api/sponsorblock/segments?id=${params.id}`,
      {
        priority: "high",
      },
    ),
  ])

  return (
    <div className="mt-4 mx-auto px-6 max-w-screen-2xl">
      <SegmentStoreProvider initialData={initialData}>
        <VideoInfo
          id={params.id}
          videoState={videoInfo.videoState}
          video={videoInfo.video}
        />
        <TabStateProvider>
          <SegmentClientWrapper />
        </TabStateProvider>
      </SegmentStoreProvider>
    </div>
  )
}
