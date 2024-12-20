import { type NextRequest, NextResponse } from "next/server"
import { allSegments, isValidJSON, SponsorBlock } from "@/utils"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams
  const videoID = urlParams.get("id") as string

  const [skipSegments, skipSegmentsStatus] = await SponsorBlock.skipSegments({
    videoID,
    actionTypes: ["skip", "mute"],
    categories: allSegments,
  })

  const [fullSegments, fullSegmentsStatus] = await SponsorBlock.skipSegments({
    videoID,
    actionTypes: ["full"],
    categories: ["sponsor", "exclusive_access", "selfpromo"]
  })

  const [lockedSegments, lockedSegmentsStatus] = await SponsorBlock.lockCategories({
    videoID,
  })

  let _status = 200
  if (skipSegmentsStatus === 404 && lockedSegmentsStatus === 404) _status = 404
  if (skipSegmentsStatus >= 500) _status = skipSegmentsStatus
  if (lockedSegmentsStatus >= 500) _status = lockedSegmentsStatus

  return NextResponse.json({
    skip: {
      statusCode: skipSegmentsStatus,
      data: skipSegments,
    },
    full: {
      statusCode: fullSegmentsStatus,
      data: fullSegments,
    },
    lock: {
      statusCode: lockedSegmentsStatus,
      data: isValidJSON(JSON.stringify(lockedSegments)),
    },
  }, {
    status: _status
  })
}
