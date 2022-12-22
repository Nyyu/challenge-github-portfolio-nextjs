import Link from "next/link"
import {
  ArrowSquareOut,
  Eye,
  FolderNotchOpen,
  GitBranch,
  StarFour,
} from "phosphor-react"
import React from "react"
import { Box } from "../../Box"
import { Icon } from "../../Icon"

type Repository = {
  name: string
  url: string
  description: string
  lang: string
  forks: string
  watchers: string
  visibility: string
  starts: string
}

interface RepoCardProps {
  repo: Repository
}

export const RepoCard = ({ repo }: RepoCardProps) => {
  return (
    <Link href={repo.url}>
      <Box className="relative flex flex-col text-base-content/50 gap-4 hover:brightness-90 transition-all">
        <div className="flex items-center gap-3">
          <Icon icon={<FolderNotchOpen size={24} />} />
          <h3 className="text-lg font-semibold">{repo.name}</h3>
          <Icon icon={<ArrowSquareOut size={22} />} className="ml-auto" />
        </div>

        <p className="opacity-70">{repo.description}</p>

        <div className="flex flex-1 gap-5">
          <Icon
            className="gap-2"
            icon={<StarFour size={18} />}
            rightLabel={`${repo.starts}`}
          />
          <Icon
            className="gap-2"
            icon={<GitBranch size={18} />}
            rightLabel={`${repo.forks}`}
          />
          <Icon
            className="gap-2"
            icon={<Eye size={18} />}
            rightLabel={`${repo.watchers}`}
          />
          <span className="ml-auto badge badge-primary">{repo.visibility}</span>
          {repo.lang && (
            <span className="badge badge-secondary">{repo.lang}</span>
          )}
        </div>
      </Box>
    </Link>
  )
}
