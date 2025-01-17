"use client"

import { _Link as Link } from "@/components/Link"
import { useVideoInfoContext } from "@/context"
import { parseDateStr } from "@/utils"
import { Notice } from "../Notice"

export function VideoInfoTitle() {
  const {
    videoDetails: { video },
  } = useVideoInfoContext()

  let _isoDate
  let _readableDate

  if (video) {
    const { isoDate, readableDate } = parseDateStr(video.publishedAt, {
      month: "long",
      day: "numeric",
      year: "numeric",
    })

    _isoDate = isoDate
    _readableDate = readableDate
  }

  return video ? (
    <>
      <div className="space-y-1">
        <span className="opacity-75">Segments for</span>
        <h1 translate="no">{video.title}</h1>
      </div>
      <div className="inline-flex flex-wrap gap-x-2">
        <div className="sr-only" id="view-channel-segments-a11y">
          {"View channel segments for "}
          <span translate="no">{video.channelTitle}</span>
        </div>
        <Link
          translate="no"
          aria-labelledby="view-channel-segments-a11y"
          href={`/channel/${video.channelId}`}
        >
          {video.channelTitle}
        </Link>
        <time dateTime={_isoDate}>{_readableDate}</time>
      </div>
    </>
  ) : (
    <Notice intent="alert" heading="Couldn't fetch video details">
      This video might be private or has been removed from YouTube. Maybe double
      check the video ID?
    </Notice>
  )
}
