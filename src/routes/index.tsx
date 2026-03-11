import ArtistTour from '@/components/hero/ArtistTour'
import BottomBanner from '@/components/hero/BottomBanner'
import ExploreCity from '@/components/hero/ExploreCity'
import Gallery from '@/components/hero/Gallery'
import MostLoved from '@/components/hero/MostLoved'
import PopularEvents from '@/components/hero/PopularEvents'
import { EventSlide } from '@/components/hero/RecentEventSlider'
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'
import { Wrapper } from '@/components/ui/Wrapper'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })
function App() {
  return (
    <div className="">
      <EventSlide />
      <Wrapper className="py-10 ">
        <div className="space-y-10">
          <ExploreCity />
          <MostLoved />
          <PopularEvents />
          <ArtistTour />
        </div>
      </Wrapper>
      <Gallery />
      <BottomBanner />
      <ScrollToTopButton />
    </div>
  )
}
