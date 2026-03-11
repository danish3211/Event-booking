import type { IEvent } from "@/interfaces/Event.interface";
import { formatDateInput } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  MapPin,
  Users
} from "lucide-react";
import React, { useState } from "react";


interface EventCardProps {
  event: IEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isBookmarked, setIsBookmarked] = useState(event.isBookmarked);
  const [showTicketModal, setShowTicketModal] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#141414] border border-white/10 shadow-xl transition-colors hover:border-[#8A3FFC]/50"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1625] via-transparent to-black/20" />

        {/* Category Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10">
          {event.category}
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
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="line-clamp-2 text-lg font-bold text-white leading-tight">
            {event.title}
          </h3>
          <span className="whitespace-nowrap text-lg font-bold text-[#8A3FFC]">
            ₹{event.priceRange.min.toLocaleString()}+
          </span>
        </div>

        {/* Info Rows */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-[#8A3FFC]" />
            <span className="text-[#FFD700] font-medium">
              {formatDateInput(event.date)} • {event.time}
            </span>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-400">
            <MapPin size={14} className="text-[#8A3FFC] mt-0.5 shrink-0" />
            <span className="line-clamp-1 flex-1">
              {event.venue}, {event.location}
            </span>
            <span className="text-xs text-gray-500">{event.distance}km</span>
          </div>
        </div>

        {/* Footer Row */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
            <Users size={14} />
            {event.attendees.toLocaleString()}
          </div>

          <button
            onClick={() => setShowTicketModal(true)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-all hover:bg-[#8A3FFC] hover:text-white"
          >
            Book Tickets
          </button>
        </div>
      </div>

      {/* Logic for Modal would go here (e.g., using a Portal or Radix UI) */}
    </motion.div>
  );
};

export default EventCard;