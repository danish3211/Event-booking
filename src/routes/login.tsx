import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Static credentials check
    if (email === 'admin@admin.com' && password === 'admin') {
      setError('')
      const mockUser = {
        name: 'Admin User',
        email: 'admin@admin.com',
        avatar: 'https://i.pravatar.cc/150?u=admin'
      }
      localStorage.setItem('user', JSON.stringify(mockUser))
      navigate({ to: '/' })
    } else {
      setError('Invalid email or password. Use admin@admin.com / admin')
    }
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
            <h2 className="text-3xl font-black text-white">Welcome back</h2>
            <p className="text-white/70 mt-2 text-sm">Sign in to discover happening events</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium border border-red-100">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-text">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@admin.com"
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
                  placeholder="admin"
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
              <div className="flex justify-end pt-1">
                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-vivid text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-primary/20"
            >
              Log In
            </button>

          </form>

          <div className="mt-8 text-center text-sm text-text/60">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-bold hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
