/* eslint-disable prefer-const */
import { NextRequest, NextResponse } from "next/server"
import { allSegments, SponsorBlock } from "@/utils"
import { Responses } from "@/utils/SponsorBlock.types"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams

  const videoID = urlParams.get("id")!

  const pageFrom = parseInt(urlParams.get("pageFrom")!) || null
  const pageTo = parseInt(urlParams.get("pageTo")!) || 8

  // Store all the accumulated segments fetched to be returned from the API
  let _totalSegments: Responses.SearchSegments['segments'] = []

  // Lets us iterate if there are more than 10 segments submitted
  let _iterateCount = 0

  const [initialSegments, searchSegmentsStatus] = await SponsorBlock.searchSegments({
    videoID,
    actionTypes: ["skip", "mute", "full"],
    categories: allSegments,
  })

  let _status = 200

  if (searchSegmentsStatus === 404) _status = 404
  if (searchSegmentsStatus >= 500) _status = searchSegmentsStatus

  const { segmentCount, segments } = initialSegments

  // Push initial segments
  if (searchSegmentsStatus !== 404) {
    segments.forEach((segment) => _totalSegments.push(segment))
  }

  // Check if the submitted segments are more than 10, then we iterate it
  if (segmentCount > 10) {
    const totalIterations = Math.ceil(segmentCount / 10) - 1

    // Cap page iteration until 8 by default
    if (totalIterations > pageTo) {
      _iterateCount = pageTo
    } else {
      _iterateCount = totalIterations
    }

    [...Array(_iterateCount)].forEach(async (_, i) => {
      const index = i + 1

      const [_partialSegments] = await SponsorBlock.searchSegments({
        videoID,
        page: index
      })

      _partialSegments.segments.forEach((segment) => _totalSegments.push(segment))
    })
  }

  // Then we get the locked segments, if there's any
  const [lockedSkipSegments] = await SponsorBlock.lockCategories({
    videoID,
    actionTypes: ["skip"]
  })

  const [lockedMuteSegments] = await SponsorBlock.lockCategories({
    videoID,
    actionTypes: ["mute"]
  })

  const [lockedFullSegments] = await SponsorBlock.lockCategories({
    videoID,
    actionTypes: ["full"]
  })

  // @ts-expect-error: Dates are too type-strict to sort UNIX dates
  const sortedSegments = _totalSegments.sort((a, b) => (new Date(b.timeSubmitted) - new Date(a.timeSubmitted)))

  return NextResponse.json({
    submissionCount: segmentCount,
    segments: sortedSegments,
    lock: {
      skip: typeof lockedSkipSegments === "string" ? [] : lockedSkipSegments,
      mute: typeof lockedSkipSegments === "string" ? [] : lockedMuteSegments,
      full: typeof lockedSkipSegments === "string" ? [] : lockedFullSegments
    },
  }, {
    status: _status
  })
}
