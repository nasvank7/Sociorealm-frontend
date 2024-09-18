import React, { useEffect, useState } from "react";
import Head from 'next/head'
import Post from '@/Components/Post/post'
import TrendingTopic from '@/Components/TrendingTopics/TrendingTopics'
import { axiosInstance } from "../../services/userApi/axiosInstance";
import axios from 'axios'
import { FaImage, FaVideo, FaPoll, FaSmile, FaHeart, FaComment, FaShare, FaCamera, FaBell, FaHome, FaSearch, FaUser, FaBars } from 'react-icons/fa'
import { AiOutlinePlusCircle } from 'react-icons/ai'

interface User {
  _id: string;
  username: string;
  image: string;
}

interface Post {
  _id: string;
  userId: User;
  description: string;
  likes: string[];
  image: string;
  saved: string[];
  createdAt: string;
}

interface Story {
  username: string;
  story: string;
}

export default function Home() {
  const [postContent, setPostContent] = useState('')
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [storyImage, setStoryImage] = useState<string>("");
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(30);
// const axiosInstance=""
  // useEffect(() => {
  //   axios.get("http://localhost:3001/api/users/getPost").then((res) => {
  //     setPosts(res.data.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axiosInstance.get("/getAlluser");
  //       if (Array.isArray(response?.data)) {
  //         const Allusers = response.data;
  //         const Alluser = Allusers.filter((user: any) => user.story.length > 0);
  //         setStories(Alluser);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  // useEffect(() => {
  //   let timer: NodeJS.Timeout;

  //   if (storyModalOpen) {
  //     timer = setInterval(() => {
  //       setCountdown((prevCountdown) => prevCountdown - 1);
  //     }, 1000);
  //   } else {
  //     setCountdown(30);
  //   }

  //   return () => clearInterval(timer);
  // }, [storyModalOpen]);

  // useEffect(() => {
  //   if (countdown === 0) {
  //     setStoryModalOpen(false);
  //   }
  // }, [countdown]);
  // console.log({posts});
  

  return (
    <>
      <Head>
        <title>Sociorealm - Home</title>
        <meta name="description" content="Your vibrant social media platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white pb-16">
        {/* <header className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Sociorealm
          </h1>
          <div className="flex space-x-4">
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
              <FaCamera className="h-6 w-6" />
            </button>
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
              <FaBell className="h-6 w-6" />
            </button>
          </div>
        </header> */}

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="stories-container mb-8 flex space-x-4 overflow-x-auto pb-2">
            {stories.map((story, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  onClick={() => {
                    setStoryModalOpen(true);
                    setStoryImage(story.story);
                  }}
                  className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500 cursor-pointer"
                >
                  <img src={story.story} alt={story.username} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs mt-1">{story.username}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <main className="w-full lg:w-2/3">
              <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
                <textarea 
                  className="w-full h-24 p-4 rounded-xl bg-gray-700 border-2 border-gray-600 focus:border-purple-500 focus:ring-0 resize-none text-white placeholder-gray-400"
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                ></textarea>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex space-x-4">
                    <button className="text-gray-400 hover:text-purple-500 transition-colors">
                      <FaImage size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-blue-500 transition-colors">
                      <FaVideo size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-green-500 transition-colors">
                      <FaPoll size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                      <FaSmile size={20} />
                    </button>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-colors transform hover:scale-105">
                    Post
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {posts?.length !== 0 ? (
                  posts?.map((post) => (
                    <Post key={post._id} postDetails={post} />
                  ))
                ) : (
                  <p className="text-center py-8">No posts available</p>
                )}
              </div>
            </main>

            <aside className="w-full lg:w-1/3 space-y-8">
              <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Trending Topics</h2>
                <div className="space-y-4">
                  <TrendingTopic topic="webdev" posts={1234} />
                  <TrendingTopic topic="naturelovers" posts={987} />
                  <TrendingTopic topic="foodie" posts={765} />
                  {/* Add more trending topics */}
                </div>
              </div>
              <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Suggested Connections</h2>
                {/* Add suggested connections here */}
              </div>
            </aside>
          </div>
        </div>
      </div>

      {storyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-md">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="h-1 bg-gray-200">
                <div
                  className="h-1 bg-blue-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${(countdown / 30) * 100}%` }}
                ></div>
              </div>
              <img src={storyImage} alt="Story" className="w-full" />
            </div>
            <button 
              onClick={() => setStoryModalOpen(false)}
              className="absolute top-2 right-2 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex justify-around p-3">
        <FaHome className="h-6 w-6 text-white" />
        <FaSearch className="h-6 w-6 text-white" />
        <AiOutlinePlusCircle className="h-8 w-8 text-purple-500" />
        <FaUser className="h-6 w-6 text-white" />
        <FaBars className="h-6 w-6 text-white" />
      </nav> */}
    </>
  )
}
