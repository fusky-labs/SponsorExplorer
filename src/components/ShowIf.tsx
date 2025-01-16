"use client"

interface ShowIfProps<PT> {
  condition: PT
}

/**
 * DAMN BOI
 */
export function ShowIf<P>(props: React.PropsWithChildren<ShowIfProps<P>>) {
  return Boolean(props.condition) ? props.children : null
}
