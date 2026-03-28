"use client"

import { useEffect, useState } from "react"
import { MenuItem } from "@/types"

export default function MenuManagement() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const res = await fetch("/api/menu-items")
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  const handleOpenModal = (item: Partial<MenuItem> | null = null) => {
    setEditingItem(item || { name: "", description: "", price: 0, emoji: "🍝", badge: "", badgeColor: "bg-orange-500", rating: 5, waText: "" })
    setIsModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingItem?.id ? "PUT" : "POST"
    
    // Auto-generate waText if empty
    if (!editingItem?.waText && editingItem?.name) {
      editingItem.waText = `Halo%20saya%20mau%20order%20${encodeURIComponent(editingItem.name)}%20WARPAS%20SZA`
    }

    const res = await fetch("/api/menu-items", {
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
    if (!confirm("Yakin ingin menghapus menu ini?")) return
    const res = await fetch(`/api/menu-items?id=${id}`, { method: "DELETE" })
    if (res.ok) fetchItems()
  }

  const toggleAvailability = async (item: MenuItem) => {
    const res = await fetch("/api/menu-items", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, available: !item.available }),
    })
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
        setEditingItem({ ...editingItem!, emoji: data.url }) // Reusing emoji field for image URL or emoji
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Menu Items</h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400">Total {items.length} menu tersedia.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-all"
        >
          + Tambah Menu
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col h-full">
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center text-3xl overflow-hidden shadow-inner ring-4 ring-white dark:ring-zinc-800">
                {item.emoji.startsWith("/") ? <img src={item.emoji} alt={item.name} className="w-full h-full object-cover" /> : <span className="drop-shadow-sm">{item.emoji}</span>}
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleOpenModal(item)} className="p-2.5 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400 transition-colors shadow-sm" title="Edit">✏️</button>
                <button onClick={() => handleDelete(item.id)} className="p-2.5 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 transition-colors shadow-sm" title="Hapus">🗑️</button>
              </div>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg tracking-tight leading-tight">{item.name}</h3>
                <button
                  onClick={() => toggleAvailability(item)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${item.available !== false ? 'bg-green-500' : 'bg-gray-200 dark:bg-zinc-700'}`}
                  title={item.available !== false ? "Tersedia" : "Habis"}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${item.available !== false ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed flex-1">{item.description}</p>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50 dark:border-zinc-800/50">
                <div className="flex flex-col">
                  {item.discountPrice ? (
                    <>
                      <span className="font-black text-orange-600 dark:text-orange-500 text-xl tracking-tighter">Rp {item.discountPrice.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-400 line-through">Rp {item.price.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="font-black text-orange-600 dark:text-orange-500 text-xl tracking-tighter">Rp {item.price.toLocaleString()}</span>
                  )}
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg text-white shadow-sm ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 relative animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-800/30">
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{editingItem?.id ? "Edit Produk Pasta" : "Tambah Pasta Baru"}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Lengkapi detail menu Anda</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-10 h-10 flex items-center justify-center bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-full text-gray-400 hover:text-rose-500 transition-all shadow-sm ring-1 ring-gray-100 dark:ring-zinc-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-7 overflow-y-auto max-h-[calc(100vh-180px)]">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Nama Menu</label>
                  <input
                    type="text"
                    required
                    placeholder="Pasta Carbonara..."
                    value={editingItem?.name || ""}
                    onChange={(e) => setEditingItem({ ...editingItem!, name: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white placeholder:text-gray-300 dark:placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Harga (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rp</span>
                    <input
                      type="number"
                      required
                      placeholder="0"
                      value={editingItem?.price || 0}
                      onChange={(e) => setEditingItem({ ...editingItem!, price: parseInt(e.target.value) || 0 })}
                      className="w-full pl-12 pr-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Harga Diskon (Rp) - Opsional</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rp</span>
                    <input
                      type="number"
                      placeholder="Kosongkan jika tidak ada diskon"
                      value={editingItem?.discountPrice || ""}
                      onChange={(e) => setEditingItem({ ...editingItem!, discountPrice: parseInt(e.target.value) || undefined })}
                      className="w-full pl-12 pr-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-bold text-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan kelezatan pasta ini..."
                  value={editingItem?.description || ""}
                  onChange={(e) => setEditingItem({ ...editingItem!, description: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl transition-all outline-none font-medium text-gray-700 dark:text-zinc-300 placeholder:text-gray-300 dark:placeholder:text-zinc-600 leading-relaxed"
                />
              </div>

              {/* Tampilan Section */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Tampilan (Emoji / Foto)</label>
                <div className="flex gap-3 items-center">
                  {/* Square preview */}
                  <div className="w-[4.5rem] h-[4.5rem] flex-shrink-0 bg-orange-50 dark:bg-orange-500/10 rounded-2xl border-2 border-dashed border-gray-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
                    {uploading ? (
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    ) : editingItem?.emoji ? (
                      editingItem.emoji.startsWith('/') || editingItem.emoji.startsWith('http') ? (
                        <img src={editingItem.emoji} className="w-full h-full object-cover" alt="Preview"/>
                      ) : (
                        <span className="text-4xl">{editingItem.emoji}</span>
                      )
                    ) : (
                      <span className="text-3xl opacity-20">🍝</span>
                    )}
                  </div>
                  {/* Text input + upload button */}
                  <div className="flex-1 flex flex-col gap-2">
                    <input
                      type="text"
                      value={editingItem?.emoji || ""}
                      onChange={(e) => setEditingItem({ ...editingItem!, emoji: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-xl transition-all outline-none font-bold text-gray-800 dark:text-white text-sm placeholder:text-gray-300 dark:placeholder:text-zinc-600"
                      placeholder="Ketik emoji, contoh: 🍝"
                    />
                    <label className="flex items-center justify-center gap-2 py-2.5 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest rounded-xl cursor-pointer transition-all border-2 border-blue-100 dark:border-blue-500/20 active:scale-[0.98]">
                      <span>📷</span> Upload Foto
                      <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Badge Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Label / Badge</label>
                  <select
                    value={editingItem?.badge || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      const colorMap: Record<string, string> = {
                        'HOT': 'bg-orange-500', 'NEW': 'bg-blue-500',
                        'BEST': 'bg-rose-500', 'SZA': 'bg-green-600', 'PROMO': 'bg-teal-500'
                      };
                      setEditingItem({ ...editingItem!, badge: val, badgeColor: colorMap[val] || 'bg-orange-500' });
                    }}
                    className="w-full px-4 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-orange-500/50 focus:bg-white dark:focus:bg-zinc-800 rounded-xl transition-all outline-none font-bold text-gray-800 dark:text-white appearance-none cursor-pointer text-sm"
                  >
                    <option value="">Tanpa Badge</option>
                    <option value="HOT">🔥 HOT</option>
                    <option value="NEW">✨ NEW</option>
                    <option value="BEST">⭐ BEST SELLER</option>
                    <option value="SZA">🌟 SZA SPEC</option>
                    <option value="PROMO">🏷️ PROMO</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Warna & Preview Badge</label>
                  {/* Color dots row */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl">
                    {[
                      { cls: 'bg-orange-500' }, { cls: 'bg-rose-500' },
                      { cls: 'bg-green-600' }, { cls: 'bg-blue-500' }, { cls: 'bg-teal-500' },
                    ].map(c => (
                      <button
                        key={c.cls}
                        type="button"
                        onClick={() => setEditingItem({...editingItem!, badgeColor: c.cls})}
                        className={`w-7 h-7 rounded-full flex-shrink-0 transition-all ${c.cls} ${editingItem?.badgeColor === c.cls ? 'ring-2 ring-offset-2 dark:ring-offset-zinc-800 ring-gray-400 scale-110 shadow-md' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
                      />
                    ))}
                  </div>
                  {/* Preview row */}
                  <div className="flex items-center justify-center py-2.5 bg-gray-50 dark:bg-zinc-800/50 rounded-xl min-h-[2.5rem]">
                    {editingItem?.badge ? (
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg text-white ${editingItem.badgeColor || 'bg-orange-500'}`}>
                        {editingItem.badge}
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-300 dark:text-zinc-600 font-bold uppercase tracking-wider">Tidak Ada Badge</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-3">
                <button 
                  type="submit" 
                  className="flex-[2] bg-orange-500 hover:bg-orange-600 text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98]"
                >
                  {editingItem?.id ? "Simpan Perubahan" : "Buat Menu Sekarang"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-600 dark:text-zinc-300 font-bold text-sm tracking-tight py-4 rounded-2xl transition-all active:scale-[0.98]"
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
