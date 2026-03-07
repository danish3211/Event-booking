"use client"
import { useState } from "react";
import CityGrid from "../ui/CityGrid";

export default function ExploreCity() {
    const [, setIsOpen] = useState(false);
    const [, setCity] = useState("Surat");

    const cities = [
        { name: "Ahmedabad", events: 581 },
        { name: "Mumbai", events: 742 },
        { name: "Gandhinagar", events: 40 },
        { name: "Vadodara", events: 57 },
        { name: "Search City", events: 25 },
    ];

    return (
        <div className="">
            <p className="text-3xl font-semibold">Explore Cities near you</p>
            <CityGrid
                className='mt-10 text-2xl! flex! justify-center gap-15'
                cities={cities}
                onSelect={(city) => {
                    setCity(city.name);
                    setIsOpen(false);
                }}
            />

        </div>
    )
}