import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Plus, MessageSquare, Share, Star } from 'lucide-react';
import EventCard from '../components/ui/EventCard';
import Button from '@/components/ui/Button';

export const Route = createFileRoute('/hots/$hostId')({
  component: HostProfile,
});

function HostProfile() {
  const { hostId } = Route.useParams();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock Data
  const host = {
    name: "Contests Mumbai",
    followers: 68,
    rating: 3.9,
    logo: "https://ui-avatars.com/api/?name=ae&background=0D8ABC&color=fff&rounded=true&bold=true&size=150",
    upcomingEvents: [
      {
        id: "1",
        title: "Karan Aujla P-Pop Culture India Tour - Mumbai",
        category: "Concert",
        coverImage: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=600",
        date: "2026-03-04",
        time: "11:00 AM",
        venue: "Venue to be announced",
        location: "Mumbai",
        distance: 5.2,
        priceRange: { min: 2999, max: 8999 },
        attendees: 2821,
        isBookmarked: false,
        isFeatured: true,
        organizer: "Contests Mumbai",
        ticketTiers: [] // Add empty array or mock tiers if needed
      },
      {
        id: "2",
        title: "Karan Aujla P-Pop Culture India Tour - Mumbai",
        category: "Concert",
        coverImage: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=600",
        date: "2026-03-04",
        time: "11:00 AM",
        venue: "Venue to be announced",
        location: "Mumbai",
        distance: 5.2,
        priceRange: { min: 2999, max: 8999 },
        attendees: 2821,
        isBookmarked: false,
        isFeatured: true,
        organizer: "Contests Mumbai",
        ticketTiers: [] // Add empty array or mock tiers if needed
      },
      {
        id: "3",
        title: "Karan Aujla P-Pop Culture India Tour - Mumbai",
        category: "Concert",
        coverImage: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=600",
        date: "2026-03-04",
        time: "11:00 AM",
        venue: "Venue to be announced",
        location: "Mumbai",
        distance: 5.2,
        priceRange: { min: 2999, max: 8999 },
        attendees: 2821,
        isBookmarked: false,
        isFeatured: true,
        organizer: "Contests Mumbai",
        ticketTiers: [] // Add empty array or mock tiers if needed
      }
    ],
    pastEvents: [
      {
        id: "2",
        title: "Anuv Jain - Dastakhat India Tour - Mumbai",
        category: "Concert",
        coverImage: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=600",
        date: "2025-02-14",
        time: "08:30 PM",
        venue: "Venue To Be Announced",
        location: "Mumbai",
        distance: 3.0,
        priceRange: { min: 1500, max: 4500 },
        attendees: 5430,
        isBookmarked: false,
        isFeatured: false,
        organizer: "Contests Mumbai",
        ticketTiers: []
      },
      {
        id: "3",
        title: "TOXIC - Abhishek Upmanyu Live",
        category: "Comedy",
        coverImage: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=600",
        date: "2024-12-26",
        time: "07:00 PM",
        venue: "Sri Shanmukhananda Fine Arts",
        location: "Mumbai",
        distance: 12.5,
        priceRange: { min: 500, max: 2500 },
        attendees: 1205,
        isBookmarked: false,
        isFeatured: false,
        organizer: "Contests Mumbai",
        ticketTiers: []
      }
      // {
      //   id: 4,
      //   title: "Sunidhi Chauhan - I Am Home India Tour 2024-25",
      //   date: "Wed, 24 Dec",
      //   time: "07:30 PM",
      //   venue: "Venue to be announced",
      //   image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
      //   price: "1000",
      //   category: "Concert",
      //   interestedCount: 8900,
      //   attendees: ["https://i.pravatar.cc/100?u=12", "https://i.pravatar.cc/100?u=13", "https://i.pravatar.cc/100?u=14", "https://i.pravatar.cc/100?u=15"]
      // },
      // {
      //   id: 5,
      //   title: "Rolling Loud India",
      //   date: "Sat, 22 Nov",
      //   time: "03:00 PM",
      //   venue: "Loud Park - Rolling Loud India",
      //   image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&q=80&w=600",
      //   price: "7000",
      //   category: "Festival",
      //   interestedCount: 15420,
      //   attendees: ["https://i.pravatar.cc/100?u=16", "https://i.pravatar.cc/100?u=17", "https://i.pravatar.cc/100?u=18", "https://i.pravatar.cc/100?u=19", "https://i.pravatar.cc/100?u=20"]
      // }
    ],
    reviews: [
      {
        id: 1,
        user: "Christopher Recz",
        avatar: "https://i.pravatar.cc/150?u=chris",
        rating: 4,
        text: "With it was GreatExcept lineup Arrangements. They should have placed 1 stage for International Artist and 1 for National Artists.",
        event: "Rolling Loud India",
        date: "December 1, 2023"
      },
      {
        id: 2,
        user: "Atharva Harmalkar",
        avatar: "https://i.pravatar.cc/150?u=atharva",
        rating: 1,
        text: "Not got the tickets 😡 😡",
        event: "Rolling Loud India",
        date: "November 24, 2023"
      }
    ]
  };

  return (
    <div className="min-h-screen text-text pb-20 font-sans">

      {/* 1. Header Profile Section */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8 border-b border-surface/20">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Logo */}
          <div className="w-32 h-32 shrink-0 rounded-[2rem] border border-surface/20 overflow-hidden flex items-center justify-center p-2 bg-white shadow-sm">
            <img src={host.logo} alt={host.name} className="w-full h-full object-contain rounded-2xl" />
          </div>

          {/* Info & Actions */}
          <div className="flex-1 space-y-4 text-center sm:text-left pt-2">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-background">{host.name}</h1>
              <p className="text-background/60 mt-1"><span className="font-bold text-background">{host.followers}</span> Followers</p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Button
                title='Follow'
                variant='primary'
                icon={<Plus size={18} strokeWidth={3} />}
              />
              {/* <Button
                title='Message'
                variant='primary'
                icon={<MessageSquare size={18} />}
              /> */}
                <Button
                title=''
                variant='normal'
                icon={<Share size={18} />}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-8 py-4 border-b border-surface/10">
          {[
            { id: 'upcoming', label: 'Upcoming Events' },
            { id: 'past', label: 'Past Events' },
            { id: 'reviews', label: 'Reviews' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm font-bold whitespace-nowrap pb-4 -mb-[17px] transition-colors flex items-center gap-1.5 ${activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-background'
                }`}
            >
              {tab.label}
              {tab.id === 'reviews' && (
                <>
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-amber-500 font-bold">{host.rating}</span>
                </>
              )}
            </button>
          ))}
        </div>

        {/* 3. Tab Content */}
        <div className="mt-12 min-h-[400px]">

          {/* Upcoming Events Tab */}
          {activeTab === 'upcoming' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-black text-background tracking-tight pl-2 border-l-4 border-primary">Upcoming Events</h2>

              <div className="flex flex-wrap gap-6">
                {host?.upcomingEvents?.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Past Events Tab */}
          {activeTab === 'past' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-black text-background tracking-tight pl-2 border-l-4 border-primary">Past Events</h2>

              <div className="flex flex-wrap gap-6">
                {host?.pastEvents?.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-black text-background tracking-tight pl-2 border-l-4 border-primary">Reviews & Ratings</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {host.reviews.map((review) => (
                  <div key={review.id} className="p-6 rounded-2xl border border-surface/20 bg-background shadow-xs hover:shadow-sm transition-shadow space-y-4">
                    <div className="flex items-center gap-3">
                      <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full border border-surface/20 object-cover" />
                      <div>
                        <h4 className="text-sm font-bold">{review.user}</h4>
                        <div className="flex gap-0.5 mt-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={12} className={star <= review.rating ? "text-amber-400 fill-amber-400" : "text-surface/30 fill-surface/30"} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-text/80 leading-relaxed min-h-[60px]">
                      {review.text}
                    </p>

                    <div className="pt-4 border-t border-surface/10 space-y-1.5">
                      <p className="text-[11px] font-bold text-text/40 uppercase tracking-wider">Review for : <span className="text-text/60 font-medium normal-case">{review.event}</span></p>
                      <p className="text-[11px] text-text/40">{review.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button inside container */}
              <div className="pt-6 flex justify-center">
                <Button
                  title='View all'
                  variant='primary' />
              </div>
            </div>
          )}

        </div>

        {/* 6. Newsletter/Updates bottom block */}
        <div className="mt-16 mx-auto max-w-xl">
          <div className="p-8 rounded-3xl border border-surface/20 bg-background/20 shadow-xs text-center space-y-6">
            <h3 className="text-xl font-bold text-white">Get {host.name} Event Updates</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address..."
                className="text-background flex-1 px-4 py-3 bg-surface/5 border border-surface/20 rounded-xl focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              />
              <Button
                title='Subscribe now'
                variant='primary' />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
