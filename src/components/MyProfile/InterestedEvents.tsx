"use client";

import { useState } from "react";
import { MapPin, Clock, Bookmark, Calendar } from "lucide-react";
import EventCard from "../ui/EventCard";
import { EVENTS } from "@/constants";

interface EventItem {
  id: string;
  title: string;
  price: string;
  date: string;
  time: string;
  venue: string;
  distance: string;
  likes: string;
  category: string;
  image: string;
}

const InterestedEvents = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`rounded-lg py-3 px-6 text-sm font-medium whitespace-nowrap transition-all ${
            activeTab === "all"
              ? "bg-primary text-white"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`rounded-lg py-3 px-6 text-sm font-medium whitespace-nowrap transition-all ${
            activeTab === "upcoming"
              ? "bg-primary text-white"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("ongoing")}
          className={`rounded-lg py-3 px-6 text-sm font-medium whitespace-nowrap transition-all ${
            activeTab === "ongoing"
              ? "bg-primary text-white"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          Ongoing
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`rounded-lg py-3 px-6 text-sm font-medium whitespace-nowrap transition-all ${
            activeTab === "completed"
              ? "bg-primary text-white"
              : "bg-gray-800 text-gray-400 hover:text-white"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {EVENTS.map((event) => (
        <EventCard event={event}/>
        ))}
      </div>
    </div>
  );
};

export default InterestedEvents;