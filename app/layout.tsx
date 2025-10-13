import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import NextTopLoader from "nextjs-toploader";
import { Providers } from "@/redux/provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Exercise & Earn",
  description: "Track your workouts, earn rewards, and stay fit.",
  icons: { icon: "/Icons/logo2.svg" },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextTopLoader
          color="#14b8a6"
          height={3}
          crawlSpeed={200}
          showSpinner={false}
          shadow="5px 0 15px #14b8a6, 10px 0 25px #14b8a6"
        />
        <Providers>
          <AuthProvider>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
