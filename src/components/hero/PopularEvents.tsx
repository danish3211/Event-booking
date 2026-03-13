"use client"
import { allEvents } from "@/constants";
import { useState } from "react";
import EventCard from "../ui/EventCard";

export default function PopularEvents() {
    const [selectedCity,] = useState("mumbai");
    return (
        <>
            <p className="text-3xl font-semibold text-background">{selectedCity}'s Popular Events</p>
            <div className="container mx-auto px-6 py-10">
                <div className="grid md:grid-cols-4 gap-6">
                    {allEvents.map((event) => (
                        <EventCard event={event} key={event.id} />
                    ))}
                </div>
            </div>
        </>
    )
}