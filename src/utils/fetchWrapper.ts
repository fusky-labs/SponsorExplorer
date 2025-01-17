import { isValidJSON } from "./parsers"

export const fetchWrapper = async <ReturnPromise = string>(
  url: string,
  init?: RequestInit
): Promise<[ReturnPromise, number]> => {
  try {
    const _req = await fetch(url, init)

    const reqStatus = _req.status
    const reqText = await _req.text()

    console.debug("Request url:", url)

    if (isValidJSON(reqText)) {
      return [JSON.parse(reqText as string), reqStatus]
    }

    return [reqText as ReturnPromise, reqStatus]
  } catch (e) {
    console.error("An error has occurred:", e)
    throw e
  }
}
