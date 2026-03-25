import { DataTable, type TableColumn } from '@/components/ui/DataTable';
import { ShareModal } from '@/components/ui/ShareModal';
import VenueCard from '@/components/ui/VenueCard';
import { allVenues } from '@/constants';
import type { VenueSpace } from '@/interfaces/Event.interface';
import { findVenueBySlug } from '@/lib/utils';
import {
    Calendar,
    CheckCircle2,
    ChevronRight,
    Heart,
    MapPin,
    MessageSquare,
    Navigation,
    Plus,
    Share2,
    Star,
    Users
} from 'lucide-react';
import React, { useState } from 'react';

interface VenueDetailsProps {
    venueSlug: string;
    onBack: () => void;
    onNavigate: (slug: string) => void;
}

interface SpaceInfo {
    name: string;
    capacity: string;
}

export default function VenueDetails({ venueSlug, onBack }: VenueDetailsProps) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const venueData = findVenueBySlug(allVenues, venueSlug);

    const handleNavigateToVenue = (slug: string) => {
        const url = `/venues/${slug}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    if (!venueData) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
                <p className="text-2xl mb-4">Venue not found</p>
                <p className="text-gray-400 mb-6">The venue "{venueSlug}" could not be found.</p>
                <button
                    onClick={onBack}
                    className="px-6 py-3 bg-[#8A3FFC] rounded-xl font-semibold hover:bg-[#8A3FFC]/80 transition"
                >
                    Go Back to Venues
                </button>
            </div>
        );
    }

    const venue = {
        title: venueData.name,
        address: venueData.address,
        description: venueData.description || "No description available.",
        date: venueData.date,
        image: venueData.venue_images[0],
        attendees: venueData.spaces?.reduce((sum: number, space: VenueSpace) => sum + space.capacity, 0) || 0,
        url: typeof window !== 'undefined' ? window.location.href : ''
    };

    const spaceColumns: TableColumn<SpaceInfo>[] = [
        {
            header: "Space Name",
            accessorKey: "name",
            render: (value) => <span className="font-bold text-[#8A3FFC]">{value}</span>
        },
        {
            header: "Capacity",
            accessorKey: "capacity",
            headerClassName: "text-right",
            className: "text-right font-mono"
        }
    ];

    const spaceData = venueData.spaces?.map((space: VenueSpace) => ({
        name: space.space_name,
        capacity: `${space.capacity.toLocaleString()} people`
    })) || [];

    // Get related venues (excluding current one)
    const relatedVenues = allVenues.filter(v => v.id !== venueData.id).slice(0, 2);

    // Policy icon mapping
    const getPolicyIcon = (iconName: string) => {
        const iconMap: Record<string, React.ReactNode> = {
            "Car": <Navigation size={18} />,
            "UserCheck": <Users size={18} />,
            "Utensils": <Share2 size={18} />,
            "Shirt": <Heart size={18} />,
            "Wallet": <Navigation size={18} />,
            "CloudRain": <Navigation size={18} />,
            "Accessibility": <Users size={18} />,
            "Shield": <CheckCircle2 size={18} />,
            "Train": <Navigation size={18} />
        };
        return iconMap[iconName] || <CheckCircle2 size={18} />;
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white pb-20">
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                event={{
                    title: venue.title,
                    url: venue.url,
                    image: venue.image,
                    date: venue.date
                }}
            />


            {/* Hero Banner Section - Image Gallery */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0 flex">
                    <img
                        src={venueData.venue_images[activeImageIndex]}
                        className="h-full w-full object-cover transition-opacity duration-500"
                        alt={venue.title}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

                {/* Floating Actions */}
                <div className="absolute top-6 right-6 flex gap-3">
                    <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="p-3 rounded-full bg-[#8A3FFC]/30 backdrop-blur-md border border-[#8A3FFC]/50 hover:bg-[#8A3FFC]/50 transition"
                    >
                        <Share2 size={20} className="text-white" />
                    </button>
                    <button className="p-3 rounded-full bg-[#8A3FFC]/30 backdrop-blur-md border border-[#8A3FFC]/50 hover:bg-[#8A3FFC]/50 transition">
                        <Heart size={20} className="text-white" />
                    </button>
                </div>
            </div>

            {/* Main Content Wrapper */}
            <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT COLUMN: Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            {/* Status Badge */}
                            <div className="flex items-center gap-3">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest ${venueData.status === 'Active'
                                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                    : 'bg-gray-500/10 border border-gray-500/20 text-gray-400'
                                    }`}>
                                    {venueData.status}
                                </span>
                                {venueData.rating && (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                        <Star size={16} className="text-[#FFD700] fill-[#FFD700]" />
                                        <span className="font-bold">{venueData.rating}</span>
                                        <span className="text-gray-400 text-sm">({venueData.reviewCount} reviews)</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                                {venue.title}
                            </h1>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-6 py-6 border-y border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-[#8A3FFC]/10"><MapPin className="text-[#8A3FFC]" /></div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-gray-400">Address</p>
                                    <p className="font-semibold">{venue.address}</p>
                                </div>
                            </div>
                            {venueData.upcomingEvents !== undefined && (
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-xl bg-[#8A3FFC]/10"><Calendar className="text-[#8A3FFC]" /></div>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-gray-400">Upcoming Events</p>
                                        <p className="font-semibold">{venueData.upcomingEvents} Events</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-[#8A3FFC]/10"><Users className="text-[#8A3FFC]" /></div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-gray-400">Total Capacity</p>
                                    <p className="font-semibold">{venue.attendees.toLocaleString()} people</p>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">About the Venue</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {venue.description}
                            </p>
                        </div>

                        {/* Spaces Section */}
                        {spaceData.length > 0 && (
                            <div className="">
                                <h2 className="text-2xl font-bold mb-6">Available Spaces</h2>
                                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                                    <DataTable
                                        data={spaceData}
                                        columns={spaceColumns}
                                        emptyMessage="No spaces available."
                                    />
                                </div>
                            </div>
                        )}

                        {/* Policies & Info Section */}
                        {venueData.policies && venueData.policies.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold">Venue Information</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {venueData.policies.map((policy: { id: string; icon: string; key: string; value: string }) => (
                                        <div
                                            key={policy.id}
                                            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#8A3FFC]/50 transition"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 rounded-xl bg-[#8A3FFC]/10 text-[#8A3FFC]">
                                                    {getPolicyIcon(policy.icon)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-bold uppercase text-gray-400 mb-1">
                                                        {policy.key}
                                                    </p>
                                                    <p className="text-sm text-white leading-relaxed">
                                                        {policy.value}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Venue Keywords */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Venue Tags</h2>
                            <div className="flex flex-wrap gap-3">
                                {venueData.keywords.map((keyword: string, index: number) => (
                                    <span
                                        key={index}
                                        className="px-6 py-2 rounded-xl bg-[#8A3FFC]/10 text-[#8A3FFC] border border-[#8A3FFC] font-bold"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* More Venues */}
                        <div className="">
                            <h2 className="text-2xl font-bold">More Venues Like This</h2>
                            <div className="container mx-auto pt-5">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {relatedVenues.map((relatedVenue) => (
                                        <VenueCard
                                            key={relatedVenue.id}
                                            venue={relatedVenue}
                                            onNavigate={handleNavigateToVenue}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar (Sticky) */}
                    <div className="relative z-10 w-full">
                        <div className="sticky top-10 space-y-6">
                            {/* Book Venue Card */}
                            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl space-y-6">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs font-bold uppercase mb-1 text-gray-400">Host an Event</p>
                                        <p className="text-2xl font-black text-white">Book This Venue</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                                        <CheckCircle2 size={14} /> Available
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full py-4 bg-[#8A3FFC] hover:bg-[#8A3FFC]/80 text-white font-bold rounded-2xl transition-all transform active:scale-95 shadow-lg shadow-[#8A3FFC]/20">
                                        Enquire Now
                                    </button>
                                    <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10">
                                        Schedule a Tour
                                    </button>
                                    <p className="text-center text-[10px] uppercase font-bold tracking-widest text-gray-400">
                                        Response within 24 hours
                                    </p>
                                </div>

                                {/* Social Proof inside card */}
                                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map(i => (
                                            <img key={i} src={`https://i.pravatar.cc/100?u=${i + 50}`} alt="organizer" className="w-10 h-10 rounded-full border-2 border-[#0A0A0A]" />
                                        ))}
                                    </div>
                                    <p className="text-xs font-bold text-gray-300">+50 Events Hosted</p>
                                </div>
                            </div>

                            {/* Venue Manager */}
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl space-y-6">
                                <h3 className="text-xl font-bold">Venue Manager</h3>
                                <div className="flex items-center justify-between group cursor-pointer p-2 -m-2 hover:bg-white/5 rounded-xl transition">
                                    <div className="flex items-center gap-4">
                                        <img src="https://i.pravatar.cc/150?u=manager" alt="Manager" className="w-14 h-14 rounded-full object-cover" />
                                        <div>
                                            <h4 className="font-bold text-lg">Alex Johnson</h4>
                                            <p className="text-sm text-gray-400">Venue Manager</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-400" />
                                </div>
                            </div>

                            {/* Host/Organizer Details */}
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl space-y-6">
                                <h3 className="text-xl font-bold">Venue Owner</h3>
                                <div className="flex items-center justify-between group cursor-pointer p-2 -m-2 hover:bg-white/5 rounded-xl transition">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center p-1 bg-white">
                                            <img src="https://ui-avatars.com/api/?name=VO&background=8A3FFC&color=fff&rounded=true&bold=true&size=100" alt="Owner logo" className="w-full h-full object-contain rounded-lg" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg group-hover:text-[#8A3FFC] transition-colors">Venue Operations Ltd</h4>
                                            <p className="text-sm text-gray-400">128 Followers</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-400" />
                                </div>

                                <div className="flex gap-4 mt-5">
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-[#8A3FFC] hover:bg-[#8A3FFC]/80 transition font-semibold text-white text-sm">
                                        <Plus size={16} /> Follow
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition font-semibold text-white text-sm">
                                        <MessageSquare size={16} /> Message
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 text-gray-400 pt-4 border-t border-white/10">
                                    <Star size={16} className="text-yellow-500" />
                                    <span className="text-sm font-medium">{venueData.rating || 4.5}/5 Rating - {venueData.reviewCount || 100}+ Reviews</span>
                                </div>
                            </div>

                            {/* Amenities Quick List */}
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl space-y-4">
                                <h3 className="text-xl font-bold">Key Amenities</h3>
                                <div className="space-y-3">
                                    {['Parking Available', 'Food & Beverage', 'Sound System', 'Air Conditioning'].map((amenity, i) => (
                                        <div key={i} className="flex items-center gap-3 text-gray-300">
                                            <CheckCircle2 size={16} className="text-green-400" />
                                            <span>{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
