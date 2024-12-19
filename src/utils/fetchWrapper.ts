import { isValidJSON } from "./parsers"

export const fetchWrapper = async <ReturnPromise = string>(
  url: string,
  init?: RequestInit
): Promise<[ReturnPromise, number]> => {
  const _req = await fetch(url, init)

  const reqStatus = _req.status
  const reqText = await _req.text() as ReturnPromise

  console.debug("req url", url)

  if (isValidJSON(reqText as string)) {
    return [JSON.parse(reqText as string), reqStatus]
  }

  return [reqText, reqStatus]
}
