import { formatDateInput } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
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
  event: any; // Mapped to your new API object structure
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  // --- API DATA MAPPING ---
  const title = event?.name || "Untitled Event";
  const slug = event?.slug;
  const categoryName = event?.category?.name || "General";
  
  // Get the first image from the eventImages array
  const coverImage = event?.eventImages?.[0]?.imageUrl || "https://via.placeholder.com/400x200";

  // Get price from the first ticket tier
  const displayPrice = event?.eventTicketTiers?.[0]?.price || 0;

  // Get date and time from the first eventTimes entry
  const eventTimeEntry = event?.eventTimes?.[0];
  const startDate = eventTimeEntry?.startDate ? new Date(eventTimeEntry.startDate) : null;
  const formattedDate = startDate ? formatDateInput(startDate.toISOString()) : "TBA";
  const formattedTime = startDate ? startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "TBA";

  // Attendees (Calculating based on sold tickets: total - available)
  const totalAttendees = event?.eventTicketTiers?.reduce((acc: number, tier: any) => 
    acc + (tier.numberOfTickets - tier.availableTickets), 0) || 0;

  const handleCardClick = () => {
    if (slug) {
      navigate({
        to: "/events/$eventId",
        params: { eventId: slug },
      });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#141414] border border-white/10 shadow-xl transition-colors hover:border-[#8A3FFC]/50 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1625] via-transparent to-black/20" />

        {/* Category Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10">
          {categoryName}
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
            {title}
          </h3>
          <span className="whitespace-nowrap text-lg font-bold text-[#8A3FFC]">
            ₹{displayPrice.toLocaleString()}+
          </span>
        </div>

        {/* Info Rows */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-[#8A3FFC]" />
            <span className="text-[#FFD700] font-medium">
              {formattedDate} • {formattedTime}
            </span>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-400">
            <MapPin size={14} className="text-[#8A3FFC] mt-0.5 shrink-0" />
            <span className="line-clamp-1 flex-1">
              {/* Using description as a fallback for venue name based on API */}
              {event.description || "Venue location"}
            </span>
            <span className="text-xs text-gray-500">Nearby</span>
          </div>
        </div>

        {/* Footer Row */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
            <Users size={14} />
            {totalAttendees.toLocaleString()}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTicketModal(true);
            }}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-all hover:bg-[#8A3FFC] hover:text-white"
          >
            Book Tickets
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;