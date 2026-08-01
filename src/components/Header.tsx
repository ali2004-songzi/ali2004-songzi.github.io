import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, Home, Compass, Glasses } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { cn } from '@/lib/utils'

const navItems = [
  { label: '首页', href: '/', icon: Home },
  { label: '分类探索', href: '/explore', icon: Compass },
  { label: 'VR实景展馆', href: '/vr', icon: Glasses },
]

export default function Header() {
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-500/20 bg-[#0a0e1a]/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo - 直接用完整图片 */}
        <Link to="/" className="flex items-center">
          <img
            src="https://aka.doubaocdn.com/s/Da1RNd3K0u"
            alt="内蒙古师范大学自然博物馆数字馆"
            className="h-14 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-3 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Search & Mobile Menu */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center md:flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="搜索物种学名或中文名..."
                className="h-9 w-64 rounded-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:border-emerald-500/30 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all"
              />
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 md:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-white/10 bg-[#0a0e1a] p-0">
              <div className="flex flex-col p-6">
                <div className="mb-8 flex items-center gap-3">
                  <img
                    src="https://aka.doubaocdn.com/s/Da1RNd3K0u"
                    alt="内蒙古师范大学自然博物馆数字馆"
                    className="h-10 object-contain"
                  />
                </div>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
