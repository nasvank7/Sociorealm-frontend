import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { axiosInstance } from '@/Config/axios'
import { loginValidationSchema } from '@/services/Validations/userValidation'

const LoginPage: React.FC = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      router.push('/')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await loginValidationSchema.validate({ username, password }, { abortEarly: false })
      const res = await axiosInstance.post('/login', { username, password })
      if (res.data.success) {
        localStorage.setItem('jwtToken', JSON.stringify(res.data.token))
        toast.success('Logged in Successfully', { autoClose: 2000 })
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        if (res.data.Blocked) toast.error('Account Blocked', { autoClose: 3000 })
        if (res.data.userNameErr) toast.error('User not found', { autoClose: 3000 })
        if (res.data.passErr) toast.error('Invalid password', { autoClose: 3000 })
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        toast.error(err.message)
      } else {
        console.error(err)
        toast.error('An unexpected error occurred')
      }
    }
  }

  return (
    <GoogleOAuthProvider clientId='206160267923-8o28ar0sr5tbs175dmn0rfgtgvl36419.apps.googleusercontent.com'>
      <div className="min-h-screen bg-gray-900 flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-4xl font-extrabold text-white font-serif italic">sociorealm</h2>
              <p className="mt-2 text-sm text-gray-400">
                Enter to get unlimited access to data & information.
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-white"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-800 text-white pr-10"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-blue-500 hover:text-blue-400">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Log in
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-400">Or Login with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      axiosInstance
                        .post("/google/login", credentialResponse)
                        .then((res) => {
                          if (res.data.success) {
                            localStorage.setItem(
                              "jwtToken",
                              JSON.stringify(res.data.token)
                            );
                            toast.success("Logged in Successfully", {
                              autoClose: 2000,
                            });
                            setTimeout(() => {
                              router.push("/");
                            }, 2000);
                          } else if (res.data.message) {
                            toast.error(res.data.message);
                          } else {
                            router.push("/login");
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          toast.error("An error occurred during Google login. Please try again.");
                        });
                    }}
                    onError={() => {
                      console.log('Login Failed');
                      toast.error("Google login failed. Please try again.");
                    }}
                  />
                </div>
              </div>

              <p className="mt-6 text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-blue-500 hover:text-blue-400">
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block relative w-0 flex-1">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
            <div className="bg-cover w-[25rem] h-[35rem] mt-10 bg-center bg-no-repeat relative p-[1.3rem]"
                 style={{ backgroundImage: "url(/images/home-phones-2x.png)" }}>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default LoginPage
