import { FaImage, FaVideo, FaPoll, FaSmile, FaHeart, FaComment, FaShare } from 'react-icons/fa'

const Post = ({ username, avatar, content, image, likes, comments, shares }) => (
    <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img src={avatar} alt={username} className="w-12 h-12 rounded-full mr-4 border-2 border-purple-500" />
          <div>
            <h3 className="font-bold text-lg text-white">{username}</h3>
            <p className="text-gray-400 text-sm">2 hours ago</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">{content}</p>
        {image && (
          <div className="relative mb-4 rounded-xl overflow-hidden">
            <img src={image} alt="Post image" className="w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        )}
        <div className="flex justify-between text-gray-400">
          <button className="flex items-center space-x-2 hover:text-pink-500 transition-colors">
            <FaHeart />
            <span>{likes}</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
            <FaComment />
            <span>{comments}</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
            <FaShare />
            <span>{shares}</span>
          </button>
        </div>
      </div>
    </div>
  )

  export default Post