import { useState } from "react"
import { useQuery } from "react-query"
import { RepoCard } from "./RepoCard"

import { githubApi } from "../../../services/api"
import { v4 as uuid } from "uuid"
import { Button } from "../../Button"
import { Box } from "../../Box"
import { Icon } from "../../Icon"
import { CircleNotch } from "phosphor-react"

interface UserReposProps {
  name: string
  totalPublicRepos: number
}

type Repository = {
  name: string
  url: string
  description: string
  lang: string
  forks: string
  watchers: string
  visibility: string
  starts: string
  createdAt: string
}

export const UserRepos = ({ name, totalPublicRepos }: UserReposProps) => {
  const [page, setPage] = useState(1)
  const perPage = 4

  const isLastPage = totalPublicRepos / perPage <= page

  const handleFetchUserRepos = async (page: number = 1) => {
    const response = await githubApi.get(
      `/users/${name}/repos?sort=pushed&per_page=${perPage}&page=${page}`
    )
    const { data } = response
    const formattedData: Repository[] = data?.map((repo: any) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      lang: repo.language, // languages_url
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      visibility: repo.visibility,
      starts: repo.stargazers_count,
    }))

    return formattedData
  }

  const { data, isLoading, error, refetch, isPreviousData } = useQuery(
    [`${name}-repos`, page],
    () => handleFetchUserRepos(page),
    {
      staleTime: 1000 * 60 * 15, // 15 minute
      keepPreviousData: true,
    }
  )
  console.log(data)
  return (
    <>
      {isLoading ? (
        <Box className="flex justify-center items-center">
          <Icon icon={<CircleNotch size={28} />} className="animate-spin" />
        </Box>
      ) : error ? (
        <Box className="flex justify-center items-center">
          An error occurred. Please try again.
        </Box>
      ) : (
        <>
          {data?.map((repo: Repository) => (
            <RepoCard repo={repo} key={uuid()} />
          ))}
          <div className="flex gap-4 ml-auto">
            <Button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 1}
              className="btn-primary"
            >
              Previous Page
            </Button>
            <Button
              onClick={() => {
                if (!isPreviousData && !isLastPage) {
                  setPage((old) => old + 1)
                }
              }}
              disabled={isPreviousData || isLastPage}
              className="btn-primary"
            >
              Next Page
            </Button>
          </div>
        </>
      )}
    </>
  )
}
