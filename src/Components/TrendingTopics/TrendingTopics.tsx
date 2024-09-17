import { FaImage, FaVideo, FaPoll, FaSmile, FaHeart, FaComment, FaShare } from 'react-icons/fa'

const TrendingTopic = ({ topic, posts }) => (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 text-white mb-4 transform hover:scale-105 transition-all duration-300">
      <h3 className="font-bold text-lg mb-2">#{topic}</h3>
      <p className="text-sm opacity-80">{posts} posts</p>
    </div>
  )

  export default TrendingTopic