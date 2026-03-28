"use client"

import { useEffect, useState } from "react"
import { BusinessInfo, DEFAULT_THEME } from "@/types"

export default function BusinessSettings() {
  const [data, setData] = useState<BusinessInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  
  // Password change state
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" })
  const [savingPass, setSavingPass] = useState(false)

  // Theme state
  const [theme, setTheme] = useState({ primary: "#f97316", accent: "#fb923c", background: "#fdf5e6", textOnPrimary: "#ffffff" })
  const [savingTheme, setSavingTheme] = useState(false)

  useEffect(() => {
    fetch("/api/business-info")
      .then((res) => res.json())
      .then((d) => {
        setData(d)
        setLoading(false)
      })
    
    fetch("/api/theme")
      .then((res) => res.json())
      .then((t) => setTheme(t))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: "", text: "" })

    try {
      const res = await fetch("/api/business-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage({ type: "success", text: "Perubahan berhasil disimpan!" })
      } else {
        setMessage({ type: "error", text: "Gagal menyimpan perubahan" })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan sistem" })
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwords.new !== passwords.confirm) {
        setMessage({ type: "error", text: "Password baru tidak cocok" })
        return
    }
    
    setSavingPass(true)
    try {
        const res = await fetch("/api/auth/change-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(passwords),
        })
        const result = await res.json()
        if (res.ok) {
            setMessage({ type: "success", text: "Password berhasil diubah!" })
            setPasswords({ current: "", new: "", confirm: "" })
        } else {
            setMessage({ type: "error", text: result.error || "Gagal mengubah password" })
        }
    } catch (err) {
        setMessage({ type: "error", text: "Terjadi kesalahan sistem" })
    } finally {
        setSavingPass(false)
    }
  }

  const handleThemeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingTheme(true)
    try {
      const res = await fetch("/api/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theme),
      })
      if (res.ok) {
        setMessage({ type: "success", text: "Tema warna berhasil diperbarui!" })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Gagal memperbarui tema" })
    } finally {
      setSavingTheme(false)
    }
  }

  const handleResetTheme = () => {
    if (confirm("Apakah Anda yakin ingin mengembalikan tema ke warna awal?")) {
      setTheme(DEFAULT_THEME)
    }
  }

  if (loading) return <div className="animate-pulse h-96 bg-gray-100 dark:bg-zinc-800 rounded-2xl"></div>

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 px-2 lg:px-0">
      {/* feedback message */}
      {(message.text) && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] px-8 py-4 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-center gap-3 font-bold text-sm border-2 ${message.type === 'success' ? 'bg-green-500 border-green-400 text-white' : 'bg-rose-500 border-rose-400 text-white'}`}>
           <span className="text-xl">{message.type === 'success' ? '✅' : '❌'}</span>
           {message.text}
        </div>
      )}

      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-xl shadow-orange-500/5 overflow-hidden">
        <div className="p-8 lg:p-10 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Informasi Bisnis</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 uppercase font-bold tracking-widest text-[10px]">Atur profil warung mulai dari nama sampai jam operasional</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Bisnis</label>
              <input
                type="text"
                required
                value={data?.name || ""}
                onChange={(e) => setData({ ...data!, name: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Tagline Bisnis</label>
              <input
                type="text"
                required
                value={data?.tagline || ""}
                onChange={(e) => setData({ ...data!, tagline: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Nomor WhatsApp (Ex: 62812...)</label>
              <div className="relative">
                 <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">📱</span>
                 <input
                   type="text"
                   required
                   value={data?.whatsapp || ""}
                   onChange={(e) => setData({ ...data!, whatsapp: e.target.value })}
                   className="w-full pl-14 pr-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white"
                 />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Alamat Singkat</label>
              <div className="relative">
                 <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">📍</span>
                 <input
                   type="text"
                   required
                   value={data?.address || ""}
                   onChange={(e) => setData({ ...data!, address: e.target.value })}
                   className="w-full pl-14 pr-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white"
                 />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Kota & Provinsi</label>
              <input
                type="text"
                required
                value={data?.city || ""}
                onChange={(e) => setData({ ...data!, city: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Jam Buka</label>
                <input
                  type="text"
                  required
                  placeholder="09.00"
                  value={data?.openHour || ""}
                  onChange={(e) => setData({ ...data!, openHour: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-black text-center text-gray-800 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Jam Tutup</label>
                <input
                  type="text"
                  required
                  placeholder="21.00"
                  value={data?.closeHour || ""}
                  onChange={(e) => setData({ ...data!, closeHour: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-black text-center text-gray-800 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Harga Terendah (Rp)</label>
              <input
                type="number"
                required
                value={data?.minPrice || 0}
                onChange={(e) => setData({ ...data!, minPrice: parseInt(e.target.value) || 0 })}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Harga Tertinggi (Rp)</label>
              <input
                type="number"
                required
                value={data?.maxPrice || 0}
                onChange={(e) => setData({ ...data!, maxPrice: parseInt(e.target.value) || 0 })}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">ShopeeFood URL</label>
              <div className="relative">
                 <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">🧡</span>
                 <input
                   type="text"
                   placeholder="https://shopee.co.id/universal-link/food/..."
                   value={data?.shopeeFoodUrl || ""}
                   onChange={(e) => setData({ ...data!, shopeeFoodUrl: e.target.value })}
                   className="w-full pl-14 pr-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-medium text-xs text-gray-400"
                 />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">GoFood URL</label>
              <div className="relative">
                 <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">💚</span>
                 <input
                   type="text"
                   placeholder="https://gofood.link/a/..."
                   value={data?.goFoodUrl || ""}
                   onChange={(e) => setData({ ...data!, goFoodUrl: e.target.value })}
                   className="w-full pl-14 pr-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-medium text-xs text-gray-400"
                 />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">GrabFood URL</label>
              <div className="relative">
                 <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">🛵</span>
                 <input
                   type="text"
                   placeholder="https://food.grab.com/id/..."
                   value={data?.grabFoodUrl || ""}
                   onChange={(e) => setData({ ...data!, grabFoodUrl: e.target.value })}
                   className="w-full pl-14 pr-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-medium text-xs text-gray-400"
                 />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Instagram URL</label>
              <div className="relative">
                 <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">📸</span>
                 <input
                   type="text"
                   placeholder="https://instagram.com/..."
                   value={data?.instagramUrl || ""}
                   onChange={(e) => setData({ ...data!, instagramUrl: e.target.value })}
                   className="w-full pl-14 pr-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-medium text-xs text-gray-400"
                 />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Google Maps Embed URL (Iframe src)</label>
            <input
              type="text"
              required
              value={data?.mapEmbedUrl || ""}
              onChange={(e) => setData({ ...data!, mapEmbedUrl: e.target.value })}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-medium text-xs text-gray-400"
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest py-4 px-12 rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-[0.98] disabled:opacity-50"
            >
              {saving ? "⏳ Memproses..." : "🚀 Simpan Semua Perubahan"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-xl shadow-orange-500/5 overflow-hidden">
        <div className="p-8 lg:p-10 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Kustomisasi Tema</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 uppercase font-bold tracking-widest text-[10px]">Atur skema warna utama website Anda sesuai brand</p>
        </div>
        <form onSubmit={handleThemeSubmit} className="p-8 lg:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Warna Utama (Primary)</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  value={theme.primary}
                  onChange={(e) => setTheme({...theme, primary: e.target.value})}
                  className="w-14 h-14 rounded-2xl cursor-pointer bg-gray-50 dark:bg-zinc-800 border-none p-1"
                />
                <input 
                  type="text" 
                  value={theme.primary}
                  onChange={(e) => setTheme({...theme, primary: e.target.value})}
                  className="flex-1 px-5 h-14 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-black text-gray-800 dark:text-white uppercase"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Warna Aksen (Accent)</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  value={theme.accent}
                  onChange={(e) => setTheme({...theme, accent: e.target.value})}
                  className="w-14 h-14 rounded-2xl cursor-pointer bg-gray-50 dark:bg-zinc-800 border-none p-1"
                />
                <input 
                  type="text" 
                  value={theme.accent}
                  onChange={(e) => setTheme({...theme, accent: e.target.value})}
                  className="flex-1 px-5 h-14 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-black text-gray-800 dark:text-white uppercase"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Warna Background</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  value={theme.background}
                  onChange={(e) => setTheme({...theme, background: e.target.value})}
                  className="w-14 h-14 rounded-2xl cursor-pointer bg-gray-50 dark:bg-zinc-800 border-none p-1"
                />
                <input 
                  type="text" 
                  value={theme.background}
                  onChange={(e) => setTheme({...theme, background: e.target.value})}
                  className="flex-1 px-5 h-14 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-black text-gray-800 dark:text-white uppercase"
                />
              </div>
            </div>
            <div className="space-y-2">
               <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Preview Live</label>
               <div style={{ backgroundColor: theme.background }} className="h-14 rounded-2xl p-2 flex items-center justify-center gap-2 border-2 border-gray-100 dark:border-zinc-800">
                  <div style={{ backgroundColor: theme.primary }} className="w-full h-full rounded-xl flex items-center justify-center shadow-inner">
                     <span className="text-[10px] font-black text-white uppercase tracking-tighter">Primary</span>
                  </div>
                  <div style={{ backgroundColor: theme.accent }} className="w-10 h-full rounded-xl shadow-inner shrink-0" />
               </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
              type="submit" 
              disabled={savingTheme}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm uppercase tracking-widest py-4 px-10 rounded-2xl transition-all shadow-xl shadow-primary/20 active:scale-[0.98] disabled:opacity-50">
              {savingTheme ? "⏳ Menyimpan..." : "🌈 Terapkan Tema Warna"}
            </button>
            <button 
              type="button"
              onClick={handleResetTheme}
              className="bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-widest py-4 px-8 rounded-2xl border-2 border-gray-100 dark:border-zinc-700 transition-all active:scale-[0.98]">
              🔄 Reset ke Original
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-xl shadow-orange-500/5 overflow-hidden">
        <div className="p-8 lg:p-10 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Keamanan Akun</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 uppercase font-bold tracking-widest text-[10px]">Ubah kata sandi secara berkala untuk menjaga keamanan dashboard</p>
        </div>
        <form onSubmit={handlePasswordChange} className="p-8 lg:p-10 space-y-8 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2 col-span-1 md:col-span-2">
                   <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Password Sekarang</label>
                   <input 
                       type="password" 
                       required
                       placeholder="••••••••"
                       value={passwords.current}
                       onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                       className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white" />
               </div>
               <div className="space-y-2">
                   <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Password Baru</label>
                   <input 
                       type="password" 
                       required
                       placeholder="Min. 8 Karakter"
                       value={passwords.new}
                       onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                       className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white" />
               </div>
               <div className="space-y-2">
                   <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Konfirmasi Password Baru</label>
                   <input 
                       type="password" 
                       required
                       placeholder="Ulangi Password Baru"
                       value={passwords.confirm}
                       onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                       className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white" />
               </div>
            </div>
            <button 
                type="submit" 
                disabled={savingPass}
                className="bg-zinc-900 dark:bg-zinc-800 hover:bg-black dark:hover:bg-zinc-700 text-white font-black text-sm uppercase tracking-widest py-4 px-10 rounded-2xl transition-all shadow-xl shadow-zinc-500/20 active:scale-[0.98] disabled:opacity-50">
               {savingPass ? "⏳ Memproses..." : "🔒 Perbarui Password"}
            </button>
        </form>
      </div>
    </div>
  )
}
