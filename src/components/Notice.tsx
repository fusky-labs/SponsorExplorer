import { cva, type VariantProps } from "class-variance-authority"
import { PropsWithChildren } from "react"
import {
  LuInfo as InfoIcon,
  LuAlertTriangle as WarningIcon,
  LuXCircle as AlertIcon,
} from "react-icons/lu"

const NoticeBox = cva("flex items-center gap-x-2.5 rounded-md px-3.5 py-2.5", {
  variants: {
    intent: {
      info: "bg-blue-100",
      warn: "bg-yellow-100",
      alert: "bg-red-100",
    },
  },
  compoundVariants: [
    {
      intent: "info",
    },
  ],
})

interface NoticeProps {
  heading?: string
}

export function Notice(
  props: PropsWithChildren<NoticeProps & VariantProps<typeof NoticeBox>>,
) {
  const iconProps = {
    size: 20,
  }

  return (
    <div
      data-notice-box=""
      className={NoticeBox({
        intent: props.intent,
      })}
    >
      {props.intent === "info" && <InfoIcon {...iconProps} />}
      {props.intent === "warn" && <WarningIcon {...iconProps} />}
      {props.intent === "alert" && <AlertIcon {...iconProps} />}
      <div>
        <div className="font-semibold text-lg pb-0.5">{props.heading}</div>
        <span>{props.children}</span>
      </div>
    </div>
  )
}
