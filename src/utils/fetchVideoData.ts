"use server"

import { cache } from "react"
import { headers } from "next/headers"
import type { VideoInfoType } from "@/types"
import { fetchWrapper } from "./fetchWrapper"

export const fetchVideoData = cache(async (id: string) => {
  const urlBase = (await headers()).get("x-url-origin")

  const [fetchVideoInfo] = await fetchWrapper<VideoInfoType>(
    `${urlBase}/api/yt/video?id=${id}&min=1`,
    { cache: "force-cache" },
  )

  return fetchVideoInfo
})
