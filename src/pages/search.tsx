import { useState } from 'react'
import Head from 'next/head'
import { FaSearch } from 'react-icons/fa'

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement actual search logic here
    setSearchResults([
      { id: 1, type: 'user', name: 'John Doe', username: '@johndoe' },
      { id: 2, type: 'post', content: 'This is a sample post about #coding' },
      { id: 3, type: 'user', name: 'Jane Smith', username: '@janesmith' },
    ])
  }

  return (
    <>
      <Head>
        <title>Search - Sociorealm</title>
        <meta name="description" content="Search for users, posts, and topics on Sociorealm" />
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md">
            <input
              type="text"
              placeholder="Search for users, posts, or topics"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-6 py-3 rounded-l-full bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-r-full hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              <FaSearch size={20} />
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {searchResults.map((result:any) => (
            <div key={result.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              {result.type === 'user' ? (
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-bold">{result.name}</h3>
                    <p className="text-gray-500">{result.username}</p>
                  </div>
                </div>
              ) : (
                <p>{result.content}</p>
              )}
            </div>
          ))}
        </div>

        {searchResults.length === 0 && searchTerm && (
          <p className="text-center text-gray-500 mt-8">No results found for "{searchTerm}"</p>
        )}
      </div>
    </>
  )
}