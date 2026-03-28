"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function AdminOverview() {
  const [stats, setStats] = useState({
    menuCount: 0,
    testimonialCount: 0,
    businessName: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [menuRes, testRes, bizRes] = await Promise.all([
          fetch("/api/menu-items"),
          fetch("/api/testimonials"),
          fetch("/api/business-info"),
        ])

        const menu = await menuRes.json()
        const tests = await testRes.json()
        const biz = await bizRes.json()

        setStats({
          menuCount: menu.length,
          testimonialCount: tests.length,
          businessName: biz.name,
        })
      } catch (error) {
        console.error("Error fetching stats", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="animate-pulse space-y-4">
    <div className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
    <div className="grid grid-cols-2 gap-4">
      <div className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
      <div className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-2xl"></div>
    </div>
  </div>

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">Selamat Datang,<br className="sm:hidden" /> Admin! 👋</h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-2 font-medium">Panel kendali {stats.businessName} siap dikelola.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="group bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">🍝</div>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full border border-green-500/10">Active Menu</span>
          </div>
          <h3 className="text-gray-400 dark:text-zinc-500 text-[11px] font-black uppercase tracking-widest">Total Menu Items</h3>
          <p className="text-5xl font-black mt-2 text-gray-900 dark:text-white tracking-tighter">{stats.menuCount}</p>
          <Link href="/admin/menu" className="mt-8 flex items-center justify-center gap-2 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]">
             Kelola Sekarang →
          </Link>
        </div>

        <div className="group bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">⭐️</div>
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full border border-blue-500/10">Social Proof</span>
          </div>
          <h3 className="text-gray-400 dark:text-zinc-500 text-[11px] font-black uppercase tracking-widest">Customer Testimonials</h3>
          <p className="text-5xl font-black mt-2 text-gray-900 dark:text-white tracking-tighter">{stats.testimonialCount}</p>
          <Link href="/admin/testimonials" className="mt-8 flex items-center justify-center gap-2 py-4 bg-zinc-900 dark:bg-zinc-800 hover:bg-black dark:hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-zinc-500/20 active:scale-[0.98]">
             Update Testimoni →
          </Link>
        </div>

        <div className="group bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-zinc-500/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">⚙️</div>
          </div>
          <h3 className="text-gray-400 dark:text-zinc-500 text-[11px] font-black uppercase tracking-widest">Admin Settings</h3>
          <p className="text-lg font-bold mt-2 text-gray-900 dark:text-white leading-snug">Info Bisnis, Kontak,<br />& Jam Operasional.</p>
          <Link href="/admin/settings" className="mt-8 flex items-center justify-center gap-2 py-4 bg-gray-100 dark:bg-zinc-800/50 hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 font-bold text-xs uppercase tracking-widest rounded-2xl transition-all active:scale-[0.98]">
             Buka Pengaturan →
          </Link>
        </div>
      </div>
    </div>
  )
}
