import { allVenues } from "@/constants";
import { useState } from "react";
import VenueCard from "../ui/VenueCard";

interface PopularVenuesProps {
  onNavigate: (slug: string) => void;
}

export default function PopularVenues({ onNavigate }: PopularVenuesProps) {
  const [selectedCity,] = useState("mumbai");

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-3xl font-semibold text-white">
              Popular Venues in {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
            </p>
            <p className="text-gray-400 mt-2">Discover top-rated venues for your next event</p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition">
            View All Venues
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allVenues.map((venue: any) => (
            <VenueCard venue={venue} key={venue.id} onNavigate={onNavigate} />
          ))}
        </div>

        <button className="md:hidden w-full mt-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition">
          View All Venues
        </button>
      </div>
    </section>
  );
}
