import type { IVenue } from "@/interfaces/Event.interface";
import { slugify } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  MapPin,
  Star,
  Users
} from "lucide-react";
import React, { useState } from "react";

interface VenueCardProps {
  venue: IVenue;
  onNavigate: (slug: string) => void;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, onNavigate }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

 const handleCardClick = () => {
  const slug = slugify(venue.name);
  onNavigate(slug);
};

  // Calculate total capacity from spaces
  const totalCapacity = venue.spaces?.reduce((sum: number, space: { capacity: number; }) => sum + space.capacity, 0) || 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#141414] border border-white/10 shadow-xl transition-colors hover:border-[#8A3FFC]/50 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={venue.venue_images[0]}
          alt={venue.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1625] via-transparent to-black/20" />

        {/* Status Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-[#8A3FFC] px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-[#8A3FFC]/50">
          {venue.status}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
          className="absolute right-4 top-4 rounded-xl bg-black/40 p-2 text-white backdrop-blur-md border border-white/10 transition-colors hover:bg-[#8A3FFC]"
        >
          {isBookmarked ? (
            <BookmarkCheck size={18} fill="currentColor" />
          ) : (
            <Bookmark size={18} />
          )}
        </button>

        {/* Rating Badge */}
        {venue.rating && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-md border border-white/10">
            <Star size={14} className="text-[#FFD700] fill-[#FFD700]" />
            <span>{venue.rating}</span>
            <span className="text-white/60 text-xs">({venue.reviewCount})</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="line-clamp-1 text-lg font-bold text-white leading-tight">
            {venue.name}
          </h3>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {venue.keywords.slice(0, 3).map((keyword: string, index: number) => (
            <span
              key={index}
              className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-medium text-gray-400 border border-white/5"
            >
              {keyword}
            </span>
          ))}
          {venue.keywords.length > 3 && (
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-medium text-gray-400 border border-white/5">
              +{venue.keywords.length - 3}
            </span>
          )}
        </div>

        {/* Info Rows */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2 text-sm text-gray-400">
            <MapPin size={14} className="text-[#8A3FFC] mt-0.5 shrink-0" />
            <span className="line-clamp-2 flex-1">
              {venue.address}
            </span>
          </div>

          {totalCapacity > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Users size={14} className="text-[#8A3FFC]" />
              <span>Capacity: {totalCapacity.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Footer Row */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
            <Calendar size={14} className="text-[#FFD700]" />
            {venue.upcomingEvents} Upcoming Events
          </div>

          <button
            className="flex items-center gap-2 rounded-full bg-[#8A3FFC]/10 px-4 py-2 text-sm font-bold text-[#8A3FFC] transition-all hover:bg-[#8A3FFC] hover:text-white"
          >
            View Venue
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default VenueCard;
