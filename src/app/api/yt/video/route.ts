import { type NextRequest, NextResponse } from "next/server"
import { youtube } from "@/utils/YT"
import type { NativeVideoChapters } from "@/types"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams

  const videoID = urlParams.get("id")!

  const [videoData, status] = await youtube.videos({
    id: videoID,
    part: ["snippet", "paidProductPlacementDetails"],
  })

  const { items } = videoData

  if (!items || items.length === 0) {
    return NextResponse.json({
      state: "NOT_FOUND",
      message: "Video not found"
    }, { status: 404 })
  }

  const firstItem = items[0]

  const video = firstItem.snippet
  const hasSponsorDisclosure = firstItem.paidProductPlacementDetails.hasPaidProductPlacement

  // TODO use description to parse timestamps
  const videoDesc = video.description

  let timestampCollection: NativeVideoChapters[] = []

  if (videoDesc) {
    const lines = videoDesc.split("\n")

    const chapterRegex = /((\d\d:\d\d:\d\d)|(\d+:\d\d:\d\d)|(\d+:\d\d))(\s.*|)/

    console.debug("==== Timestamp debug start ====")

    lines.forEach((line) => {
      const match = line.match(chapterRegex)

      if (!match) return

      console.log(match)
    })

    console.debug("====  Timestamp debug end  ====")
  }

  return NextResponse.json({
    state: "FOUND",
    hasSponsorDisclosure,
    video: {
      title: video.title,
      publishedAt: video.publishedAt,
      channelId: video.channelId,
      channelTitle: video.channelTitle,
    },
    nativeChapters: timestampCollection,
  }, { status })
}
