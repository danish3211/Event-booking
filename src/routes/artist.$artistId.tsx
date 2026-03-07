import { createFileRoute } from '@tanstack/react-router';
import { MapPin, Facebook, Twitter, Instagram, Link as LinkIcon, Plus, MessageSquare, ExternalLink, CalendarDays } from 'lucide-react';
import { TourDatesTable } from '../components/ui/TourDatesTable';

import { Route as ArtistRoute } from './artist.$artistId';
import { ARTISTS } from '../constants';

export const Route = createFileRoute('/artist/$artistId')({
    component: ArtistProfile,
});

const getSocialIcon = (id: string) => {
    switch (id) {
        case 'twitter': return Twitter;
        case 'facebook': return Facebook;
        case 'instagram': return Instagram;
        default: return LinkIcon;
    }
};

function ArtistProfile() {
    const { artistId } = ArtistRoute.useParams();
    const artist = ARTISTS.find(a => a.slug === artistId);

    if (!artist) {
        return <div className="min-h-screen flex items-center justify-center">Artist not found</div>;
    }

    return (
        <div className="min-h-screen bg-background text-text pb-24 font-sans">
            {/* 1. Banner Section (Dark Mode theme) */}
            <div className="relative pt-32 pb-16 px-6 lg:px-20 overflow-hidden bg-[#121212] text-white">
                {/* Subtle background image overlay */}
                <div
                    className="absolute inset-0 opacity-20 mix-blend-overlay object-cover w-full h-full"
                    style={{ backgroundImage: `url(${artist.bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-[#121212]/80 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-[#121212] via-[#121212]/40 to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-10 mt-10">
                    <div className="space-y-5 text-center md:text-left flex-1">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight">{artist.name}</h1>
                        <p className="text-lg md:text-xl text-white/70 font-medium tracking-wide">
                            {artist.followers} Followers • {artist.genre}
                        </p>
                        <div className="flex items-center gap-4 justify-center md:justify-start pt-4">
                            <button className="flex items-center gap-2 px-8 py-3 bg-[#00A3FF] hover:bg-[#0082CC] text-white font-bold rounded-full transition-all shadow-lg shadow-[#00A3FF]/20">
                                <Plus size={18} strokeWidth={3} /> Follow
                            </button>
                            <button className="flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-full transition-all">
                                <MessageSquare size={18} /> Message
                            </button>
                        </div>
                    </div>

                    {/* Circular Profile Image (Right Aligned on Desktop) */}
                    <div className="shrink-0">
                        <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-48 h-48 md:w-64 md:h-64 rounded-full border-[6px] border-[#2A2A2A] shadow-2xl object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 space-y-16">

                {/* 2. Top Row: Nearest Show & About Artist (2 Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                    {/* Left Column: Nearest Show */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-text tracking-tight">Nearest show for you</h2>
                            <button className="text-sm font-bold text-primary hover:text-vivid flex items-center gap-1.5 transition-colors uppercase tracking-wider">
                                Find Tickets <ExternalLink size={14} />
                            </button>
                        </div>

                        <div className="p-6 rounded-3xl bg-background border border-surface/30 shadow-sm flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow group">
                            {/* Date Box */}
                            <div className="flex flex-col items-center justify-center shrink-0 w-24 h-24 rounded-2xl bg-surface/10 text-text group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-surface/20">
                                <span className="text-3xl font-black">{artist.nearestShow.date.day}</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-text/60 group-hover:text-primary/80">{artist.nearestShow.date.month}</span>
                            </div>

                            <div className="flex-1 space-y-3 text-center sm:text-left">
                                <h3 className="text-lg font-bold leading-snug">{artist.nearestShow.title}</h3>
                                <p className="text-sm text-text/60 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                                    <MapPin size={16} className="text-text/40" /> {artist.nearestShow.location}
                                </p>
                            </div>

                            <button className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-vivid text-white font-bold rounded-2xl transition-all shrink-0 shadow-lg shadow-primary/20">
                                Find Tickets
                            </button>
                        </div>
                    </div>

                    {/* Right Column: About Artist */}
                    <div className="lg:col-span-5 space-y-6">
                        <h2 className="text-2xl font-black text-text tracking-tight">About {artist.name}</h2>

                        <div className="p-8 rounded-3xl bg-background border border-surface/30 shadow-sm space-y-6 h-full">
                            <p className="text-text/70 leading-relaxed text-[15px] font-medium">
                                {artist.about}
                            </p>

                            {/* Socials Block */}
                            <div className="pt-6 border-t border-surface/20 space-y-4">
                                <h4 className="text-[11px] font-bold text-text/50 uppercase tracking-widest">Find {artist.name} on</h4>
                                <div className="flex gap-4">
                                    {artist.socials.map((social) => {
                                        const Icon = getSocialIcon(social.id);
                                        return (
                                            <a key={social.id} href={social.link} className="p-3 rounded-full bg-surface/10 hover:bg-primary hover:text-white border border-surface/20 transition-all text-text/60 hover:scale-105 active:scale-95">
                                                <Icon size={18} />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Bottom Row: Table */}
                <div className="space-y-8 pt-8 border-t border-surface/20">
                    <div className="flex items-center gap-3">
                        <CalendarDays className="text-primary" size={28} />
                        <h2 className="text-2xl font-black text-text tracking-tight">{artist.name}'s Concerts & Tour Dates</h2>
                    </div>

                    <TourDatesTable data={artist.tourDates} />
                </div>

            </div>
        </div>
    );
}
