import Link from 'next/link'

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Authentication Error</h1>
        <p className="text-gray-400 mb-8">There was an error during the authentication process.</p>
        <Link 
          href="/"
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
} 