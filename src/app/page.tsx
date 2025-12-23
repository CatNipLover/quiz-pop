"use client";

import Button3D from "@/components/Button3D";
import { Trophy, Play, Star, LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { useGame } from "@/context/GameContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isLoading, logout } = useGame();
  const router = useRouter();

  const handlePlayClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-10">
      
      <div className="text-center space-y-4">
        <div className="text-6xl animate-bounce-slow">🦊</div>
        <h1 className="text-5xl font-black text-gray-800 tracking-tight">
          Quiz<span className="text-primary">Pop</span>
        </h1>
        <p className="text-xl text-gray-500 font-bold">
          Najlepszy sposób na naukę!
        </p>
      </div>

      <div className="grid gap-5 w-full max-w-xs">
        
        <div onClick={!isLoading ? handlePlayClick : undefined} className="w-full">
          <Button3D variant="success" fullWidth>
            <div className="flex items-center justify-center gap-2">
              {isLoading ? (
                "Ładowanie..."
              ) : user ? (
                <>
                  <Play size={24} fill="currentColor" /> Wróć do Gry
                </>
              ) : (
                <>
                  <LogIn size={24} /> Zaloguj i Graj
                </>
              )}
            </div>
          </Button3D>
        </div>

        <Link href="/leaderboard" className="w-full">
          <Button3D variant="primary" fullWidth>
            <div className="flex items-center justify-center gap-2">
              <Trophy size={24} /> Ranking
            </div>
          </Button3D>
        </Link>

        <Link href="/shop" className="w-full">
          <Button3D variant="neutral" fullWidth>
            <div className="flex items-center justify-center gap-2">
              <Star size={24} className="text-yellow-400 fill-yellow-400" /> Sklep
            </div>
          </Button3D>
        </Link>

        {!isLoading && user && (
          <div onClick={handleLogout} className="w-full">
            <Button3D variant="danger" fullWidth>
              <div className="flex items-center justify-center gap-2">
                <LogOut size={20} /> Wyloguj
              </div>
            </Button3D>
          </div>
        )}

      </div>

    </main>
  );
}