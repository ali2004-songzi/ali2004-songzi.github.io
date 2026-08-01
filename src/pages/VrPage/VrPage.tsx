import { useState } from 'react'
import { motion } from 'framer-motion'
import { Compass, Volume2, RotateCcw, Play, ExternalLink, Maximize2 } from 'lucide-react'

export default function VrPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioOn, setAudioOn] = useState(false)

  const handleEnterVR = () => {
    window.open('https://realsee.cn/kPJkOjX2', '_blank')
  }

  return (
    <div className="min-h-screen">
      {/* VR主区域 */}
      <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        {/* 全景背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-[#0a0e1a] to-teal-900/40">
          {/* 模拟全景图的渐变效果 */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        </div>

        {/* 顶部标题栏 */}
        <div className="absolute left-0 right-0 top-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
          <div className="container mx-auto px-4 py-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-bold text-white md:text-4xl">VR实景展馆</h1>
              <p className="mt-2 text-gray-300">720°全景漫游内蒙古师范大学自然博物馆</p>
            </motion.div>
          </div>
        </div>

        {/* 中间进入按钮 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <button
              onClick={handleEnterVR}
              className="group relative"
            >
              <div className="absolute -inset-4 rounded-full bg-emerald-500/20 blur-xl transition-all group-hover:bg-emerald-500/30" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 transition-all group-hover:scale-110">
                <Play className="h-10 w-10 translate-x-0.5 text-white" />
              </div>
            </button>
            <p className="mt-6 text-lg font-medium text-white">点击体验VR全景</p>
            <p className="mt-2 text-sm text-gray-400">支持拖拽旋转 · 滚轮缩放 · 自动漫游</p>
          </motion.div>
        </div>

        {/* 右上角指南针 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute right-6 top-24 z-10"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md">
            <div className="relative h-14 w-14">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 text-xs font-bold text-red-400">N</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-400">S</div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-gray-400">W</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-gray-400">E</div>
              <div className="absolute left-1/2 top-1/2 h-10 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t from-transparent to-red-500" />
            </div>
          </div>
        </motion.div>

        {/* 底部控制栏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-md">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                isPlaying
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Play className="h-4 w-4" />
            </button>
            <div className="h-6 w-px bg-white/10" />
            <button
              onClick={() => setAudioOn(!audioOn)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                audioOn
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Volume2 className="h-4 w-4" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* 左下角信息 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-6 left-6 z-10"
        >
          <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md">
            <p className="text-sm font-medium text-white">自然博物馆一层</p>
            <p className="mt-1 text-xs text-gray-400">当前视角：主展厅入口</p>
          </div>
        </motion.div>
      </div>

      {/* 功能介绍 */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl font-bold text-white">沉浸式观展体验</h2>
            <p className="mt-3 text-gray-400">足不出户，身临其境地探索自然博物馆的每一个角落</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: '🔄',
                title: '720°全景漫游',
                description: '支持水平360°+垂直360°全方位视角自由切换，沉浸式体验博物馆每一个角落。',
              },
              {
                icon: '🎧',
                title: '智能语音导览',
                description: '专业讲解员录制语音导览，边走边听，深入了解每件展品背后的故事。',
              },
              {
                icon: '📍',
                title: '热点互动标注',
                description: '关键展品设置热点标注，点击即可查看详细介绍和高清细节图片。',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-emerald-500/30 hover:bg-white/10"
              >
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* 进入按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button
              onClick={handleEnterVR}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
            >
              立即进入VR全景展馆
              <ExternalLink className="h-5 w-5" />
            </button>
            <p className="mt-4 text-sm text-gray-500">
              将跳转到如视VR平台，支持手机、VR设备多端访问
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
