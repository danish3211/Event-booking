import InterestedEvents from '@/components/MyProfile/InterestedEvents';
import MyTickets from '@/components/MyProfile/tickets/MyTickets';
import Notifications from '@/components/MyProfile/NotificationItem';
import Modal from '@/components/ui/Modal';
import { createFileRoute } from '@tanstack/react-router';
import { Bell, Bookmark, Edit3, Heart, HelpCircle, LogOut, MapPin, Star, Ticket } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TicketDetails from '@/components/MyProfile/tickets/TicketDetails';
import Help from '@/components/MyProfile/Help/Help';
import {EditProfile} from '@/components/MyProfile/EditProfile';

export const Route = createFileRoute('/user/$username')({
    component: RouteComponent,
    notFoundComponent: () => <div className="min-h-screen flex items-center justify-center text-3xl font-bold">User Not Found</div>,
    loader: async ({ params }) => {
        // In a real app, fetch user by username slug.
        return {
            username: params.username,
            name: "Danish Sheikh",
            location: "Mumbai",
            tagline: 'Entertainment Seeker',
            followers: 0,
            following: 0,
            avatar: "https://i.pravatar.cc/300?u=danish",
            eventsAttended: "5",
            upcomingEvents: "10",
            savedEvents: "20"
        };
    }
})

function RouteComponent() {
    const loaderData = Route.useLoaderData() as any;
    const [user, setUser] = useState(loaderData);
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [activeModal, setActiveModal] = useState<"tickets" | "interested" | "notifications" | "ticketDetail" | "Help" | "Edit Profile" | null>(null);
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


    const menuSections = [
        {
            title: 'Events & Bookings',
            items: [
                { icon: Ticket, label: 'My Tickets', color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
                { icon: Bookmark, label: 'Interested Events', color: 'text-pink-400', bgColor: 'bg-pink-500/10' },
                { icon: Bell, label: 'Notifications', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', badge: 5 }
            ]
        },
        {
            title: 'Settings & Privacy',
            items: [
                { icon: HelpCircle, label: 'Help & Support', color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
                { icon: Edit3, label: 'Edit Profile', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
                // { icon: MapPin, label: 'Manage Locations', color: 'text-green-400', bgColor: 'bg-green-500/10' }
            ]
        }
    ];

    const handleMenuItemClick = (label: string) => {
        switch (label) {
            case 'My Tickets':
                setActiveModal('tickets');
                break;
            case 'Interested Events':
                setActiveModal('interested');
                break;
            case 'Notifications':
                setActiveModal('notifications');
                break;
            case 'Help & Support':
                setActiveModal('Help');
                break;
            case 'Edit Profile':
                setActiveModal('Edit Profile');
                break;
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('user')
        setUser(null)
        window.location.reload()
    }



    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110">
                        <Edit3 size={16} />
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-1.5 rounded-full text-sm font-medium mb-3">
                    <Star size={14} className="fill-purple-400" />
                    {user.tagline}
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <span>{user.location}</span>
                </div>
            </div>

            {/* Activity Stats */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Your Activity</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 text-center hover:bg-gray-800/70 transition-all duration-200">
                        <div className="text-3xl font-bold text-white mb-1">{user.eventsAttended}</div>
                        <div className="text-gray-400 text-sm">Events Attended</div>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 text-center hover:bg-gray-800/70 transition-all duration-200">
                        <div className="text-3xl font-bold text-white mb-1">{user.savedEvents}</div>
                        <div className="text-gray-400 text-sm">Saved Events</div>
                    </div>
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 text-center hover:bg-gray-800/70 transition-all duration-200">
                        <div className="text-3xl font-bold text-white mb-1">{user.upcomingEvents}</div>
                        <div className="text-gray-400 text-sm">Upcoming</div>
                    </div>
                </div>
            </div>

            {/* Menu Sections */}
            {menuSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                    <div className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                            <button
                                key={itemIndex}
                                onClick={() => handleMenuItemClick(item.label)}
                                className="w-full flex items-center justify-between p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:bg-gray-800/70 hover:border-gray-600/50 transition-all duration-200 group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl ${item.bgColor}`}>
                                        <item.icon size={20} className={item.color} />
                                    </div>
                                    <span className="text-white font-medium">{item.label}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    {item.badge && (
                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                    <svg
                                        className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {/* Sign Out Button */}
            <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200 group mb-8"
            >
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-red-500/20">
                        <LogOut size={20} className="text-red-400" />
                    </div>
                    <span className="text-red-400 font-medium">Sign Out</span>
                </div>
                <svg
                    className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Additional Quick Stats */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Heart size={20} className="text-pink-400" />
                    Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">12</div>
                        <div className="text-gray-400 text-sm">Favorite Artists</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-pink-400">5</div>
                        <div className="text-gray-400 text-sm">Reviews Written</div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal
                isOpen={activeModal === 'tickets'}
                onClose={() => setActiveModal(null)}
                title="My Tickets"
            >
                <MyTickets onTicketClick={(id) => {
                    setSelectedTicketId(id);
                    setActiveModal('ticketDetail');
                }} />
            </Modal>

            <Modal
                isOpen={activeModal === 'ticketDetail'}
                onClose={() => setActiveModal('tickets')}
                title="Ticket Details"
            >
                {selectedTicketId && (
                    <TicketDetails id={selectedTicketId} />
                )}
            </Modal>
            <Modal
                isOpen={activeModal === 'interested'}
                onClose={() => setActiveModal(null)}
                title="Interested Events"
            >
                <InterestedEvents />
            </Modal>

            <Modal
                isOpen={activeModal === 'notifications'}
                onClose={() => setActiveModal(null)}
                title="Notifications"
            >
                <Notifications />
            </Modal>

            <Modal
                isOpen={activeModal === 'Help'}
                onClose={() => setActiveModal(null)}
                title="Help & Support"
            >
                <Help />
            </Modal>

            <Modal
                isOpen={activeModal === 'Edit Profile'}
                onClose={() => setActiveModal(null)}
                title="Edit Profile"
            >
                <EditProfile />
            </Modal>
        </div>
    );
}
