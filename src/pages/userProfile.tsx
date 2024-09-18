
import UserProfile from "@/Components/UserProfile/userProfile";

export default function UserProfilePage() {
    const user = {
        name: "John Doe",
        username: "johndoe",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        website: "https://johndoe.com",
        postsCount: 100,
        followersCount: 1000,
        followingCount: 1000,
        profilePicture: "https://via.placeholder.com/150",
        coverPhoto: "https://via.placeholder.com/150",
        location: "New York, NY",
        id: "1",
    };
    return <UserProfile user={user} />
  }


//   import React, { useState, useEffect } from 'react';
// import UserProfile from "@/Components/UserProfile/UserProfile";
// import { useRouter } from 'next/router';

// // Define the User type
// type User = {
//   id: string;
//   name: string;
//   username: string;
//   profilePicture: string;
//   coverPhoto: string;
//   bio: string;
//   location: string;
//   website: string;
//   postsCount: number;
//   followersCount: number;
//   followingCount: number;
// };

// export default function UserProfilePage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const { userId } = router.query;

//   useEffect(() => {
//     async function fetchUserData() {
//       if (userId) {
//         try {
//           // Replace this with your actual API call
//           const response = await fetch(`/api/users/${userId}`);
//           const userData = await response.json();
//           setUser(userData);
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     }

//     fetchUserData();
//   }, [userId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <div>User not found</div>;
//   }

//   return <UserProfile user={user} />;
// }
