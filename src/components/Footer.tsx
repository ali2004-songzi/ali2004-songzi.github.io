import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0e1a]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* 品牌信息 */}
          <div>
            <div className="mb-4">
              <img
                src="https://aka.doubaocdn.com/s/Da1RNd3K0u"
                alt="内蒙古师范大学自然博物馆数字馆"
                className="h-16 object-contain"
              />
            </div>
            <p className="text-sm text-gray-400">
              集教学、科研、科普于一体的综合性自然博物馆，内蒙古地区重要的生物多样性研究与展示基地。
            </p>
          </div>

          {/* 快速导航 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">快速导航</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-emerald-400">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-sm text-gray-400 hover:text-emerald-400">
                  分类探索
                </Link>
              </li>
              <li>
                <Link to="/vr" className="text-sm text-gray-400 hover:text-emerald-400">
                  VR实景展馆
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系我们 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">联系我们</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>地址：内蒙古呼和浩特市赛罕区昭乌达路81号</li>
              <li>电话：0471-xxxxxxx</li>
              <li>邮箱：museum@imnu.edu.cn</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2024 内蒙古师范大学自然博物馆 版权所有
          </p>
        </div>
      </div>
    </footer>
  )
}
