export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Authentication Error</h1>
        <p className="text-gray-400 mb-8">
          There was an error with the authentication process. Please try again.
        </p>
        <a 
          href="/"
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  )
} 