/**
 * Appends properties with their corresponding setters for useState,
 * created for mapping props with `React.createContext()`
 *
 * @template Type An interface or object
 * @template KeysToIgnore Optional keys to exclude from the setters
 */
export type MapUseStateSetters<
  Type extends object,
  KeysToIgnore extends keyof Type = never
> = Type & {
  [Pwops in keyof Type as Pwops extends KeysToIgnore ? never : `set${Capitalize<Pwops & string>}`]: React.Dispatch<React.SetStateAction<Type[Pwops]>>;
};
