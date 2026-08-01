import HeroSection from './HeroSection'
import ActionsSection from './ActionsSection'
import StatsSection from './StatsSection'
import CollectionSection from './CollectionSection'
import HologramSection from './HologramSection'
import ServicesSection from './ServicesSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ActionsSection />
      <StatsSection />
      <CollectionSection />
      <HologramSection />
      <ServicesSection />
    </div>
  )
}
