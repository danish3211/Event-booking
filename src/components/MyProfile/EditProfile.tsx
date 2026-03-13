import { useState } from 'react';
import { User, Music, Settings, Camera, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function EditProfile() {
    const [activeTab, setActiveTab] = useState<'personal' | 'artist' | 'settings'>('personal');
    const [profileData, setProfileData] = useState({
        personalInfo: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+91 98765 43210",
            bio: "Passionate musician with 8 years of experience in Bollywood and Classical music. Love performing at weddings and corporate events.",
            location: "Mumbai, Maharashtra",
            website: "www.johndoemusic.com",
            profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop",
        },
        artistInfo: {
            artistName: "John Doe Music",
            artistTypes: ["Singer", "Guitarist"],
            genres: ["Bollywood", "Classical", "Folk"],
            experience: "8",
            minimumBudget: "25000",
            equipment: ["Acoustic Guitar", "Microphone", "Amplifier"],
            specialization: "Wedding ceremonies, Corporate events, Cultural programs",
        },
        settings: {
            isProfilePublic: true,
            allowDirectBookings: true,
            showLocation: true,
            emailNotifications: true,
            pushNotifications: false,
        },
    });

    const tabs = [
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'artist', label: 'Artist Info', icon: Music },
        { id: 'settings', label: 'Settings', icon: Settings },
    ] as const;

    const artistTypes = ["Singer", "Guitarist", "Pianist", "Drummer", "DJ", "Band", "Dancer", "Comedian", "Magician", "Anchor", "Speaker"];
    const genres = ["Bollywood", "Classical", "Folk", "Rock", "Pop", "Jazz", "Electronic", "Hip Hop", "Devotional", "Regional"];

    function SwitchRow({
        title,
        description,
        checked,
        onChange,
    }: {
        title: string;
        description: string;
        checked: boolean;
        onChange: (next: boolean) => void;
    }) {
        return (
            <div className="flex items-center justify-between gap-4 py-3">
                <div>
                    <p className="text-[30px] leading-tight font-semibold text-background sm:text-xl">{title}</p>
                    <p className="text-[26px] leading-tight text-zinc-600 sm:text-lg">{description}</p>
                </div>
                <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    onClick={() => onChange(!checked)}
                    className={`relative h-8 w-14 rounded-full transition ${checked ? "bg-violet-600" : "bg-zinc-300"}`}
                >
                    <span
                        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${checked ? "left-7" : "left-1"}`}
                    />
                </button>
            </div>
        );
    }

    return (
        <div>
            <div>
                {/* Header */}
                <div className="flex items-center justify-end">
                    {/* <button className="p-2 hover:bg-gray-100 rounded-full text-purple-600">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1> */}
                    <button className="text-purple-600 font-semibold hover:text-purple-700">Save</button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex-1 flex flex-col items-center py-4 border-b transition-colors",
                                    activeTab === tab.id ? "border-purple-600 text-purple-600 border-b-2" : "border-transparent text-white hover:text-gray-600"
                                )}
                            >
                                <Icon size={20} />
                                <span className="text-sm font-medium mt-1">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="p-6">
                    {activeTab === 'personal' && (
                        <div className="space-y-4">
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative">
                                    <img src={profileData.personalInfo.profileImage} className="w-24 h-24 rounded-full object-cover" alt="Profile" />
                                    <button className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 text-white border-2 border-white">
                                        <Camera size={16} />
                                    </button>
                                </div>
                                <span className="text-purple-600 font-medium mt-2">Change Photo</span>
                            </div>

                            {[
                                { label: 'First Name', key: 'firstName' },
                                { label: 'Last Name', key: 'lastName' },
                                { label: 'Email', key: 'email' },
                                { label: 'Phone Number', key: 'phone' },
                            ].map(field => (
                                <div key={field.key}>
                                    <label className="block text-sm font-semibold text-white mb-1">{field.label} *</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-100 focus:border-purple-600 outline-none text-white" value={profileData.personalInfo[field.key as keyof typeof profileData.personalInfo]} onChange={e => setProfileData({ ...profileData, personalInfo: { ...profileData.personalInfo, [field.key]: e.target.value } })} />
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm font-semibold text-white mb-1">Bio</label>
                                <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-100 focus:border-purple-600 outline-none h-24 text-white" value={profileData.personalInfo.bio} onChange={e => setProfileData({ ...profileData, personalInfo: { ...profileData.personalInfo, bio: e.target.value } })} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'artist' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-white mb-1">Artist/Band Name *</label>
                                <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-100 focus:border-purple-600 outline-none text-white" value={profileData.artistInfo.artistName} onChange={e => setProfileData({ ...profileData, artistInfo: { ...profileData.artistInfo, artistName: e.target.value } })} />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">Artist Type *</label>
                                <div className="flex flex-wrap gap-2">
                                    {artistTypes.map(type => (
                                        <button key={type} className={cn("px-4 py-2 rounded-full text-sm font-medium border", profileData.artistInfo.artistTypes.includes(type) ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-700 border-gray-200")}>
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">Genres *</label>
                                <div className="flex flex-wrap gap-2">
                                    {genres.map(genre => (
                                        <button key={genre} className={cn("px-4 py-2 rounded-full text-sm font-medium border", profileData.artistInfo.genres.includes(genre) ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-700 border-gray-200")}>
                                            {genre}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white mb-1">Years of experience *</label>
                                <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-100 focus:border-purple-600 outline-none text-white" value={profileData.artistInfo.experience} onChange={e => setProfileData({ ...profileData, artistInfo: { ...profileData.artistInfo, experience: e.target.value } })} />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white mb-1">Minimum Budget (₹) *</label>
                                <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-100 focus:border-purple-600 outline-none text-white" value={profileData.artistInfo.minimumBudget} onChange={e => setProfileData({ ...profileData, artistInfo: { ...profileData.artistInfo, minimumBudget: e.target.value } })} />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white mb-1">Specialization </label>
                                <textarea className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-100 focus:border-purple-600 outline-none h-24 text-white" value={profileData.artistInfo.specialization} onChange={e => setProfileData({ ...profileData, artistInfo: { ...profileData.artistInfo, specialization: e.target.value } })} />
                            </div>

                        </div>
                    )}

                    {/* SETTINGS TAB */}
                    {activeTab === "settings" && (
                        <div className="space-y-6">
                            <section>
                                <h2 className="mb-3 text-[38px] leading-tight font-bold text-background sm:text-3xl">Privacy Settings</h2>
                                <div className="rounded-3xl border border-zinc-300 px-5 py-3 shadow-sm">
                                    <SwitchRow
                                        title="Public Profile"
                                        description="Make your profile visible to everyone"
                                        checked={profileData.settings.isProfilePublic}
                                        onChange={(value) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                settings: { ...prev.settings, isProfilePublic: value },
                                            }))
                                        }
                                    />
                                    <SwitchRow
                                        title="Direct Bookings"
                                        description="Allow clients to book you directly"
                                        checked={profileData.settings.allowDirectBookings}
                                        onChange={(value) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                settings: { ...prev.settings, allowDirectBookings: value },
                                            }))
                                        }
                                    />
                                    <SwitchRow
                                        title="Show Location"
                                        description="Display your city on profile"
                                        checked={profileData.settings.showLocation}
                                        onChange={(value) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                settings: { ...prev.settings, showLocation: value },
                                            }))
                                        }
                                    />
                                </div>
                            </section>

                            <section>
                                <h2 className="mb-3 text-[38px] leading-tight font-bold text-background sm:text-3xl">Notification Settings</h2>
                                <div className="rounded-3xl border border-zinc-300 px-5 py-3 shadow-sm">
                                    <SwitchRow
                                        title="Email Notifications"
                                        description="Receive booking updates via email"
                                        checked={profileData.settings.emailNotifications}
                                        onChange={(value) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                settings: { ...prev.settings, emailNotifications: value },
                                            }))
                                        }
                                    />
                                    <SwitchRow
                                        title="Push Notifications"
                                        description="Get instant alerts on your phone"
                                        checked={profileData.settings.pushNotifications}
                                        onChange={(value) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                settings: { ...prev.settings, pushNotifications: value },
                                            }))
                                        }
                                    />
                                </div>
                            </section>

                            <section className="rounded-3xl border border-red-500 bg-red-500/10 p-5">
                                <h3 className="mb-2 text-[34px] leading-tight font-semibold text-red-700 sm:text-2xl">Delete Account</h3>
                                <p className="mb-4 text-[26px] leading-tight text-red-600 sm:text-lg">
                                    Permanently delete your account and all data. This action cannot be undone.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => window.alert("Account deletion flow goes here")}
                                    className="w-full rounded-2xl bg-red-600 px-6 py-3 text-[30px] font-semibold text-white transition hover:bg-red-700 sm:text-xl"
                                >
                                    Delete Account
                                </button>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
