import type { Metadata } from "next"
import type { ChannelIdRouteParams } from "@/types"
import { ViewStateProvider } from "@/context"
import { ChannelInfo } from "@/components/headers"

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
  params,
}: Readonly<{ children: React.ReactNode } & ChannelIdRouteParams>) {
  const _params = await params

  return (
    <div
      data-channel-list=""
      className="px-6 space-y-3 max-w-screen-2xl mx-auto"
    >
      <ViewStateProvider>
        <ChannelInfo channelId={_params.cid} />
        {children}
      </ViewStateProvider>
    </div>
  )
}
