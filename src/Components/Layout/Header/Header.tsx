import Link from 'next/link'
import { FaBell, FaEnvelope } from 'react-icons/fa'
import { useState } from 'react'
import Notifications from './Notifications'

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadNotifications = 3; // This should be fetched from your state management system

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Sociorealm
        </Link>
        <div className="flex items-center space-x-4">
          <button 
            className="text-gray-300 hover:text-white transition-colors relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell size={20} />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            <FaEnvelope size={20} />
          </button>
          <img src="https://via.placeholder.com/40" alt="User avatar" className="w-10 h-10 rounded-full border-2 border-purple-500" />
        </div>
      </div>
      {showNotifications && <Notifications />}
    </header>
  )
}
