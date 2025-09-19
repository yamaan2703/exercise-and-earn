"use client";
import { getCookie } from "@/lib/cookies";
import { Routes } from "@/routes/Routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token");
    setTimeout(() => {
      if (!token) {
        router.push(Routes.LOGIN);
      } else {
        router.push(Routes.DASHBOARD);
      }
    }, 2000);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src="/Icons/logo2.svg"
        alt="Logo"
        width={150}
        height={150}
        className="animate-bounce"
      />
    </div>
  );
}
