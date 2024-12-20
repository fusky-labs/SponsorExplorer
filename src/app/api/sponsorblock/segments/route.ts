/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import { allSegments, SponsorBlock } from "@/utils"
import { Responses } from "@/utils/SponsorBlock.types"

type SortByLiteral = "asc" | "desc"
type SBSegment = Responses.SearchSegments['segments']

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams

  const params = {
    id: urlParams.get("id")!,
    pageFrom: parseInt(urlParams.get("pageFrom")!) || null,
    pageTo: parseInt(urlParams.get("pageTo")!) || 8,
    sortBy: urlParams.get("sortBy") as SortByLiteral || "desc",
  }

  // Store all the accumulated segments fetched to be returned from the API
  let _totalSegments: SBSegment = []

  const _storeTotalSegments = (segmentsToPush: SBSegment) => {
    segmentsToPush.forEach((segment) => _totalSegments.push(segment))
  }

  // This helps us to keep track whether if there are more than 10 segments submitted
  // SponsorBlock only allows 10 segments per page
  let _iterateCount = 0

  const [initialSegments, searchSegmentsStatus] = await SponsorBlock.searchSegments({
    videoID: params.id,
    actionTypes: ["skip", "mute", "full"],
    categories: allSegments,
  })

  let _status = 200

  if (searchSegmentsStatus === 404) _status = 404
  if (searchSegmentsStatus >= 500) _status = searchSegmentsStatus

  const { segmentCount, segments } = initialSegments

  // Push initial segments
  if (searchSegmentsStatus !== 404) _storeTotalSegments(segments)

  // Check if the submitted segments are more than 10, then we iterate it
  if (segmentCount > 10) {
    const totalIterations = Math.ceil(segmentCount / 10) - 1

    // Cap page iteration until 8 by default
    if (totalIterations > params.pageTo) {
      _iterateCount = params.pageTo
    } else {
      _iterateCount = totalIterations
    }

    [...Array(_iterateCount)].forEach(async (_, i) => {
      const segmentIndex = i + 1

      const [_partialSegments] = await SponsorBlock.searchSegments({
        videoID: params.id,
        page: segmentIndex
      })

      _storeTotalSegments(_partialSegments.segments)
    })
  }

  // Then we get the locked segments, if there's any
  const [lockedSkipSegments] = await SponsorBlock.lockCategories({
    videoID: params.id,
    actionTypes: ["skip"]
  })

  const [lockedMuteSegments] = await SponsorBlock.lockCategories({
    videoID: params.id,
    actionTypes: ["mute"]
  })

  const [lockedFullSegments] = await SponsorBlock.lockCategories({
    videoID: params.id,
    actionTypes: ["full"]
  })

  // Sort the segments in descending order by default
  // @ts-expect-error: Dates are too type-strict to sort UNIX dates
  const sortedSegments = _totalSegments.sort((a, b) => (new Date(b.timeSubmitted) - new Date(a.timeSubmitted)))

  const lockedSegmentsFallback = (lockedSegments: Responses.LockCategories) => {
    return typeof lockedSegments === "string" ? [] : lockedSkipSegments
  }

  return NextResponse.json({
    submissionCount: segmentCount,
    segments: sortedSegments,
    lock: {
      skip: lockedSegmentsFallback(lockedSkipSegments),
      mute: lockedSegmentsFallback(lockedMuteSegments),
      full: lockedSegmentsFallback(lockedFullSegments)
    },
  }, {
    status: _status
  })
}
