"use client";

import { useState } from "react";
import Modal from "./Modal";
import {
    Mail,
    MessageSquare,
    Facebook,
    Linkedin,
    Twitter,
    Copy,
    Check,
    ExternalLink,
    Users
} from "lucide-react";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: {
        title: string;
        date: string;
        image: string;
        url: string;
    };
}

const socialPlatforms = [
    { name: "Email", icon: Mail, color: "bg-blue-500", hover: "hover:bg-blue-600" },
    { name: "Whatsapp", icon: MessageSquare, color: "bg-green-500", hover: "hover:bg-green-600" },
    { name: "Facebook", icon: Facebook, color: "bg-blue-600", hover: "hover:bg-blue-700" },
    { name: "LinkedIn", icon: Linkedin, color: "bg-blue-700", hover: "hover:bg-blue-800" },
    { name: "Twitter", icon: Twitter, color: "bg-black", hover: "hover:bg-gray-900" },
    { name: "Reddit", icon: ExternalLink, color: "bg-orange-600", hover: "hover:bg-orange-700" },
];

export function ShareModal({ isOpen, onClose, event }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(event.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Share & Invite your friends" size="md">
            <div className="space-y-8">
                {/* Event Preview Card */}
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-surface/20 bg-surface/5">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-20 h-20 rounded-xl object-cover shadow-sm"
                    />
                    <div>
                        <h4 className="font-bold text-lg text-background leading-tight">{event.title}</h4>
                        <div className="flex items-center gap-2 mt-1 text-background/60 text-sm">
                            <span className="p-1 rounded bg-primary/10 text-primary">
                                <Users size={12} />
                            </span>
                            <span>{event.date}</span>
                        </div>
                    </div>
                </div>

                {/* Link Copy Section */}
                <div className="flex items-center gap-2 p-2 pl-4 rounded-xl border border-surface/20 bg-background/20 shadow-sm focus-within:border-primary/50 transition-colors">
                    <input
                        type="text"
                        readOnly
                        value={event.url}
                        className="flex-1 text-md text-background/70 outline-none truncate"
                    />
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface/10 hover:bg-surface/20 text-background font-bold text-sm transition-all active:scale-95"
                    >
                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        {copied ? "Copied" : "Copy"}
                    </button>
                </div>

                {/* Social Share Grid */}
                <div className="space-y-4">
                    <p className="text-sm font-bold text-background uppercase tracking-widest px-1">Social share</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                        {socialPlatforms.map((platform) => (
                            <div key={platform.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                                <div className={`w-12 h-12 rounded-full ${platform.color} ${platform.hover} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 active:scale-90`}>
                                    <platform.icon size={20} />
                                </div>
                                <span className="text-[11px] font-bold text-background/60 group-hover:text-text">{platform.name}</span>
                            </div>
                        ))}
                        <div className="flex flex-col items-center gap-2 group cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-surface/10 hover:bg-surface/20 flex items-center justify-center text-background shadow-sm transition-transform group-hover:scale-110 active:scale-90 border border-surface/20">
                                <span className="font-bold text-xl leading-none">...</span>
                            </div>
                            <span className="text-[11px] font-bold text-background/60 group-hover:text-text">More</span>
                        </div>
                    </div>
                </div>

                {/* Share with friends section */}
                <div className="space-y-4">
                    <p className="text-sm font-bold text-background/60 uppercase tracking-widest px-1">Share with friends</p>
                    <div className="p-8 rounded-2xl border-2 border-dashed border-surface/20 bg-surface/5 flex flex-col items-center text-center space-y-4 group transition-colors hover:border-primary/30">
                        <div className="flex -space-x-3 mb-2">
                            {[1, 2, 3].map(i => (
                                <img
                                    key={i}
                                    src={`https://i.pravatar.cc/100?u=friend${i}`}
                                    alt="friend"
                                    className="w-12 h-12 rounded-full border-2 border-background shadow-md transition-transform group-hover:scale-105"
                                />
                            ))}
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-background/80">Oops! No friends found on AllEvents</p>
                            <div className="flex items-center justify-center gap-4 text-sm font-black italic">
                                <button className="text-background/40 hover:text-text transition-colors uppercase tracking-tight underline">Try Other Email</button>
                                <button className="text-primary hover:text-vivid transition-colors uppercase tracking-tight underline">Invite Friends</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
