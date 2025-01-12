import { cn } from "@/utils"
import Link from "next/link"

interface InternalLinkProps {
  href: string
  /**
   * Set to true to set the link to be external explicitly regardless if the link starts with `http` or otherwise.
   *
   * Links starting with `http` or `https` will be automatically infered as an external link.
   */
  explicitExternal?: boolean
  overrideBaseClass?: true
}

export function _Link(
  props: React.PropsWithChildren<
    InternalLinkProps &
      React.RefAttributes<HTMLAnchorElement> &
      Pick<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        "className" | "translate"
      >
  >,
) {
  const hrefStartsWithHttp = props.href.startsWith("http")
  const hrefExternal = hrefStartsWithHttp || props.explicitExternal

  return (
    <Link
      {...props}
      href={props.href}
      className={cn("underline hover:no-underline", props.className)}
      target={hrefExternal ? "_blank" : undefined}
      rel={hrefExternal ? "noopener noreferrer" : undefined}
    >
      {props.children}
    </Link>
  )
}
