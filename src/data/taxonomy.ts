import notionSpecies from './notion-species.json'
import notionTaxonomy from './notion-taxonomy.json'

export interface ITaxonNode {
  id: string
  rank: string
  name: string
  scientificName: string
  speciesCount: number
  description?: string
  imageUrl?: string
  children?: ITaxonNode[]
}

export interface ISpecies {
  id: string
  name: string
  scientificName: string
  family: string
  rank: string
  status: string
  imageUrl: string
  description: string
  kingdom: 'animalia' | 'plantae'
  // 详情页扩展字段
  phylum?: string
  class?: string
  order?: string
  genus?: string
  morphology?: string
  ecology?: string
  habitat?: string
  habits?: string
}

// Notion 分类数据类型
interface NotionTaxonomyItem {
  id: string
  pageId: string
  name: string
  scientificName: string
  rank: string
  category: string
  imageUrl: string
  description: string
  morphology: string
  habits: string
  tags: string[]
  model3d: string
  status: string
  parentIds: string[]
}

// Notion 物种数据类型
interface NotionSpecies {
  id: string
  name: string
  scientificName: string
  rank: string
  category: string
  phylum: string
  class: string
  order: string
  family: string
  genus: string
  conservationStatus: string
  imageUrl: string
  description: string
  morphology: string
  ecology: string
  habitat: string
  habits: string
}

// 保护等级映射
const statusMap: Record<string, { label: string; status: string }> = {
  LC: { label: '无危 LC', status: 'common' },
  NT: { label: '近危 NT', status: 'near-threatened' },
  VU: { label: '易危 VU', status: 'vulnerable' },
  EN: { label: '濒危 EN', status: 'endangered' },
  CR: { label: '极危 CR', status: 'critically-endangered' },
}

// 转换 Notion 物种数据为网站格式
function convertNotionSpecies(notionData: NotionSpecies[]): ISpecies[] {
  return notionData.map((item) => {
    const statusInfo = statusMap[item.conservationStatus] || { 
      label: item.conservationStatus || '无危 LC', 
      status: 'common' 
    }
    
    return {
      id: item.id,
      name: item.name,
      scientificName: item.scientificName,
      family: item.family || '',
      rank: statusInfo.label,
      status: statusInfo.status,
      imageUrl: item.imageUrl || '',
      description: item.description || '',
      kingdom: item.category === 'plant' ? 'plantae' : 'animalia',
      phylum: item.phylum,
      class: item.class,
      order: item.order,
      genus: item.genus,
      morphology: item.morphology,
      ecology: item.ecology,
      habitat: item.habitat,
      habits: item.habits,
    }
  })
}

