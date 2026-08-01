export interface ICollection {
  id: string
  tag: string
  tagColor: 'green' | 'blue' | 'amber'
  title: string
  description: string
  buttonText: string
  isFeatured?: boolean
  imageUrl: string
}

export const MOCK_COLLECTIONS: ICollection[] = [
  {
    id: '1',
    tag: 'ANIMALIA',
    tagColor: 'green',
    title: '动物界',
    description: '涵盖脊索动物、节肢动物、软体动物等代表性科学门类，支持从宏观形态到微观特性的系统性挖掘。',
    buttonText: '进入动物分类树探索',
    imageUrl: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800',
  },
  {
    id: '2',
    tag: 'PLANTAE',
    tagColor: 'blue',
    title: '植物界',
    description: '精选被子植物门和裸子植物门典型代表，阐述形态特征、生活习性、共生真菌及经济与生态效用。',
    buttonText: '进入植物分类树探索',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
  },
  {
    id: '3',
    tag: 'INNER MONGOLIA',
    tagColor: 'amber',
    title: '内蒙古特色',
    description: '聚焦内蒙古草原、荒漠、森林、湿地四大生态系统代表性物种，展现北疆生物多样性精华。',
    buttonText: '探索内蒙古特色物种',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1501854140884-074bf8968a5d?w=800',
  },
]
