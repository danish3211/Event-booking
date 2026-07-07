import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white font-sans selection:bg-purple-100">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
          alt="Events background"
          className="inset-0 h-screen w-screen object-cover"
        />
      </div>

      <div className="absolute right-0 top-0 flex w-full h-full flex-col items-center justify-center">
        <div className=" space-y-8 text-center bg-white/40 backdrop-blur-sm rounded-xl p-8">
          <div className="space-y-2">
            <h2 className="text-5xl font-extrabold tracking-tight text-primary">
              Let Get Started
            </h2>
            <p className="text-secondary text-lg">
              Sign up or Login to see what's Happening <br className="hidden sm:block" /> near you
            </p>
          </div>

          {/* Social Auth Buttons */}
          <div className="space-y-4 pt-4">
            <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#2D2344] py-4 text-lg font-semibold text-white transition-all hover:bg-[#3d3158] active:scale-[0.98]">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-6 w-6" alt="Google" />
              Continue with Google
            </button>
{/* 
            <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#2D2344] py-4 text-lg font-semibold text-white transition-all hover:bg-[#3d3158] active:scale-[0.98]">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-6 w-6" alt="Facebook" />
              Continue with Facebook
            </button> */}
          </div>



          <p className="px-8 text-center text-md text-secondary leading-relaxed">
            By Signing up or logging, I accept the App{' '}
            <a href="#" className="underline decoration-primary underline-offset-4 text-primary">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="underline decoration-primary underline-offset-4 text-primary">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}