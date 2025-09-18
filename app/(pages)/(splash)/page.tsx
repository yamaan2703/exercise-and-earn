"use client";
import { getCookie } from "@/lib/cookies";
import { Routes } from "@/routes/Routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Splash = () => {
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
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src="/Icons/logo.png"
        alt="Logo"
        width={150}
        height={150}
        className="animate-bounce"
      />
    </div>
  );
};

export default Splash;
