"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, Backpack, ShoppingBag, Settings } from "lucide-react";

const NavItem = ({ href, icon: Icon, label }: any) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive ? "text-[#8b5cf6]" : "text-gray-400 hover:text-gray-600"}`}>
      <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
      <span className={`text-[10px] uppercase tracking-wide ${isActive ? "font-black" : "font-medium"}`}>
        {label}
      </span>
    </Link>
  );
};

export default function MobileMenu() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-[70px] bg-white border-t border-gray-200 flex justify-around items-center z-50 pb-safe lg:hidden shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      <NavItem href="/dashboard" icon={Home} label="Start" />
      <NavItem href="/leaderboard" icon={Trophy} label="Ranking" />
      <NavItem href="/inventory" icon={Backpack} label="Plecak" />
      <NavItem href="/shop" icon={ShoppingBag} label="Sklep" />
      <NavItem href="/settings" icon={Settings} label="Opcje" />
    </div>
  );
}