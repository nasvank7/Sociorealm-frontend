import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { axiosInstance } from '@/Config/axios';
import { useUserDetails } from "@/services/UserInRedux";
import { io, Socket } from "socket.io-client";

interface Message {
  _id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

interface ChatWindowProps {
  conversationId: string;
  onBack: () => void;
  isMobile: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId, onBack, isMobile }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const userDetails = useUserDetails();

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/messages/${conversationId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [conversationId]);

  useEffect(() => {
    fetchMessages();

    socketRef.current = io("http://localhost:3001"); // Replace with your socket server URL

    socketRef.current.on('connect', () => {
      console.log('Connected to socket server');
      socketRef.current?.emit('join', { conversationId, userId: userDetails?._id });
    });

    socketRef.current.on('message', (newMessage: Message) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [conversationId, fetchMessages, userDetails?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        const response = await axiosInstance.post('/messages', {
          conversationId,
          senderId: userDetails?._id,
          content: newMessage,
        });

        const sentMessage = response.data;
        setMessages([...messages, sentMessage]);
        setNewMessage('');

        socketRef.current?.emit('sendMessage', sentMessage);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="bg-gray-800 p-4 flex items-center">
        {isMobile && (
          <button onClick={onBack} className="text-white mr-4">
            <FaArrowLeft />
          </button>
        )}
        <h2 className="text-white font-semibold">Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`mb-4 flex ${
              message.senderId === userDetails?._id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[75%] ${
                message.senderId === userDetails?._id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs text-gray-300 mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 transition-colors duration-200"
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;