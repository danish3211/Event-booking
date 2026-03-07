import { Link } from '@tanstack/react-router';
import { Heart, MapPin } from 'lucide-react';

interface EventCardProps {
  id: number | string;
  image: string;
  date: string;
  time: string;
  title: string;
  venue: string;
  interestedCount: number;
  price?: string;
  category?: string;
  attendees: string[];
}

export const EventCard = ({
  id,
  image,
  date,
  time,
  title,
  venue,
  interestedCount,
  price,
  category = "Concert",
  attendees
}: EventCardProps) => {
  return (
    <Link
    target='_blank'
      to="/events/$eventId"
      params={{ eventId: id.toString() }}
      className="group relative w-full max-w-[340px] transition-all duration-500 cursor-pointer">
      {/* Background Glow (Visible on Hover) */}
      <div className="absolute -inset-1 rounded-[2.5rem] bg-linear-to-r from-primary to-vivid opacity-0 blur transition duration-500 group-hover:opacity-30" />

      {/* Main Card Body */}
      <div className="relative flex flex-col overflow-hidden rounded-4xl bg-surface/20 border border-surface/30 shadow-2xl backdrop-blur-sm">

        {/* Image Section */}
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />

          {/* Top Overlay: Category & Like */}
          <div className="absolute inset-x-0 top-0 flex justify-between p-4">
            <span className="rounded-full bg-white/10 px-3 py-1 h-fit text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/20">
              {category}
            </span>
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-primary/80">
              <Heart size={18} />
            </button>
          </div>

          {/* Bottom Overlay: Date Pill */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 rounded-xl bg-white/20 p-2 px-3 shadow-xl text-white">
              <span className="text-xs font-black  leading-none">{date.split(',')[0]}</span>
              <div className="h-3 w-px bg-primary" />
              <span className="text-xs font-bold leading-none">{time}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col p-5">
          <h3 className="mb-2 line-clamp-1 text-xl font-bold text-text">
            {title}
          </h3>

          <div className="flex items-center gap-2 text-text/60">
            <MapPin size={16} className="text-primary" />
            <span className="text-sm font-medium truncate">{venue}</span>
          </div>

          {/* Footer: Price and Social Proof */}
          <div className="mt-2 flex items-center justify-between rounded-2xl bg-white/5 p-3">
            <div className="flex items-center gap-3">
              {/* Avatar Stack */}
              <div className="flex -space-x-2 overflow-hidden p-1">
                {attendees.slice(0, 3).map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Attendee ${i + 1}`}
                    className="inline-block h-7 w-7 rounded-full object-cover hover:translate-y-[-2px] transition-transform cursor-pointer"
                  />
                ))}

                {/* If more than 3 attendees, show the count */}
                {attendees.length > 3 && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white border border-white/20">
                    +{attendees.length - 3}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-text/50 tracking-tight">
                  {interestedCount.toLocaleString()}+ Interested
                </span>
                <span className="text-[8px] uppercase font-medium text-text/50">
                  Join the vibe
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[10px] text-text/50 uppercase font-bold">Starts at</span>
              <span className="text-sm font-black text-text italic">
                {price ? `₹${price}` : 'FREE'}
              </span>
            </div>
          </div>

          <button className="mt-4 w-full rounded-xl bg-primary hover:bg-vivid py-3 text-xs font-bold text-white transition-all active:scale-95 shadow-lg shadow-primary/20">
            Get Tickets
          </button>
        </div>
      </div>
    </Link>
  );
};