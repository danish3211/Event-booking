import { Link } from '@tanstack/react-router';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white/80 pt-20 pb-10 border-t-4 border-primary relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-vivid/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/tanstack-word-logo-white.svg"
                alt="TanStack Logo"
                className="h-10"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/70">
              Discover the most happening events around you. Explore what's cooking in your city and turn moments into unforgettable memories!
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-vivid text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-red-500 text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Discover Category */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg tracking-wide uppercase">Discover</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Popular Events</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Exhibitions & Expos</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Concerts & Gigs</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Workshops & Classes</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Festivals</Link></li>
            </ul>
          </div>

          {/* Host Events Category */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg tracking-wide uppercase">Host Events</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Publish Your Event</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Promote Events</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Sell Tickets Online</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Event Organizers App</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Contact Category */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg tracking-wide uppercase">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-1" size={18} />
                <span className="leading-relaxed">Tower 3, Infinity Bay Layout,<br/>Mumbai, India - 400030</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary" size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary" size={18} />
                <span>hello@happening.live</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} TanStack Events. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
