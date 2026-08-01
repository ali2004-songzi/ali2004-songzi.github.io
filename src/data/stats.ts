export interface IStat {
  id: string
  value: number
  suffix?: string
  label: string
  description: string
  color: 'green' | 'blue' | 'amber' | 'pink'
}

export const MOCK_STATS: IStat[] = [
  {
    id: '1',
    value: 2,
    suffix: '界',
    label: '探索大类群',
    description: '动物界、植物界两大界',
    color: 'green',
  },
  {
    id: '2',
    value: 7,
    suffix: '层级',
    label: '系统演化阶元',
    description: '界门纲目科属种七阶元',
    color: 'blue',
  },
  {
    id: '3',
    value: 100,
    suffix: '+',
    label: '科学物种档案',
    description: '包含完整形态与生态作用数据',
    color: 'amber',
  },
  {
    id: '4',
    value: 0,
    suffix: '全覆盖',
    label: '3D扫描标本',
    description: '支持网格及粒子交互旋转渲染',
    color: 'pink',
  },
]
