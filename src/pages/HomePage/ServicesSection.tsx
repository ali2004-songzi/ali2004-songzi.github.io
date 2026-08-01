import { motion } from 'framer-motion'
import { GitBranch, QrCode, Save } from 'lucide-react'

const services = [
  {
    icon: GitBranch,
    title: '七阶元演化树浏览器',
    description: '基于林奈分类系统，支持界门纲目科属种七级分类树逐级探索，直观展示物种演化关系。',
    color: 'emerald',
  },
  {
    icon: QrCode,
    title: '一物一码独立链接',
    description: '每个物种拥有独立的二维码和分享链接，扫码即可查看完整物种档案，便于科普传播。',
    color: 'blue',
  },
  {
    icon: Save,
    title: '无缝标本状态保存',
    description: '3D标本的观察视角、渲染模式自动保存，下次访问时恢复到上次离开时的状态。',
    color: 'amber',
  },
]

const colorMap = {
  emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30',
  blue: 'from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30',
  amber: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30',
}

export default function ServicesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold text-white">博物馆数字功能与学术服务</h2>
          <p className="mt-3 text-gray-400">数字化技术赋能自然科普教育</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-b ${colorMap[service.color as keyof typeof colorMap]}`}
              >
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
