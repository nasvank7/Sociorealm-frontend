import React, { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "@/Config/axios";
import { useUserDetails } from "@/services/UserInRedux";
import { BsFillChatSquareTextFill, BsSearch } from "react-icons/bs";
import { IoIosPersonAdd } from "react-icons/io";
import { format } from "date-fns";
import { debounce } from "lodash";

interface User {
  _id: string;
  username: string;
  image: string;
}

interface Conversation {
  _id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

interface ConversationListProps {
  onSelectConversation: (userId: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  onSelectConversation,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchingAllUsers, setIsSearchingAllUsers] = useState(false);
  const userDetails = useUserDetails();
  console.log(userDetails?._id,"Id");
  
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axiosInstance.get(
          `/getAllChatsOfuser/${userDetails?._id}`
        );
        if (Array.isArray(response?.data)) {
          const formattedConversations = response.data.map((conv: any) => ({
            _id: conv._id,
            user: {
              _id: conv.userId._id,
              username: conv.userId.username,
              image: conv.userId.image,
            },
            lastMessage: conv.lastMessage?.content || "",
            timestamp: conv.lastMessage?.timestamp || "",
            unreadCount: conv.unreadCount || 0,
          }));
          setConversations(formattedConversations);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await axiosInstance.get("/getAlluser");
        if (Array.isArray(response?.data)) {
          const allUsers = response.data;
          const filteredUsers = allUsers.filter(
            (user: User) => user._id !== userDetails?._id
          );
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (userDetails?._id) {
      fetchConversations();
      fetchAllUsers();
    }
  }, [userDetails?._id]);

  const handleSearch = useCallback(
    debounce((query: string) => {
      const filtered = users.filter(
        (user) =>
          user.username &&
          user.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }, 300),
    [users]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return format(date, "MMM d, h:mm a");
  };

  const toggleSearchMode = () => {
    setIsSearchingAllUsers(!isSearchingAllUsers);
    setSearchQuery("");
    setFilteredUsers([]);
  };

  return (
    <div className="h-full flex flex-col bg-gray-800">
      <div className="p-2 sm:p-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">
          Conversations
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder={
              isSearchingAllUsers
                ? "Search users..."
                : "Search conversations..."
            }
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-gray-700 text-white text-sm sm:text-base rounded-full px-3 sm:px-4 py-2 pl-8 sm:pl-10 pr-8 sm:pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <BsSearch className="absolute left-2 sm:left-3 top-2.5 sm:top-3 text-gray-400" />
          <button
            onClick={toggleSearchMode}
            className="absolute right-2 sm:right-3 top-2.5 sm:top-3 text-gray-400 hover:text-white"
            title={
              isSearchingAllUsers ? "Search conversations" : "Search all users"
            }
          >
            <IoIosPersonAdd size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {isSearchingAllUsers
          ? filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center p-2 sm:p-4 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                onClick={() => onSelectConversation(user._id)}
              >
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-4"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate text-sm sm:text-base">
                    {user.username}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm truncate">
                    Start a new conversation
                  </p>
                </div>
              </div>
            ))
          : conversations.map((conversation) => (
              <div
                key={conversation._id}
                className="flex items-center p-2 sm:p-4 cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                onClick={() => onSelectConversation(conversation.user._id)}
              >
                <img
                  src={conversation.user.image}
                  alt={conversation.user.username}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-2 sm:mr-4"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate text-sm sm:text-base">
                    {conversation.user.username}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end ml-2">
                  <p className="text-gray-500 text-xs">
                    {formatTimestamp(conversation.timestamp)}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <span className="bg-purple-500 text-white text-xs rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 mt-1 inline-block">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ConversationList;
