import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import SiteIndex from "@/components/SiteIndex";
import SplashScreen from "@/components/SplashScreen";
import SmoothScroll from "@/components/SmoothScroll";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RALLY — XR Rhythm Sports Platform",
  description: "음악과 움직임으로 집중을 되찾는 몰입형 라이프 스포츠 플랫폼",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${bebas.variable} h-full`}>
      <body className="min-h-full bg-canvas text-ink">
        <SmoothScroll />
        <SplashScreen />
        <SiteIndex />
        {children}
      </body>
    </html>
  );
}
