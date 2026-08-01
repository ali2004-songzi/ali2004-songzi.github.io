import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'
import { MOCK_HOLOGRAM_SPECIMEN } from '@/data/hologram'

export default function HologramSection() {
  const [mode, setMode] = useState<'solid' | 'particle'>('particle')
  const [autoRotate, setAutoRotate] = useState(true)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // 生成稳定的粒子位置
  const particles = useRef(
    Array.from({ length: 80 }, () => ({
      x: 20 + Math.random() * 160,
      y: 15 + Math.random() * 120,
      size: 0.5 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.7,
    }))
  ).current

  // 拖拽开始
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setAutoRotate(false)
    lastPos.current = { x: e.clientX, y: e.clientY }
  }, [])

  // 拖拽移动
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - lastPos.current.x
      const deltaY = e.clientY - lastPos.current.y
      setRotation((prev) => ({
        x: prev.x - deltaY * 0.5,
        y: prev.y + deltaX * 0.5,
      }))
      lastPos.current = { x: e.clientX, y: e.clientY }
    },
    [isDragging]
  )

  // 拖拽结束
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // 滚轮缩放
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setScale((prev) => Math.max(0.5, Math.min(2, prev + delta)))
  }, [])

  // 重置视角
  const resetView = () => {
    setRotation({ x: 0, y: 0 })
    setScale(1)
  }

  // 自动旋转
  useEffect(() => {
    if (!autoRotate || isDragging) return
    const interval = setInterval(() => {
      setRotation((prev) => ({
        ...prev,
        y: prev.y + 0.5,
      }))
    }, 30)
    return () => clearInterval(interval)
  }, [autoRotate, isDragging])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* 左侧：介绍 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="mb-4 inline-flex w-fit rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-medium text-amber-400">
              {MOCK_HOLOGRAM_SPECIMEN.tag}
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              数字孪生：昆虫纲凤蝶属
              <br />
              <span className="text-emerald-400">金凤蝶</span>
            </h2>
            <p className="mt-4 text-gray-400">
              {MOCK_HOLOGRAM_SPECIMEN.description}
            </p>

            {/* 特性列表 */}
            <div className="mt-8 space-y-4">
              {MOCK_HOLOGRAM_SPECIMEN.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                    <Check className="h-3 w-3 text-emerald-400" />
                  </div>
                  <p className="text-sm text-gray-300">{feature}</p>
                </div>
              ))}
            </div>

            <Link
              to="/species/sp-001"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
            >
              查看该物种详细学术档案
            </Link>
          </motion.div>

          {/* 右侧：3D预览 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div
              ref={containerRef}
              className="relative aspect-square cursor-grab overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-900/20 via-[#0a0e1a] to-teal-900/20 active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              {/* 状态信息 */}
              <div className="absolute left-4 top-4 space-y-1 z-10">
                <p className="text-xs text-emerald-400">SYS: ONLINE</p>
                <p className="text-xs text-gray-500">POLY_COUNT: 128,456</p>
                <p className="text-xs text-gray-500">FIELD_SCAN: 0.02mm</p>
                <p className="text-xs text-gray-500">
                  ROT: X:{rotation.x.toFixed(0)}° Y:{rotation.y.toFixed(0)}°
                </p>
                <p className="text-xs text-gray-500">ZOOM: {(scale * 100).toFixed(0)}%</p>
              </div>

              {/* 缩放控制 */}
              <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => setScale((s) => Math.min(2, s + 0.2))}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={resetView}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              {/* 3D标本 */}
              <div className="absolute inset-0 flex items-center justify-center perspective-1000">
                <div
                  className="relative h-48 w-64 transition-transform"
                  style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <svg viewBox="0 0 200 150" className="h-full w-full">
                    {mode === 'particle' ? (
                      // 粒子模式
                      <g fill="none" stroke="#34d399" strokeWidth="0.5" opacity="0.7">
                        {/* 轮廓线框 */}
                        <ellipse cx="60" cy="60" rx="40" ry="35" strokeDasharray="3 3" />
                        <ellipse cx="55" cy="85" rx="30" ry="25" strokeDasharray="3 3" />
                        <ellipse cx="140" cy="60" rx="40" ry="35" strokeDasharray="3 3" />
                        <ellipse cx="145" cy="85" rx="30" ry="25" strokeDasharray="3 3" />
                        <ellipse cx="100" cy="75" rx="5" ry="30" strokeDasharray="3 3" />
                        <path d="M97 45 Q90 30 85 25" strokeDasharray="3 3" />
                        <path d="M103 45 Q110 30 115 25" strokeDasharray="3 3" />
                        {/* 粒子点 */}
                        {particles.map((p, i) => (
                          <circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r={p.size}
                            fill="#34d399"
                            opacity={p.opacity}
                          />
                        ))}
                        {/* 中心点 */}
                        <circle cx="100" cy="75" r="3" fill="#34d399">
                          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                        </circle>
                      </g>
                    ) : (
                      // 实体模式
                      <g>
                        {/* 左翅 */}
                        <ellipse cx="60" cy="60" rx="40" ry="35" fill="#fbbf24" opacity="0.9" />
                        <ellipse cx="55" cy="85" rx="30" ry="25" fill="#f59e0b" opacity="0.9" />
                        {/* 右翅 */}
                        <ellipse cx="140" cy="60" rx="40" ry="35" fill="#fbbf24" opacity="0.9" />
                        <ellipse cx="145" cy="85" rx="30" ry="25" fill="#f59e0b" opacity="0.9" />
                        {/* 身体 */}
                        <ellipse cx="100" cy="75" rx="5" ry="30" fill="#1f2937" />
                        {/* 触角 */}
                        <path d="M97 45 Q90 30 85 25" stroke="#1f2937" strokeWidth="2" fill="none" />
                        <path d="M103 45 Q110 30 115 25" stroke="#1f2937" strokeWidth="2" fill="none" />
                        {/* 斑纹 */}
                        <circle cx="60" cy="60" r="15" fill="#1f2937" opacity="0.3" />
                        <circle cx="140" cy="60" r="15" fill="#1f2937" opacity="0.3" />
                        <circle cx="60" cy="60" r="8" fill="#1f2937" opacity="0.2" />
                        <circle cx="140" cy="60" r="8" fill="#1f2937" opacity="0.2" />
                      </g>
                    )}
                  </svg>
                </div>
              </div>

              {/* 底部控制栏 */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-sm z-10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMode(mode === 'solid' ? 'particle' : 'solid')}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white transition-colors hover:bg-white/20"
                  >
                    {mode === 'solid' ? '实体' : '粒子'}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs transition-colors ${
                      autoRotate
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <RotateCcw className="h-3 w-3" />
                    自转：{autoRotate ? '慢' : '关'}
                  </button>
                </div>
              </div>

              {/* 拖拽提示 */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-50">
                拖拽旋转 · 滚轮缩放
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
