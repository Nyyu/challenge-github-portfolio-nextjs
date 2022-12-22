import Link from "next/link"
import {
  Calendar,
  EnvelopeSimpleOpen,
  GitlabLogoSimple,
  MapPin,
} from "phosphor-react"
import { Box } from "../Box"
import { Icon } from "../Icon"
import { Avatar } from "../User/Avatar"

interface SidebarProps {
  user: {
    name: string
    email: string
    bio: string
    location: string
    company: string
    avatar_url: string
    github_url: string
    login: string
    createdAt: string
  }
}

export const Sidebar = ({ user }: SidebarProps) => {
  return (
    <aside className="flex flex-col md:max-w-[22rem] gap-7">
      <Box className="flex flex-col gap-6 justify-center items-center">
        <Avatar name={user.name} img={user.avatar_url} />
        <div className="flex flex-col gap-1 items-center justify-center text-center">
          <h1 className="text-lg font-semibold">{user.name}</h1>
          <p className="text-sm font-light opacity-60">{user.bio}</p>
        </div>
      </Box>

      <Box className="opacity-70 flex flex-col gap-4 text-sm font-light">
        {!!user.email && (
          <Icon
            icon={<EnvelopeSimpleOpen size={24} />}
            rightLabel={user.email}
          />
        )}
        {!!user.github_url && (
          <Icon
            icon={<GitlabLogoSimple size={24} />}
            rightLabelAsChildren
            rightLabel={
              <Link href={user.github_url} className="link link-hover">
                {user.login}
              </Link>
            }
          />
        )}
        {!!user.location && (
          <Icon icon={<MapPin size={24} />} rightLabel={user.location} />
        )}
        {!!user.createdAt && (
          <Icon icon={<Calendar size={24} />} rightLabel={user.createdAt} />
        )}
      </Box>
    </aside>
  )
}
