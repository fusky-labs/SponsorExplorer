import { DefineRouteParams } from "@/types"

type RouteParams = DefineRouteParams<{ id: string }>

export default async function VideoTimelinePage(props: RouteParams) {
  const _params = await props.params

  return (
    <div>
      <span>nothing special yet lol</span>
      <span>{JSON.stringify(_params.id)}</span>
    </div>
  )
}
