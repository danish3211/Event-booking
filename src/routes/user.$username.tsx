import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { 
  User, Ticket, History, QrCode, CalendarPlus, CalendarCheck, 
  Tag, CreditCard, Receipt, Bell, HelpCircle, Star, 
  MessageSquare, LogOut, Trash2, ArrowLeft, ChevronRight,
  Camera, MapPin, Heart, ShieldAlert, Sparkles, CheckCircle2,
  AlertCircle
} from 'lucide-react'

// Sub-components & Modals
import InterestedEvents from '@/components/MyProfile/InterestedEvents'
import MyTickets from '@/components/MyProfile/tickets/MyTickets'
import Notifications from '@/components/MyProfile/NotificationItem'
import Modal from '@/components/ui/Modal'
import TicketDetails from '@/components/MyProfile/tickets/TicketDetails'
import Help from '@/components/MyProfile/Help/Help'
import { EditProfile } from '@/components/MyProfile/EditProfile'
import { allEvents } from '@/constants'

export const Route = createFileRoute('/user/$username')({
  component: RouteComponent,
  notFoundComponent: () => <div className="min-h-screen flex items-center justify-center text-3xl font-bold">User Not Found</div>,
  loader: async ({ params }) => {
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
    }
  }
})

interface MenuItem {
  id: string
  icon: any
  label: string
  subtitle: string
  color: string
  bgColor: string
  isToggle?: boolean
  action: () => void
}

interface MenuCategory {
  id: string
  title: string
  items: MenuItem[]
}

