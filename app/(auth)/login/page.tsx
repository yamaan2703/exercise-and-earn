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
import {
  ButtonType,
  ButtonVariant,
  InputSize,
  InputVariant,
} from "@/types/enums";
import { useLoginMutation } from "@/redux/slices/loginSlice";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.replace(Routes.DASHBOARD);
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!email.trim() || !password.trim()) {
        toast.error("Please fill all fields");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error("Please enter a valid email address!");
        return;
      }

      const response = await login({ email, password }).unwrap();

      if (response.token) {
        setCookie("token", response.token);
        toast.success("Login succesful!");
        router.push(Routes.DASHBOARD);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Login credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center">
            <Image
              src="/Icons/logo.svg"
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
              type="text"
              placeholder="Enter your email"
              variant={InputVariant.DEFAULT}
              size={InputSize.MEDIUM}
            />

            <div className="relative">
              <Input
                label="Password"
                value={password}
                setValue={setPassword}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                variant={InputVariant.DEFAULT}
                size={InputSize.MEDIUM}
                iconRight={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none cursor-pointer"
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

          <Button
            type={ButtonType.SUBMIT}
            isLoading={isLoading}
            label="Sign In"
            variant={ButtonVariant.PRIMARY}
            fullWidth
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
