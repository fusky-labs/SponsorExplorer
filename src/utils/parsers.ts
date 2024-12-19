/**
 * Check if a string is a valid JSON
 * 
 * @param jsonString - The string to check
 * @returns True if the string is a valid JSON, false otherwise
 */
export const isValidJSON = (jsonString: string) => {
  try {
    JSON.parse(jsonString)
  } catch (e) {
    return false
  }

  return true
}

const unwrapArrayAsLiteral = (arr: string[]) => `[${arr.map((x) => `"${x}"`).toString()}]`

export const parseURLSearchParams = <P extends object>(url: string, params?: P) => {
  if (!params) return url

  const urlParams = Object.entries(params).map(([k, v]) => {
    // SponsorBlock-specific params
    if (k === "actionTypes" || k === "categories") return [k, unwrapArrayAsLiteral(v)]
    return [k, v]
  })

  return `${url}?${new URLSearchParams(urlParams)}`
}
