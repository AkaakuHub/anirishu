import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { registerServiceWorker } from '@/utils/registerServiceWorker'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    registerServiceWorker()
  }, [])

  return <Component {...pageProps} />
}
