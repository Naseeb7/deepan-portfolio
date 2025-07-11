import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ProfileWidget from "@/components/ProfileWidget";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit", // Defines the CSS variable
});

export const metadata: Metadata = {
  title: "Deepan's Portfolio",
  description:
    "Explore the portfolio of Deepan, a creative UI/UX designer crafting intuitive digital experiences through user-centered design and clean aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased flex flex-row gap-6`}>
        <AuthProvider>
          <div className="flex w-1/4">
            <ProfileWidget />
          </div>
          <div className="flex w-3/4 relative bg-brand-200 rounded-[20px]">
            <div className="absolute right-0 top-0">
              <Navbar />
            </div>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
