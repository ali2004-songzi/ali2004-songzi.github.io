import { MOCK_TAXONOMY_TREE, MOCK_SPECIES, type ISpecies, type ITaxonNode } from './taxonomy'
import notionSpecies from './notion-species.json'

// Notion 数据类型
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

// 转换 Notion 数据为网站格式
function convertNotionSpecies(notionData: NotionSpecies[]): ISpecies[] {
  return notionData.map((item) => {
    const statusInfo = statusMap[item.conservationStatus] || { label: item.conservationStatus || '未知', status: 'unknown' }
    
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
      // 额外字段（详情页用）
      phylum: item.phylum,
      class: item.class,
      order: item.order,
      genus: item.genus,
      morphology: item.morphology,
      ecology: item.ecology,
      habitat: item.habitat,
      habits: item.habits,
    } as ISpecies & {
      phylum: string
      class: string
      order: string
      genus: string
      morphology: string
      ecology: string
      habitat: string
      habits: string
    }
  })
}

// 最终使用的物种数据
// 优先使用 Notion 同步的数据，如果没有则用默认模拟数据
export const SPECIES_DATA: ISpecies[] = 
  notionSpecies && notionSpecies.length > 0 
    ? convertNotionSpecies(notionSpecies as NotionSpecies[])
    : MOCK_SPECIES

// 分类树（暂时用默认的，后续可以根据物种数据动态生成）
export const TAXONOMY_TREE: ITaxonNode[] = MOCK_TAXONOMY_TREE

// 重新导出类型
export type { ISpecies, ITaxonNode } from './taxonomy'

// 工具函数：根据ID获取物种
export function getSpeciesById(id: string): ISpecies | undefined {
  return SPECIES_DATA.find((s) => s.id === id)
}

// 工具函数：按界筛选物种
export function getSpeciesByKingdom(kingdom: 'animalia' | 'plantae'): ISpecies[] {
  return SPECIES_DATA.filter((s) => s.kingdom === kingdom)
}

// 工具函数：按科筛选物种
export function getSpeciesByFamily(family: string): ISpecies[] {
  return SPECIES_DATA.filter((s) => s.family.includes(family))
}

// 工具函数：搜索物种
export function searchSpecies(keyword: string): ISpecies[] {
  const kw = keyword.toLowerCase()
  return SPECIES_DATA.filter(
    (s) =>
      s.name.toLowerCase().includes(kw) ||
      s.scientificName.toLowerCase().includes(kw) ||
      s.description.toLowerCase().includes(kw)
  )
}
