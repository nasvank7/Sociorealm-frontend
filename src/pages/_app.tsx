import Header from "@/Components/Layout/Header/Header";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Navbar from "@/Components/Layout/Navbar/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootState from "@/services/redux/Store/RootState";
import { Provider, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LoginPage from "./login";
import { store } from "@/services/redux/Store/store";
function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setUserLogin(true);
    }
  }, [router]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
      <Provider store={store}>
    <div className="min-h-screen bg-gray-900 text-white">
      {userLogin ? (
          <>
            <Header />
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-8">
              <div className="hidden md:block md:w-16 lg:w-64 mr-4">
                <Navbar />
              </div>
              <main className="flex-grow">
                <Component {...pageProps} />
                <ToastContainer />
              </main>
            </div>
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 z-50">
              <Navbar />
            </div>
          </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center">
            <LoginPage />
          </div>
        </>
      )}
    </div>
      </Provider>
  );
}

export default MyApp;
