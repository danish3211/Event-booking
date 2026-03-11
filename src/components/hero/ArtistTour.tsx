"use client"
import { useState } from "react";
import { ARTISTS } from "../../constants";
import ProfileCard from "../ui/ProfileCard";
import { useNavigate } from "@tanstack/react-router";

export default function ArtistTour() {
    const [selectedCity,] = useState("mumbai");
    const navigate = useNavigate();

    return (
        <section className="py-12">
            <p className="text-3xl font-semibold mb-8 text-background">Artists on Tour in {selectedCity}</p>
            <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-6">
                {ARTISTS.map((artist) => (
                    <ProfileCard
                        key={artist.id}
                        name={artist.name}
                        subtitle={artist.genre}
                        image={artist.image}
                        onFollow={() => console.log(`Followed ${artist.name}`)}
                        onClick={() => navigate({ to: `/artist/$artistId`, params: { artistId: artist.slug } })}
                    />
                ))}
            </div>
        </section>
    );
}