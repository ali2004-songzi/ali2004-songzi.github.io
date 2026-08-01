import { useState, useRef, useCallback, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Heart,
  Share2,
  ChevronRight,
  RotateCcw,
  Camera,
  ZoomIn,
  ZoomOut,
  X,
  Copy,
  Check,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MOCK_SPECIES } from '@/data/taxonomy'

export default function SpeciesDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'solid' | 'particle'>('particle')
  const [autoRotate, setAutoRotate] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const lastPos = useRef({ x: 0, y: 0 })

  const species = MOCK_SPECIES.find((s) => s.id === id) || MOCK_SPECIES[0]

  // 生成稳定的粒子位置
  const particles = useRef(
    Array.from({ length: 100 }, () => ({
      x: 15 + Math.random() * 170,
      y: 10 + Math.random() * 130,
      size: 0.5 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.7,
    }))
  ).current

  const taxonomy = [
    { rank: '界', name: '动物界', scientific: 'Animalia' },
    { rank: '门', name: '节肢动物门', scientific: 'Arthropoda' },
    { rank: '纲', name: '昆虫纲', scientific: 'Insecta' },
    { rank: '目', name: '鳞翅目', scientific: 'Lepidoptera' },
    { rank: '科', name: '凤蝶科', scientific: 'Papilionidae' },
    { rank: '属', name: '凤蝶属', scientific: 'Papilio' },
    { rank: '种', name: '金凤蝶', scientific: 'Papilio machaon' },
  ]

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
    setScale((prev) => Math.max(0.5, Math.min(2.5, prev + delta)))
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
        y: prev.y + 0.3,
      }))
    }, 30)
    return () => clearInterval(interval)
  }, [autoRotate, isDragging])

  // 复制链接
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* 顶部操作栏 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            返回上一级
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              标记收藏
            </button>
            <button
              onClick={() => setShowShare(true)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
            >
              <Share2 className="h-4 w-4" />
              分享专题网页
            </button>
          </div>
        </motion.div>

        {/* 分享弹窗 */}
        {showShare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowShare(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0e1a] p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">分享专题网页</h3>
                <button
                  onClick={() => setShowShare(false)}
                  className="rounded-full p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 二维码 */}
              <div className="mb-6 flex justify-center">
                <div className="rounded-xl bg-white p-4">
                  <div className="h-40 w-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-4xl">📱</span>
                  </div>
                </div>
              </div>

              {/* 链接 */}
              <div className="mb-4">
                <p className="mb-2 text-xs text-gray-400">页面链接</p>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="flex-1 bg-transparent text-sm text-white outline-none"
                  />
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400 transition-colors hover:bg-emerald-500/30"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? '已复制' : '复制'}
                  </button>
                </div>
              </div>

              {/* 社交分享 */}
              <div>
                <p className="mb-2 text-xs text-gray-400">分享到</p>
                <div className="flex gap-3">
                  {['微信', '微博', 'QQ', '复制链接'].map((item) => (
                    <button
                      key={item}
                      onClick={item === '复制链接' ? copyLink : undefined}
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 py-2 text-xs text-white transition-colors hover:bg-white/10"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 面包屑 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex items-center gap-2 text-sm text-gray-400"
        >
          <Link to="/explore" className="hover:text-white">生物谱系</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/explore" className="hover:text-white">动物界</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">凤蝶科</span>
        </motion.div>

        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex items-start gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white">{species.name}</h1>
              <p className="mt-2 text-lg italic text-gray-400">{species.scientificName}</p>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-400">
              {species.rank}
            </span>
          </div>
        </motion.div>

        {/* 3D标本展示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Tabs defaultValue="hologram" className="w-full">
            <TabsList className="mb-4 bg-white/5">
              <TabsTrigger value="hologram" className="data-[state=active]:bg-white/10">
                全息3D标本观察 (WebGL)
              </TabsTrigger>
              <TabsTrigger value="photos" className="data-[state=active]:bg-white/10">
                高清实拍图片库
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hologram">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* 主视图 */}
                <div className="lg:col-span-2">
                  <div
                    className="relative aspect-video cursor-grab overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-900/20 via-[#0a0e1a] to-teal-900/20 active:cursor-grabbing"
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
                        onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
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
                        className="relative h-64 w-80 transition-transform"
                        style={{
                          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`,
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <svg viewBox="0 0 200 150" className="h-full w-full">
                          {mode === 'particle' ? (
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
                </div>

                {/* 侧边信息 */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="text-sm font-semibold text-white">标本信息</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">标本编号</span>
                        <span className="text-white">{species.id.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">采集时间</span>
                        <span className="text-white">2023.08.15</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">采集地点</span>
                        <span className="text-white">内蒙古呼和浩特</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">扫描精度</span>
                        <span className="text-white">0.02mm</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="text-sm font-semibold text-white">交互说明</h3>
                    <div className="mt-4 space-y-2 text-xs text-gray-400">
                      <p>🖱️ 拖拽：360°旋转视角</p>
                      <p>🔍 滚轮：放大/缩小</p>
                      <p>🔄 自转：自动旋转展示</p>
                      <p>✨ 模式：实体/粒子切换</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="photos">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl border border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center transition-all hover:border-emerald-500/30"
                  >
                    <Camera className="h-8 w-8 text-gray-600" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* 分类位置 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="mb-6 text-xl font-bold text-white">林奈七界元系统位置</h2>
          <div className="flex flex-wrap gap-2">
            {taxonomy.map((item, index) => (
              <div key={item.rank} className="flex items-center">
                <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 transition-all hover:border-emerald-500/30">
                  <p className="text-xs text-gray-500">{item.rank}</p>
                  <p className="text-sm font-medium text-white">{item.name}</p>
                  <p className="text-xs italic text-gray-400">{item.scientific}</p>
                </div>
                {index < taxonomy.length - 1 && (
                  <ChevronRight className="mx-2 h-5 w-5 text-gray-600" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* 信息板块 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* 形态特征 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20">
            <h3 className="text-lg font-semibold text-white">一、形态特征</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              成虫翅展90-120mm。体黄色，具黑色斑纹。翅金黄色，翅脉黑色，外缘具黑色宽带，带内有黄色斑列。后翅臀角具橙色斑，中央具黑色小点。
            </p>
          </div>

          {/* 生态作用 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20">
            <h3 className="text-lg font-semibold text-white">二、生态作用</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              作为传粉昆虫，对维持植物种群基因交流具有重要作用。幼虫取食伞形科植物，是食物链中的重要环节。
            </p>
          </div>

          {/* 生活环境与分布 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20">
            <h3 className="text-lg font-semibold text-white">三、生活环境与分布</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              栖息于海拔1000-3000米的山区、草原、林缘地带。国内分布于东北、华北、西北、西南等地区。国外分布于欧洲、亚洲、北非等地。
            </p>
          </div>

          {/* 生活习性 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20">
            <h3 className="text-lg font-semibold text-white">四、生活习性</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              一年发生2-3代，以蛹越冬。成虫飞行迅速，喜访花。幼虫以伞形科植物（如茴香、胡萝卜、芹菜等）为食。
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
