import { Notice } from "@/components"
import { TimelineClientProvider } from "@/context/TimelineClientProvider"
import type { DefineRouteParams, VideoInfoType } from "@/types"
import { fetchWrapper } from "@/utils/fetchWrapper"
import type { Metadata } from "next"
import { headers } from "next/headers"
import dynamic from "next/dynamic"

type RouteParams = DefineRouteParams<{ id: string }>

const TimelineClient = dynamic(() =>
  import("@/components/timeline").then((c) => c.TimelineClient),
)

async function fetchVideoData(id: string) {
  const urlBase = (await headers()).get("x-url-origin")
  const [fetchVideoInfo] = await fetchWrapper<VideoInfoType>(
    `${urlBase}/api/yt/video?id=${id}&min=1`,
    {
      cache: "no-store",
    },
  )

  return fetchVideoInfo
}

export async function generateMetadata(props: RouteParams): Promise<Metadata> {
  const params = await props.params
  const { video } = await fetchVideoData(params.id)

  if (!video) {
    return {
      title: `Timeline view unavailable`,
    }
  }

  return {
    title: `Timeline view for "${video.title}"`,
  }
}

export default async function VideoTimelinePage(props: RouteParams) {
  const params = await props.params
  const { video } = await fetchVideoData(params.id)

  return (
    <TimelineClientProvider youtubeId={params.id}>
      <div data-timeline-root="" className="px-6">
        {video ? (
          <>
            <Notice intent="warn">
              The timeline feature currently has limited functionality as it's
              currently being worked on; causing buggy and unexpected behavior
              and may not work as intended.
            </Notice>
            <TimelineClient />
          </>
        ) : (
          <div className="grid place-items-center mt-6">
            <h1 className="text-2xl font-bold mb-4">
              Timeline view unavailable
            </h1>
            <span className="text-base">
              {"The YouTube ID, "}
              <code className="p-0.5 bg-neutral-100">{params.id}</code>
              {" have been either private or deleted."}
            </span>
          </div>
        )}
      </div>
    </TimelineClientProvider>
  )
}
