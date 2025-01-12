import { VideoSegments } from "@/types";

export type Segment = Omit<
  VideoSegments,
  "lock" | "submissionCount"
>["segments"][number]
