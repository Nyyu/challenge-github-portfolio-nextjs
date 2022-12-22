import React from "react"

import { Slot } from "@radix-ui/react-slot"

interface IconProps {
  icon: React.ReactElement
  className?: string
  rightLabel?: string | React.ReactElement
  rightLabelAsChildren?: boolean
  leftLabelAsChildren?: boolean
  leftLabel?: string
  labelClassName?: string
}

export const Icon = ({
  icon,
  leftLabel = "",
  rightLabel = "",
  rightLabelAsChildren = false,
  leftLabelAsChildren = false,
  className = "",
  labelClassName = "",
}: IconProps) => {
  const RightLabelNode = rightLabelAsChildren ? Slot : "span"
  const LeftLabelNode = leftLabelAsChildren ? Slot : "span"

  return (
    <div className={`flex gap-4 items-center ${className}`}>
      {!!leftLabel && (
        <LeftLabelNode className={labelClassName}>{leftLabel}</LeftLabelNode>
      )}
      <span>{icon}</span>
      {!!rightLabel && (
        <RightLabelNode className={labelClassName}>{rightLabel}</RightLabelNode>
      )}
    </div>
  )
}
