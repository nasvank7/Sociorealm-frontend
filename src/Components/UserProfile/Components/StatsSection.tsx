import React from 'react';

interface StatsSectionProps {
  user: {
    postsCount: number;
    followersCount: number;
    followingCount: number;
  };
}

function StatsSection({ user }: StatsSectionProps) {
  return (
    <div className="stats-section grid grid-cols-3 gap-4 text-center">
      <div className="stat">
        <p className="text-xl sm:text-2xl font-bold text-white">{user.postsCount}</p>
        <p className="text-sm sm:text-base text-gray-400">Posts</p>
      </div>
      <div className="stat">
        <p className="text-xl sm:text-2xl font-bold text-white">{user.followersCount}</p>
        <p className="text-sm sm:text-base text-gray-400">Followers</p>
      </div>
      <div className="stat">
        <p className="text-xl sm:text-2xl font-bold text-white">{user.followingCount}</p>
        <p className="text-sm sm:text-base text-gray-400">Following</p>
      </div>
    </div>
  );
}

export default StatsSection;
