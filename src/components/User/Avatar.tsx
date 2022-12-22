import Image from "next/image"
import React from "react"

interface AvatarProps {
  img?: string
  name: string
}

export const Avatar = ({ name, img = "" }: AvatarProps) => {
  return img.length ? (
    <div className="avatar">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2">
        <Image src={img} alt={`${name}-pfp`} width={96} height={96} />
      </div>
    </div>
  ) : (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2">
        <span className="text-3xl">{name.slice(0, 1).toUpperCase()}</span>
      </div>
    </div>
  )
}
