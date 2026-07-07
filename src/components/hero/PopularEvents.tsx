"use client"
import { eventsApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EventCard from "../ui/EventCard";

export default function PopularEvents() {
    const [selectedCity] = useState("mumbai");

    const { data, isLoading, error } = useQuery({
        queryKey: ['/events'],
        queryFn: eventsApi.getEvents,
    });

    if (isLoading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-white">Error loading events</div>;

    // Based on your JSON: The list is in data.data
    const eventsList = data?.data || [];

    return (
        <>
            <div className="container mx-auto px-6 py-10">
                <p className="text-3xl font-semibold text-white mb-6 capitalize">
                    {selectedCity}'s Popular Events
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {eventsList.map((event: any) => (
                        <EventCard event={event} key={event.id} />
                    ))}
                </div>
                
                {eventsList.length === 0 && (
                    <div className="text-gray-500">No events found.</div>
                )}
            </div>
        </>
    )
}