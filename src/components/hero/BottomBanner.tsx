import { QrCode } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function BottomBanner() {
  return (
    <section className="flex flex-col">
      {/* 1. Host Events Section (Top Banner) */}
      <div className="relative w-full overflow-hidden bg-secondary py-16 lg:py-24">
        {/* Dynamic Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/30 blur-[100px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-vivid/40 blur-[120px]" />
          
          {/* Floating dots decoration */}
          <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-white/20 animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-6 h-6 rounded-full bg-primary/40 animate-pulse delay-700" />
          <div className="absolute top-2/3 right-1/2 w-3 h-3 rounded-full bg-vivid/50 animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="space-y-6 lg:max-w-xl text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
              Do you host events?
            </h2>
            <p className="text-xl text-white/80 font-medium">
              Let's make the world <span className="text-vivid italic font-bold">#Happening</span> together
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-4">
              <Link to="/create" className="px-8 py-4 bg-white hover:bg-gray-100 text-secondary font-black rounded-xl shadow-xl shadow-white/10 transition-transform active:scale-95 text-center">
                Create an Event
              </Link>
              <div className="flex items-center gap-3 text-sm font-bold text-white/70 tracking-widest uppercase">
                <span>Create</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Promote</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>Sell</span>
              </div>
            </div>
          </div>

          {/* Right Imagery (Performer + Overlay Card) */}
          <div className="relative mx-auto w-full max-w-md lg:ml-auto">
            {/* Main Performer Image */}
            <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white/10 aspect-[4/5] shadow-2xl bg-primary/20">
              <img 
                src="https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?q=80&w=400" 
                alt="Happy Performer singing" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-secondary/80 to-transparent" />
            </div>

            {/* Floating Social Proof Card */}
            <div className="absolute -left-8 md:-left-16 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center gap-4 w-64 transform rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://i.pravatar.cc/150?img=68" 
                alt="Stroymoyd" 
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div>
                <p className="text-white font-bold text-sm">@Stroymoyd</p>
                <p className="text-white/70 text-xs">Comedian, San Francisco</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. App Download Section (Bottom Banner) */}
      <div className="relative w-full bg-background py-20 lg:py-32 overflow-hidden border-t border-surface/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Imagery (Phones Mockup) */}
          <div className="relative flex justify-center lg:justify-end items-center mx-auto w-full max-w-sm lg:max-w-md h-[500px]">
            {/* Phone 1 (Back) */}
            <div className="absolute left-0 lg:-left-12 top-10 w-48 lg:w-56 h-auto aspect-[1/2.1] bg-secondary rounded-[2.5rem] border-[6px] border-surface/30 shadow-2xl overflow-hidden transform -rotate-12 translate-y-8 opacity-80 backdrop-blur-sm z-0">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-background rounded-full z-20" />
              <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600" className="w-full h-full object-cover opacity-50 block" alt="App interface background" />
            </div>

            {/* Phone 2 (Front) */}
            <div className="relative w-56 lg:w-64 h-auto aspect-[1/2.1] bg-background rounded-[2.5rem] border-[6px] border-secondary shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden z-10 transform translate-x-8 lg:translate-x-12">
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-secondary rounded-full z-20 flex justify-center items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>
              
              {/* Mock App Interface */}
              <div className="w-full h-full bg-surface/10 flex flex-col">
                {/* Header */}
                <div className="bg-primary px-4 pt-10 pb-4 text-white">
                  <p className="text-[10px] opacity-80">Location</p>
                  <p className="text-sm font-bold flex items-center gap-1">New York <span className="opacity-50">▼</span></p>
                </div>
                {/* Content list */}
                <div className="flex-1 p-3 space-y-3 overflow-hidden relative">
                  <p className="text-xs font-bold text-text mb-2">Featured Events</p>
                  <div className="w-full h-32 rounded-xl overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1540039155732-6761b54f22ce?q=80&w=400" className="w-full h-full object-cover" alt="event" />
                    <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur p-2 rounded-lg">
                      <p className="text-[10px] font-bold text-primary">Sat, 18 Apr</p>
                      <p className="text-xs font-black text-text truncate">Laracon India 2026</p>
                    </div>
                  </div>
                  
                  <div className="w-full h-32 rounded-xl overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?q=80&w=400" className="w-full h-full object-cover" alt="event" />
                    <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur p-2 rounded-lg">
                      <p className="text-[10px] font-bold text-primary">Sun, 19 Apr</p>
                      <p className="text-xs font-black text-text truncate">Florida Health Expo</p>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-background to-transparent" />
                </div>
                {/* Bottom Nav */}
                <div className="h-14 bg-background border-t border-surface/20 flex justify-around items-center px-4 text-surface">
                   <div className="flex flex-col items-center text-primary"><span className="text-[18px]">🏠</span><span className="text-[8px] font-bold">Home</span></div>
                   <div className="flex flex-col items-center"><span className="text-[18px]">🔍</span><span className="text-[8px] font-bold">Search</span></div>
                   <div className="flex flex-col items-center"><span className="text-[18px]">🎟️</span><span className="text-[8px] font-bold">Tickets</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="space-y-8 text-center lg:text-left lg:pl-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-text leading-[1.1]">
              Discover Events.<br/>
              <span className="text-primary italic">Anywhere, Anytime.</span>
            </h2>
            <p className="text-lg md:text-xl text-text/60 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Download the app to never miss out on the best events near you! Be the first to know what's hitting your city.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start pt-4">
              {/* QR Code Container */}
              <div className="p-3 bg-white border border-surface/30 shadow-xl rounded-2xl flex items-center justify-center">
                {/* Fake QR code representation using an icon placeholder to ensure it always renders properly */}
                <div className="w-28 h-28 border-4 border-dashed border-primary/40 rounded-lg flex items-center justify-center bg-primary/5 text-primary">
                  <QrCode size={48} />
                </div>
              </div>

              <div className="text-surface font-bold text-sm hidden sm:block">OR</div>

              {/* App Store Buttons */}
              <div className="flex flex-col gap-4">
                <a href="#" className="transform hover:scale-105 transition-transform active:scale-95">
                  <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-12 w-auto"
                  />
                </a>
                <a href="#" className="transform hover:scale-105 transition-transform active:scale-95 bg-black rounded-lg overflow-hidden">
                  <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Download on the App Store"
                      className="h-12 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
