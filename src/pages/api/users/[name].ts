import { NextApiRequest, NextApiResponse } from "next"
import { githubApi } from "../../../services/api"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name = "" } = req.query
  if (!name && !!name.length)
    res.status(400).end({
      message: "Please provide a name",
      status: 400,
      error: ["Name should not be empty"],
    })

  try {
    const response = await githubApi.get(`/search/users?q=${name}`)
    const {
      data: { items: users, total_count },
    } = response

    const formattedUserList = users.map((user: any) => ({
      name: user.login,
      avatar: user.avatar_url,
    }))

    res.status(200).json({
      total: total_count,
      users: formattedUserList.slice(0, 5),
    })
  } catch (error: any) {
    console.error(error)
    res.status(400).end({
      message:
        typeof error.message === "string"
          ? error.message
          : "Something went wrong",
      status: 400,
      error,
    })
  }
}

export default handler