// 从 Notion 数据构建分类树
function buildTaxonomyTree(notionData: NotionTaxonomyItem[]): ITaxonNode[] {
  if (!notionData || notionData.length === 0) return []

  // 建立 ID 映射（同时支持 id 和 pageId）
  const itemMap: Record<string, ITaxonNode & { parentIds: string[] }> = {}
  notionData.forEach((item) => {
    const node: ITaxonNode & { parentIds: string[] } = {
      id: item.id,
      rank: item.rank,
      name: item.name,
      scientificName: item.scientificName,
      speciesCount: 0,
      description: item.description,
      imageUrl: item.imageUrl,
      children: [],
      parentIds: item.parentIds || [],
    }
    itemMap[item.id] = node
    itemMap[item.pageId] = node // 同时用 pageId 映射，方便关联
  })

  // 计算每个节点的物种数量（递归统计）
  function countSpecies(nodeId: string): number {
    const node = itemMap[nodeId]
    if (!node) return 0
    
    if (node.rank === '种') {
      return 1
    }
    
    let count = 0
    if (node.children) {
      node.children.forEach((child) => {
        count += countSpecies(child.id)
      })
    }
    return count
  }

  // 建立父子关系
  const phyla: ITaxonNode[] = [] // 门级节点
  
  notionData.forEach((item) => {
    const node = itemMap[item.id]
    if (!node) return

    if (item.parentIds && item.parentIds.length > 0) {
      item.parentIds.forEach((parentId) => {
        const parent = itemMap[parentId]
        if (parent && parent.children) {
          parent.children.push(node)
        }
      })
    } else {
      // 没有父级的，检查是不是「门」级别
      if (item.rank === '门') {
        phyla.push(node)
      }
    }
  })

  // 在最顶层加上「界」
  const animalKingdom: ITaxonNode = {
    id: 'animalia',
    rank: '界',
    name: '动物界',
    scientificName: 'Animalia',
    speciesCount: 0,
    children: [],
  }

  const plantKingdom: ITaxonNode = {
    id: 'plantae',
    rank: '界',
    name: '植物界',
    scientificName: 'Plantae',
    speciesCount: 0,
    children: [],
  }

  // 把门放到对应的界下面
  phyla.forEach((phylum) => {
    // 根据 category 判断是动物还是植物，默认动物
    const item = notionData.find((i) => i.id === phylum.id)
    if (item?.category === 'plant') {
      plantKingdom.children!.push(phylum)
    } else {
      animalKingdom.children!.push(phylum)
    }
  })

  // 最终根节点：有数据的界才显示
  const roots: ITaxonNode[] = []
  if (animalKingdom.children && animalKingdom.children.length > 0) {
    roots.push(animalKingdom)
  }
  if (plantKingdom.children && plantKingdom.children.length > 0) {
    roots.push(plantKingdom)
  }

  // 计算物种数量
  function setSpeciesCount(node: ITaxonNode) {
    if (node.rank === '种') {
      node.speciesCount = 1
      return
    }
    let count = 0
    if (node.children) {
      node.children.forEach((child) => {
        setSpeciesCount(child)
        count += child.speciesCount
      })
    }
    node.speciesCount = count
  }
  roots.forEach((root) => setSpeciesCount(root))

  return roots
}

// 默认模拟数据（Notion 没有数据时使用）
const DEFAULT_SPECIES: ISpecies[] = [
  {
    id: 'sp-001',
    name: '金凤蝶',
    scientificName: 'Papilio machaon',
    family: '凤蝶科 Papilionidae',
    rank: '无危 LC',
    status: 'common',
    imageUrl: '',
    description: '大型凤蝶，翅金黄色，具黑色斑纹。幼虫以伞形科植物为食。',
    kingdom: 'animalia',
  },
  {
    id: 'sp-002',
    name: '大鸨',
    scientificName: 'Otis tarda',
    family: '鸨科 Otididae',
    rank: '易危 VU',
    status: 'vulnerable',
    imageUrl: '',
    description: '世界上最重的飞行鸟类之一，栖息于草原和半荒漠地带。',
    kingdom: 'animalia',
  },
  {
    id: 'sp-003',
    name: '盘羊',
    scientificName: 'Ovis ammon',
    family: '牛科 Bovidae',
    rank: '近危 NT',
    status: 'near-threatened',
    imageUrl: '',
    description: '大型野生绵羊，雄性具螺旋状大角，栖息于高山草原。',
    kingdom: 'animalia',
  },
  {
    id: 'sp-004',
    name: '蒙古扁桃',
    scientificName: 'Prunus mongolica',
    family: '蔷薇科 Rosaceae',
    rank: '易危 VU',
    status: 'vulnerable',
    imageUrl: '',
    description: '荒漠地区特有灌木，耐旱耐寒，具有重要生态价值。',
    kingdom: 'plantae',
  },
  {
    id: 'sp-005',
    name: '梭梭',
    scientificName: 'Haloxylon ammodendron',
    family: '苋科 Amaranthaceae',
    rank: '无危 LC',
    status: 'common',
    imageUrl: '',
    description: '荒漠地区重要固沙植物，根系发达，耐盐碱。',
    kingdom: 'plantae',
  },
  {
    id: 'sp-006',
    name: '金雕',
    scientificName: 'Aquila chrysaetos',
    family: '鹰科 Accipitridae',
    rank: '无危 LC',
    status: 'common',
    imageUrl: '',
    description: '大型猛禽，翼展可达2.3米，为国家一级保护动物。',
    kingdom: 'animalia',
  },
]

