"use client";
import Button from "@/components/ui/button";
import { Routes } from "@/routes/Routes";
import { ButtonSize, ButtonVariant } from "@/types/enums";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
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
        label="Go to Dashboard"
        onClick={() => router.push(Routes.DASHBOARD)}
      />
    </div>
  );
}
