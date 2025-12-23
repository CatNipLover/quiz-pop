"use client";

import { useEffect, useState } from "react";
import Button3D from "@/components/Button3D";
import { useGame } from "@/context/GameContext";
import { ArrowLeft, Trophy, Medal, Crown } from "lucide-react";
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
      const { data, error } = await supabase
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
      
      {/* Nagłówek */}
      <div className="text-center space-y-2">
        <div className="inline-block p-4 bg-yellow-100 rounded-full text-yellow-500 mb-2 animate-bounce-slow">
            <Trophy size={40} fill="currentColor" />
        </div>
        <h1 className="text-4xl font-black text-gray-800">Ranking Graczy</h1>
        <p className="text-gray-500 font-bold">Wspinaj się na szczyt!</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
            <div className="text-center py-10 font-bold text-gray-400 animate-pulse">
                Ładowanie mistrzów...
            </div>
        ) : (
            players.map((player, index) => {
                const rank = index + 1;
                const isTop3 = rank <= 3;
                const isMe = player.username === name; 

                return (
                    <div 
                        key={player.id}
                        className={`
                            relative flex items-center justify-between p-4 rounded-2xl border-2 border-b-4 
                            transition-transform hover:scale-[1.02]
                            ${isMe 
                                ? "bg-primary text-white border-primary-dark shadow-lg scale-105 z-10"
                                : "bg-white border-gray-border text-gray-700"
                            }
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`
                                font-black text-2xl w-8 text-center
                                ${isTop3 ? "text-yellow-500" : "text-gray-400"}
                                ${isMe ? "text-white" : ""}
                            `}>
                                {rank === 1 ? <Crown size={28} className="text-yellow-400 fill-yellow-400" /> : `#${rank}`}
                            </div>
                            
                            <div className="text-3xl bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center border-2 border-gray-100">
                                {player.avatar}
                            </div>

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

      <Link href="/" className="block mt-8">
        <Button3D variant="neutral" fullWidth>
            <div className="flex items-center justify-center gap-2">
                <ArrowLeft size={20} /> Wróć do Menu
            </div>
        </Button3D>
      </Link>

    </div>
  );
}