// 默认分类树
const DEFAULT_TAXONOMY_TREE: ITaxonNode[] = [
  {
    id: 'animalia',
    rank: '界',
    name: '动物界',
    scientificName: 'Animalia',
    speciesCount: 4200,
    children: [
      {
        id: 'chordata',
        rank: '门',
        name: '脊索动物门',
        scientificName: 'Chordata',
        speciesCount: 1800,
        children: [
          {
            id: 'aves',
            rank: '纲',
            name: '鸟纲',
            scientificName: 'Aves',
            speciesCount: 560,
          },
          {
            id: 'mammalia',
            rank: '纲',
            name: '哺乳纲',
            scientificName: 'Mammalia',
            speciesCount: 320,
          },
          {
            id: 'reptilia',
            rank: '纲',
            name: '爬行纲',
            scientificName: 'Reptilia',
            speciesCount: 180,
          },
        ],
      },
      {
        id: 'arthropoda',
        rank: '门',
        name: '节肢动物门',
        scientificName: 'Arthropoda',
        speciesCount: 2100,
        children: [
          {
            id: 'insecta',
            rank: '纲',
            name: '昆虫纲',
            scientificName: 'Insecta',
            speciesCount: 1900,
          },
        ],
      },
    ],
  },
  {
    id: 'plantae',
    rank: '界',
    name: '植物界',
    scientificName: 'Plantae',
    speciesCount: 3800,
    children: [
      {
        id: 'angiospermae',
        rank: '门',
        name: '被子植物门',
        scientificName: 'Angiospermae',
        speciesCount: 3200,
        children: [
          {
            id: 'dicotyledoneae',
            rank: '纲',
            name: '双子叶植物纲',
            scientificName: 'Dicotyledoneae',
            speciesCount: 2100,
          },
          {
            id: 'monocotyledoneae',
            rank: '纲',
            name: '单子叶植物纲',
            scientificName: 'Monocotyledoneae',
            speciesCount: 1100,
          },
        ],
      },
      {
        id: 'gymnospermae',
        rank: '门',
        name: '裸子植物门',
        scientificName: 'Gymnospermae',
        speciesCount: 420,
      },
    ],
  },
]

// 最终物种数据
// 优先使用 Notion 同步的数据，如果没有则用默认数据
export const MOCK_SPECIES: ISpecies[] = 
  notionSpecies && notionSpecies.length > 0 
    ? convertNotionSpecies(notionSpecies as NotionSpecies[])
    : DEFAULT_SPECIES

// 最终分类树
// 优先使用 Notion 构建的分类树，如果没有则用默认数据
export const MOCK_TAXONOMY_TREE: ITaxonNode[] = 
  notionTaxonomy && notionTaxonomy.length > 0
    ? buildTaxonomyTree(notionTaxonomy as NotionTaxonomyItem[])
    : DEFAULT_TAXONOMY_TREE

// 获取分类节点的所有后代物种
export function getSpeciesUnderTaxon(taxonId: string): ISpecies[] {
  // 先找到这个分类节点
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

  const node = findNode(MOCK_TAXONOMY_TREE, taxonId)
  if (!node) return []

  // 收集所有后代物种
  const speciesIds: string[] = []
  
  function collectSpecies(n: ITaxonNode) {
    if (n.rank === '种') {
      speciesIds.push(n.id)
      return
    }
    if (n.children) {
      n.children.forEach((child) => collectSpecies(child))
    }
  }

  collectSpecies(node)

  // 从物种列表中查找
  return MOCK_SPECIES.filter((s) => speciesIds.includes(s.id))
}

// 获取分类节点的面包屑路径
export function getTaxonBreadcrumb(taxonId: string): ITaxonNode[] {
  const path: ITaxonNode[] = []

  function findPath(nodes: ITaxonNode[], id: string, currentPath: ITaxonNode[]): boolean {
    for (const node of nodes) {
      const newPath = [...currentPath, node]
      if (node.id === id) {
        path.push(...newPath)
        return true
      }
      if (node.children) {
        if (findPath(node.children, id, newPath)) {
          return true
        }
      }
    }
    return false
  }

  findPath(MOCK_TAXONOMY_TREE, taxonId, [])
  return path
}
