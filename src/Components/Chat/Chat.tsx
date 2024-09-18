import { useEffect, useState } from "react";
import ConversationList from "./Components/ConversationList";
import ChatWindow from "./Components/ChatWindow";

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
  
  // Dummy conversation data
  const dummyConversations: Conversation[] = [
    {
      id: '1',
      user: {
        id: 'user1',
        name: 'Alice Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
      lastMessage: 'Hey, how are you doing?',
      timestamp: '2023-05-15T14:30:00Z',
      unreadCount: 2,
    },
    {
      id: '2',
      user: {
        id: 'user2',
        name: 'Bob Smith',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      lastMessage: 'Did you see the latest post?',
      timestamp: '2023-05-15T13:45:00Z',
      unreadCount: 0,
    },
    {
      id: '3',
      user: {
        id: 'user3',
        name: 'Charlie Brown',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      lastMessage: 'Let\'s meet up this weekend!',
      timestamp: '2023-05-15T10:20:00Z',
      unreadCount: 1,
    },
    {
      id: '4',
      user: {
        id: 'user4',
        name: 'Diana Prince',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
      lastMessage: 'Thanks for your help yesterday.',
      timestamp: '2023-05-14T22:15:00Z',
      unreadCount: 0,
    },
    {
      id: '5',
      user: {
        id: 'user5',
        name: 'Ethan Hunt',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
      lastMessage: 'Mission accomplished!',
      timestamp: '2023-05-14T20:00:00Z',
      unreadCount: 3,
    },
  ];
  
  const ChatPage: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>(dummyConversations);
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return (
      <div className="flex h-screen bg-gray-900">
        <div className={`${isMobile && selectedConversation ? 'hidden' : 'w-full md:w-1/3'} border-r border-gray-700`}>
          <ConversationList 
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={(id) => {
              setSelectedConversation(id);
              if (isMobile) {
                document.getElementById('chatWindow')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </div>
        <div id="chatWindow" className={`${isMobile && !selectedConversation ? 'hidden' : 'w-full md:w-2/3'}`}>
          {selectedConversation ? (
            <ChatWindow 
              conversationId={selectedConversation} 
              onBack={() => setSelectedConversation(null)}
              isMobile={isMobile}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default ChatPage;
