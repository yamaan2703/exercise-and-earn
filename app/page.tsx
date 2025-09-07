"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="cursor-pointer">
      <h1 onClick={() => router.push("/pages/login")}>Login</h1>
      <h1 onClick={() => router.push("/pages/dashboard")}>Dashboard</h1>
      <h1 onClick={() => router.push("/pages/users")}>Users</h1>
    </div>
  );
}
