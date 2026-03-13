import Button from '@/components/ui/Button';
import { DataTable, type TableColumn } from '@/components/ui/DataTable';
import EventCard from '@/components/ui/EventCard';
import { ShareModal } from '@/components/ui/ShareModal';
import { allEvents, ticketData } from '@/constants';
import { slugify } from '@/lib/utils';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { Calendar, CheckCircle2, ChevronRight, Heart, MapPin, MessageSquare, Plus, Share2, Star } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/events/$eventId')({
  component: EventDetails,
});

function EventDetails() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { eventId } = useParams({ from: '/events/$eventId' });
  const eventData = allEvents.find((e) => slugify(e.title) === eventId);

  if (!eventData) {
    return <div className="p-20 text-center text-white!">Event not found</div>;
  }

  const event = {
    title: eventData.title,
    date: eventData.date,
    time: eventData.time,
    venue: eventData.venue,
    price: eventData.priceRange.min.toLocaleString(),
    description: eventData.description || "No description available.",
    image: eventData.coverImage,
    attendees: eventData.attendees,
    url: typeof window !== 'undefined' ? window.location.href : ''
  };

  interface Ticket {
    type: string;
    price: string;
  }

  const columns: TableColumn<Ticket>[] = [
    {
      header: "Ticket Category",
      accessorKey: "type",
      render: (value) => <span className="font-bold text-primary">{value}</span>
    },
    {
      header: "Price",
      accessorKey: "price",
      headerClassName: "text-right",
      className: "text-right font-mono"
    }
  ];


  return (
    <div className="min-h-screen text-background pb-20">
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
        <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-transparent" />
      </div>

      {/* 2. Main Content Wrapper */}
      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT COLUMN: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-background text-sm font-bold uppercase tracking-widest">
                Selling Fast
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-background tracking-tight leading-tight">
                {event.title}
              </h1>
            </div>

            {/* Floating Actions */}
            <div className="flex gap-3">
              <Button
                variant="float"
                title=""
                icon={<Share2 size={20} className="text-background" />}
                onClick={() => setIsShareModalOpen(true)}
              />
              <Button
                variant="float"
                title=""
                icon={<Heart size={20} className="text-background" />}
              />
            </div>
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-surface/30">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10"><Calendar className="text-primary" /></div>
                <div>
                  <p className="text-xs font-bold uppercase">Date</p>
                  <p className="font-semibold">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10"><MapPin className="text-primary" /></div>
                <div>
                  <p className="text-xs font-bold uppercase">Location</p>
                  <p className="font-semibold">{event.venue}</p>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">About the event</h2>
              <p className=" leading-relaxed text-lg">
                {event.description}
              </p>
            </div>

            {/* Event Details Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Event Details</h2>
              <div className="bg-white/20 rounded-3xl p-8 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium">Age Restriction</span>
                  <span className="font-bold">18+</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium">Dress Code</span>
                  <span className="font-bold">Casual</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium">Expected Attendees</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Amenities</h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-6 py-2 rounded-xl bg-primary/10 text-primary border border-primary font-bold">
                  Parking
                </span>
                <span className="px-6 py-2 rounded-xl bg-primary/10 text-primary border border-primary font-bold">
                  Bar
                </span>
              </div>
            </div>

            <div className="">
              <h2 className="text-2xl font-bold">Ticket info</h2>
              <div className="mt-5">
                <DataTable
                  data={ticketData}
                  columns={columns}
                  emptyMessage="No tour dates available currently." />
              </div>
            </div>
            {/* Event Tags Section */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Event Tags</h2>
              <div className="flex">
                <span
                  className="px-6 py-2 rounded-xl bg-primary/10 text-primary border border-primary font-bold">
                  Stand Up Comedian
                </span>
              </div>
            </section>

            <div className="">
              <h2 className="text-2xl font-bold">More Events Like This</h2>
              <div className="container mx-auto pt-5">
                <div className="grid md:grid-cols-2 gap-6">
                  {allEvents.map((event: any) => (
                    <EventCard event={event} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (Sticky) */}
          <div className="relative z-10 w-full">
            <div className="sticky top-10 space-y-6">
              {/* Ticket Card */}
              <div className="p-8 rounded-[2.5rem] bg-background/20 border border-surface/40 shadow-2xl space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold uppercase mb-1">Price starting at</p>
                    <p className="text-3xl font-black italic">₹{event.price}</p>
                  </div>
                  <div className="flex items-center gap-1 text-background text-xs font-bold">
                    <CheckCircle2 size={14} /> Available
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className='w-full!'
                    variant="primary"
                    title="Book Tickets Now"
                  />
                  <p className="text-center text-[10px] uppercase font-bold tracking-widest">
                    No hidden fees at checkout
                  </p>
                </div>

                {/* Social Proof inside card */}
                <div className="pt-6 border-t border-surface/30 flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} alt="attendee" className="w-10 h-10 rounded-full" />
                    ))}
                  </div>
                  <p className="text-xs font-bold">+{event.attendees} People Going</p>
                </div>
              </div>

              {/* Artist Lineup */}
              <div className="p-6 rounded-3xl bg-background/20 border border-surface/40 shadow-2xl space-y-6">
                <h3 className="text-xl font-bold">Artist Lineup</h3>
                <Link
                  to="/$artist/$artistId" params={{ artist: "artist", artistId: "karan-aujla" }} className="flex items-center justify-between group cursor-pointer p-2 -m-2">
                  <div className="flex items-center gap-4">
                    <img src="https://i.pravatar.cc/150?u=karan" alt="Karan Aujla" className="w-14 h-14 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-lg">Karan Aujla</h4>
                      <p className="text-sm text-background/60">Desi hip hop</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="" />
                </Link>
              </div>

              {/* Host Details */}
              <div className="p-6 rounded-3xl bg-background/20 border border-surface/40 shadow-2xl space-y-6">
                <h3 className="text-xl font-bold">Host Details</h3>
                <Link to="/hots/$hostId" params={{ hostId: "contests-mumbai" }} className="flex items-center justify-between group cursor-pointer p-2 -m-2">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl border border-surface/20 overflow-hidden flex items-center justify-center p-1 bg-white">
                      <img src="https://ui-avatars.com/api/?name=ae&background=0D8ABC&color=fff&rounded=true&bold=true&size=100" alt="Contests Mumbai logo" className="w-full h-full object-contain rounded-lg" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors">Contests Mumbai</h4>
                      <p className="text-sm text-background /60">68 Followers</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="" />
                </Link>

                <div className="flex gap-4 mt-5">
                  <Button
                    variant="primary"
                    title="Follow"
                    icon={<Plus size={16} className="text-background" />}
                  />
                  <Button
                    variant="primary"
                    title="Message"
                    icon={<MessageSquare size={16} className="text-background" />}
                  />
                </div>

                <div className="flex items-center gap-2 text-text/70 pt-4 border-t border-surface/10">
                  <Star size={16} className="text-background /40" />
                  <span className="text-sm font-medium text-background">3.9/5 Rating - 8 Reviews</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div >
  );
}