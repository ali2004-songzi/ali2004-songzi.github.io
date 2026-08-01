import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-8xl font-bold text-emerald-400">404</h1>
        <p className="mt-4 text-2xl font-semibold text-white">页面未找到</p>
        <p className="mt-2 text-gray-400">你访问的页面不存在或已被移除</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
        >
          <Home className="h-4 w-4" />
          返回首页
        </Link>
      </motion.div>
    </div>
  )
}
