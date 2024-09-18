import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import RootState from "./redux/Store/RootState";
// Adjust the import path as needed

export const useUserDetails = () => {
  const router = useRouter();
  const userStore = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!userStore.userCred) {
      router.push("/login"); // Adjust the path as needed
    }
  }, [userStore.userCred, router]);

  return userStore.userCred || null;
};
