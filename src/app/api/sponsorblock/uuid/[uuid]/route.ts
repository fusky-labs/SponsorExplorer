import { NextRequest, NextResponse } from "next/server"

interface RouteParams {
  params: Promise<{
    uuid: string
  }>
}

export async function GET(request: NextRequest, props: RouteParams) {
  const params = await props.params;
  // TODO add support for multi uuids
  const segmentUUID = params.uuid

  return NextResponse.json({ msg: "Hello from server" })
}
