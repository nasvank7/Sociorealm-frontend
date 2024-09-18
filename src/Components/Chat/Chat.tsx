import React, { useState } from 'react';
import ConversationList from '@/Components/Chat/Components/ConversationList';
import ChatWindow from '@/Components/Chat/Components/ChatWindow';
import { IoMdArrowBack } from 'react-icons/io';

const ChatPage: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showConversations, setShowConversations] = useState(true);

  const handleSelectConversation = (userId: string) => {
    setSelectedUserId(userId);
    setShowConversations(false);
  };

  const handleBackToConversations = () => {
    setShowConversations(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900">
      <div 
        className={`${
          showConversations ? 'flex' : 'hidden'
        } md:flex flex-col w-full md:w-1/3 lg:w-1/4 border-r border-gray-700`}
      >
        <ConversationList onSelectConversation={handleSelectConversation} />
      </div>
      <div 
        className={`${
          !showConversations ? 'flex' : 'hidden'
        } md:flex flex-col w-full md:w-2/3 lg:w-3/4`}
      >
        {selectedUserId ? (
          <>
            <div className="md:hidden bg-gray-800 p-2">
              <button 
                onClick={handleBackToConversations}
                className="text-white flex items-center"
              >
                <IoMdArrowBack className="mr-2" /> Back to Conversations
              </button>
            </div>
            <ChatWindow userId={selectedUserId} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;