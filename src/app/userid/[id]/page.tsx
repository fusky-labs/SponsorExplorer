import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Submissions from {username}",
  description: "Submissions by {username}",
}

export default function Home() {
  return <div>Username page</div>
}
