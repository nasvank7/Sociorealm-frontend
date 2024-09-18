import React from 'react';

interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  onSelectConversation: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  conversations, 
  selectedConversation, 
  onSelectConversation 
}) => {
  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-white p-4">Chats</h2>
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`flex items-center p-4 cursor-pointer hover:bg-gray-800 transition-colors duration-200 ${
            selectedConversation === conversation.id ? 'bg-gray-800' : ''
          }`}
          onClick={() => onSelectConversation(conversation.id)}
        >
          <img
            src={conversation.user.avatar}
            alt={conversation.user.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold truncate">{conversation.user.name}</h3>
            <p className="text-gray-400 text-sm truncate">{conversation.lastMessage}</p>
          </div>
          <div className="text-right flex flex-col items-end ml-2">
            <p className="text-gray-500 text-xs">{conversation.timestamp}</p>
            {conversation.unreadCount > 0 && (
              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 mt-1 inline-block">
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
