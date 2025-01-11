/**
 * Appends properties with its corresponding setters for useState,
 * created for mapping props with `React.createContext()`
 * 
 * @param T An interface or object
 * @example
 * type User = MapUseStateSetters<{
 *  isRegistered: boolean
 *  registrantName: string
 * }>
 * 
 * // {
 * //   isRegistered: boolean
 * //   registrantName: string
 * //   setIsRegistered: Dispatch<SetStateAction<boolean>>
 * //   setRegistrantName: Dispatch<SetStateAction<string>>
 * // }
 */
export type MapUseStateSetters<T extends object> = T & {
  [P in keyof T as `set${Capitalize<P & string>}`]: React.Dispatch<React.SetStateAction<T[P]>>
}
