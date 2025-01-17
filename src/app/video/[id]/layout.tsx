import {
  LiveSegmentProvider,
  PlayerStateProvider,
  VideoInfoProvider,
} from "@/context"
import type { VideoSegments } from "@/types"
import { fetchVideoData } from "@/utils"
import { fetchWrapper } from "@/utils/fetchWrapper"
import { headers } from "next/headers"

export default async function VideoIdLayoutPage({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ id: string }> }>) {
  const videoId = (await params).id
  const urlBase = (await headers()).get("x-url-origin")

  const [videoData, [initialSegmentData]] = await Promise.all([
    fetchVideoData(videoId),
    fetchWrapper<VideoSegments>(`${urlBase}/api/sb/segments?id=${videoId}`, {
      priority: "high",
    }),
  ])

  return (
    <VideoInfoProvider
      videoData={{ id: videoId, ...videoData }}
      initialSegmentData={initialSegmentData}
    >
      <PlayerStateProvider>
        <LiveSegmentProvider>{children}</LiveSegmentProvider>
      </PlayerStateProvider>
    </VideoInfoProvider>
  )
}
