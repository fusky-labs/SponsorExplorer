type DateFormat = Intl.DateTimeFormatOptions

const DEFAULT_DATE_FORMAT = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23"
} satisfies DateFormat

export const parseDateStr = <DT extends string | number | Date = string>(dateStr: DT, format: DateFormat = DEFAULT_DATE_FORMAT) => {
  const d = new Date(dateStr)

  const isoDate = d.toISOString()

  const readableDate = d
    .toLocaleString("en-US", format)
    .replace(", ", " ")
    .replace(/\//g, "-")

  return { readableDate, isoDate }
}

export const pluralFormatter = (
  value: number,
  singularStr: string,
  pluralStr: string,
  options?: {
    noIncludeNum?: boolean
  }
) => {
  if (value === 1 && options?.noIncludeNum) return singularStr
  if (value === 1) return `${value} ${singularStr}`

  if (options?.noIncludeNum) return pluralStr
  return `${value} ${pluralStr}`
}

export const formatNumber = (num: number) => num.toLocaleString("en-US")

interface TimecodeOptions {
  separator: "colon" | "letters" | "sentence" // default: "colon"
  includeMilliseconds: boolean // default: false
  msRoundFactor: 1 | 2 | 3 | 4 | 5 // default: 2
  prefix: string
  suffix: string
}

export const formatTimecode = (
  time: number,
  options?: Partial<TimecodeOptions>
) => {
  const {
    separator = "colon",
    includeMilliseconds = false,
    msRoundFactor = 2,
    prefix = "",
    suffix = ""
  } = options || {}

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor(time % 60)
  let milliseconds = (time % 1).toFixed(msRoundFactor).substring(2)

  let timeString: string

  const minStr = minutes.toString().padStart(2, "0")
  const secStr = seconds.toString().padStart(2, "0")

  if (separator === "colon") {
    timeString =
      hours > 0 ? `${hours}:${minStr}:${secStr}` : `${minutes}:${secStr}`
    if (includeMilliseconds) {
      timeString += `.${milliseconds}`
    }
  } else if (separator === "letters") {
    timeString =
      hours > 0
        ? `${hours}h ${minutes}m ${seconds}s`
        : `${minutes}m ${seconds}s`
  } else {
    timeString =
      hours > 0
        ? `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${minutes !== 1 ? "s" : ""}, ${seconds} second${seconds !== 1 ? "s" : ""}`
        : `${minutes} minute${minutes !== 1 ? "s" : ""}, ${seconds} second${seconds !== 1 ? "s" : ""}`
  }

  if (includeMilliseconds && separator !== "colon") {
    // milliseconds are ignored for non-colon separators
    timeString = timeString.replace(/m [0-5][0-9]s$/, `${minutes}m`)
    timeString = timeString.replace(
      /minutes, [0-5][0-9] seconds$/,
      `${minutes} minutes`
    )
  }

  if (prefix) {
    timeString = `${prefix.trim()} ${timeString}`
  }

  if (suffix) {
    timeString = `${timeString} ${suffix.trim()}`
  }

  return timeString.trim()
}
