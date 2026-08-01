export interface IHologramSpecimen {
  id: string
  name: string
  scientificName: string
  commonName: string
  tag: string
  description: string
  features: string[]
  interactionModes: string[]
}

export const MOCK_HOLOGRAM_SPECIMEN: IHologramSpecimen = {
  id: '1',
  name: '金凤蝶',
  scientificName: 'Papilio machaon',
  commonName: '黄凤蝶 / 茴香凤蝶',
  tag: '精选全息标本',
  description: '金凤蝶是鳞翅目凤蝶科凤蝶属的大型蝶类，以其金黄色的翅膀和黑色斑纹著称。本标本通过高精度3D扫描与粒子重建技术，实现了可交互的数字孪生展示，支持任意角度观察翅脉结构与鳞片细节。',
  features: [
    '拖拽旋转：360° 自由视角观察标本细节',
    '网格粒子切换：实体模型与粒子网络两种呈现模式',
    '多端适配：支持桌面、平板、手机全平台流畅运行',
  ],
  interactionModes: ['实体', '粒子'],
}
