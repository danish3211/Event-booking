import ExploreCity from '@/components/hero/ExploreCity'
import HeroSearch from '@/components/hero/HeroSearch'
import MostLoved from '@/components/hero/MostLoved'
import PopularEvents from '@/components/hero/PopularEvents'
import { Wrapper } from '@/components/ui/Wrapper'
import { createFileRoute } from '@tanstack/react-router'
import Gallery from '@/components/hero/Gallery'
import BottomBanner from '@/components/hero/BottomBanner'
import ArtistTour from '@/components/hero/ArtistTour'

export const Route = createFileRoute('/')({ component: App })
function App() {
  return (
    <div className="">
      <HeroSearch />
      <Wrapper className="py-10 ">
        <div className="space-y-10">
          <ExploreCity />
          <MostLoved/>
          <PopularEvents/>  
          <ArtistTour/>
        </div>
      </Wrapper>
      <Gallery />
      <BottomBanner />
    </div>
  )
}
