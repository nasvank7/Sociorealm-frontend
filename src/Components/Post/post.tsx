import React, { useEffect, useRef, useState, useCallback } from "react";
import moment from "moment";
import { io, Socket } from "socket.io-client";
import { FaHeart, FaComment, FaShare, FaBookmark } from "react-icons/fa";
import { useUserDetails } from "@/services/UserInRedux";
import { axiosInstance } from "@/Config/axios";

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

interface PostProps {
  postDetails: Post;
}

const Post: React.FC<PostProps> = ({ postDetails }) => {
  const userDetails = useUserDetails();
  const [postDetailsFrom, setPostDetailsFrom] = useState<Post>(postDetails);
  const [liked, setLiked] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [likesCount, setLikeCount] = useState<number>(0);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io("http://localhost:3001");
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    setPostDetailsFrom(postDetails);
    setLiked(postDetails?.likes?.includes(userDetails?._id || ""));
    setSaved(postDetails?.saved?.includes(userDetails?._id || ""));
    setLikeCount(postDetails?.likes?.length || 0);
  }, [postDetails, userDetails?._id]);

  const handleLike = useCallback(async () => {
    const newLikedState = !liked;
    const data = {
      postId: postDetailsFrom._id,
      userId: userDetails?._id,
      value: newLikedState,
    };

    try {
      const response = await axiosInstance.patch("/liked", data);
      if (response.status === 200) {
        setLiked(newLikedState);
        setLikeCount((prevCount) =>
          newLikedState ? prevCount + 1 : prevCount - 1
        );
        if (socket.current) {
          socket.current.emit("likePost", {
            postId: {
              _id: postDetailsFrom.userId._id,
              description: postDetailsFrom.description,
              image: postDetailsFrom.image,
            },
            userId: userDetails?._id,
            senderId: {
              _id: userDetails?._id,
              username: userDetails?.username,
              image: userDetails?.image,
            },
            type: "like",
          });
        }
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  }, [liked, postDetailsFrom, userDetails]);

  const handleSave = useCallback(async () => {
    const newSavedState = !saved;
    const data = {
      postId: postDetailsFrom?._id.toString(),
      userId: userDetails?._id.toString(),
      value: newSavedState,
    };

    try {
      const response = await axiosInstance.patch("/save", data);
      if (response.status === 200) {
        setSaved(newSavedState);
      }
    } catch (error) {
      console.error("Error saving the post:", error);
    }
  }, [saved, postDetailsFrom, userDetails]);

  return (
    <div
      id={postDetailsFrom._id}
      className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl mb-6 border border-gray-700 hover:border-purple-500"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={postDetailsFrom?.userId?.image}
            alt={postDetailsFrom?.userId?.username}
            className="w-12 h-12 rounded-full mr-4 border-2 border-purple-500"
          />
          <div>
            <h3 className="font-bold text-lg text-white">
              {postDetailsFrom?.userId?.username}
            </h3>
            <p className="text-gray-400 text-sm">
              {moment(postDetailsFrom?.createdAt).fromNow()}          
            </p>
          </div>
        </div>
        <p className="text-gray-300 mb-4">{postDetailsFrom?.description}</p>
        {postDetailsFrom?.image && (
          <div className="relative mb-4 rounded-xl overflow-hidden">
            <img
              src={postDetailsFrom?.image}
              alt="Post image"
              className="w-full object-cover max-h-[400px] p-2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        )}
        <div className="flex justify-between text-gray-400">
          <button
            className={`flex items-center space-x-2 transition-colors ${
              liked ? "text-pink-500" : "hover:text-pink-500"
            }`}
            onClick={handleLike}
          >
            <FaHeart />
            <span>{likesCount}</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
            <FaComment />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
            <FaShare />
            <span>Share</span>
          </button>
          <button
            className={`flex items-center space-x-2 transition-colors ${
              saved ? "text-yellow-500" : "hover:text-yellow-500"
            }`}
            onClick={handleSave}
          >
            <FaBookmark />
            <span>{saved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Post);
