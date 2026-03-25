import VenueDetails from '@/components/hero/VenueDetails'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/venues/$venuesId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { venuesId } = Route.useParams()
  return <div>
    <VenueDetails
      venueSlug={venuesId}
      onBack={() => { }}
      onNavigate={() => { }} />
  </div>
}
