import { useState, useMemo } from 'react';
import { 
  Book, 
  FileQuestion, 
  Mail, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  Phone,
  MessageCircle,
  ShieldCheck,
  Users,
  Lock,
  Music,
  Calendar,
  AlertTriangle,
  ChevronRight
} from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const mockFAQs: FAQ[] = [
  {
    id: "1",
    question: "How do I create an event?",
    answer: "To create an event, go to your Profile tab and tap 'Create New Event'. Fill in all the required details including event title, date, venue, and ticket information. You can also add artists by browsing our artist directory.",
    category: "Events",
  },
  {
    id: "2",
    question: "How do I book an artist?",
    answer: "You can book an artist by going to the Discover tab, finding the artist you want, and tapping 'Send Request'. Fill in your event details and budget. The artist will receive your request and can accept or decline.",
    category: "Bookings",
  },
  {
    id: "3",
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment partners.",
    category: "Payments",
  },
  {
    id: "4",
    question: "How do I get verified?",
    answer: "To get verified, complete your profile with accurate information, upload ID proof, and have at least 5 successful bookings. Our team will review your profile and award verification badges.",
    category: "Account",
  },
  {
    id: "5",
    question: "Can I cancel my event?",
    answer: "Yes, you can cancel events. Go to 'My Events', select the event, and choose 'Cancel Event'. Please note that cancellation policies and refund terms apply based on the timing of cancellation.",
    category: "Events",
  },
  {
    id: "6",
    question: "How do refunds work?",
    answer: "Refunds are processed based on our refund policy. For cancellations made 7+ days before the event, full refunds are provided. For cancellations within 7 days, partial refunds may apply.",
    category: "Payments",
  },
  {
    id: "7",
    question: "How to change my account type?",
    answer: "You can switch between Artist, Event Organizer, and Entertainment Seeker profiles in your Profile settings. Each profile type has different features and capabilities.",
    category: "Account",
  },
  {
    id: "8",
    question: "What if an artist doesn't show up?",
    answer: "If an artist doesn't show up for a confirmed booking, contact our support team immediately. We have policies in place to protect event organizers and will work to resolve the issue.",
    category: "Bookings",
  },
];

const faqCategories = ["All", "Events", "Bookings", "Payments", "Account"];

