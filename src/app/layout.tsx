import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/context/GameContext";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu"; // 1. Import

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuizPop - Graj i Wygrywaj",
  description: "Najlepsza gra quizowa w sieci",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      {/* 2. Dodajemy pb-24 do body, żeby dolny pasek nie zasłaniał treści na telefonach */}
      <body className={`${nunito.className} bg-[#fff7ed] min-h-screen pb-24 lg:pb-0`}>
        <GameProvider>
          <Header />
          {children}
          <MobileMenu /> {/* 3. Menu widoczne na każdej stronie (tylko mobile) */}
        </GameProvider>
      </body>
    </html>
  );
}