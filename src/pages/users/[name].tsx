import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"

import { githubApi } from "../../services/api"

import { UserRepos } from "../../components/User/Repos"
import { Sidebar } from "../../components/Sidebar"
import { Icon } from "../../components/Icon"
import { Box } from "../../components/Box"

import { ArrowSquareOut } from "phosphor-react"
import Link from "next/link"

interface UserProps {
  user: {
    name: string
    email: string
    bio: string
    location: string
    company: string
    avatar_url: string
    github_url: string
    public_repos: number
    login: string
    createdAt: string
  }
}

const User = ({ user }: UserProps) => {
  const {
    query: { name = "User" },
  } = useRouter()

  return (
    <>
      <Head>
        <title>{`${name} | Portfolio`}</title>
      </Head>
      <main className="flex gap-11 flex-col md:flex-row max-w-screen-xl mx-auto">
        <Sidebar user={user} />
        <div className="flex flex-col gap-7 flex-1">
          <Box className="flex justify-between items-center text-base-content/60">
            <h2 className="text-xl font-bold">My projects</h2>
            <Link
              className="link link-hover link-neutral text-sm"
              href={`https://github.com/${name}?tab=repositories`}
            >
              View repositories
            </Link>
          </Box>

          <>
            <UserRepos
              name={String(name)}
              totalPublicRepos={user.public_repos}
            />
          </>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name = "" } = query

  if (name.length === 0)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }

  const response = await githubApi.get(`/users/${name}`)
  const { data } = response

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(data.created_at))

  const user = {
    name: data.name,
    email: data.email ?? "",
    bio: data.bio,
    location: data.location,
    company: data.company,
    avatar_url: data.avatar_url,
    github_url: data.html_url,
    public_repos: data.public_repos,
    login: data.login,
    createdAt: formattedDate,
  }

  return {
    props: { user },
  }
}

export default User
