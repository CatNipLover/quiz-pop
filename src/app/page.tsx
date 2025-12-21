export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 gap-6">
      
      <h1 className="text-4xl font-bold text-white">
        Test Tailwind CSS 🚀
      </h1>

      <button className="bg-red-600 hover:bg-red-500 text-white text-xl font-bold py-4 px-8 rounded-full transition-all hover:scale-110">
        Jeśli jestem CZERWONY, to działam!
      </button>

      <div className="p-6 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/50">
        Test cieni i zaokrągleń
      </div>

    </div>
  );
}