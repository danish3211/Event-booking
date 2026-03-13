import { createFileRoute } from '@tanstack/react-router'
import { 
  Sparkles, 
  MapPin, 
  MonitorPlay, 
  Video, 
  CalendarIcon, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  AlignLeft,
  PlayCircle,
  Image as ImageIcon
} from 'lucide-react'

export const Route = createFileRoute('/create')({
  component: CreateEvent,
})

function CreateEvent() {
  return (
    <div className=" min-h-screen text-text font-sans pb-20">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Form Area */}
        <div className="lg:col-span-2 space-y-10">
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-background">Create an event</h1>
          </div>

          {/* Event Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-background">Event Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="Enter the name of your event" 
              className="w-full bg-white/30 border border-surface/30 rounded-xl px-4 py-3 placeholder:text-text/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text"
            />
          </div>

          {/* Location */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-background">Location</h2>
              <p className="text-sm text-background/60">Choose where your event will take place.</p>
            </div>
            
            <p className="text-xs font-bold text-background mb-2">Where will your event take place?</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Venue */}
              <button className="flex flex-col items-center justify-center text-center p-6 bg-white/20 border-2 border-primary/20 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:border-primary transition-all group">
                <div className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center text-text/60 group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="font-bold text-sm mb-1">Venue</h3>
                <p className="text-[10px] text-text/60 leading-relaxed">Host in-person events with check-in management.</p>
              </button>

              {/* Online */}
              <button className="flex flex-col items-center justify-center text-center p-6 bg-white/20 border border-surface/30 rounded-2xl hover:border-surface/60 transition-all group">
                <div className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center text-text/60 group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-4">
                  <Video size={24} />
                </div>
                <h3 className="font-bold text-sm mb-1">Online</h3>
                <p className="text-[10px] text-text/60 leading-relaxed">Host virtual events, sharing access with ticket buyers.</p>
              </button>

              {/* Recorded */}
              <button className="flex flex-col items-center justify-center text-center p-6 bg-white/20 border border-surface/30 rounded-2xl hover:border-surface/60 transition-all group">
                <div className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center text-text/60 group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-4">
                  <MonitorPlay size={24} />
                </div>
                <h3 className="font-bold text-sm mb-1">Recorded events</h3>
                <p className="text-[10px] text-text/60 leading-relaxed">Provide instant access to pre-recorded content after purchase.</p>
              </button>
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-4 pt-4">
            <div>
              <h2 className="text-xl font-bold text-background">Date and time</h2>
              <p className="text-sm text-background/60">Select the event date, time, and timezone.</p>
            </div>

            <div className="space-y-6 bg-white/20 p-6 rounded-2xl border border-surface/20 shadow-xs">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-text">Event type <span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                  <button className="px-6 py-2.5 bg-green-500/20 border border-green-500/50 text-green-500 text-sm font-semibold rounded-lg flex items-center gap-2">
                    Single event <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">✓</span>
                  </button>
                  <button className="px-6 py-2.5 bg-white/20 border border-surface/30 text-text/60 hover:text-text hover:border-surface/60 text-sm font-semibold rounded-lg transition-colors">
                    Recurring event
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text">Start date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <CalendarIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40" />
                    <input type="text" defaultValue="2026-02-27" className="w-full bg-white border border-surface/30 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text">Start time <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-2">
                     <input type="text" defaultValue="12:00 AM" className="w-full bg-white border border-surface/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text" />
                     <button className="shrink-0 text-primary text-xs font-bold hover:underline px-2">+ Add end time</button>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text">Time Zone <span className="text-red-500">*</span></label>
                <select className="w-full bg-white border border-surface/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text appearance-none">
                  <option>(GMT+05:30) India Standard Time - Colombo</option>
                  <option>(GMT+05:30) India Standard Time - Kolkata</option>
                </select>
              </div>

            </div>
          </div>

          {/* Event Description */}
          <div className="space-y-2 pt-4">
            <label className="text-sm font-semibold text-text">Event Description <span className="text-red-500">*</span></label>
            <div className="w-full bg-white border border-surface/30 rounded-xl overflow-hidden shadow-xs focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
              {/* WYSIWYG Toolbar */}
              <div className="bg-surface/5 border-b border-surface/20 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3 text-text/60">
                   <button className="hover:text-text transition-colors"><Bold size={16} /></button>
                   <button className="hover:text-text transition-colors"><Italic size={16} /></button>
                   <button className="hover:text-text transition-colors"><Underline size={16} /></button>
                   <div className="w-px h-4 bg-surface/30 mx-1" />
                   <button className="hover:text-text transition-colors"><List size={16} /></button>
                   <button className="hover:text-text transition-colors"><AlignLeft size={16} /></button>
                </div>
                <button className="flex items-center gap-1.5 text-yellow-500 text-xs font-bold hover:text-yellow-600 transition-colors">
                  <Sparkles size={14} /> Generate using AI
                </button>
              </div>
              <textarea 
                className="w-full h-40 resize-none p-4 placeholder:text-text/30 text-text outline-none"
                placeholder="Describe your event..."
              ></textarea>
            </div>
          </div>

          {/* Add Poster Image */}
          <div className="space-y-2 pt-4">
            <label className="text-sm font-semibold text-text">Add Poster Image <span className="text-red-500">*</span></label>
            <div className="w-full h-48 border-2 border-dashed border-surface/40 hover:border-primary/50 rounded-2xl bg-white hover:bg-primary/5 transition-all flex flex-col items-center justify-center cursor-pointer group shadow-xs">
              <div className="w-16 h-16 rounded-full bg-surface/10 group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors">
                <ImageIcon className="text-text/50 group-hover:text-primary transition-colors" size={28} />
              </div>
              <p className="text-sm font-bold text-text">Drag & drop your poster here</p>
              <p className="text-xs text-text/50 mt-1">or click to browse from your computer</p>
              <p className="text-[10px] text-text/40 mt-3 uppercase tracking-widest font-bold bg-surface/10 px-3 py-1 rounded-full">Recommended: 1920x1080 (16:9)</p>
            </div>
          </div>

          {/* Organizer Page */}
          <div className="space-y-2 pt-2 pb-6 border-b border-surface/20">
            <label className="text-sm font-semibold text-text">Organizer Page</label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <select className="w-full sm:w-2/3 bg-white border border-surface/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all text-text appearance-none font-medium">
                <option>danish (0 subscribers)</option>
              </select>
              <button className="w-full sm:w-auto text-primary text-xs font-bold hover:underline">
                + Create new organizer page
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <div>
            <button className="bg-[#1a73e8] hover:bg-blue-600 text-white font-bold px-8 py-2.5 rounded-lg transition-colors text-sm shadow-md">
              Continue
            </button>
          </div>

        </div>

        {/* Right Sidebar Area */}
        <div className="space-y-6 pt-10 lg:pt-0">
          
          {/* Video Helpers */}
          <div className="bg-white border border-surface/20 rounded-2xl p-5 shadow-xs text-center">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary mb-4 group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1540039155732-6761b54f22ce?q=80&w=400" className="opacity-60 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Video thumbnail" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <PlayCircle size={24} className="text-primary ml-1" />
                </div>
              </div>
            </div>
            <h3 className="font-bold text-text mb-2">Here's a video to help you get started!</h3>
            <p className="text-xs text-text/50 leading-relaxed mb-1">
              Check out this guide to learn how to make the most of AllEvents.
            </p>
          </div>

          {/* Import Events */}
          <div className="bg-white border border-surface/20 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-text mb-2 text-sm">Import your events from other platforms</h3>
            <p className="text-xs text-text/50 leading-relaxed mb-4">
              Have you already published your events on other platform like Facebook, Eventbrite or your own website?
            </p>
            <button className="w-full py-2 bg-white border border-surface/30 hover:bg-surface/5 text-text text-xs font-bold rounded-lg transition-colors shadow-xs">
              Import now
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
