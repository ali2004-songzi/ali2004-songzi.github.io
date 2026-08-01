import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage/HomePage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import SpeciesDetailPage from './pages/SpeciesDetailPage/SpeciesDetailPage'
import VrPage from './pages/VrPage/VrPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/species/:id" element={<SpeciesDetailPage />} />
          <Route path="/vr" element={<VrPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
