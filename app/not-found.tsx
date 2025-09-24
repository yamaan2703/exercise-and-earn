"use client";
import Button from "@/components/ui/button";
import { getCookie } from "@/lib/cookies";
import { Routes } from "@/routes/Routes";
import { ButtonSize, ButtonVariant } from "@/types/enums";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const token = getCookie("token");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#06211e] text-white">
      <Image
        src="Icons/logo2.svg"
        alt="Logo"
        width={100}
        height={100}
        className="mb-5"
      />
      <p className="text-lg mb-3">
        Oops! The page you are looking for doesnt exist.
      </p>
      <Button
        variant={ButtonVariant.THEME}
        size={ButtonSize.MEDIUM}
        label={token ? "Go to Dashboard" : "Go to Login"}
        onClick={() => router.push(token ? Routes.DASHBOARD : Routes.LOGIN)}
      />
    </div>
  );
}
