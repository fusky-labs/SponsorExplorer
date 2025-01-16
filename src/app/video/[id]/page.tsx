import type { Metadata } from "next"
import { TabStateProvider } from "@/context"
import { ShowIf } from "@/components"
import { VideoInfo } from "@/components/Headers"
import { SegmentClientWrapper } from "@/components/SegmentClientWrapper"
import { VideoListSidebar } from "@/components/Sidebar"
import type { DefineRouteParams } from "@/types"
import { fetchVideoData } from "@/utils"

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
    inspectId: string
  }>
>

export async function generateMetadata(props: RouteParams): Promise<Metadata> {
  const params = await props.params
  const { video } = await fetchVideoData(params.id)

  if (!video) {
    return {
      title: `Segments from video ID: ${params.id}`,
    }
  }

  return {
    title: `Segments from "${video.title}" by ${video.channelTitle}`,
  }
}

export default async function VideoPage(props: RouteParams) {
  const searchParams = await props.searchParams

  const queryFilters = searchParams.filters
  const querySorts = searchParams.sort
  const queryTab = searchParams.tab
  // Will include a sidebar for any playlist or channel uploads to be displayed
  const isParamsList = searchParams.list
  const hasInspectId = searchParams.inspectId

  return (
    <div className="mt-4 flex" data-video-idroot="">
      {/* Left sidebar for list of videos */}
      <ShowIf condition={isParamsList}>
        <div className="[align-self:start] sticky top-16 flex-shrink-0 h-[90dvh] max-w-[300px]">
          <VideoListSidebar />
        </div>
      </ShowIf>
      <div className="mx-auto px-6 max-w-screen-2xl w-full">
        <VideoInfo />
        <TabStateProvider>
          <SegmentClientWrapper />
        </TabStateProvider>
      </div>
    </div>
  )
}
