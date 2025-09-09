"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import Input from "@/components/ui/input";
import { Routes } from "@/routes/Routes";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace(Routes.DASHBOARD);
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");

      if (
        email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
        password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
      ) {
        console.log("Login successful");
        localStorage.setItem("token", email);
        router.push(Routes.DASHBOARD);
      } else {
        console.log("Invalid login credentials");
        setError("Invalid login credentials");
        toast.error("Invalid login credentials");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center">
            <Image
              src="/Icons/logo.png"
              alt="Logo"
              width={150}
              height={150}
              className="animate-bounce"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#58E2A4]">
            Exercise And Earm
          </h1>
          <h2 className="mt-3 text-xl font-semibold text-white">
            Welcome Back!
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              value={email}
              setValue={setEmail}
              id="email"
              type="email"
              placeholder="Enter your email"
            />

            <div className="relative">
              <Input
                value={password}
                setValue={setPassword}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-400 hover:text-white focus:outline-none cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-2 h-4 w-4 " />
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
