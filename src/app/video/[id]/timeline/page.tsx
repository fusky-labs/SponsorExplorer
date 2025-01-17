import { Notice } from "@/components"
import type { DefineRouteParams } from "@/types"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { fetchVideoData } from "@/utils"

type RouteParams = DefineRouteParams<{ id: string }>

const TimelineClient = dynamic(() =>
  import("@/components/Timeline").then((c) => c.TimelineClient),
)

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
    <div data-timeline-root="" className="px-6">
      {video ? (
        <>
          <Notice intent="warn">
            The timeline feature currently has limited functionality as it's
            currently being worked on; causing buggy and unexpected behavior and
            may not work as intended.
          </Notice>
          <TimelineClient />
        </>
      ) : (
        <div className="grid place-items-center mt-6">
          <h1 className="text-2xl mb-4">Timeline view unavailable</h1>
          <span className="text-base">
            {"The YouTube ID, "}
            <code className="p-0.5 bg-neutral-100">{params.id}</code>
            {" have been either private or deleted."}
          </span>
        </div>
      )}
    </div>
  )
}
