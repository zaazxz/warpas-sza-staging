"use client"

import { useEffect, useState } from "react"
import { Testimonial } from "@/types"

export default function TestimonialsManagement() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const res = await fetch("/api/testimonials")
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  const handleOpenModal = (item: Partial<Testimonial> | null = null) => {
    setEditingItem(item || { name: "", location: "", text: "", avatar: "👩", rating: 5 })
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingItem?.id ? "PUT" : "POST"

    const res = await fetch("/api/testimonials", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingItem),
    })

    if (res.ok) {
      setIsModalOpen(false)
      fetchItems()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return
    const res = await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" })
    if (res.ok) fetchItems()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setEditingItem({ ...editingItem!, avatar: data.url })
      }
    } catch (err) {
      console.error("Upload failed", err)
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div className="animate-pulse h-96 bg-gray-100 dark:bg-zinc-800 rounded-2xl"></div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Testimonials</h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400">Total {items.length} testimoni pelanggan.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-all"
        >
          + Tambah Testimoni
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center text-2xl overflow-hidden border-2 border-white dark:border-zinc-800 shadow-sm">
                  {item.avatar.startsWith("/") ? <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" /> : <span className="drop-shadow-sm">{item.avatar}</span>}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white leading-tight tracking-tight">{item.name}</h3>
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mt-1">{item.location}</p>
                </div>
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleOpenModal(item)} className="p-2 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400 transition-colors shadow-sm">✏️</button>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 transition-colors shadow-sm">🗑️</button>
              </div>
            </div>
            <div className="relative flex-1">
              <span className="absolute -top-2 -left-2 text-4xl text-orange-500/10 font-serif">"</span>
              <p className="text-sm text-gray-600 dark:text-zinc-300 italic leading-relaxed relative z-10 pl-2">
                {item.text}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-50 dark:border-zinc-800/50 flex items-center justify-between">
              <div className="flex text-amber-400 text-sm tracking-tighter">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < item.rating ? "drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" : "text-gray-200 dark:text-zinc-800"}>★</span>
                ))}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Customer Review</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 transition-all duration-300">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 relative animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-gray-50/30 dark:bg-zinc-800/20">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{editingItem?.id ? "Edit Testimoni" : "Tambah Testimoni"}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Berikan apresiasi terbaik untuk pelanggan Anda</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-10 h-10 flex items-center justify-center bg-white dark:bg-zinc-800 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-full text-gray-400 hover:text-rose-500 transition-all shadow-sm ring-1 ring-gray-100 dark:ring-zinc-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-160px)]">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Pelanggan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Andi Nugraha"
                    value={editingItem?.name || ""}
                    onChange={(e) => setEditingItem({ ...editingItem!, name: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/40 border-2 border-transparent focus:border-orange-500/30 focus:bg-white dark:focus:bg-zinc-800/60 rounded-2xl transition-all outline-none font-semibold text-gray-800 dark:text-white placeholder:text-gray-300 dark:placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Lokasi</label>
                  <input
                    type="text"
                    placeholder="Contoh: Karawang Barat"
                    value={editingItem?.location || ""}
                    onChange={(e) => setEditingItem({ ...editingItem!, location: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/40 border-2 border-transparent focus:border-orange-500/30 focus:bg-white dark:focus:bg-zinc-800/60 rounded-2xl transition-all outline-none font-semibold text-gray-800 dark:text-white placeholder:text-gray-300 dark:placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Pesan Testimoni</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Masukkan ulasan jujur dari pelanggan..."
                  value={editingItem?.text || ""}
                  onChange={(e) => setEditingItem({ ...editingItem!, text: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/40 border-2 border-transparent focus:border-orange-500/30 focus:bg-white dark:focus:bg-zinc-800/60 rounded-2xl transition-all outline-none font-medium text-gray-700 dark:text-zinc-300 placeholder:text-gray-300 dark:placeholder:text-zinc-600 leading-relaxed resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center pt-2">
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Avatar / Foto</label>
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className="w-24 h-24 bg-gray-50 dark:bg-zinc-950/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden transition-all group-hover:border-orange-500/50 group-hover:bg-orange-50/10 active:scale-95 shadow-lg">
                        {uploading ? (
                          <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
                        ) : editingItem?.avatar ? (
                          editingItem.avatar.startsWith('/') || editingItem.avatar.startsWith('http') ? (
                            <img src={editingItem.avatar} className="w-full h-full object-cover" alt="Preview"/>
                          ) : (
                            <span className="text-4xl drop-shadow-md">{editingItem.avatar}</span>
                          )
                        ) : (
                          <span className="text-2xl text-gray-300">👤</span>
                        )}
                        <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-bold uppercase tracking-widest">Ganti</span>
                          <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                        </label>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-zinc-900 pointer-events-none">
                        <span className="text-xs">📷</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter leading-tight">Gunakan Emoji atau Upload Foto</p>
                      <input
                        type="text"
                        value={editingItem?.avatar || ""}
                        onChange={(e) => setEditingItem({ ...editingItem!, avatar: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/40 border-2 border-transparent focus:border-orange-500/30 focus:bg-white dark:focus:bg-zinc-800/60 rounded-xl transition-all outline-none font-bold text-gray-800 dark:text-white text-sm"
                        placeholder="👩 atau URL"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Rating Produk</label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 px-4 py-4 bg-gray-50 dark:bg-zinc-800/40 rounded-2xl border-2 border-transparent hover:border-gray-100 dark:hover:border-zinc-800 transition-all justify-center">
                      {[1,2,3,4,5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setEditingItem({...editingItem!, rating: num})}
                          className={`group relative text-3xl transition-all duration-300 hover:scale-125 active:scale-95 ${editingItem?.rating === num ? 'scale-110 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]' : 'opacity-40 hover:opacity-100 grayscale-[0.5]'}`}
                        >
                          <span className={num <= (editingItem?.rating || 0) ? "text-amber-400" : "text-gray-300 dark:text-zinc-700"}>
                            ★
                          </span>
                          {editingItem?.rating === num && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full whitespace-nowrap animate-bounce">
                              {num === 5 ? "Sempurna!" : num === 4 ? "Bagus!" : num === 3 ? "Cukup" : num === 2 ? "Kurang" : "Buruk"}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between px-2">
                       <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Kecewa</span>
                       <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Puas Banget</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  type="submit" 
                  className="flex-[2] bg-orange-500 hover:bg-orange-600 text-white font-black text-sm uppercase tracking-widest py-5 rounded-[1.5rem] transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                  <span>{editingItem?.id ? "Simpan Perubahan" : "Posting Testimoni"}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-600 dark:text-zinc-300 font-bold text-sm tracking-tight py-5 rounded-[1.5rem] transition-all active:scale-[0.98]"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
