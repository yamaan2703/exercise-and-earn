"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "@/components/ui/input";
import { Routes } from "@/routes/Routes";
import toast from "react-hot-toast";
import Button from "@/components/ui/button";
import { getCookie, setCookie } from "@/lib/cookies";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.replace(Routes.DASHBOARD);
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");

      setTimeout(() => {
        if (email === adminEmail && password === adminPassword) {
          console.log("Login successful");
          toast.success("Login successful");
          // localStorage.setItem("token", email);
          setCookie("token", email);
          router.push(Routes.DASHBOARD);
        } else {
          console.log("Invalid login credentials");
          setError("Invalid login credentials");
          toast.error("Invalid login credentials");
        }
        setIsLoading(false);
      }, 1000);
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
          <h1 className="text-2xl sm:text-3xl font-bold text-[#58E2A4]">
            Exercise And Earn
          </h1>
          <h2 className="mt-3 text-lg sm:text-xl font-semibold text-white">
            Welcome Back!
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email Address"
              value={email}
              setValue={setEmail}
              id="email"
              type="email"
              placeholder="Enter your email"
              variant="default"
              size="md"
            />

            <div className="relative">
              <Input
                label="Password"
                value={password}
                setValue={setPassword}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                variant="default"
                size="md"
                iconRight={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                }
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="">
            <Button isLoading={isLoading} label="Sign In" fullWidth />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
