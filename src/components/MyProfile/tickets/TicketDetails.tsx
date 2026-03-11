"use client";

import { Share2, Calendar, MapPin, ChevronRight, X, Maximize2, Map, Clock, Shirt, User } from "lucide-react";
import { useState } from "react";

interface TicketDetailProps {
  id: string;
  onClose?: () => void;
}

const TicketDetails = ({ id }: TicketDetailProps) => {
  const [showFullQR, setShowFullQR] = useState(false);

  // Mock data matching the React Native code
  const mockTicketData = {
    id: id || "1",
    eventTitle: "Summer Music Festival 2024",
    eventDate: "2024-07-15",
    eventTime: "19:00",
    doorOpenTime: "18:30",
    venue: "Central Park Stadium",
    venueAddress: "123 Central Park, Mumbai, Maharashtra 400001",
    ticketType: "VIP",
    price: 2500,
    status: "active",
    eventImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=ticket_${id}`,
    seatInfo: "Section A, Row 5, Seat 12",
    artist: "The Electronic Vibes",
    category: "Music",
    ticketNumber: `TKT${id?.padStart(8, '0')}`,
    orderDate: "2024-06-01T10:30:00Z",
    eventDescription: "Join us for an unforgettable night of electronic music featuring top DJs from around the world. Experience state-of-the-art sound systems and spectacular visual effects.",
    ageRestriction: "18+",
    dresscode: "Smart Casual",
    termsAndConditions: [
      "This ticket is non-refundable and non-transferable",
      "Entry is subject to venue security checks",
      "No outside food or drinks allowed",
      "Ticket must be presented with valid ID",
      "Event is subject to weather conditions"
    ]
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Music": return "bg-purple-600";
      case "Comedy": return "bg-orange-500";
      case "Theatre": return "bg-rose-500";
      case "Sports": return "bg-blue-500";
      default: return "bg-indigo-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "expired": return "bg-yellow-500";
      case "used": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="text-white">
      {/* Scrollable Content */}
      <div className="space-y-8 pb-10">
        {/* Header Image with Overlay */}
        <div className="relative h-48 -mx-6 -mt-6 mb-8">
          <img
            src={mockTicketData.eventImage}
            alt={mockTicketData.eventTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold">{mockTicketData.eventTitle}</h2>
              <p className="text-purple-400 font-medium">{mockTicketData.artist}</p>
            </div>
            <button className="p-2 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-colors">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* E-Ticket Card */}
        <div className={`rounded-3xl overflow-hidden shadow-2xl ${getCategoryColor(mockTicketData.category)}`}>
          <div className="p-6 bg-gradient-to-br from-white/10 to-transparent">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] font-bold tracking-[2px] opacity-80 uppercase">E-Ticket</p>
                <p className="text-lg font-bold">#{mockTicketData.ticketNumber}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(mockTicketData.status)}`}>
                {mockTicketData.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-[10px] font-bold opacity-70 tracking-wider mb-1">DATE</p>
                <p className="text-sm font-bold">
                  {new Date(mockTicketData.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold opacity-70 tracking-wider mb-1">TIME</p>
                <p className="text-sm font-bold">{mockTicketData.eventTime}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold opacity-70 tracking-wider mb-1">TYPE</p>
                <p className="text-sm font-bold">{mockTicketData.ticketType}</p>
              </div>
            </div>

            {mockTicketData.seatInfo && (
              <div className="mb-6">
                <p className="text-[10px] font-bold opacity-70 tracking-wider mb-1">SEAT</p>
                <p className="text-sm font-bold">{mockTicketData.seatInfo}</p>
              </div>
            )}

            {/* QR Code Section */}
            <div className="flex flex-col items-center pt-4 border-t border-white/20">
              <div
                className="relative group cursor-pointer bg-white p-2 rounded-2xl transition-transform hover:scale-105"
                onClick={() => setShowFullQR(true)}
              >
                <img src={mockTicketData.qrCode} alt="QR Code" className="w-32 h-32" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity rounded-2xl">
                  <Maximize2 size={24} className="text-white mb-1" />
                  <span className="text-[10px] font-bold">Show QR</span>
                </div>
              </div>
              <p className="text-[10px] font-medium mt-3 opacity-80 italic">Tap to enlarge QR code</p>
            </div>
          </div>
        </div>

        {/* Event Info Sections */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Event Information</h3>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-1">Date & Time</p>
                <p className="text-sm font-bold">{formatDate(mockTicketData.eventDate)} at {mockTicketData.eventTime}</p>
                <p className="text-xs text-gray-500 mt-1">Doors open at {mockTicketData.doorOpenTime}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 items-center">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-semibold mb-1">Venue</p>
                <p className="text-sm font-bold">{mockTicketData.venue}</p>
                <p className="text-xs text-gray-500 mt-1">{mockTicketData.venueAddress}</p>
              </div>
              <button className="p-2 text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            {mockTicketData.eventDescription}
          </p>
        </div>

        {/* quick links */}
        <section>
          <h2 className="text-xl font-black mb-6 tracking-tight">Quick Actions</h2>
          <div className="grid grid-cols-2 justify-center items-center gap-4">

            {/* Add to Calendar Card */}
            <button className="group flex flex-col items-center justify-center p-3 h-fit rounded-xl bg-surface/5 border border-surface/10 hover:bg-surface/10 transition-all active:scale-95">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4 shadow-sm border border-surface/5">
                <Calendar className="text-[#A855F7]" size={24} />
              </div>
              <span className="font-bold text-sm mb-1">Add to Calendar</span>
              <span className="text-[10px] font-medium text-background/40">Never miss the event</span>
            </button>

            {/* Get Directions Card */}
            <button className="group flex flex-col items-center justify-center p-3 h-fit rounded-xl bg-surface/5 border border-surface/10 hover:bg-surface/10 transition-all active:scale-95">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4 shadow-sm border border-surface/5">
                <Map className="text-[#3B82F6]" size={24} />
              </div>
              <span className="font-bold text-sm mb-1">Get Directions</span>
              <span className="text-[10px] font-medium text-background/40">Navigate to venue</span>
            </button>

          </div>
        </section>


        {/* additional info */}
        <section>
        <h2 className="text-xl font-black mb-6 tracking-tight">Additional Information</h2>
        <div className="space-y-6">
          
          {/* Age Restriction */}
          <div className="flex items-center gap-4">
            <div className="text-background/60">
              <User size={20} strokeWidth={2.5} />
            </div>
            <p className="font-bold text-sm text-background/80">
              Age Restriction: <span className="font-medium text-background/60">18+</span>
            </p>
          </div>

          {/* Dress Code */}
          <div className="flex items-center gap-4">
            <div className="text-background/60">
              <Shirt size={20} strokeWidth={2.5} />
            </div>
            <p className="font-bold text-sm text-background/80">
              Dress Code: <span className="font-medium text-background/60">Smart Casual</span>
            </p>
          </div>

          {/* Order Date */}
          <div className="flex items-center gap-4">
            <div className="text-background/60">
              <Clock size={20} strokeWidth={2.5} />
            </div>
            <p className="font-bold text-sm text-background/80">
              Order Date: <span className="font-medium text-background/60">01/06/2024</span>
            </p>
          </div>

        </div>
      </section>

        {/* Terms */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Terms & Conditions</h3>
          <div className="space-y-2">
            {mockTicketData.termsAndConditions.map((term, i) => (
              <div key={i} className="flex gap-3 text-sm text-gray-400">
                <span className="text-purple-500">•</span>
                <p>{term}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen QR Overlay */}
      {showFullQR && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          onClick={() => setShowFullQR(false)}
        >
          <div className="bg-white p-6 rounded-[40px] shadow-2xl mb-8 animate-in zoom-in duration-300">
            <img src={mockTicketData.qrCode} alt="Full QR Code" className="w-64 h-64" />
          </div>
          <h4 className="text-2xl font-bold mb-2">{mockTicketData.eventTitle}</h4>
          <p className="text-gray-400 font-mono">#{mockTicketData.ticketNumber}</p>
          <button
            className="absolute top-8 right-8 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setShowFullQR(false); }}
          >
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;