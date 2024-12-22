/**
 * A simple function that pads an undefined array used for iterations of
 * a specific number
 */
export const padIterations = (iterations: number) => [...Array(iterations)]

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

type AllConstructors =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | DateConstructor
  | ObjectConstructor

type Primitives = string | number | boolean | Date | object

/**
 * Schema constructor for URL search parameters
 * 
 * @param C - The valid constructor type
 * @param PT - The fallback value of the parameter corresponding to the defined constructor
 */
type URLSchemaConstructor<ConstructorType extends AllConstructors, PrimitiveType extends Primitives> = {
  type: ConstructorType
  optional?: true
  fallbackValue?: PrimitiveType
}
