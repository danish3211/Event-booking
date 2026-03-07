import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

export const Route = createFileRoute('/signup')({
  component: Signup,
})

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Static simulation
    alert('Account created successfully! Please log in.')
    navigate({ to: '/login' })
  }

  return (
    <div className="min-h-screen bg-surface/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-surface/20">

        {/* Header Background */}
        <div className="bg-secondary p-8 text-center relative overflow-hidden">
          <div className="absolute top-[-50%] left-[-20%] w-64 h-64 rounded-full bg-primary/40 blur-[80px]" />
          <div className="absolute bottom-[-50%] right-[-20%] w-64 h-64 rounded-full bg-vivid/40 blur-[80px]" />

          <div className="relative z-10">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center justify-center gap-2 text-primary font-black text-2xl tracking-tighter mx-auto w-fit bg-white px-4 py-2 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">æ</div>
                allevents
              </div>
            </Link>
            <h2 className="text-3xl font-black text-white">Create Account</h2>
            <p className="text-white/70 mt-2 text-sm">Join us to host and find amazing events</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSignup} className="space-y-5">

            <div className="space-y-2">
              <label className="text-sm font-bold text-text">First Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full bg-surface/5 border border-surface/30 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text">Last Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full bg-surface/5 border border-surface/30 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-surface/5 border border-surface/30 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="w-full bg-surface/5 border border-surface/30 rounded-xl pl-12 pr-12 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text/40 hover:text-text transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-vivid text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-primary/20 mt-2"
            >
              Sign Up
            </button>

          </form>

          <div className="mt-8 text-center text-sm text-text/60">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
