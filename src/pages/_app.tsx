import Header from '@/Components/Layout/Header/Header'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import Navbar from '@/Components/Layout/Navbar/Navbar'


function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8">
        <div className="hidden md:block md:w-16 lg:w-64 mr-4">
          <Navbar />
        </div>
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 z-50">
        <Navbar />
      </div>
    </div>
  )
}

export default MyApp