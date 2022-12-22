import Link from "next/link"
import { MagnifyingGlass, Moon, Sun } from "phosphor-react"
import * as Dialog from "@radix-ui/react-dialog"
import { SearchModal } from "./SearchModal"
import { Button } from "../Button"
import { useEffect, useRef, useState } from "react"

type Theme = "dracula" | "autumn"

export const Navbar = () => {
  const [themeValue, setThemeValue] = useState<boolean>(true)

  const handleThemeUpdate = (theme: Theme) => {
    localStorage.setItem("theme", theme)
    if (document)
      document.querySelector("html")?.setAttribute("data-theme", theme)
    setThemeValue(theme === "dracula")
  }

  useEffect(() => {
    const storageTheme = localStorage.getItem("theme") as Theme
    if (!!storageTheme) {
      handleThemeUpdate(storageTheme)
    }
  }, [])

  return (
    <div className="navbar max-w-screen-xl mx-auto">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Portfolio
        </Link>
      </div>
      <div className="flex-none">
        <Button
          className="btn btn-ghost btn-square mr-2"
          onClick={() => handleThemeUpdate(themeValue ? "autumn" : "dracula")}
        >
          {themeValue ? (
            <Sun size={22} weight="bold" />
          ) : (
            <Moon size={22} weight="bold" />
          )}
        </Button>
        <Dialog.Root>
          <Dialog.Trigger className="btn btn-ghost btn-square">
            <MagnifyingGlass size={22} weight="bold" />
          </Dialog.Trigger>
          <SearchModal />
        </Dialog.Root>
        {/* <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  )
}
