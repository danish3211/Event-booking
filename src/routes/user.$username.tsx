import { createFileRoute } from '@tanstack/react-router'
import { MapPin, Mail, Edit, Share, Users, Star, Camera, X, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { EventCard } from '../components/ui/EventCard';
import { EVENTS } from '../constants';

export const Route = createFileRoute('/user/$username')({
    component: RouteComponent,
    notFoundComponent: () => <div className="min-h-screen flex items-center justify-center text-3xl font-bold">User Not Found</div>,
    loader: async ({ params }) => {
        // In a real app, fetch user by username slug.
        return {
            username: params.username,
            name: "Danish Sheikh",
            location: "Mumbai",
            followers: 0,
            following: 0,
            avatar: "https://i.pravatar.cc/300?u=danish"
        };
    }
})

function RouteComponent() {
    const loaderData = Route.useLoaderData() as any;
    const [activeTab, setActiveTab] = useState('events');
    const [user, setUser] = useState(loaderData);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        city: '',
        email: ''
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            const [firstName, ...lastNameParts] = (parsedUser.name || loaderData.name).split(' ');

            setUser((prev: any) => ({
                ...prev,
                name: parsedUser.name || prev.name,
                location: parsedUser.location || prev.location,
                avatar: parsedUser.avatar || prev.avatar,
                email: parsedUser.email || ''
            }));

            setFormData({
                firstName: firstName || '',
                lastName: lastNameParts.join(' ') || '',
                city: parsedUser.location || loaderData.location,
                email: parsedUser.email || ''
            });
        } else {
            const [firstName, ...lastNameParts] = loaderData.name.split(' ');
            setFormData({
                firstName: firstName || '',
                lastName: lastNameParts.join(' ') || '',
                city: loaderData.location,
                email: ''
            });
        }
    }, [loaderData]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;

                // Update Local Storage
                const savedUser = localStorage.getItem('user');
                const userData = savedUser ? JSON.parse(savedUser) : {};
                const updatedUserData = { ...userData, avatar: base64String };
                localStorage.setItem('user', JSON.stringify(updatedUserData));

                // Update State
                setUser((prev: any) => ({ ...prev, avatar: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        const fullName = `${formData.firstName} ${formData.lastName}`.trim();

        // Update Local Storage
        const savedUser = localStorage.getItem('user');
        const userData = savedUser ? JSON.parse(savedUser) : {};
        const updatedUserData = {
            ...userData,
            name: fullName,
            location: formData.city,
            email: formData.email
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));

        // Update State
        setUser((prev: any) => ({
            ...prev,
            name: fullName,
            location: formData.city,
            email: formData.email
        }));

        setIsEditModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-background text-text pb-20 font-sans mt-20">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
            />

            {/* 1. Profile Header Section */}
            <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                {/* Avatar with Premium Border */}
                <div className="relative inline-block group">
                    <div className="absolute -inset-1 rounded-full bg-linear-to-r from-primary to-vivid blur opacity-30 group-hover:opacity-50 transition duration-500" />
                    <div className="relative w-32 h-32 rounded-full border-4 border-background overflow-hidden bg-white shadow-xl">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-1 right-1 p-2 rounded-full bg-primary text-white shadow-md hover:bg-vivid transition-all hover:scale-110 active:scale-95 group/btn z-10"
                    >
                        <Camera size={14} className="group-hover/btn:rotate-12 transition-transform" />
                    </button>
                </div>

                {/* User Info */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight">{user.name}</h1>
                    <div className="flex items-center justify-center gap-2 text-text/60 text-sm font-medium">
                        <MapPin size={16} className="text-primary" />
                        <span>{user.location}</span>
                    </div>
                    <div className="flex items-center justify-center gap-6 pt-2">
                        <div className="text-center">
                            <p className="text-lg font-black">{user.followers}</p>
                            <p className="text-[10px] uppercase font-bold text-text/40 tracking-widest">Followers</p>
                        </div>
                        <div className="h-8 w-px bg-surface/20" />
                        <div className="text-center">
                            <p className="text-lg font-black">{user.following}</p>
                            <p className="text-[10px] uppercase font-bold text-text/40 tracking-widest">Following</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3 pt-4">
                    <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-surface/5 border border-surface/20 hover:bg-surface/10 transition-all font-bold text-xs text-text/80">
                        <Mail size={16} /> Inbox
                    </button>
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-white hover:bg-vivid transition-all font-bold text-xs shadow-lg shadow-primary/20"
                    >
                        <Edit size={16} /> Edit Profile
                    </button>
                    <button className="p-2 rounded-lg bg-surface/5 border border-surface/20 hover:bg-surface/10 transition-all text-text/60 hover:text-text">
                        <Share size={16} />
                    </button>
                </div>
            </div>

            {/* 2. Tabbed Navigation */}
            <div className="max-w-6xl mx-auto px-6 mt-16 border-b border-surface/20">
                <div className="flex items-center justify-center gap-12">
                    {[
                        { id: 'events', label: 'EVENTS', icon: Star },
                        { id: 'plans', label: 'SAVED PLANS', icon: Users },
                        { id: 'list', label: 'CURATED LIST', icon: Edit }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 pb-4 text-xs font-black tracking-widest transition-all relative border-b-2 ${activeTab === tab.id
                                ? 'text-primary border-primary'
                                : 'text-text/40 border-transparent hover:text-text'
                                }`}
                        >
                            <tab.icon size={14} className={activeTab === tab.id ? 'text-primary' : ''} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. Tab Content */}
            <div className="max-w-6xl mx-auto px-6 mt-12">
                {activeTab === 'events' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-black tracking-tight">Interested Events</h2>
                            <div className="h-px flex-1 bg-linear-to-r from-surface/30 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {EVENTS.map((event) => (
                                <div key={event.id} className="transition-transform hover:scale-[1.02] duration-300">
                                    <EventCard {...event} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab !== 'events' && (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50 animate-in fade-in duration-500">
                        <div className="w-20 h-20 rounded-full bg-surface/10 flex items-center justify-center">
                            <Users size={40} className="text-surface" />
                        </div>
                        <p className="font-bold text-text/60">No {activeTab.replace("_", " ")} found yet.</p>
                    </div>
                )}
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsEditModalOpen(false)}
                    />

                    {/* Modal Container */}
                    <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-surface/20">
                        {/* Header */}
                        <div className="bg-secondary p-6 text-white relative flex items-center justify-between">
                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                                <div className="absolute top-[-20%] left-[-10%] w-48 h-48 rounded-full bg-primary blur-[40px]" />
                                <div className="absolute bottom-[-20%] right-[-10%] w-48 h-48 rounded-full bg-vivid blur-[40px]" />
                            </div>

                            <h2 className="text-xl font-black tracking-tight relative z-10">UPDATE PROFILE DETAILS</h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors relative z-10"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleUpdateProfile} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* First Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-text/40 uppercase tracking-widest">First Name</label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            placeholder="Danish"
                                            className="w-full bg-surface/5 border border-surface/20 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-text/40 uppercase tracking-widest">Last Name</label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            placeholder="Sheikh"
                                            className="w-full bg-surface/5 border border-surface/20 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* City */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-text/40 uppercase tracking-widest">City</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        placeholder="Mumbai, India"
                                        className="w-full bg-surface/5 border border-surface/20 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-text/40 uppercase tracking-widest">Email</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="djsheikh321@gmail.com"
                                        className="w-full bg-surface/5 border border-surface/20 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-fit px-12 py-3 bg-linear-to-r from-primary to-vivid text-white font-black text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-98 shadow-lg shadow-primary/20 uppercase tracking-widest mt-4"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
