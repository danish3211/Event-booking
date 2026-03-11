"use client";

import { useState } from "react";
import { MapPin, Search, LocateFixed, ChevronDown } from "lucide-react";
import CityGrid from "./CityGrid";
import Modal from "@/components/ui/Modal";

type CitySelectorProps = {
  textColorClass?: string;
};

export default function CitySelector({
  textColorClass = "text-white",
}: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState("Surat");

  const cities = [
    { name: "Ahmedabad", events: 581 },
    { name: "Mumbai", events: 742 },
    { name: "Gandhinagar", events: 40 },
    { name: "Vadodara", events: 57 },
    { name: "Navi Mumbai", events: 25 },
  ];

  return (
    <>
      {/* 🔹 City Button */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 ${textColorClass} px-4 py-2 rounded-full backdrop-blur-md transition text-xl`}
        >
          <MapPin size={18} />
          {city}
          <ChevronDown size={16} />
        </button>

        {/* Tooltip */}
        <div className="absolute left-1/2 -translate-x-1/2 top-12 w-max bg-black text-white text-sm px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
          (Click to change the city.)
        </div>
      </div>

      {/* 🔹 Reusable Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="xl"
      >
        {/* Close button handled inside Modal if you added title */}
        
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-center text-background">
            AllEvents in your city
          </h2>
        </div>

        {/* Search */}
        <div className="flex items-center border rounded-lg px-4 py-3 mb-6">
          <Search size={30} className="mr-2 text-background" />
          <input
            type="text"
            placeholder="Enter your city..."
            className="w-full outline-none text-xl text-background"
          />

          <button className="flex items-center cursor-pointer gap-2 text-blue-600 font-medium w-[200px]">
            <LocateFixed size={20} />
            Current Location
          </button>
        </div>

        {/* City Grid */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-background">
            Explore Cities Near You
          </h3>

          <CityGrid
            cities={cities}
            onSelect={(selectedCity) => {
              setCity(selectedCity.name);
              setIsOpen(false);
            }}
          />
        </div>
      </Modal>
    </>
  );
}