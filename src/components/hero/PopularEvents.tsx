"use client"
import type { IEvent } from "@/interfaces/Event.interface";
import { useMemo, useState } from "react";
import EventCard from "../ui/EventCard";

export default function PopularEvents() {
    const [selectedCity,] = useState("mumbai");
    // Enhanced event data with proper IEvent interface
    const allEvents: IEvent[] = useMemo(
        () => [
            {
                id: "1",
                title: "Shakira Live in Concert",
                category: "Music",
                coverImage:
                    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
                date: "2024-04-15",
                time: "8:00 PM",
                venue: "Phoenix MarketCity",
                location: "Mumbai",
                distance: 2.5,
                priceRange: { min: 1500, max: 5000 },
                attendees: 2500,
                isBookmarked: false,
                isFeatured: true,
                organizer: "Live Nation",
                ticketTiers: [
                    {
                        id: "1",
                        name: "General Admission",
                        price: 1500,
                        description: "Access to main arena",
                        available: 100,
                        total: 100,
                        perks: ["Main arena access", "Food court access"],
                    },
                    {
                        id: "2",
                        name: "VIP Pass",
                        price: 5500,
                        description: "Premium experience with exclusive perks",
                        available: 50,
                        total: 50,
                        perks: [
                            "Front section access",
                            "Dedicated bar",
                            "VIP restrooms",
                            "Fast track entry",
                        ],
                    },
                    {
                        id: "3",
                        name: "VVIP Pass",
                        price: 12000,
                        description: "Ultimate luxury package",
                        available: 25,
                        total: 25,
                        perks: [
                            "Artist meet & greet",
                            "Backstage access",
                            "Premium bar",
                            "Dedicated host",
                            "Exclusive merchandise",
                        ],
                    },
                ],
            },
            {
                id: "4",
                title: "Live Jazz Evening",
                category: "Jazz",
                coverImage:
                    "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&h=300&fit=crop",
                date: "2024-04-25",
                time: "8:30 PM",
                venue: "Blue Note Jazz Club",
                location: "Mumbai",
                distance: 6.8,
                priceRange: { min: 1200, max: 3000 },
                attendees: 200,
                isBookmarked: true,
                isFeatured: true,
                organizer: "Jazz Collective",
                ticketTiers: [
                    {
                        id: "4",
                        name: "Early Bird Pass",
                        price: 1200,
                        description: "Limited early bird pricing",
                        available: 50,
                        total: 100,
                        perks: ["Early bird pricing", "Main venue access"],
                    },
                    {
                        id: "5",
                        name: "General Admission Pass",
                        price: 2000,
                        description: "Standard admission to the venue",
                        available: 80,
                        total: 150,
                        perks: ["Standard admission", "Bar access"],
                    },
                    {
                        id: "6",
                        name: "VIP Pass",
                        price: 3000,
                        description: "Premium experience package",
                        available: 15,
                        total: 25,
                        perks: ["VIP seating", "Complimentary drinks", "Meet the artist"],
                    },
                ],
            },
            {
                id: "7",
                title: "Electronic Music Festival",
                category: "Electronic",
                coverImage:
                    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&h=300&fit=crop",
                date: "2024-05-10",
                time: "7:00 PM",
                venue: "Mahalaxmi Race Course",
                location: "Mumbai",
                distance: 4.2,
                priceRange: { min: 2000, max: 8000 },
                attendees: 5000,
                isBookmarked: false,
                isFeatured: false,
                organizer: "EDM Collective",
                ticketTiers: [
                    {
                        id: "7",
                        name: "General Entry",
                        price: 2000,
                        description: "Access to main arena",
                        available: 500,
                        total: 1000,
                        perks: ["Main arena access", "Food court access"],
                    },
                    {
                        id: "8",
                        name: "VIP Experience",
                        price: 5000,
                        description: "Premium festival experience",
                        available: 50,
                        total: 100,
                        perks: ["VIP area access", "Premium bar", "Fast entry"],
                    },
                    {
                        id: "9",
                        name: "VVIP Backstage",
                        price: 8000,
                        description: "Ultimate backstage experience",
                        available: 10,
                        total: 20,
                        perks: [
                            "Backstage access",
                            "Artist meet & greet",
                            "Premium hospitality",
                        ],
                    },
                ],
            },
            {
                id: "10",
                title: "Rock Concert Night",
                category: "Rock",
                coverImage:
                    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=500&h=300&fit=crop",
                date: "2024-05-20",
                time: "8:00 PM",
                venue: "Phoenix Arena",
                location: "Mumbai",
                distance: 3.5,
                priceRange: { min: 1800, max: 6000 },
                attendees: 3000,
                isBookmarked: true,
                isFeatured: false,
                organizer: "Rock Nation",
                ticketTiers: [
                    {
                        id: "10",
                        name: "Standing",
                        price: 1800,
                        description: "Standing area access",
                        available: 200,
                        total: 500,
                        perks: ["Standing area", "Bar access"],
                    },
                    {
                        id: "11",
                        name: "Seated",
                        price: 3500,
                        description: "Reserved seating",
                        available: 80,
                        total: 150,
                        perks: ["Reserved seat", "Premium view"],
                    },
                    {
                        id: "12",
                        name: "VIP Lounge",
                        price: 6000,
                        description: "VIP lounge experience",
                        available: 20,
                        total: 30,
                        perks: ["VIP lounge", "Meet & greet", "Premium drinks"],
                    },
                ],
            },
        ],
        [],
    );
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