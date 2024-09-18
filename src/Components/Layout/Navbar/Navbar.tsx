import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaHome, FaSearch, FaCompass, FaUser, FaComment } from 'react-icons/fa'
import SearchModal from '@/pages/search' // Adjust the import path as needed

const NavItem = ({ icon, text, onClick, href }) => {
  const router = useRouter()
  const isActive = router.pathname === href

  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
        isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="text-xs mt-1 hidden lg:block">{text}</span>
    </button>
  )
}

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  const handleNavigation = (path) => {
    router.push(path)
  }

  return (
    <>
      <nav className="flex md:flex-col justify-around md:justify-start md:space-y-4">
        <NavItem 
          icon={<FaHome size={24} />} 
          text="Home" 
          onClick={() => handleNavigation('/')} 
          href="/" 
        />
        <NavItem 
          icon={<FaSearch size={24} />} 
          text="Search" 
          onClick={() => setIsSearchOpen(true)} 
          href="#"
        />
        <NavItem 
          icon={<FaCompass size={24} />} 
          text="Explore" 
          onClick={() => handleNavigation('/ExplorePage')} 
          href="/ExplorePage"   
        />
        <NavItem 
          icon={<FaUser size={24} />} 
          text="Profile" 
          onClick={() => handleNavigation('/userProfile')} 
          href="/userProfile" 
        />
        <NavItem 
          icon={<FaComment size={24} />} 
          text="Chat" 
          onClick={() => handleNavigation('/Chats')} 
          href="/Chats" 
        />
           <NavItem 
          icon={<FaUser size={24} />} 
          text="Login" 
          onClick={() => handleNavigation('/login')} 
          href="/login" 
        />
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
