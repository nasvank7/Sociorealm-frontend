import Link from 'next/link'
import { FaHome, FaSearch, FaCompass, FaUser } from 'react-icons/fa'

const NavItem = ({ icon, text, href }) => (
  <Link href={href} className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-700 transition-colors">
    {icon}
    <span className="text-xs mt-1 hidden lg:block">{text}</span>
  </Link>
)

export default function Navbar() {
  return (
    <nav className="flex md:flex-col justify-around md:justify-start md:space-y-4">
      <NavItem icon={<FaHome size={24} />} text="Home" href="/" />
      <NavItem icon={<FaSearch size={24} />} text="Search" href="/search" />
      <NavItem icon={<FaCompass size={24} />} text="Explore" href="/explore" />
      <NavItem icon={<FaUser size={24} />} text="Profile" href="/profile" />
    </nav>
  )
}