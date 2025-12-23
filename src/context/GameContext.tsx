"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

type GameContextType = {
  xp: number;
  level: number;
  lives: number;
  name: string;
  avatar: string;
  isLoading: boolean;
  user: any;
  addXp: (amount: number) => Promise<void>;
  loseLife: () => Promise<void>;
  buyLives: (cost: number) => Promise<boolean>;
  resetProgress: () => Promise<void>;
  updateProfile: (name: string, avatar: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<{ error: string | null }>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(5);
  const [name, setName] = useState("Nowy Gracz");
  const [avatar, setAvatar] = useState("🦊");
  
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id); 
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (uid: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uid)
        .single();

      if (data) {
        setXp(data.xp);
        setLevel(data.level);
        setLives(data.lives);
        setName(data.username);
        setAvatar(data.avatar);
      }
    } catch (error) {
      console.error("Błąd pobierania profilu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    
    if (!error) {
      router.push("/dashboard");
    }
    setIsLoading(false);
    return { error: error?.message || null };
  };

  const registerWithEmail = async (email: string, pass: string, userName: string) => {
    setIsLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
    });

    if (error) {
      setIsLoading(false);
      return { error: error.message };
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ 
            id: data.user.id, 
            username: userName, 
            avatar: '🦊', 
            xp: 0, 
            level: 1, 
            lives: 5 
        }]);

      if (profileError) {
        console.error("Błąd tworzenia profilu:", profileError);
      } else {
        setUser(data.user);
        setName(userName); 
        setXp(0);
        setLevel(1);
        setLives(5);
        setAvatar('🦊');
      }

      router.push("/dashboard");
    }
    
    setIsLoading(false);
    return { error: null };
  };

  const loginAsGuest = async () => {
    setIsLoading(true);
    const { data } = await supabase.auth.signInAnonymously();
    
    if (data?.user) {
        await supabase.from('profiles').insert([{ 
            id: data.user.id, 
            username: 'Gracz Gość', 
            avatar: '👻',
            xp: 0,
            level: 1,
            lives: 5
        }]);
        
        await fetchProfile(data.user.id);
        router.push("/dashboard");
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    
    setUser(null);
    setName("Nowy Gracz");
    setXp(0);
    setLevel(1);
    setLives(5);
    setAvatar("🦊");

    await supabase.auth.signOut();

    router.refresh(); 
    router.push("/login");
    
    setIsLoading(false);
  };

  const addXp = async (amount: number) => {
    if (!user) return;
    
    let newXp = xp + amount;
    let newLevel = level;
    let newLives = lives;

    if (newXp >= 100) {
      newLevel += 1;
      newXp = newXp - 100;
      newLives = 5;
    }

    setXp(newXp);
    setLevel(newLevel);
    setLives(newLives);

    await supabase
        .from('profiles')
        .update({ xp: newXp, level: newLevel, lives: newLives })
        .eq('id', user.id);
  };

  const loseLife = async () => {
    if (!user) return;
    const newLives = lives > 0 ? lives - 1 : 0;
    
    setLives(newLives);
    await supabase.from('profiles').update({ lives: newLives }).eq('id', user.id);
  };

  const buyLives = async (cost: number) => {
    if (!user) return false;
    if (xp >= cost) {
        const newXp = xp - cost;
        setXp(newXp); 
        setLives(5);
        await supabase.from('profiles').update({ xp: newXp, lives: 5 }).eq('id', user.id);
        return true;
    }
    return false;
  };

  const updateProfile = async (newName: string, newAvatar: string) => {
    if (!user) return;
    setName(newName);
    setAvatar(newAvatar);
    await supabase.from('profiles').update({ username: newName, avatar: newAvatar }).eq('id', user.id);
  };

  const resetProgress = async () => {
      if(!user) return;
      await supabase.from('profiles').update({ xp: 0, level: 1, lives: 5 }).eq('id', user.id);
      setXp(0); 
      setLevel(1); 
      setLives(5);
  };

  return (
    <GameContext.Provider value={{ 
        xp, level, lives, name, avatar, isLoading, user,
        addXp, loseLife, buyLives, resetProgress, updateProfile, 
        loginAsGuest, loginWithEmail, registerWithEmail, logout 
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame musi być użyte wewnątrz GameProvider");
  return context;
}