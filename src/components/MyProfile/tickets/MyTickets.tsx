"use client";

import { useState } from "react";
import { Ticket, Calendar, MapPin, Clock, QrCode } from "lucide-react";

interface TicketItem {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    time: string;
    venue: string;
    type: string;
    price: string;
    status: string;
    image: string;
    category: string;
}

interface MyTicketsProps {
  onTicketClick: (ticketId: string) => void;
}

const MyTickets = ({onTicketClick}: MyTicketsProps) => {
    const [activeTab, setActiveTab] = useState("past");

    const pastTickets: TicketItem[] = [
        {
            id: "1",
            title: "Summer Music Festival 2024",
            subtitle: "The Electronic Vibes",
            date: "15/07/2024",
            time: "19:00",
            venue: "Central Park Stadium",
            type: "VIP",
            price: "₹2,500",
            status: "Active",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
            category: "Music"
        },
        {
            id: "2",
            title: "Comedy Night Live",
            subtitle: "Funny Folks Comedy",
            date: "20/06/2024",
            time: "20:30",
            venue: "Laugh Club Mumbai",
            type: "General",
            price: "₹800",
            status: "Active",
            image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=200&fit=crop",
            category: "Comedy"
        },
        {
            id: "3",
            title: "Rock Concert 2024",
            subtitle: "Rock Stars Band",
            date: "10/03/2024",
            time: "21:00",
            venue: "Phoenix Marketcity",
            type: "Premium",
            price: "₹1,800",
            status: "Active",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=200&fit=crop",
            category: "Music"
        }
    ];

    const upcomingTickets: TicketItem[] = [];

    const tickets = activeTab === "past" ? pastTickets : upcomingTickets;

    return (
        <div className="space-y-4 ">
            {/* Tabs */}
            <div className="flex gap-2 rounded-xl bg-gray-800">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`flex-1 rounded-lg py-3 px-4 text-sm font-medium transition-all ${activeTab === "upcoming"
                            ? "bg-primary text-white"
                            : "bg-transparent text-gray-400 hover:text-white"
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Calendar size={16} />
                        <span>Upcoming ({upcomingTickets.length})</span>
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("past")}
                    className={`flex-1 rounded-lg py-3 px-4 text-sm font-medium transition-all ${activeTab === "past"
                            ? "bg-primary text-white"
                            : "bg-transparent text-gray-400 hover:text-white"
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Clock size={16} />
                        <span>Past ({pastTickets.length})</span>
                    </div>
                </button>
            </div>

            {/* Tickets List */}
            <div className="space-y-4 ">
                {tickets.length === 0 ? (
                    <div className="text-center py-12">
                        <Ticket size={48} className="mx-auto mb-4 text-gray-600" />
                        <p className="text-gray-400">No tickets found</p>
                    </div>
                ) : (
                    tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            onClick={() => onTicketClick(ticket.id)}
                            className="rounded-2xl bg-gray-900/80 backdrop-blur-sm p-3 shadow-lg border border-gray-800 cursor-pointer "
                        >
                            <div className="flex gap-4">
                                {/* Event Image */}
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={ticket.image}
                                        alt={ticket.title}
                                        className="w-24 h-24 rounded-xl object-cover"
                                    />
                                    <div className="absolute -top-2 -right-2">
                                        <span className="bg-purple-500 text-xs text-background px-2 py-1 rounded-md font-semibold">
                                            {ticket.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Event Details */}
                                <div className="flex-1 space-y-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{ticket.title}</h3>
                                        <p className="text-gray-400 text-sm text-primary">{ticket.subtitle}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <Calendar size={14} />
                                            <span>{ticket.date}</span>
                                            <span className="">•</span>
                                            <Clock size={14} />
                                            <span>{ticket.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <MapPin size={14} />
                                            <span>{ticket.venue}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="grid gap-2">
                                            <span className="bg-yellow-600/30 w-fit text-yellow-500 text-xs px-2 py-1 rounded-sm font-semibold">
                                                {ticket.type}
                                            </span>
                                            <span className="bg-green-600/30 t text-green-600 ext-xs px-2 py-1 rounded-sm font-semibold">
                                               • {ticket.status}
                                            </span>
                                        </div>
                                        <span className="text-lg font-bold text-white">{ticket.price}</span>
                                    </div>
                                </div>

                                {/* Ticket Icon */}
                                <div className="flex items-center justify-center bg-white/10 p-1.5 rounded-xl h-fit">
                                  <QrCode className="text-primary"/>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyTickets;