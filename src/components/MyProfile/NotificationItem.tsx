"use client";

import { Bell, Calendar, DollarSign, User, Heart, MessageCircle, ChevronRight, CircleAlert } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  date: string;
  priority?: boolean;
  icon: "booking" | "payment" | "event" | "follower" | "like" | "comment";
  avatar?: string;
}

const Notifications = () => {
  const notifications: NotificationItem[] = [
    {
      id: "1",
      title: "New Booking Request",
      description: "TechCorp Industries wants to book you for their Annual Party on March 10th",
      date: "20 Feb",
      priority: true,
      icon: "booking",
      avatar: "https://ui-avatars.com/api/?name=TechCorp+Industries&background=random"
    },
    {
      id: "2",
      title: "Booking Confirmed!",
      description: "Your booking for Summer Music Festival has been confirmed. Check event details.",
      date: "19 Feb",
      priority: true,
      icon: "booking",
      avatar: "https://ui-avatars.com/api/?name=Summer+Festival&background=random"
    },
    {
      id: "3",
      title: "Payment Received",
      description: "₹25,000 payment received for Wedding Celebration gig",
      date: "18 Feb",
      priority: false,
      icon: "payment"
    },
    {
      id: "4",
      title: "Event Tomorrow",
      description: "Don't forget! You have Wedding Celebration performance tomorrow at 7 ...",
      date: "17 Feb",
      priority: true,
      icon: "event"
    },
    {
      id: "5",
      title: "New Follower",
      description: "Priya Sharma started following you",
      date: "16 Feb",
      priority: false,
      icon: "follower",
      avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=random"
    },
    {
      id: "6",
      title: "Post Liked",
      description: "Your post was liked by 5 people",
      date: "15 Feb",
      priority: false,
      icon: "like"
    }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "booking":
        return <Bell size={20} className="text-purple-500" />;
      case "payment":
        return <DollarSign size={20} className="text-yellow-500" />;
      case "event":
        return <Calendar size={20} className="text-blue-500" />;
      case "follower":
        return <User size={20} className="text-blue-400" />;
      case "like":
        return <Heart size={20} className="text-red-500" />;
      case "comment":
        return <MessageCircle size={20} className="text-green-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="rounded-xl bg-gray-900/80 backdrop-blur-sm p-4 border border-gray-800 hover:border-gray-700 transition-colors"
        >
          <div className="flex gap-3">
            {/* Avatar/Icon */}
            <div className="flex-shrink-0">
              {notification.avatar ? (
                <img
                  src={notification.avatar}
                  alt={notification.title}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  {getIcon(notification.icon)}
                </div>
              )}
            </div>

            {/* Notification Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-semibold">{notification.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{notification.description}</p>
                </div>
                <span className="text-xs text-gray-500">{notification.date}</span>
              </div>

              {/* Priority Badge */}
              {notification.priority && (
                <div className="mt-2">
                  <span className="flex w-fit items-center gap-1 bg-red-600/30 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">
                    <CircleAlert size={15}/>
                    High Priority
                  </span>
                </div>
              )}
            </div>

            {/* Chevron */}
            <div className="flex items-center">
              <ChevronRight size={20} className="text-gray-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;