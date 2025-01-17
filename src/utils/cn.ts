import { twMerge } from "tailwind-merge"

export const cn = (...className: unknown[]) => {
  return twMerge(className.filter(Boolean).join(" "))
}
