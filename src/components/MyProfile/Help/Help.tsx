import { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight, 
  Mail, 
  Phone, 
  MessageCircle, 
  Instagram, 
  Globe, 
  Clock,
  ExternalLink,
  Headphones
} from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const mockFAQs: FAQ[] = [
  {
    id: "1",
    question: "How do I book tickets for an event?",
    answer: "Browse through the available events on our home page. Tap on the event you want to attend, choose your ticket tier, and tap 'Get Tickets' to complete your secure payment.",
  },
  {
    id: "2",
    question: "Where can I find my tickets after booking?",
    answer: "Once booked, your tickets will be visible in the 'My Tickets' section under your Profile dashboard. You will also receive an email confirmation with your digital M-Ticket.",
  },
  {
    id: "3",
    question: "Why is my booking marked \"Pending approval\"?",
    answer: "Some exclusive events require host approval before confirming the booking. The host will review your request and accept/decline within 24 hours. No charges are finalized until approved.",
  },
  {
    id: "4",
    question: "Can I cancel or get a refund?",
    answer: "Cancellation and refund policies are set by individual event hosts. Generally, cancellations made 7+ days before the event are eligible for refunds. Go to My Tickets and select 'Cancel' to check eligibility.",
  },
  {
    id: "5",
    question: "How do platform fees and taxes work?",
    answer: "Platform service fees and GST taxes are calculated at checkout based on the ticket price and category. These fees help us secure transactions and maintain our booking services.",
  },
  {
    id: "6",
    question: "How do I create and publish my own event?",
    answer: "Simply go to the 'Create Event' section in your Profile menu, fill out the event form (title, category, pricing tiers, date/time, and venue), and tap publish to list it immediately.",
  },
  {
    id: "7",
    question: "How do I use my M-Ticket at the venue?",
    answer: "Open your digital ticket under 'My Tickets' in the app. Present the unique QR code on your screen to the gate inspector at the venue entrance to scan and gain entry.",
  },
  {
    id: "8",
    question: "How do I update my profile or notification settings?",
    answer: "Go to your Profile dashboard, click 'Edit Profile' to modify your personal details, and toggle the 'Notifications' switch in the PREFERENCES card to manage alerts.",
  },
];

export function Help({ initialScreen = 'helpCenter' }: { initialScreen?: 'helpCenter' | 'contactSupport' }) {
  const [screen, setScreen] = useState<'helpCenter' | 'contactSupport'>(initialScreen);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Filter FAQs based on search input
  const filteredFAQs = useMemo(() => {
    return mockFAQs.filter((faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const supportChannels = [
    {
      id: "email",
      title: "Email us",
      subtitle: "support@bookmybeats.app",
      icon: Mail,
      action: () => window.location.href = "mailto:support@bookmybeats.app",
    },
    {
      id: "call",
      title: "Call us",
      subtitle: "+91 12345 67890",
      icon: Phone,
      action: () => window.location.href = "tel:+911234567890",
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      subtitle: "Chat with us",
      icon: MessageCircle,
      action: () => window.open("https://wa.me/911234567890", "_blank"),
    },
    {
      id: "instagram",
      title: "Instagram",
      subtitle: "@bookmybeats",
      icon: Instagram,
      action: () => window.open("https://instagram.com/bookmybeats", "_blank"),
    },
    {
      id: "website",
      title: "Visit website",
      subtitle: "bookmybeats.app",
      icon: Globe,
      action: () => window.open("https://bookmybeats.app", "_blank"),
    },
  ];

  return (
    <div className="text-white">
      {screen === 'helpCenter' ? (
        <div className="space-y-4 animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Help Center</h2>
            <p className="text-white/60 text-xs mt-0.5">Answers to common questions</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3 pt-2">
            {filteredFAQs.map((faq) => {
              const isExpanded = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                  className="bg-[#201831] border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-white/10"
                >
                  <div className="p-4 flex items-center justify-between gap-4">
                    <h3 className="font-bold text-white text-sm">{faq.question}</h3>
                    <div className="text-white/40">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-white/5 text-xs text-white/60 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFAQs.length === 0 && (
              <div className="text-center py-8 text-white/40 text-xs">
                No help topics found matching "{searchQuery}"
              </div>
            )}
          </div>

          {/* Still Need Help card */}
          <button
            onClick={() => setScreen('contactSupport')}
            className="w-full bg-[#201831] border border-white/5 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/5 hover:border-white/10 transition-all mt-6 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <Headphones size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Still need help?</h4>
                <p className="text-xs text-white/40 mt-0.5">Chat with our support team</p>
              </div>
            </div>
            <ChevronRight className="text-white/20" size={18} />
          </button>

        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Header */}
          {initialScreen !== 'contactSupport' && (
            <div className="flex items-center gap-3 mb-6">
              <button 
                onClick={() => setScreen('helpCenter')}
                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-all cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <h2 className="text-2xl font-bold">Contact Support</h2>
                <p className="text-white/60 text-xs mt-0.5">We're here to help</p>
              </div>
            </div>
          )}

          {/* Centered headphones icon */}
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 shadow-lg shadow-primary/5">
              <Headphones size={30} className="stroke-[2]" />
            </div>
            <h3 className="text-xl font-extrabold text-white">How can we help?</h3>
            <p className="text-xs text-white/50 max-w-sm mt-2 leading-relaxed px-4">
              Pick a channel below and our team will get back to you. Typical reply time is under a day.
            </p>
          </div>

          {/* Support Channels List */}
          <div className="space-y-3">
            {supportChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={channel.action}
                className="w-full flex items-center justify-between p-4 bg-[#201831] border border-white/5 rounded-2xl hover:bg-white/5 hover:border-white/10 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/20 text-primary flex-shrink-0 group-hover:scale-105 transition-transform">
                    <channel.icon size={18} className="stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{channel.title}</h4>
                    <p className="text-xs text-white/40 mt-0.5">{channel.subtitle}</p>
                  </div>
                </div>
                <ExternalLink className="text-white/20 group-hover:text-white/40 transition-colors" size={14} />
              </button>
            ))}
          </div>

          {/* Footer timing */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 pt-4">
            <Clock size={12} />
            <span>Mon-Sat · 10 AM – 7 PM IST</span>
          </div>

        </div>
      )}
    </div>
  );
}

export default Help;
