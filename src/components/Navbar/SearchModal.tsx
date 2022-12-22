import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import * as Dialog from "@radix-ui/react-dialog"
import { Box } from "../Box"

import { X } from "phosphor-react"

import useDebounce from "../../utils/useDebounce"
import { v4 as uuid } from "uuid"
import { api } from "../../services/api"

type User = {
  name: string
  avatar: string
}

export const SearchModal = () => {
  const { push } = useRouter()
  const [search, setSearch] = useState("")
  const [users, setUser] = useState<User[]>([])
  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    if (debouncedSearch) {
      fetch(`/api/search?q=${debouncedSearch}`)
    }
  }, [debouncedSearch])

  useEffect(() => {
    const handleFetchUsers = async () => {
      const response = await api.get(`/users/${debouncedSearch}`)
      setUser(response.data.users)
    }

    if (debouncedSearch && !!debouncedSearch.length) handleFetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-base-300/95" />
      <Dialog.Content className="fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-base-100 rounded-lg max-w-xl w-full px-6 py-8">
        <div className="flex justify-between items-center">
          <Dialog.Title className="text-lg font-bold">
            Search Portfolio
          </Dialog.Title>
          <Dialog.Close className="btn btn-ghost btn-sm btn-square">
            <X size={24} />
          </Dialog.Close>
        </div>

        <Box className="mt-3 flex flex-col">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="input input-ghost input-bordered"
            placeholder="Search for something, e.g. Nyyu"
          />

          <div className="flex flex-col gap-3 mt-5">
            {users?.map((user) => (
              <Dialog.Close
                key={uuid()}
                className="btn btn-ghost"
                onClick={() => {
                  push(`/users/${user.name}`)
                }}
              >
                {user.name}
              </Dialog.Close>
            ))}
          </div>
        </Box>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
