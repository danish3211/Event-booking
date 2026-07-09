import ArtistTour from '@/components/hero/ArtistTour'
import BottomBanner from '@/components/hero/BottomBanner'
import ExploreCity from '@/components/hero/ExploreCity'
import Gallery from '@/components/hero/Gallery'
import MostLoved from '@/components/hero/MostLoved'
import PopularEvents from '@/components/hero/PopularEvents'
import PopularVenues from '@/components/hero/PopularVenues'
import { EventSlide } from '@/components/hero/RecentEventSlider'
import { StorySection } from '@/components/hero/StorySection'
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton'
import { Wrapper } from '@/components/ui/Wrapper'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })
function App() {

  const handleNavigateToVenue = (slug: string) => {
    const url = `/venues/${slug}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="">
      <EventSlide />
      <Wrapper className="py-10 ">
        <div className="space-y-10">
          <StorySection/>
          <ExploreCity />
          <MostLoved />
          <PopularEvents />
          <ArtistTour />
          <PopularVenues onNavigate={handleNavigateToVenue} />
        </div>
      </Wrapper>
      <Gallery />
      <BottomBanner />
      <ScrollToTopButton />
    </div>
  )
}
