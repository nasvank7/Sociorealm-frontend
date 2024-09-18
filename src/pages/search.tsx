import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

export default function SearchModal({ isOpen, onClose }) {
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Search Sociorealm</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSearch} className="p-4">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full">
            <input
              type="text"
              placeholder="Search for users, posts, or topics"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-6 py-3 bg-transparent focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              <FaSearch size={20} />
            </button>
          </div>
        </form>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
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
          {searchResults.length === 0 && searchTerm && (
            <p className="text-center text-gray-500 mt-8">No results found for "{searchTerm}"</p>
          )}
        </div>
      </div>
    </div>
  )
}