function RouteComponent() {
  const loaderData = Route.useLoaderData() as any
  const navigate = useNavigate()
  
  const [user, setUser] = useState(loaderData)
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  
  // Modals state
  const [activeModal, setActiveModal] = useState<
    "tickets" | "interested" | "notifications" | "ticketDetail" | "Help" | 
    "Edit Profile" | "bookings" | "validate" | "myEvents" | "discounts" | 
    "host" | "transactions" | "rate" | "support" | "deleteConfirm" | null
  >(null)

  // Notification toggle state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  
  // Rate the App interactive state
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)

  // Delete account confirmation input
  const [deleteConfirmText, setDeleteConfirmText] = useState("")

  // Validate Ticket state
  const [validateMethod, setValidateMethod] = useState<'scan' | 'manual'>('scan')
  const [ticketCodeInput, setTicketCodeInput] = useState("")
  const [validateStatus, setValidateStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const [helpInitialScreen, setHelpInitialScreen] = useState<'helpCenter' | 'contactSupport'>('helpCenter')

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync / Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser((prev: any) => ({
        ...prev,
        name: parsedUser.name || prev.name,
        avatar: parsedUser.avatar || prev.avatar,
        location: parsedUser.location || prev.location,
        email: parsedUser.email || ''
      }))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }

  // Handle avatar upload via file input
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const newAvatar = event.target.result as string
          setUser((prev: any) => ({ ...prev, avatar: newAvatar }))
          
          const savedUser = localStorage.getItem('user')
          if (savedUser) {
            const parsed = JSON.parse(savedUser)
            parsed.avatar = newAvatar
            localStorage.setItem('user', JSON.stringify(parsed))
          } else {
            localStorage.setItem('user', JSON.stringify({ name: user.name, avatar: newAvatar }))
          }
          // Notify other components
          window.dispatchEvent(new Event('storage'))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Categories mapping based on the mobile screenshots
  const menuCategories: MenuCategory[] = [
    {
      id: 'ACCOUNT',
      title: 'ACCOUNT',
      items: [
        { 
          id: 'edit_profile', 
          icon: User, 
          label: 'Edit Profile', 
          subtitle: 'Name, photo, bio',
          color: 'text-purple-400', 
          bgColor: 'bg-purple-500/10',
          action: () => setActiveModal('Edit Profile')
        },
        { 
          id: 'my_tickets', 
          icon: Ticket, 
          label: 'My Tickets', 
          subtitle: 'View, split & accept tickets',
          color: 'text-purple-400', 
          bgColor: 'bg-purple-500/10',
          action: () => setActiveModal('tickets')
        },
        { 
          id: 'my_bookings', 
          icon: History, 
          label: 'My Bookings', 
          subtitle: 'Past & upcoming events',
          color: 'text-purple-400', 
          bgColor: 'bg-purple-500/10',
          action: () => setActiveModal('bookings')
        }
      ]
    },
    {
      id: 'EVENTS',
      title: 'EVENTS',
      items: [
        { 
          id: 'validate_tickets', 
          icon: QrCode, 
          label: 'Validate Tickets', 
          subtitle: 'Scan QR or enter ticket number',
          color: 'text-purple-400', 
          bgColor: 'bg-purple-500/10',
          action: () => {
            setValidateStatus(null)
            setTicketCodeInput("")
            setActiveModal('validate')
          }
        },
        { 
          id: 'create_event', 
          icon: CalendarPlus, 
          label: 'Create Event', 
          subtitle: 'Create a new event',
          color: 'text-purple-400', 
          bgColor: 'bg-purple-500/10',
          action: () => navigate({ to: '/create' })
        },
        { 
          id: 'my_events', 
          icon: CalendarCheck, 
          label: 'My Events', 
          subtitle: 'My created events',
          color: 'text-purple-400', 
          bgColor: 'bg-purple-500/10',
          action: () => setActiveModal('myEvents')
        },
        { 
          id: 'discounts', 
          icon: Tag, 
          label: 'Discounts', 
          subtitle: 'Manage your discounts',
          color: 'text-purple-400', 
          bgColor: 'bg-purple-500/10',
          action: () => setActiveModal('discounts')
        },
        { 
          id: 'host_account', 
          icon: CreditCard, 
          label: 'Host Account', 
          subtitle: 'Manage your host account',
          color: 'text-purple-400', 
          bgColor: 'bg-purple-500/10',
          action: () => setActiveModal('host')
        },
        { 
          id: 'transactions', 
          icon: Receipt, 
          label: 'Transactions', 
          subtitle: 'View your transaction history',
          color: 'text-purple-400', 
          bgColor: 'bg-purple-500/10',
          action: () => setActiveModal('transactions')
        }
      ]
    },
    {
      id: 'PREFERENCES',
      title: 'PREFERENCES',
      items: [
        { 
          id: 'notifications', 
          icon: Bell, 
          label: 'Notifications', 
          subtitle: 'Booking reminders & offers',
          color: 'text-purple-400', 
          bgColor: 'bg-purple-500/10',
          isToggle: true,
          action: () => setActiveModal('notifications')
        }
      ]
    },
    {
      id: 'SUPPORT',
      title: 'SUPPORT',
      items: [
        { 
          id: 'help_center', 
          icon: HelpCircle, 
          label: 'Help Center', 
          subtitle: 'FAQs & self-service support',
          color: 'text-purple-400', 
          bgColor: 'bg-purple-500/10',
          action: () => {
            setHelpInitialScreen('helpCenter')
            setActiveModal('Help')
          }
        },
        { 
          id: 'rate_app', 
          icon: Star, 
          label: 'Rate the App', 
          subtitle: 'Let us know how we\'re doing',
          color: 'text-yellow-500', 
          bgColor: 'bg-yellow-500/10',
          action: () => {
            setRatingSubmitted(false)
            setUserRating(0)
            setActiveModal('rate')
          }
        },
        { 
          id: 'contact_support', 
          icon: MessageSquare, 
          label: 'Contact Support', 
          subtitle: 'Chat with our support team',
          color: 'text-purple-400', 
          bgColor: 'bg-purple-500/10',
          action: () => {
            setHelpInitialScreen('contactSupport')
            setActiveModal('Help')
          }
        }
      ]
    }
  ]

  // Mock handlers
  const handleManualValidation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketCodeInput.trim()) return

    if (ticketCodeInput.toLowerCase().startsWith("btb-")) {
      setValidateStatus({
        type: 'success',
        message: `Ticket successfully validated! Validated for: "${allEvents[0].title}" at Phoenix MarketCity.`
      })
    } else {
      setValidateStatus({
        type: 'error',
        message: 'Invalid ticket code. Ticket codes must begin with "BTB-" (e.g. BTB-4819).'
      })
    }
  }

  const handleDeleteAccount = () => {
    if (deleteConfirmText === "DELETE") {
      localStorage.clear()
      sessionStorage.clear()
      alert("Your account has been deleted successfully.")
      navigate({ to: '/' })
      window.location.reload()
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      {/* Hidden File Input for Avatar */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleAvatarChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Top Banner Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => window.history.back()} 
          className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all cursor-pointer"
          title="Go Back"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Profile</h1>
          <p className="text-white/60 text-sm mt-0.5">Manage your account and preferences</p>
        </div>
      </div>

      {/* Two-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Profile info & Quick Stats */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
          
          {/* Card 1: Avatar & Personal Info */}
          <div className="bg-[#1b1527] border border-white/5 rounded-[2.5rem] p-6 text-center relative overflow-hidden shadow-xl">
            {/* Background design glow */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-vivid/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative inline-block mb-4">
              {/* Profile Image with outline */}
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/50 shadow-2xl p-[3px] bg-[#141414]">
                <img
                  src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=guest"}
                  alt={user?.name || "User Avatar"}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-primary hover:bg-vivid text-white p-2 rounded-full shadow-lg border-2 border-[#1b1527] transition-all hover:scale-110 cursor-pointer"
                title="Change Avatar"
              >
                <Camera size={14} className="stroke-[2.5]" />
              </button>
            </div>

            <h2 className="text-2xl font-black">{user?.name || "Danish Sheikh"}</h2>
            <p className="text-white/50 text-sm mt-1">@{user?.name ? user.name.replace(/\s+/g, '').toLowerCase() : 'danishsheikh'}</p>

            <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-purple-300 px-4 py-1.5 rounded-full text-xs font-semibold mt-4">
              <Sparkles size={12} className="text-primary fill-primary" />
              {user?.tagline || 'Entertainment Seeker'}
            </div>

            <div className="flex items-center justify-center gap-1.5 text-white/60 mt-4 text-xs">
              <MapPin size={14} className="text-primary" />
              <span>{user?.location || 'Mumbai'}</span>
            </div>
          </div>

          {/* Card 2: Interactive Activity Stats */}
          <div className="bg-[#1b1527] border border-white/5 rounded-[2.5rem] p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Heart size={16} className="text-pink-500 fill-pink-500" />
              Your Activity
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setActiveModal('tickets')}
                className="bg-white/5 hover:bg-white/10 border border-white/5 p-3 rounded-2xl text-center transition-all cursor-pointer"
              >
                <div className="text-2xl font-black text-white">{user?.eventsAttended || 5}</div>
                <div className="text-[10px] text-white/50 mt-1 uppercase font-semibold tracking-wider">Attended</div>
              </button>
              <button 
                onClick={() => setActiveModal('interested')}
                className="bg-white/5 hover:bg-white/10 border border-white/5 p-3 rounded-2xl text-center transition-all cursor-pointer"
              >
                <div className="text-2xl font-black text-white">{user?.savedEvents || 20}</div>
                <div className="text-[10px] text-white/50 mt-1 uppercase font-semibold tracking-wider">Interested</div>
              </button>
              <button 
                onClick={() => setActiveModal('bookings')}
                className="bg-white/5 hover:bg-white/10 border border-white/5 p-3 rounded-2xl text-center transition-all cursor-pointer"
              >
                <div className="text-2xl font-black text-white">{user?.upcomingEvents || 10}</div>
                <div className="text-[10px] text-white/50 mt-1 uppercase font-semibold tracking-wider">Upcoming</div>
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Settings categories scroll list */}
        <div className="lg:col-span-2 space-y-6">
          {menuCategories.map((category) => (
            <div 
              key={category.id} 
              className="bg-[#1b1527] border border-white/5 rounded-[2.5rem] p-6 shadow-xl"
            >
              <h3 className="text-xs uppercase font-extrabold tracking-[0.2em] text-white/40 mb-4 px-2">
                {category.title}
              </h3>
              
              <div className="divide-y divide-white/5">
                {category.items.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group"
                  >
                    {/* Item label & Icon */}
                    <button 
                      onClick={item.action}
                      className="flex items-center gap-4 flex-1 text-left cursor-pointer"
                    >
                      <div className={`p-2.5 rounded-xl ${item.bgColor} flex-shrink-0 transition-transform group-hover:scale-105`}>
                        <item.icon size={18} className={item.color} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base transition-colors group-hover:text-primary">
                          {item.label}
                        </h4>
                        <p className="text-xs text-white/40 mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </button>

                    {/* Action controls on right side */}
                    {item.isToggle ? (
                      <button
                        role="switch"
                        aria-checked={notificationsEnabled}
                        onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                        className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${
                          notificationsEnabled ? "bg-primary" : "bg-white/10"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
                            notificationsEnabled ? "left-6" : "left-1"
                          }`}
                        />
                      </button>
                    ) : (
                      <button 
                        onClick={item.action}
                        className="p-2 text-white/20 hover:text-white transition-all rounded-full hover:bg-white/5 cursor-pointer"
                      >
                        <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* DESTRUCTIVE / DANGER ZONE */}
          <div className="bg-[#1b1527] border border-red-500/10 rounded-[2.5rem] p-6 shadow-xl">
            <h3 className="text-xs uppercase font-extrabold tracking-[0.2em] text-red-500/50 mb-4 px-2">
              DANGER ZONE
            </h3>

            <div className="divide-y divide-white/5">
              {/* Sign Out */}
              <div className="flex items-center justify-between py-4 pt-0 group">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-4 flex-1 text-left cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-red-500/10 flex-shrink-0 transition-transform group-hover:scale-105">
                    <LogOut size={18} className="text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400 text-base transition-colors group-hover:text-red-300">
                      Sign Out
                    </h4>
                    <p className="text-xs text-red-400/40 mt-0.5">
                      Log out from your current session
                    </p>
                  </div>
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-red-400/20 hover:text-red-400 transition-all rounded-full hover:bg-red-500/5 cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Delete Account */}
              <div className="flex items-center justify-between py-4 pb-0 group">
                <button 
                  onClick={() => {
                    setDeleteConfirmText("")
                    setActiveModal('deleteConfirm')
                  }}
                  className="flex items-center gap-4 flex-1 text-left cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-red-500/10 flex-shrink-0 transition-transform group-hover:scale-105">
                    <Trash2 size={18} className="text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400 text-base transition-colors group-hover:text-red-300">
                      Delete Account
                    </h4>
                    <p className="text-xs text-red-400/40 mt-0.5">
                      Permanently remove all your account data
                    </p>
                  </div>
                </button>
                <button 
                  onClick={() => {
                    setDeleteConfirmText("")
                    setActiveModal('deleteConfirm')
                  }}
                  className="p-2 text-red-400/20 hover:text-red-400 transition-all rounded-full hover:bg-red-500/5 cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================
          MODALS & INTERACTIVE POPUPS
         ======================================================== */}
      
      {/* 1. Edit Profile Modal */}
      <Modal
        isOpen={activeModal === 'Edit Profile'}
        onClose={() => setActiveModal(null)}
        title="Edit Profile"
      >
        <EditProfile />
      </Modal>

      {/* 2. My Tickets Modal */}
      <Modal
        isOpen={activeModal === 'tickets'}
        onClose={() => setActiveModal(null)}
        title="My Tickets"
      >
        <MyTickets onTicketClick={(id) => {
          setSelectedTicketId(id)
          setActiveModal('ticketDetail')
        }} />
      </Modal>

      {/* 3. Ticket Detail Modal */}
      <Modal
        isOpen={activeModal === 'ticketDetail'}
        onClose={() => setActiveModal('tickets')}
        title="Ticket Details"
      >
        {selectedTicketId && (
          <TicketDetails id={selectedTicketId} />
        )}
      </Modal>

      {/* 4. Interested Events Modal */}
      <Modal
        isOpen={activeModal === 'interested'}
        onClose={() => setActiveModal(null)}
        title="Interested Events"
      >
        <InterestedEvents />
      </Modal>

      {/* 5. Notifications Modal */}
      <Modal
        isOpen={activeModal === 'notifications'}
        onClose={() => setActiveModal(null)}
        title="Notifications"
      >
        <Notifications />
      </Modal>

      {/* 6. Help & Support Modal */}
      <Modal
        isOpen={activeModal === 'Help'}
        onClose={() => setActiveModal(null)}
        title={helpInitialScreen === 'helpCenter' ? "Help Center" : "Contact Support"}
      >
        <Help initialScreen={helpInitialScreen} />
      </Modal>

      {/* 7. My Bookings Modal (Mockup) */}
      <Modal
        isOpen={activeModal === 'bookings'}
        onClose={() => setActiveModal(null)}
        title="My Bookings"
      >
        <div className="space-y-4">
          <p className="text-white/60 text-sm">Here are the events you have booked on BookTheBeats:</p>
          <div className="space-y-3">
            {allEvents.slice(0, 2).map((evt) => (
              <div key={evt.id} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={evt.coverImage} className="w-16 h-12 rounded-lg object-cover" alt="" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{evt.title}</h4>
                    <p className="text-xs text-white/50 mt-0.5">{evt.date} • {evt.time}</p>
                    <p className="text-[10px] text-primary font-semibold mt-1">{evt.venue}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-semibold">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* 8. Validate Tickets Modal (Self-Service Validation Mockup) */}
      <Modal
        isOpen={activeModal === 'validate'}
        onClose={() => setActiveModal(null)}
        title="Validate Tickets"
      >
        <div className="space-y-6">
          <div className="flex border-b border-white/5">
            <button 
              onClick={() => { setValidateMethod('scan'); setValidateStatus(null); }}
              className={`flex-1 pb-3 text-sm font-semibold transition-colors ${validateMethod === 'scan' ? 'text-primary border-b-2 border-primary' : 'text-white/40 hover:text-white'}`}
            >
              Scan QR Code
            </button>
            <button 
              onClick={() => { setValidateMethod('manual'); setValidateStatus(null); }}
              className={`flex-1 pb-3 text-sm font-semibold transition-colors ${validateMethod === 'manual' ? 'text-primary border-b-2 border-primary' : 'text-white/40 hover:text-white'}`}
            >
              Enter Code
            </button>
          </div>

          {validateMethod === 'scan' ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="relative w-48 h-48 border border-dashed border-white/30 rounded-3xl flex items-center justify-center bg-white/5 overflow-hidden">
                <QrCode size={80} className="text-white/20" />
                {/* Glowing Laser Scan Bar */}
                <div className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_12px_#8A2BE2] animate-bounce w-full" />
              </div>
              <p className="text-xs text-white/40 mt-4 max-w-xs">
                To validate ticket entry, hold the ticket QR code in front of your camera.
              </p>
              <button 
                onClick={() => {
                  setValidateStatus({
                    type: 'success',
                    message: `QR Scanned Successfully! Validated for: "${allEvents[1].title}".`
                  })
                }}
                className="mt-6 px-6 py-2.5 bg-primary hover:bg-vivid text-white rounded-xl text-xs font-semibold cursor-pointer shadow-lg active:scale-95 transition-all"
              >
                Simulate QR Scan
              </button>
            </div>
          ) : (
            <form onSubmit={handleManualValidation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-2">Ticket Confirmation Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. BTB-4819" 
                  value={ticketCodeInput}
                  onChange={(e) => setTicketCodeInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-primary text-sm"
                />
                <p className="text-[10px] text-white/40 mt-1">Hint: Type any code starting with "BTB-" to validate successfully!</p>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-primary hover:bg-vivid text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-lg"
              >
                Validate Ticket Code
              </button>
            </form>
          )}

          {/* Validation Feedback Status */}
          {validateStatus && (
            <div className={`p-4 rounded-xl border flex gap-3 items-start ${validateStatus.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
              {validateStatus.type === 'success' ? <CheckCircle2 size={18} className="flex-shrink-0" /> : <AlertCircle size={18} className="flex-shrink-0" />}
              <p className="text-xs leading-relaxed font-medium">{validateStatus.message}</p>
            </div>
          )}
        </div>
      </Modal>

      {/* 9. My Events Modal (Mockup) */}
      <Modal
        isOpen={activeModal === 'myEvents'}
        onClose={() => setActiveModal(null)}
        title="My Events"
      >
        <div className="flex flex-col items-center py-8 text-center">
          <CalendarCheck size={48} className="text-white/20 mb-4" />
          <h4 className="font-bold text-white text-base">No events created yet</h4>
          <p className="text-xs text-white/40 max-w-xs mt-1.5 mb-6">
            You haven't listed any music shows or parties under this account. Click below to publish your first show!
          </p>
          <button 
            onClick={() => { setActiveModal(null); navigate({ to: '/create' }); }}
            className="px-6 py-2.5 bg-primary hover:bg-vivid text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-lg"
          >
            Create an Event
          </button>
        </div>
      </Modal>

      {/* 10. Discounts Modal (Mockup) */}
      <Modal
        isOpen={activeModal === 'discounts'}
        onClose={() => setActiveModal(null)}
        title="Discounts & Promos"
      >
        <div className="space-y-4">
          <p className="text-white/60 text-sm">Active discount promo codes you can use at checkout:</p>
          <div className="space-y-3">
            {[
              { code: "WELCOME10", discount: "10% OFF", desc: "For new users on their first ticket booking." },
              { code: "BEATS25", discount: "25% OFF", desc: "Special festival early bird discount." },
              { code: "VIPEARLY", discount: "₹500 OFF", desc: "Applies to any VVIP packages." }
            ].map((prm) => (
              <div key={prm.code} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-mono bg-primary/20 text-purple-300 border border-primary/20 px-2 py-0.5 rounded text-xs font-bold">{prm.code}</span>
                  <p className="text-xs text-white/50 mt-2">{prm.desc}</p>
                </div>
                <span className="text-sm font-black text-primary">{prm.discount}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* 11. Host Account Modal (Mockup) */}
      <Modal
        isOpen={activeModal === 'host'}
        onClose={() => setActiveModal(null)}
        title="Host Dashboard Account"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Verified Host Account</h4>
              <p className="text-xs text-white/50">Verified partner since March 2024</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
              <div className="text-white/40 text-xs font-semibold">Total Revenue</div>
              <div className="text-2xl font-black text-primary mt-1">₹2,84,000</div>
            </div>
            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
              <div className="text-white/40 text-xs font-semibold">Payout Account</div>
              <div className="text-sm font-bold text-white mt-2">Stripe (Ending in 4242)</div>
            </div>
          </div>
        </div>
      </Modal>

      {/* 12. Transactions Modal (Mockup) */}
      <Modal
        isOpen={activeModal === 'transactions'}
        onClose={() => setActiveModal(null)}
        title="Transactions History"
      >
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-white/40">
                  <th className="pb-3 font-semibold">Event</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: "Shakira Live Concert", date: "Apr 15, 2024", amt: "₹5,500", status: "Success" },
                  { name: "Live Jazz Evening", date: "Apr 25, 2024", amt: "₹1,200", status: "Success" },
                  { name: "Electronic Festival", date: "May 10, 2024", amt: "₹2,000", status: "Pending" }
                ].map((tx, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-bold text-white">{tx.name}</td>
                    <td className="py-3 text-white/60">{tx.date}</td>
                    <td className="py-3 font-bold text-primary">{tx.amt}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tx.status === 'Success' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>

      {/* 13. Rate App Modal (Interactive feedback) */}
      <Modal
        isOpen={activeModal === 'rate'}
        onClose={() => setActiveModal(null)}
        title="Rate BookTheBeats"
      >
        <div className="flex flex-col items-center py-6 text-center">
          {ratingSubmitted ? (
            <div className="space-y-3">
              <div className="w-12 h-12 bg-green-500/20 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="font-bold text-white text-base">Thank you for rating us!</h4>
              <p className="text-xs text-white/40 max-w-xs mt-1">
                Your feedback helps us provide the best event ticket booking experience possible.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-white/60 text-sm">How would you rate your experience with the app?</p>
              
              {/* Star interactive selection */}
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setUserRating(star)}
                    className="p-1 cursor-pointer transition-all hover:scale-110"
                  >
                    <Star 
                      size={36} 
                      className={`${
                        star <= (hoverRating || userRating) 
                          ? 'text-yellow-500 fill-yellow-500' 
                          : 'text-white/20'
                      }`} 
                    />
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setRatingSubmitted(true)}
                disabled={userRating === 0}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-lg ${userRating > 0 ? 'bg-primary hover:bg-vivid text-white cursor-pointer active:scale-95' : 'bg-white/10 text-white/40 cursor-not-allowed'}`}
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      </Modal>


      {/* 15. Delete Account Confirmation Modal */}
      <Modal
        isOpen={activeModal === 'deleteConfirm'}
        onClose={() => setActiveModal(null)}
        title="Delete Account permanently"
      >
        <div className="space-y-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex gap-3 items-start text-red-400">
            <ShieldAlert size={20} className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Warning: This action is irreversible!</h4>
              <p className="text-xs text-red-400/80 leading-relaxed mt-1">
                Permanently deleting your account will instantly wipe all active bookings, ticket confirmations, wallet discounts, and host profiles.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-white/60 text-xs leading-relaxed">
              To proceed, please type <strong className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">DELETE</strong> in the box below to confirm:
            </p>
            <input 
              type="text" 
              placeholder="Type DELETE" 
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-red-500 text-sm font-semibold tracking-wider"
            />
            
            <button 
              onClick={handleDeleteAccount}
              disabled={deleteConfirmText !== "DELETE"}
              className={`w-full py-3 rounded-xl text-xs font-extrabold transition-all shadow-lg ${
                deleteConfirmText === "DELETE"
                  ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer active:scale-95'
                  : 'bg-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              Permanently Delete My Account
            </button>
          </div>
        </div>
      </Modal>

    </div>
  )
}
