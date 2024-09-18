import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

interface Message {
  id: string;
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

  useEffect(() => {
    // Fetch messages for the selected conversation
    const fetchMessages = async () => {
      // Replace with your actual API call
      // For now, let's use dummy data
      const dummyMessages: Message[] = [
        { id: '1', senderId: 'other', content: 'Hey there!', timestamp: '2023-05-15T14:30:00Z' },
        { id: '2', senderId: 'currentUser', content: 'Hi! How are you?', timestamp: '2023-05-15T14:31:00Z' },
        { id: '3', senderId: 'other', content: 'Im doing great, thanks for asking. How about you?', timestamp: '2023-05-15T14:32:00Z' },
        { id: '4', senderId: 'currentUser', content: 'Im good too. Just working on some projects.', timestamp: '2023-05-15T14:33:00Z' },
        { id: '5', senderId: 'other', content: 'That sounds interesting! What kind of projects?', timestamp: '2023-05-15T14:34:00Z' },
      ];
      setMessages(dummyMessages);
    };

    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        senderId: 'currentUser',
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
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
            key={message.id}
            className={`mb-4 flex ${
              message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[75%] ${
                message.senderId === 'currentUser'
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
      <form onSubmit={handleSendMessage} className="p-4 ">
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
