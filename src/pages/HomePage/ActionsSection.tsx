import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass, Glasses, Box, ArrowRight } from 'lucide-react'

const actions = [
  {
    icon: Compass,
    title: '开启分类探索之旅',
    description: '按界门纲目科属种逐级探索',
    variant: 'primary' as const,
    href: '/explore',
  },
  {
    icon: Glasses,
    title: 'VR实景展馆体验',
    description: '720°全景漫游博物馆',
    variant: 'secondary' as const,
    href: '/vr',
  },
  {
    icon: Box,
    title: '观察3D全息标本',
    description: '交互式数字孪生标本',
    variant: 'secondary' as const,
    href: '/species/sp-001',
  },
]

export default function ActionsSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {actions.map((action, index) => (
            <Link
              key={action.title}
              to={action.href}
              className={`group relative flex items-center gap-4 overflow-hidden rounded-xl px-8 py-4 transition-all duration-300 hover:scale-105 ${
                action.variant === 'primary'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'border border-white/10 bg-white/5 text-white hover:border-emerald-500/30 hover:bg-white/10'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* 背景光效 */}
              {action.variant === 'primary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              )}

              <div className="relative flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  action.variant === 'primary' ? 'bg-white/20' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{action.title}</p>
                  <p className={`text-xs ${action.variant === 'primary' ? 'text-white/80' : 'text-gray-400'}`}>
                    {action.description}
                  </p>
                </div>
                <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                  action.variant === 'primary' ? 'text-white/80' : 'text-gray-500'
                }`} />
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
