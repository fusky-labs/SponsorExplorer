/**
 * Appends properties with its corresponding setters for useState,
 * created for mapping props with `React.createContext()`
 * 
 * @template T An interface or object
 */
export type MapUseStateSetters<T extends object> = T & {
  [P in keyof T as `set${Capitalize<P & string>}`]: React.Dispatch<React.SetStateAction<T[P]>>
}
