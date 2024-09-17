import Link from 'next/link'
import { FaBell, FaEnvelope } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Sociorealm
        </Link>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white transition-colors">
            <FaBell size={20} />
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            <FaEnvelope size={20} />
          </button>
          <img src="https://via.placeholder.com/40" alt="User avatar" className="w-10 h-10 rounded-full border-2 border-purple-500" />
        </div>
      </div>
    </header>
  )
}