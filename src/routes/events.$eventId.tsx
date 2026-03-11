import { EventCard } from '@/components/ui/EventCard';
import { ShareModal } from '@/components/ui/ShareModal';
import { EVENTS, ticketData } from '@/constants';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Calendar, CheckCircle2, ChevronRight, Heart, MapPin, MessageSquare, Plus, Share2, Star } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/events/$eventId')({
  component: EventDetails,
});

function EventDetails() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // In a real app, you'd fetch data here using eventId
  const event = {
    title: "Karan Aujla P-Pop Culture India Tour - Mumbai",
    date: "Sat, 18 Apr 2026",
    time: "04:00 PM onwards",
    venue: "Infinity Bay, Mumbai",
    price: "2,999",
    description: "Experience the phenomenon of Karan Aujla live in Mumbai for the Holi Edition of his P-Pop Culture tour. Expect high-energy performances, exclusive merchandise, and a state-of-the-art visual experience.",
    image: "https://cdn-ip.allevents.in/s/rs:fill:500:250/g:sm/sh:100/aHR0cHM6Ly9jZG4tYXouYWxsZXZlbnRzLmluL2V2ZW50czgvYmFubmVycy80MmQ4NTA4MC1kMWFmLTExZjAtOTk2Yi1kNTlmZTQwYmI5MTgtcmltZy13MTIwMC1oNjc1LWRjMTkxNTE2LWdtaXIud2VicD92PTE3NjQ5MjExMTI.avif",
    attendees: 2821,
    url: typeof window !== 'undefined' ? window.location.href : 'https://allevents.in/surat/...'
  };

  return (
    <div className="min-h-screen bg-background text-text pb-20">
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        event={event}
      />
      {/* 1. Hero Banner Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          src={event.image}
          className="h-full w-full object-cover"
          alt="Banner"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />

        {/* Floating Actions */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="p-3 rounded-full bg-primary/30 backdrop-blur-md border border-surface/50 hover:bg-primary/50 transition"
          >
            <Share2 size={20} className="text-secondary" />
          </button>
          <button className="p-3 rounded-full bg-primary/30 backdrop-blur-md border border-surface/50 hover:bg-primary/50 transition">
            <Heart size={20} className="text-secondary group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* 2. Main Content Wrapper */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT COLUMN: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest">
                Selling Fast
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-text tracking-tight leading-tight">
                {event.title}
              </h1>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-surface/30">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10"><Calendar className="text-primary" /></div>
                <div>
                  <p className="text-xs text-text/60 font-bold uppercase">Date</p>
                  <p className="font-semibold">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10"><MapPin className="text-primary" /></div>
                <div>
                  <p className="text-xs text-text/60 font-bold uppercase">Location</p>
                  <p className="font-semibold">{event.venue}</p>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About the event</h2>
              <p className="text-text/80 leading-relaxed text-lg">
                {event.description}
              </p>
            </div>

            {/* Event Details Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Event Details</h2>
              <div className="bg-slate-50/50 rounded-3xl p-8 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-text/70 font-medium">Age Restriction</span>
                  <span className="font-bold">18+</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-text/70 font-medium">Dress Code</span>
                  <span className="font-bold">Casual</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-text/70 font-medium">Expected Attendees</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-6 py-2 rounded-full bg-primary/10 text-primary font-bold">
                  Parking
                </span>
                <span className="px-6 py-2 rounded-full bg-primary/10 text-primary font-bold">
                  Bar
                </span>
              </div>
            </div>

            <div className="">
              <h2 className="text-2xl font-bold">Ticket info</h2>
              <div className="w-full mb-8">
                <div className="grid grid-cols-2 px-4 py-3 text-sm font-bold text-slate-700">
                  <div>Ticket type</div>
                  <div>Ticket price</div>
                </div>
                <div className="space-y-1">
                  {ticketData.map((ticket, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-2 px-4 py-3 text-sm font-medium ${index % 2 === 0 ? 'bg-slate-50/50' : 'bg-transparent'
                        }`}
                    >
                      <div className="text-slate-500">{ticket.type}</div>
                      <div className="text-slate-600">{ticket.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Event Tags Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Event Tags</h2>
              <div className="flex">
                <span
                  className="rounded-2xl border border-surface/30 bg-background hover:bg-primary/10 transition-transform hover:scale-105 hover:border-primary/50 p-6 text-center shadow-xs">
                  Stand Up Comedian
                </span>
              </div>
            </section>

            <div className="">
              <h2 className="text-2xl font-bold">More Events Like This</h2>
              <div className="container mx-auto pt-5">
                <div className="grid md:grid-cols-2 gap-6">
                  {EVENTS.map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (Sticky) */}
          <div className="relative z-10 w-full">
            <div className="sticky top-10 space-y-6">
              {/* Ticket Card */}
              <div className="p-8 rounded-[2.5rem] bg-background border border-surface/40 shadow-2xl space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-text/60 font-bold uppercase mb-1">Price starting at</p>
                    <p className="text-3xl font-black italic">₹{event.price}</p>
                  </div>
                  <div className="flex items-center gap-1 text-primary text-xs font-bold">
                    <CheckCircle2 size={14} /> Available
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-4 bg-primary hover:bg-vivid text-white font-bold rounded-2xl transition-all transform active:scale-95 shadow-lg shadow-primary/20">
                    Book Tickets Now
                  </button>
                  <p className="text-center text-[10px] text-text/50 uppercase font-bold tracking-widest">
                    No hidden fees at checkout
                  </p>
                </div>

                {/* Social Proof inside card */}
                <div className="pt-6 border-t border-surface/30 flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} alt="attendee" className="w-10 h-10 rounded-full border-4 border-background" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-text/70">+{event.attendees} People Going</p>
                </div>
              </div>

              {/* Artist Lineup */}
              <div className="p-6 rounded-3xl bg-background border border-surface/20 shadow-sm space-y-6">
                <h3 className="text-xl font-bold">Artist Lineup</h3>
                <Link to="/artist/$artistId" params={{ artistId: "karan-aujla" }} className="flex items-center justify-between group cursor-pointer p-2 -m-2 hover:bg-primary/10 rounded-xl transition">
                  <div className="flex items-center gap-4">
                    <img src="https://i.pravatar.cc/150?u=karan" alt="Karan Aujla" className="w-14 h-14 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-lg">Karan Aujla</h4>
                      <p className="text-sm text-text/60">Desi hip hop</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-text/40 group-hover:text-text transition" />
                </Link>
              </div>

              {/* Host Details */}
              <div className="p-6 rounded-3xl bg-background border border-surface/20 shadow-sm space-y-6">
                <h3 className="text-xl font-bold">Host Details</h3>
                <Link to="/hots/$hostId" params={{ hostId: "contests-mumbai" }} className="flex items-center justify-between group cursor-pointer p-2 -m-2 hover:bg-primary/5 rounded-xl transition">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl border border-surface/20 overflow-hidden flex items-center justify-center p-1 bg-white">
                      <img src="https://ui-avatars.com/api/?name=ae&background=0D8ABC&color=fff&rounded=true&bold=true&size=100" alt="Contests Mumbai logo" className="w-full h-full object-contain rounded-lg" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors">Contests Mumbai</h4>
                      <p className="text-sm text-text/60">68 Followers</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-text/40 group-hover:text-text transition" />
                </Link>

                <div className="flex gap-4 mt-5">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-surface/30 hover:bg-primary/10 transition font-semibold text-text text-sm">
                    <Plus size={16} className="text-primary" /> Follow
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-surface/30 hover:bg-primary/10 transition font-semibold text-text text-sm">
                    <MessageSquare size={16} className="text-primary" /> Message
                  </button>
                </div>

                <div className="flex items-center gap-2 text-text/70 pt-4 border-t border-surface/10">
                  <Star size={16} className="text-text/40" />
                  <span className="text-sm font-medium">3.9/5 Rating - 8 Reviews</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div >
  );
}