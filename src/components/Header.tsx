"use client";

import { useGame } from "@/context/GameContext";
import { Heart, Star } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { xp, level, lives, user } = useGame();

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b-2 border-gray-100 sticky top-0 z-50">
      
      <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
        <div className="text-3xl">🦊</div>
        <h1 className="text-2xl font-black text-gray-800 hidden sm:block">
          Quiz<span className="text-primary">Pop</span>
        </h1>
      </Link>

      {user && (
        <div className="flex items-center gap-3 font-bold animate-in fade-in duration-300">
            
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl text-gray-700 border-2 border-gray-100">
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                <span>Lvl {level}</span>
                <span className="text-gray-400 text-sm ml-1">{xp} XP</span>
            </div>

            <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-xl text-red-500 border-2 border-red-100">
                <Heart size={20} className="fill-current" />
                <span>{lives}</span>
            </div>
        </div>
      )}
    </header>
  );
}