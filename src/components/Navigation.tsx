import { Button } from "@/components/ui/button"

export default function Navigation() {
  return (
    <nav 
      className="bg-black/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">3D</span>
            </div>
            <span className="text-xl font-bold text-white">Interactive Demo</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-blue-400 transition-colors">Home</a>
            <a href="/demo" className="text-white hover:text-blue-400 transition-colors">Full Screen</a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">About</a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors">Contact</a>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:text-blue-400 hover:bg-white/10">
              <span className="hidden sm:inline">Sign In</span>
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <span className="hidden sm:inline">Get Started</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
