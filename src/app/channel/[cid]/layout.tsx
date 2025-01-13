import type { Metadata } from "next"
import type { ChannelIdRouteParams } from "@/types"
import { ViewItemContext, ViewItemProvider } from "@/context"
import { ChannelInfo } from "@/components/headers"
import { headers } from "next/headers"

export async function generateMetadata(
  props: ChannelIdRouteParams,
): Promise<Metadata> {
  const params = await props.params

  return {
    title: `Channel ID: ${params.cid}`,
  }
}

export default async function ChannelLayout({
  children,
  ...props
}: Readonly<{ children: React.ReactNode } & ChannelIdRouteParams>) {
  const _params = await props.params

  const searchParams = new URLSearchParams((await headers()).get("x-url-params")!)

  const viewParam = searchParams.get("view") as ViewItemContext["view"]
  const isValidViews = viewParam === "compact" || viewParam === "list" || viewParam === "grid"

  return (
    <div
      data-channel-list=""
      className="px-6 space-y-3 max-w-screen-2xl mx-auto"
    >
      <ViewItemProvider initialView={!isValidViews ? "grid" : viewParam}>
        <ChannelInfo channelId={_params.cid} />
        {children}
      </ViewItemProvider>
    </div>
  )
}
