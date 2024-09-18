import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaUserPlus, FaComment } from 'react-icons/fa';

interface Notification {
  id: string;
  type: 'like' | 'follow' | 'comment';
  message: string;
  isRead: boolean;
  timestamp: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Fetch notifications from API
    const fetchNotifications = async () => {
      // Replace this with your actual API call
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <FaCheckCircle className="text-green-500" />;
      case 'follow':
        return <FaUserPlus className="text-blue-500" />;
      case 'comment':
        return <FaComment className="text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg overflow-hidden z-20">
      <div className="py-2">
        <h3 className="text-lg font-semibold text-white px-4 py-2">Notifications</h3>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 hover:bg-gray-700 transition-colors duration-200 ${
                notification.isRead ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">{getIcon(notification.type)}</div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-700">
        <a
          href="#"
          className="block text-center py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
        >
          View all notifications
        </a>
      </div>
    </div>
  );
};

export default Notifications;
