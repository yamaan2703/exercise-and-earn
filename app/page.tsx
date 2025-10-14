"use client";
import { getCookie, setCookie } from "@/lib/cookies";
import { Routes } from "@/routes/Routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRefreshTokenMutation } from "@/redux/slices/loginSlice";

export default function Home() {
  const router = useRouter();
  const [refreshTokenApi] = useRefreshTokenMutation();
  const token = getCookie("token");

  useEffect(() => {
    const handleAuth = async () => {
      if (!token) {
        router.push(Routes.LOGIN);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        console.log(responseData);

        if (responseData.statusCode === 401) {
          try {
            const refreshResponse = await refreshTokenApi(token).unwrap();

            if (refreshResponse?.token) {
              setCookie("token", refreshResponse.token);
              console.log("Token refreshed successfully");
              router.push(Routes.DASHBOARD);
            } else {
              console.log("Refresh token expired");
              setCookie("token", "");
              router.push(Routes.LOGIN);
            }
          } catch (refreshError) {
            console.log("Refresh failed:", refreshError);
            setCookie("token", "");
            router.push(Routes.LOGIN);
          }
        } else {
          router.push(Routes.DASHBOARD);
        }
      } catch (error) {
        console.error("Error checking token:", error);
        setCookie("token", "");
        router.push(Routes.LOGIN);
      }
    };

    handleAuth();
  }, [router, token, refreshTokenApi]);

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
