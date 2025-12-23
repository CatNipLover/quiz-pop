"use client";

import { useEffect, useState } from "react";
import Button3D from "@/components/Button3D";
import { useGame } from "@/context/GameContext";
import { ArrowLeft, Trophy, Medal } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";

type Player = {
  id: string;
  username: string;
  xp: number;
  avatar: string;
};

export default function LeaderboardPage() {
  const { name } = useGame();
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, username, xp, avatar')
        .order('xp', { ascending: false })
        .limit(50);

      if (data) {
        setPlayers(data);
      }
      setIsLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <div className="inline-block p-4 bg-purple-100 rounded-full text-purple-600 mb-2 animate-bounce-slow">
            <Trophy size={40} />
        </div>
        <h1 className="text-4xl font-black text-gray-800">Ranking Graczy</h1>
        <p className="text-gray-500 font-bold">Najlepsi z najlepszych!</p>
      </div>

      <div className="bg-white rounded-3xl border-2 border-gray-200 border-b-[6px] overflow-hidden min-h-[300px]">
        {isLoading ? (
            <div className="p-10 text-center font-bold text-gray-400 animate-pulse">
                Ładowanie rankingu...
            </div>
        ) : (
            players.map((player, index) => {
                const isMe = player.username === name;
                const isTop3 = index < 3;
                
                return (
                    <div 
                        key={player.id} 
                        className={`
                            flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors relative
                            ${isMe ? "bg-purple-50 hover:bg-purple-100" : ""}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`
                                w-8 h-8 flex items-center justify-center font-black rounded-full text-sm
                                ${index === 0 ? "bg-yellow-400 text-white shadow-sm" : 
                                  index === 1 ? "bg-gray-300 text-white shadow-sm" : 
                                  index === 2 ? "bg-orange-400 text-white shadow-sm" : "text-gray-400 bg-gray-100"}
                            `}>
                                {index + 1}
                            </div>
                            
                            <div className="text-3xl">{player.avatar}</div>
                            
                            <div>
                                <h3 className="font-bold text-lg leading-tight">{player.username}</h3>
                                {isMe && <span className="text-xs uppercase font-black bg-white/20 px-2 py-0.5 rounded text-white">To Ty!</span>}
                            </div>
                        </div>

                        <div className="font-black text-xl flex items-center gap-1">
                            {player.xp} <span className="text-sm opacity-60 font-bold">XP</span>
                        </div>

                        {isTop3 && !isMe && (
                            <div className="absolute -top-3 -right-3 bg-yellow-400 text-white p-2 rounded-full border-2 border-white shadow-sm">
                                <Medal size={16} fill="currentColor" />
                            </div>
                        )}
                    </div>
                );
            })
        )}
        
        {!isLoading && players.length === 0 && (
            <div className="text-center text-gray-400 font-bold py-10">
                Baza jest pusta. Zagraj pierwszy!
            </div>
        )}
      </div>

      <Link href="/dashboard" className="block mt-8">
        <Button3D variant="neutral" fullWidth>
            <div className="flex items-center justify-center gap-2">
                <ArrowLeft size={20} /> Wróć do Mapy
            </div>
        </Button3D>
      </Link>

    </div>
  );
}