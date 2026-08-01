import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { MOCK_COLLECTIONS } from '@/data/collections'
import { cn } from '@/lib/utils'

const tagColorMap = {
  green: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
    gradient: 'from-emerald-500/20 to-transparent',
  },
  blue: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/20',
    gradient: 'from-blue-500/20 to-transparent',
  },
  amber: {
    bg: 'bg-amber-500/20',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    glow: 'shadow-amber-500/20',
    gradient: 'from-amber-500/20 to-transparent',
  },
}

export default function CollectionSection() {
  return (
    <section className="py-20">
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
            <span className="text-xs font-medium tracking-[0.3em] text-emerald-400">COLLECTIONS</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-500/30" />
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl">三域馆藏</h2>
          <p className="mt-4 text-gray-500">探索动物界、植物界与内蒙古特色馆藏</p>
        </motion.div>

        {/* 馆藏卡片 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {MOCK_COLLECTIONS.map((collection, index) => {
            const colors = tagColorMap[collection.tagColor as keyof typeof tagColorMap]
            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-white/20"
              >
                {/* 背景图 */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={collection.imageUrl}
                    alt={collection.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* 渐变遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/70 to-transparent" />
                  <div className={cn('absolute inset-0 bg-gradient-to-br opacity-30 transition-opacity duration-500 group-hover:opacity-50', colors.gradient)} />

                  {/* 特色角标 */}
                  {collection.isFeatured && (
                    <div className="absolute right-4 top-4">
                      <div className="relative">
                        <div className="absolute -inset-1 animate-pulse rounded-full bg-amber-500/30" />
                        <div className="relative rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white">
                          特色馆藏
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 标签 */}
                  <div className="absolute left-4 top-4">
                    <span className={cn('rounded-lg border px-3 py-1.5 text-xs font-medium tracking-wider', colors.bg, colors.text, colors.border)}>
                      {collection.tag}
                    </span>
                  </div>
                </div>

                {/* 内容 */}
                <div className="relative p-6">
                  {/* 装饰线 */}
                  <div className={cn('absolute left-6 top-0 h-px w-12 -translate-y-1/2', colors.bg)} />

                  <h3 className="text-2xl font-bold text-white">{collection.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-400">
                    {collection.description}
                  </p>

                  <Link
                    to="/explore"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors group/link"
                  >
                    <span className={colors.text}>{collection.buttonText}</span>
                    <ArrowRight className={cn('h-4 w-4 transition-transform group-hover/link:translate-x-1', colors.text)} />
                  </Link>
                </div>

                {/* 底部发光效果 */}
                <div className={cn('absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-2/3', colors.bg.replace('/20', '/50'))} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
