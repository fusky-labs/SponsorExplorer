import { youtube } from "@/utils/YT"
import { yt } from "@/utils/YT.types";
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const urlParams = new URL(request.url).searchParams

  const channelId = urlParams.get("id")!

  let fetchedData: [yt.Responses.ChannelList, number] | null = null;

  // Check if the channel ID starts with "UC"
  if (!fetchedData && channelId.startsWith("UC")) {
    const [channelData, status] = await youtube.channels({
      id: channelId,
      part: ["snippet", "contentDetails"],
    })

    fetchedData = [channelData, status]
  }

  // Check if the channel ID starts with "@"
  if (!fetchedData && channelId.startsWith("@")) {
    const [channelData, status] = await youtube.channels({
      forHandle: `@${channelId}`,
    })

    fetchedData = [channelData, status]
  }

  return NextResponse.json({ data: fetchedData })
}
