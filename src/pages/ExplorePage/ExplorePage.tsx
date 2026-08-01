import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronDown, Heart, Layers } from 'lucide-react'
import { MOCK_TAXONOMY_TREE, MOCK_SPECIES, ITaxonNode, getSpeciesUnderTaxon, getTaxonBreadcrumb } from '@/data/taxonomy'

export default function ExplorePage() {
  // 默认选中第一个门
  const firstDoor = MOCK_TAXONOMY_TREE[0]
  const [selectedTaxon, setSelectedTaxon] = useState<string>(firstDoor?.id || '')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(MOCK_TAXONOMY_TREE.map((n) => n.id))
  )

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // 渲染分类树节点
  const renderTreeNode = (node: ITaxonNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedNodes.has(node.id)
    const isSelected = selectedTaxon === node.id

    return (
      <div key={node.id}>
        <div
          className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
            isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-white/5'
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          onClick={() => {
            setSelectedTaxon(node.id)
            if (hasChildren) {
              toggleNode(node.id)
            }
          }}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4 flex-shrink-0 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
            )
          ) : (
            <div className="h-4 w-4 flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
              {node.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{node.scientificName}</p>
          </div>
          <span className="text-xs text-gray-500 flex-shrink-0">{node.speciesCount}</span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  // 获取当前选中的分类节点
  const currentTaxon = useMemo(() => {
    function findNode(nodes: ITaxonNode[], id: string): ITaxonNode | null {
      for (const node of nodes) {
        if (node.id === id) return node
        if (node.children) {
          const found = findNode(node.children, id)
          if (found) return found
        }
      }
      return null
    }
    return findNode(MOCK_TAXONOMY_TREE, selectedTaxon)
  }, [selectedTaxon])

  // 获取面包屑
  const breadcrumb = useMemo(() => {
    return getTaxonBreadcrumb(selectedTaxon)
  }, [selectedTaxon])

  // 获取当前分类下的物种
  const speciesUnderTaxon = useMemo(() => {
    if (currentTaxon?.rank === '种') {
      return MOCK_SPECIES.filter((s) => s.id === selectedTaxon)
    }
    return getSpeciesUnderTaxon(selectedTaxon)
  }, [selectedTaxon, currentTaxon])

  // 获取子分类
  const childTaxa = useMemo(() => {
    return currentTaxon?.children || []
  }, [currentTaxon])

  if (!currentTaxon) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <p className="text-gray-400">暂无分类数据</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* 左侧分类树 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80 lg:flex-shrink-0"
          >
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-4">
              {/* 标题 */}
              <div className="mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">分类系统</h2>
              </div>

              {/* 分类树 */}
              <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2">
                {MOCK_TAXONOMY_TREE.map((node) => renderTreeNode(node))}
              </div>

              {/* 底部提示 */}
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-xs text-gray-500">
                  点击分类节点查看详情，展开下级分类
                </p>
              </div>
            </div>
          </motion.div>

          {/* 右侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            {/* 面包屑 */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-400 flex-wrap">
              <span>生物谱系</span>
              {breadcrumb.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4" />
                  <span className={index === breadcrumb.length - 1 ? 'text-white' : ''}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* 分类标题 */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-400">
                  {currentTaxon.rank}
                </span>
                <h1 className="text-3xl font-bold text-white">
                  {currentTaxon.name}
                </h1>
              </div>
              <p className="mt-2 text-lg italic text-gray-400">
                {currentTaxon.scientificName}
              </p>
              {currentTaxon.description && (
                <p className="mt-4 text-gray-300">
                  {currentTaxon.description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span>共 {currentTaxon.speciesCount} 个物种</span>
                {childTaxa.length > 0 && (
                  <span>下分 {childTaxa.length} 个{childTaxa[0]?.rank}</span>
                )}
              </div>
            </div>

            {/* 子分类 */}
            {childTaxa.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-lg font-bold text-white">
                  下级{childTaxa[0]?.rank}分类
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {childTaxa.map((child, index) => (
                    <motion.div
                      key={child.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-emerald-500/30 hover:bg-white/10"
                      onClick={() => {
                        setSelectedTaxon(child.id)
                        setExpandedNodes((prev) => new Set([...prev, selectedTaxon]))
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs text-emerald-400">{child.rank}</span>
                          <h3 className="mt-1 text-lg font-bold text-white">{child.name}</h3>
                          <p className="mt-1 text-xs italic text-gray-400">{child.scientificName}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-400" />
                      </div>
                      <div className="mt-3 text-sm text-gray-500">
                        {child.speciesCount} 个物种
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 物种列表 */}
            {speciesUnderTaxon.length > 0 && currentTaxon.rank !== '种' && (
              <div>
                <h2 className="mb-4 text-lg font-bold text-white">
                  包含物种
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {speciesUnderTaxon.map((species, index) => (
                    <motion.div
                      key={species.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10"
                    >
                      <Link to={`/species/${species.id}`}>
                        {/* 图片区 */}
                        <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900">
                          {species.imageUrl ? (
                            <img
                              src={species.imageUrl}
                              alt={species.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-4xl opacity-20">
                                {species.kingdom === 'animalia' ? '🦋' : '🌿'}
                              </span>
                            </div>
                          )}
                          {/* 收藏按钮 */}
                          <button className="absolute right-3 top-3 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-colors hover:bg-black/50">
                            <Heart className="h-4 w-4 text-white" />
                          </button>
                          {/* 保护等级 */}
                          <div className="absolute bottom-3 left-3">
                            <span className="rounded-full bg-emerald-500/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                              {species.rank}
                            </span>
                          </div>
                        </div>

                        {/* 信息区 */}
                        <div className="p-4">
                          <p className="text-xs text-gray-500">{species.family}</p>
                          <h3 className="mt-1 text-lg font-bold text-white">{species.name}</h3>
                          <p className="mt-1 text-xs italic text-gray-400">{species.scientificName}</p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs text-emerald-400">3D 标本已就绪</span>
                            <span className="text-xs text-gray-400 transition-colors group-hover:text-emerald-400">
                              查看详情 →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 如果是种级别，跳转到详情页 */}
            {currentTaxon.rank === '种' && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-gray-400">这是一个物种，请查看详情页</p>
                <Link
                  to={`/species/${currentTaxon.id}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
                >
                  查看物种详情
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
