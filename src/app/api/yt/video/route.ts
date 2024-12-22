import { type NextRequest, NextResponse } from "next/server"
import { youtube } from "@/utils/YT"
import { parseDateStr } from "@/utils"
import { NativeVideoChapters } from "@/types"

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
  const videoDesc = video.description

  let timestampCollection: NativeVideoChapters[] = []

  if (videoDesc) {
    const lines = videoDesc.split("\n")

    // Chapter varies from "0:00 - Intro" to "0:00 Intro"
    // or even "0:00 - 0:30 - Intro"
    const chapterRegex = /(\d+:\d+)(?: - )?(\d+:\d+)? - (.+)/

    lines.forEach((line) => {
      const match = line.match(chapterRegex)
    })
  }

  return NextResponse.json({
    state: "FOUND",
    hasSponsorDisclosure,
    video: {
      title: video.title,
      publishedAt: new Date(video.publishedAt).toUTCString(),
      channelId: video.channelId,
      channelTitle: video.channelTitle,
    },
    nativeChapters: timestampCollection,
  }, { status })
}
