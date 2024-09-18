import React, { useState, useEffect } from 'react';

interface Post {
  id: string;
  content: string;
  createdAt: string;
}

interface PostsSectionProps {
  userId: string;
}

function PostsSection({ userId }: PostsSectionProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch user posts
    const fetchPosts = async () => {
      // Replace this with actual API call
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="posts-section">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="post mb-6 p-4 bg-gray-700 rounded-lg shadow">
          <p className="text-gray-200">{post.content}</p>
          <p className="text-sm text-gray-400 mt-2">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsSection;
