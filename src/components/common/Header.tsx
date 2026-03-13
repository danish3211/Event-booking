import { Link, useLocation } from '@tanstack/react-router'
import { CircleUserRound, LogOut, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Wrapper } from '../ui/Wrapper'
import CitySelector from '../ui/CitySelector'


export default function Header() {
  const location = useLocation()
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null)

  const isTransparentHeader = 
    location.pathname === '/' || 
    location.pathname.startsWith('/events/') || 
    location.pathname.startsWith('/artist/')
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }


  return (
    <div className={`z-50 w-full ${isTransparentHeader ? 'absolute top-0 left-0 bg-transparent' : 'bg-transparent'}`}>
      <Wrapper>
        <header className={`p-4 flex items-center justify-between text-white gap-5 ${isTransparentHeader ? '' : 'shadow-lg'}`}>
          <div className="flex items-center justify-between">
            <h1 className="ml-4 text-xl font-semibold">
              <Link to="/">
                {/* <img
                  src="/tanstack-word-logo-white.svg"
                  alt="TanStack Logo"
                  className="h-10"
                /> */}
                <p className="">Book The Beats</p>
              </Link>
            </h1>

            {!isAuthPage && (
              <div className="">
                <CitySelector />
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">
            {!isAuthPage && (
              <Link to="/create" className="flex items-center gap-1.5 cursor-pointer hover:text-vivid transition-colors">
                <Plus size={18} />
                <span className="font-medium">Create Event</span>
              </Link>
            )}

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/user/$username"
                    params={{ username: user.name.toLowerCase().replace(/\s+/g, '-') }}
                    className="flex items-center gap-2 group"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden transition-transform group-hover:scale-105">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="font-medium group-hover:text-vivid transition-colors hidden sm:block">{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/signup" className="flex items-center gap-1.5 cursor-pointer bg-primary/20 hover:bg-primary/40 px-4 py-2 rounded-full border border-primary/50 transition-all font-medium">
                    <CircleUserRound size={18} />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
      </Wrapper>
    </div>
  )
}