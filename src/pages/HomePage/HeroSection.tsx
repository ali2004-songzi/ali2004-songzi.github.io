import { motion } from 'framer-motion'
import { MUSEUM_INTRO, MOCK_TIMELINE } from '@/data/museum'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20">
      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-teal-500/5 blur-3xl" />

      {/* 装饰线条 */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          {/* 左侧：时间线 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-28">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-500/30" />
                <span className="text-xs font-medium tracking-[0.3em] text-emerald-400">HISTORY</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-500/30" />
              </div>
              <h3 className="mb-8 text-lg font-semibold text-white">历史沿革</h3>

              <div className="relative">
                {/* 垂直线 */}
                <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent" />

                <div className="space-y-6">
                  {MOCK_TIMELINE.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="relative pl-10"
                    >
                      {/* 圆点 */}
                      <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border border-emerald-500/50 bg-[#0a0e1a] flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                      </div>

                      <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-emerald-500/20 hover:bg-white/[0.04]">
                        <p className="text-xs font-medium text-emerald-400">{item.year}</p>
                        <h4 className="mt-1.5 text-sm font-semibold text-white">{item.title}</h4>
                        <p className="mt-2 text-xs leading-relaxed text-gray-500">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 右侧：标题和介绍 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3 flex flex-col justify-center"
          >
            {/* 小标题 */}
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-emerald-500/50" />
              <p className="text-xs font-medium tracking-[0.4em] text-emerald-400">
                {MUSEUM_INTRO.subtitle}
              </p>
            </div>

            {/* 大标题 */}
            <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              <span className="block">内蒙古师范大学</span>
              <span className="mt-2 block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                自然博物馆数字馆
              </span>
            </h1>

            {/* 装饰线 */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-0.5 w-20 bg-gradient-to-r from-emerald-500 to-transparent" />
              <div className="h-2 w-2 rotate-45 border border-emerald-500/50" />
              <div className="h-0.5 w-20 bg-gradient-to-l from-emerald-500 to-transparent" />
            </div>

            {/* 描述 */}
            <p className="mt-8 max-w-xl text-base leading-relaxed text-gray-400">
              {MUSEUM_INTRO.description}
            </p>

            {/* 标签 */}
            <div className="mt-10 flex flex-wrap gap-4">
              <div className="group flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/15">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm text-emerald-300">数字孪生技术</span>
              </div>
              <div className="group flex items-center gap-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 transition-all hover:border-amber-500/50 hover:bg-amber-500/15">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-sm text-amber-300">内蒙古特色馆藏</span>
              </div>
              <div className="group flex items-center gap-3 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2.5 transition-all hover:border-blue-500/50 hover:bg-blue-500/15">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span className="text-sm text-blue-300">七阶元分类系统</span>
              </div>
            </div>

            {/* 数据概览 */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-emerald-400">100+</p>
                <p className="mt-1 text-xs text-gray-500">物种档案</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-400">7</p>
                <p className="mt-1 text-xs text-gray-500">分类阶元</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-amber-400">3</p>
                <p className="mt-1 text-xs text-gray-500">馆藏领域</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
