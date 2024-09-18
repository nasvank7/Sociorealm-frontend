import React from 'react';

interface ProfileHeaderProps {
  user: {
    name: string;
    username: string;
    profilePicture: string;
    coverPhoto: string;
  };
}

function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="profile-header relative">
      <div className="h-32 sm:h-48 lg:h-64 w-full overflow-hidden">
        <img src={user.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-0 left-4 sm:left-6 lg:left-8 transform translate-y-1/2 flex items-end">
        <img 
          src={user.profilePicture} 
          alt={user.name} 
          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full border-4 border-gray-900 shadow-lg"
        />
        <div className="ml-4 pb-2 sm:pb-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white shadow-text">{user.name}</h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 shadow-text">@{user.username}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
