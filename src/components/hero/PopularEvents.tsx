"use client"
import { useState } from "react";
import { EventCard } from "../ui/EventCard";
import { EVENTS } from "@/constants";

export default function PopularEvents() {
    const [selectedCity,] = useState("mumbai");

    return (
        <>
            <p className="text-3xl font-semibold">{selectedCity}'s Popular Events</p>
            <div className="container mx-auto px-6 py-10">
                <div className="grid md:grid-cols-4 gap-6">
                    {EVENTS.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>
            </div>
        </>
    )
}