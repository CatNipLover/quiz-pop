"use client";

import { useEffect } from "react";
import Button3D from "@/components/Button3D";
import Link from "next/link";
import { Home, RefreshCcw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#fff7ed] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center p-6">
      
      <div className="max-w-md w-full space-y-8 text-center">
        
        <div className="relative inline-block">
           <div className="text-8xl animate-bounce">🦊</div>
           <div className="absolute -bottom-2 -right-4 bg-red-100 text-red-500 p-3 rounded-2xl border-4 border-white shadow-sm rotate-12">
              <AlertTriangle size={32} strokeWidth={3} />
           </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">
            Oups! Coś poszło nie tak...
          </h2>
          <p className="text-gray-500 font-bold text-lg">
            Wygląda na to, że nasz lis przegryzł jakiś kabel. 🔌
          </p>
          {error.digest && (
             <p className="text-xs font-mono text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-200 inline-block mt-2">
               Error ID: {error.digest}
             </p>
          )}
        </div>

        <div className="bg-white p-8 rounded-3xl border-2 border-gray-200 border-b-[6px] shadow-sm space-y-4">
           
           <div onClick={() => reset()}>
             <Button3D variant="primary" fullWidth>
                <div className="flex items-center justify-center gap-2">
                   <RefreshCcw size={20} /> Spróbuj Naprawić
                </div>
             </Button3D>
           </div>

           <Link href="/dashboard" className="block">
             <Button3D variant="neutral" fullWidth>
                <div className="flex items-center justify-center gap-2">
                   <Home size={20} /> Wróć do Bazy
                </div>
             </Button3D>
           </Link>

        </div>

      </div>
    </div>
  );
}