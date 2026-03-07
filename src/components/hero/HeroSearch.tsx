"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CitySelector from "../ui/CitySelector";

export default function HeroSearch() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const trendingTopics = [
        "Exhibition",
        "Class",
        "Workshop",
        "Expo",
        "Designer",
        "Sport",
        "Race",
        "Spiritual",
        "Fest",
        "Business",
        "Health",
        "Movie",
        "Comedy",
        "Painting",
        "Webinar",
    ];

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <section
            className="relative min-h-[80vh] flex flex-col items-center justify-center text-center text-white px-4"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 w-full max-w-4xl">
                <h1 className="text-5xl font-bold mb-4">
                    <span className="text-primary">Live.</span> Don't Just Exist.
                </h1>

                <p className="text-xl mb-10 text-gray-200">
                    Discover The Most Happening Events Around You
                </p>

                {/* Search Box Wrapper */}
                <div ref={dropdownRef} className="relative">
                    {/* Search Input */}
                    <div className="flex items-center bg-background rounded-xl px-4 py-2 shadow-xl">
                        <Search className="text-text/50 mr-3" size={20} />

                        <input
                            type="text"
                            placeholder="Search Events, Categories, Location..."
                            className="flex-1 outline-none text-text bg-transparent"
                            onFocus={() => setOpen(true)}
                        />

                        {/* Divider */}
                        <div className="" />


                        <CitySelector textColorClass="text-text" />
                    </div>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute left-0 right-0 mt-2 bg-background border border-surface/30 rounded-xl shadow-2xl text-left p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                            <h3 className="text-text font-semibold mb-4">
                                Trending Topics
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                {trendingTopics.map((topic) => (
                                    <button
                                        key={topic}
                                        className="px-4 py-2 bg-surface/20 hover:bg-primary/20 text-text rounded-full text-sm transition"
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-white! z-0">

                <h3 className="text-xl md:text-2xl font-medium text-center md:text-left">
                    Download the App & Step Into the Moment
                </h3>

                <div className="flex items-center gap-4">
                    <a
                        href="#"
                        className="px-4 py-2 rounded-lg" >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Google Play"
                            className="h-15"
                        />
                    </a>
                    <a
                        href="#"
                        className=" px-4 py-2 rounded-lg"
                    >
                        <img
                            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                            alt="App Store"
                            className="h-15"
                        />
                    </a>

                </div>
            </div>
        </section>
    );
}
