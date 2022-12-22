import "../styles/globals.css"
import type { AppProps } from "next/app"

import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

import { Navbar } from "../components/Navbar"

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Navbar />
      <Component {...pageProps} />

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
