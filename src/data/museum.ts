export interface IMuseumTimeline {
  id: string
  year: string
  title: string
  description: string
}

export const MUSEUM_INTRO = {
  subtitle: 'DIGITAL NATURAL HISTORY MUSEUM',
  title: '自然博物馆数字馆',
  titleHighlight: '数字孪生',
  description: '内蒙古师范大学自然博物馆始建于2011年，是集教学、科研、科普于一体的综合性自然博物馆。馆藏涵盖动物、植物、微生物等多个类群，是内蒙古地区重要的生物多样性研究与展示基地。',
}

export const MOCK_TIMELINE: IMuseumTimeline[] = [
  {
    id: '1',
    year: '起源与基础',
    title: '生物学系标本室',
    description: '依托内蒙古师范大学生命科学与技术学院，积累大量动植物标本资源。',
  },
  {
    id: '2',
    year: '2011.11',
    title: '博物馆立项建设',
    description: '学校正式批准成立自然博物馆，启动场馆规划与标本整理工作。',
  },
  {
    id: '3',
    year: '2012年底',
    title: '场馆主体竣工',
    description: '建筑面积约2000平方米的博物馆主体建筑竣工，进入展陈设计阶段。',
  },
  {
    id: '4',
    year: '2013—2015初',
    title: '展陈布置与标本数字化',
    description: '完成动物馆、植物馆、生态馆三大展区布置，启动标本数字化采集工程。',
  },
  {
    id: '5',
    year: '2015.11.25',
    title: '正式开馆',
    description: '内蒙古师范大学自然博物馆正式对外开放，成为自治区高校首家综合性自然博物馆。',
  },
  {
    id: '6',
    year: '2018.05',
    title: '获评自治区科普基地',
    description: '被认定为内蒙古自治区科普教育基地，年接待参观人次突破5万。',
  },
  {
    id: '7',
    year: '现状',
    title: '数字孪生升级',
    description: '引入3D扫描与全息投影技术，建设数字馆平台，实现馆藏资源的线上沉浸式体验。',
  },
]
