import { type NextRequest, NextResponse } from "next/server"
import { youtube } from "@/utils/YT"
import { parseDateStr } from "@/utils"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams

  const videoID = urlParams.get("id")!
  const [videoData, status] = await youtube.videos(videoID, {
    part: ["snippet", "paidProductPlacementDetails"],
  })

  const { items } = videoData

  if (!items || items.length === 0) {
    return NextResponse.json({
      state: "NOT_FOUND",
      message: "Video not found"
    }, { status: 404 })
  }

  const video = items[0].snippet
  const hasSponsorDisclosure = items[0].paidProductPlacementDetails.hasPaidProductPlacement

  // TODO use description to parse timestamps
  // video.description

  return NextResponse.json({
    state: "FOUND",
    hasSponsorDisclosure,
    video: {
      title: video.title,
      publishedAt: video.publishedAt,
      channelId: video.channelId,
      channelTitle: video.channelTitle,
    }
  }, { status })
}
