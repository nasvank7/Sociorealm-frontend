import React from 'react';

interface ActionButtonsProps {
  user: {
    id: string;
  };
}

function ActionButtons({ user }: ActionButtonsProps) {
  const handleFollow = () => {
    // Implement follow logic
    console.log(`Following user ${user.id}`);
  };

  const handleMessage = () => {
    // Implement message logic
    console.log(`Messaging user ${user.id}`);
  };

  return (
    <div className="action-buttons flex space-x-4 mb-6">
      <button
        onClick={handleFollow}
        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Follow
      </button>
      <button
        onClick={handleMessage}
        className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out"
      >
        Message
      </button>
    </div>
  );
}

export default ActionButtons;
