"use client";

import Button3D from "@/components/Button3D";
import { useGame } from "@/context/GameContext";
import { ArrowLeft, Lock, Award, Shield, Zap, BookOpen, Target, Crown, Star } from "lucide-react";
import Link from "next/link";

// Baza wszystkich dostępnych odznak w grze
const ALL_BADGES = [
  { id: 1, name: "Początkujący", desc: "Zacznij przygodę (Lvl 1)", icon: Star, reqLevel: 1, color: "text-yellow-500 bg-yellow-100 border-yellow-200" },
  { id: 2, name: "Pilny Uczeń", desc: "Osiągnij Poziom 2", icon: BookOpen, reqLevel: 2, color: "text-blue-500 bg-blue-100 border-blue-200" },
  { id: 3, name: "Snajper", desc: "Osiągnij Poziom 5", icon: Target, reqLevel: 5, color: "text-red-500 bg-red-100 border-red-200" },
  { id: 4, name: "Szybki Bill", desc: "Osiągnij Poziom 10", icon: Zap, reqLevel: 10, color: "text-purple-500 bg-purple-100 border-purple-200" },
  { id: 5, name: "Niezniszczalny", desc: "Osiągnij Poziom 20", icon: Shield, reqLevel: 20, color: "text-green-500 bg-green-100 border-green-200" },
  { id: 6, name: "Król Kodu", desc: "Osiągnij Poziom 50", icon: Crown, reqLevel: 50, color: "text-amber-600 bg-amber-100 border-amber-200" },
];

export default function InventoryPage() {
  const { level, lives, xp } = useGame();

  // Liczy zdobyte odznaki
  const unlockedCount = ALL_BADGES.filter(b => level >= b.reqLevel).length;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      
      {/* Nagłówek */}
      <div className="text-center space-y-2">
        <div className="inline-block p-4 bg-orange-100 rounded-full text-orange-500 mb-2 animate-bounce-slow">
            <Award size={40} />
        </div>
        <h1 className="text-4xl font-black text-gray-800">Twój Ekwipunek</h1>
        <p className="text-gray-500 font-bold">Zgromadzone przedmioty i odznaki</p>
      </div>

      {/* Aktywne Zasoby */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Karta Życia */}
        <div className="bg-white p-6 rounded-3xl border-2 border-gray-200 border-b-[6px] flex items-center gap-4">
            <div className="text-4xl">❤️</div>
            <div>
                <h3 className="font-black text-xl text-gray-800">Punkty Życia</h3>
                <p className="text-gray-400 font-bold">{lives} / 5 dostępnych</p>
            </div>
        </div>

        {/* Karta XP */}
        <div className="bg-white p-6 rounded-3xl border-2 border-gray-200 border-b-[6px] flex items-center gap-4">
            <div className="text-4xl">💎</div>
            <div>
                <h3 className="font-black text-xl text-gray-800">Doświadczenie</h3>
                <p className="text-gray-400 font-bold">{xp} XP (Poziom {level})</p>
            </div>
        </div>
      </div>

      {/* Odznaki */}
      <div className="bg-white rounded-3xl border-2 border-gray-200 border-b-[6px] p-6 sm:p-8">
        <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-black text-gray-800">Kolekcja Odznak</h2>
            <span className="text-sm font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-500">
                Zdobyto: {unlockedCount} / {ALL_BADGES.length}
            </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ALL_BADGES.map((badge) => {
                const isUnlocked = level >= badge.reqLevel;
                const Icon = badge.icon;

                return (
                    <div 
                        key={badge.id}
                        className={`
                            relative p-4 rounded-2xl border-2 flex flex-col items-center text-center gap-3 transition-all
                            ${isUnlocked 
                                ? "bg-white border-gray-100 shadow-sm scale-100 opacity-100" 
                                : "bg-gray-50 border-gray-100 opacity-60 grayscale"
                            }
                        `}
                    >
                        {/* Kłódka dla zablokowanych */}
                        {!isUnlocked && (
                            <div className="absolute top-2 right-2 text-gray-400">
                                <Lock size={16} />
                            </div>
                        )}

                        {/* Ikona Odznaki */}
                        <div className={`
                            w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-b-4 mb-1
                            ${isUnlocked ? badge.color : "bg-gray-200 text-gray-400 border-gray-300"}
                        `}>
                            <Icon size={32} strokeWidth={2} />
                        </div>

                        {/* Opis */}
                        <div>
                            <h3 className="font-black text-gray-800">{badge.name}</h3>
                            <p className="text-xs font-bold text-gray-400 mt-1">{badge.desc}</p>
                        </div>

                        {/* Pasek postępu (tylko dla zablokowanych) */}
                        {!isUnlocked && (
                            <div className="w-full mt-2">
                                <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase">Wymagany Lvl {badge.reqLevel}</p>
                                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gray-400 rounded-full" 
                                        style={{ width: `${(level / badge.reqLevel) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
      </div>

      {/* Powrót */}
      <Link href="/dashboard" className="block">
        <Button3D variant="neutral" fullWidth>
            <div className="flex items-center justify-center gap-2">
                <ArrowLeft size={20} /> Wróć do Dashboardu
            </div>
        </Button3D>
      </Link>

    </div>
  );
}