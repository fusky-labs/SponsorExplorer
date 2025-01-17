import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Submissions from ID: {userid}",
  description: "Submissions by user id {userid}",
}

export default function Home() {
  return <div>Username page</div>
}
