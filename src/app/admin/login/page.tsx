"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push("/admin")
      } else {
        setError(data.error || "Login gagal")
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-6 selection:bg-orange-500 selection:text-white">
      <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl shadow-orange-500/5 p-10 lg:p-12 border border-gray-100 dark:border-zinc-800 relative overflow-hidden">
          {/* subtle decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          
          <div className="text-center mb-10 relative">
            <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center text-4xl shadow-xl shadow-orange-500/20 mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform duration-300">
               🍜
            </div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">Admin Portal</h1>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">Warpas SZA Management</p>
          </div>
  
          {error && (
            <div className="mb-8 p-4 bg-rose-50 dark:bg-rose-500/10 border-2 border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl text-xs font-bold text-center flex items-center justify-center gap-2 animate-shake">
              <span>⚠️</span> {error}
            </div>
          )}
  
          <form onSubmit={handleSubmit} className="space-y-8 relative">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Username</label>
              <div className="relative">
                 <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg">👤</span>
                 <input
                   type="text"
                   autoFocus
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   className="w-full pl-14 pr-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white placeholder:text-gray-300 dark:placeholder:text-zinc-600"
                   placeholder="Admin Username"
                   required
                 />
              </div>
            </div>
  
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
              <div className="relative">
                 <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg">🔒</span>
                 <input
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full pl-14 pr-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white placeholder:text-gray-300 dark:placeholder:text-zinc-600"
                   placeholder="••••••••"
                   required
                 />
              </div>
            </div>
  
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-black text-sm uppercase tracking-widest py-5 rounded-2xl transition-all shadow-xl shadow-orange-500/20 disabled:opacity-50 mt-4 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <span className="text-xl">🚀</span>
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-10 text-gray-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Warpas SZA • Handcrafted for Excellence
        </p>
      </div>
    </div>
  )
}