const Help = () => {
  const [activeTab, setActiveTab] = useState("faqs");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    email: "",
  });

  const contactOptions = [
    {
      title: "Email Support",
      description: "Get help via email",
      icon: <Mail size={24} className="text-purple-500" />,
      action: () => window.location.href = "mailto:support@bookthebeat.com",
    },
    {
      title: "Phone Support",
      description: "Call us directly",
      icon: <Phone size={24} className="text-purple-500" />,
      action: () => window.location.href = "tel:+911234567890",
    },
    {
      title: "Live Chat",
      description: "Chat with our team",
      icon: <MessageCircle size={24} className="text-purple-500" />,
      action: () => alert("Live chat feature coming soon!"),
    },
    {
      title: "WhatsApp",
      description: "Message us on WhatsApp",
      icon: <MessageCircle size={24} className="text-green-500" />,
      action: () => window.open("https://wa.me/911234567890", "_blank"),
    },
  ];

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of using BookTheBeat",
      icon: <Book size={24} className="text-purple-500" />,
    },
    {
      title: "Artist Guidelines",
      description: "Best practices for artists",
      icon: <Music size={24} className="text-purple-500" />,
    },
    {
      title: "Event Organizer Handbook",
      description: "Complete guide for event organizers",
      icon: <Calendar size={24} className="text-purple-500" />,
    },
    {
      title: "Safety & Security",
      description: "Stay safe while using our platform",
      icon: <ShieldCheck size={24} className="text-purple-500" />,
    },
    {
      title: "Community Guidelines",
      description: "Our community standards",
      icon: <Users size={24} className="text-purple-500" />,
    },
    {
      title: "Privacy Policy",
      description: "How we protect your data",
      icon: <Lock size={24} className="text-purple-500" />,
    },
  ];

  const filteredFAQs = useMemo(() => {
    return mockFAQs.filter((faq) => {
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject || !contactForm.message || !contactForm.email) {
      alert("Please fill in all fields");
      return;
    }

    alert("Message Sent! Thank you for contacting us. We'll get back to you within 24 hours.");
    setContactForm({ subject: "", message: "", email: "" });
  };

  const renderFAQ = () => (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">Search FAQs</h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs, topics, or keywords"
            className="w-full bg-[#1A1A1A] border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
          />
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
        {faqCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-purple-600 text-white"
                : "bg-[#262626] text-gray-400 hover:bg-[#333]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <div
            key={faq.id}
            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
            className="bg-[#121212] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-gray-700"
          >
            <div className="p-5 flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <h3 className="text-white font-semibold leading-snug">{faq.question}</h3>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                  {faq.category}
                </span>
                {expandedFaq === faq.id ? (
                  <ChevronUp className="text-gray-400" size={20} />
                ) : (
                  <ChevronDown className="text-gray-400" size={20} />
                )}
              </div>
            </div>
            
            {expandedFaq === faq.id && (
              <div className="px-5 pb-5 pt-0 border-t border-gray-800/50 mt-2">
                <div className="h-px w-full bg-gray-800 mb-4" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-[#1A1A1A] p-6 rounded-full mb-4">
            <Search className="text-gray-600" size={48} />
          </div>
          <h3 className="text-white text-lg font-semibold">No FAQs found</h3>
          <p className="text-gray-500 max-w-xs mt-2">
            Try adjusting your search terms or selecting a different category
          </p>
        </div>
      )}
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Contact Options */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white">Get in touch</h2>
          <p className="text-sm text-gray-400">Reach out to our team using any of the options below.</p>
        </div>

        <div className="space-y-3">
          {contactOptions.map((option) => (
            <button
              key={option.title}
              onClick={option.action}
              className="w-full flex items-center gap-4 bg-[#121212] border border-gray-800 p-4 rounded-2xl hover:bg-[#1A1A1A] transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                {option.icon}
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white font-semibold">{option.title}</h3>
                <p className="text-xs text-gray-400">{option.description}</p>
              </div>
              <ChevronRight className="text-gray-600 group-hover:text-gray-400 transition-colors" size={20} />
            </button>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white">Send us a message</h2>
          <p className="text-sm text-gray-400">Share more details about your issue and we’ll get back within 24 hours.</p>
        </div>

        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 ml-1">Email *</label>
            <input
              type="email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 ml-1">Subject *</label>
            <input
              type="text"
              value={contactForm.subject}
              onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
              placeholder="What can we help you with?"
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 ml-1">Message *</label>
            <textarea
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              placeholder="Please describe your issue or question in detail..."
              rows={4}
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-bold py-4 rounded-2xl hover:bg-purple-700 transition-all active:scale-[0.98] shadow-lg shadow-purple-600/20"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-white">Helpful resources</h2>
        <p className="text-sm text-gray-400">Learn how to get the most out of BookTheBeat.</p>
      </div>

      <div className="space-y-3">
        {resources.map((resource, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-4 bg-[#121212] border border-gray-800 p-4 rounded-2xl hover:bg-[#1A1A1A] transition-all group"
            onClick={() => alert(`${resource.title} coming soon!`)}
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
              {resource.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-white font-semibold">{resource.title}</h3>
              <p className="text-xs text-gray-400">{resource.description}</p>
            </div>
            <ChevronRight className="text-gray-600 group-hover:text-gray-400 transition-colors" size={20} />
          </button>
        ))}

        {/* Emergency Card */}
        <div className="mt-8 bg-red-500/5 border border-red-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-400" size={24} />
            <h3 className="text-red-400 font-bold">Emergency support</h3>
          </div>
          <p className="text-sm text-red-400/80">
            For urgent issues during events, contact our 24/7 emergency line
          </p>
          <button
            onClick={() => window.location.href = "tel:+911234567890"}
            className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-all active:scale-[0.98]"
          >
            Call Emergency Line
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" text-white">
      <div className="">
        {/* Header */}
        {/* <div className="flex items-center gap-4 mb-6">
          <button className="p-2 bg-[#1A1A1A] rounded-xl hover:bg-[#262626] transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Help & Support</h1>
        </div> */}

        <p className="text-gray-400 mb-8 leading-relaxed">
          Find answers, contact our team, or explore helpful resources.
        </p>

        {/* Custom Tabs */}
        <div className="bg-[#1A1A1A] p-1.5 rounded-2xl flex gap-1 mb-8">
          <button
            onClick={() => setActiveTab("faqs")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "faqs" 
                ? "bg-purple-600 text-white shadow-lg" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <FileQuestion size={18} />
            <span>FAQ</span>
          </button>
          <button
            onClick={() => setActiveTab("contact-us")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "contact-us" 
                ? "bg-purple-600 text-white shadow-lg" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Mail size={18} />
            <span>Contact Us</span>
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "resources" 
                ? "bg-purple-600 text-white shadow-lg" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Book size={18} />
            <span>Resources</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="pb-10">
          {activeTab === "faqs" && renderFAQ()}
          {activeTab === "contact-us" && renderContact()}
          {activeTab === "resources" && renderResources()}
        </div>
      </div>
    </div>
  );
};

export default Help;
