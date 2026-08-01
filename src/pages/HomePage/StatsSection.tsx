import { motion } from 'framer-motion'
import { MOCK_STATS } from '@/data/stats'
import { cn } from '@/lib/utils'

const colorMap = {
  green: {
    bg: 'from-emerald-500/10 to-emerald-500/5',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
    icon: 'bg-emerald-500/20 text-emerald-400',
  },
  blue: {
    bg: 'from-blue-500/10 to-blue-500/5',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/10',
    icon: 'bg-blue-500/20 text-blue-400',
  },
  amber: {
    bg: 'from-amber-500/10 to-amber-500/5',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/10',
    icon: 'bg-amber-500/20 text-amber-400',
  },
  pink: {
    bg: 'from-pink-500/10 to-pink-500/5',
    border: 'border-pink-500/20',
    text: 'text-pink-400',
    glow: 'shadow-pink-500/10',
    icon: 'bg-pink-500/20 text-pink-400',
  },
}

export default function StatsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-500/30" />
            <span className="text-xs font-medium tracking-[0.3em] text-emerald-400">DATA</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-500/30" />
          </div>
          <h2 className="text-3xl font-bold text-white">数据概览</h2>
        </motion.div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {MOCK_STATS.map((stat, index) => {
            const colors = colorMap[stat.color as keyof typeof colorMap]
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl border bg-gradient-to-b p-6 transition-all hover:-translate-y-1',
                  colors.bg,
                  colors.border,
                  `hover:shadow-lg hover:${colors.glow}`
                )}
              >
                {/* 装饰角 */}
                <div className="absolute right-0 top-0 h-16 w-16">
                  <div className={cn('absolute right-2 top-2 h-8 w-8 border-t-2 border-r-2 opacity-30', colors.border)} />
                </div>

                <div className="relative">
                  <div className="flex items-baseline gap-1">
                    <span className={cn('text-4xl font-bold', colors.text)}>
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className={cn('text-sm font-medium', colors.text)}>
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm font-medium text-white">{stat.label}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{stat.description}</p>
                </div>

                {/* 底部装饰线 */}
                <div className={cn('absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full', colors.text.replace('text-', 'bg-'))} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
