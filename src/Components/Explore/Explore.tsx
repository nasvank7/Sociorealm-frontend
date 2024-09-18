import { useState } from 'react'
import { FaFire, FaUser, FaHashtag } from 'react-icons/fa'

const categories = ['For You', 'Trending', 'News', 'Sports', 'Entertainment', 'Technology']

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('For You')

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore</h1>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${
              activeCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Trending Topics */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Trending Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((topic) => (
            <div key={topic} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-2">
                <FaFire className="text-orange-500 mr-2" />
                <span className="font-semibold">#{`Trending${topic}`}</span>
              </div>
              <p className="text-gray-600">1.2K posts</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Users */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Popular Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((user) => (
            <div key={user} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div>
                <h3 className="font-semibold">User Name {user}</h3>
                <p className="text-gray-600">@username{user}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Posts</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((post) => (
            <div key={post} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <h3 className="font-semibold">Post Author {post}</h3>
                  <p className="text-gray-600 text-sm">@postauthor{post}</p>
                </div>
              </div>
              <p className="mb-2">This is a sample featured post content. It can be longer and more detailed.</p>
              <div className="flex items-center text-gray-500">
                <FaHashtag className="mr-1" />
                <span className="mr-2">Topic{post}</span>
                <span>1.5K likes</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
