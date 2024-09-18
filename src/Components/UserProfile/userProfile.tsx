
import React from 'react';
import ProfileHeader from '@/Components/UserProfile/Components/ProfileHeader';
import BioSection from '@/Components/UserProfile/Components/BioSection';
import StatsSection from '@/Components/UserProfile/Components/StatsSection';
import ActionButtons from '@/Components/UserProfile/Components/ActionButtons';
import PostsSection from '@/Components/UserProfile/Components/PostsSection';

interface User {
  id: string;
  name: string;
  username: string;
  profilePicture: string;
  coverPhoto: string;
  bio: string;
  location: string;
  website: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

interface UserProfileProps {
  user: User;
}

function UserProfile({ user }: UserProfileProps) {
    return (
      <div className="user-profile w-full">
        <ProfileHeader user={user} />
        <div className="profile-content mt-4 sm:mt-6 lg:mt-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-gray-800 shadow rounded-lg p-4 sm:p-6">
                <BioSection user={user} />
                <StatsSection user={user} />
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-gray-800 shadow rounded-lg p-4 sm:p-6">
                <ActionButtons user={user} />
                <PostsSection userId={user.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default UserProfile;
