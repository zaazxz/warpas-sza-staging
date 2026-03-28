"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
    } catch (err) {
      console.error("Logout error", err)
    } finally {
      setLoggingOut(false)
    }
  }

  const navItems = [
    { label: "Overview", icon: "📊", href: "/admin" },
    { label: "Business Info", icon: "🏢", href: "/admin/settings" },
    { label: "Menu Items", icon: "🍝", href: "/admin/menu" },
    { label: "Testimonials", icon: "⭐️", href: "/admin/testimonials" },
  ]

  // Don't show layout on login page
  if (pathname === "/admin/login") return <>{children}</>

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950 font-sans">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 
        transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        flex flex-col
      `}>
        <div className="p-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-orange-500/20">🍝</div>
             <div>
                <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">WARPAS SZA</h1>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Admin Dashboard</p>
             </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          <div className="px-4 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main Menu</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl transition-all duration-200 group ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20 active:scale-95"
                    : "text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800/50 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? "" : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"}`}>
                  {item.icon}
                </span>
                <span className="font-bold text-sm tracking-tight">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-gray-100 dark:border-zinc-800">
           <Link href="/" target="_blank" className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-50 dark:bg-zinc-800/50 text-gray-600 dark:text-zinc-300 rounded-2xl text-xs font-bold hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all mb-4">
              Lihat Website <span className="text-base leading-none translate-y-[1px]">↗️</span>
           </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center space-x-2 px-5 py-3.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all active:scale-95 group"
          >
            <span className="text-xl group-hover:rotate-12 transition-transform">🚪</span>
            <span className="font-bold text-sm">{loggingOut ? "Logging out..." : "Keluar Panel"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 px-6 lg:px-10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 lg:hidden hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-all active:scale-90"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <div>
              <h2 className="text-gray-900 dark:text-white font-black text-xl tracking-tight">
                {navItems.find((n) => n.href === pathname)?.label || "Dashboard"}
              </h2>
              {/* Breadcrumb style text */}
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                 <span>Admin</span>
                 <span className="text-gray-300">/</span>
                 <span className="text-orange-500">{navItems.find((n) => n.href === pathname)?.label || "Home"}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-gray-900 dark:text-white">Panel Administrator</p>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">Verified User</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 border-2 border-white dark:border-zinc-800 shadow-sm" />
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-950 px-6 lg:px-10 py-10">
          {children}
        </div>
      </div>
    </div>
  )
}
