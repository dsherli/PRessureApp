import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { apiService } from './services/api'

function App() {
  const [count, setCount] = useState(0)
  const [backendStatus, setBackendStatus] = useState({ connected: false, message: '' })
  const [loading, setLoading] = useState(true)

  // Test backend connection on component mount
  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        setLoading(true)

        // Test health endpoint
        const healthResponse = await apiService.health()

        // Test root endpoint
        const rootResponse = await apiService.getRoot()

        setBackendStatus({
          connected: true,
          message: `✅ Backend connected! ${rootResponse.data.message}`
        })
      } catch (error) {
        console.error('Backend connection failed:', error)
        setBackendStatus({
          connected: false,
          message: '❌ Backend connection failed. Make sure Django server is running on port 8000.'
        })
      } finally {
        setLoading(false)
      }
    }

    testBackendConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <div className="flex justify-center space-x-8">
          <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
            <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
          </a>
        </div>

        <h1 className="text-6xl font-bold text-white mb-8">
          <span className="text-blue-400">PRessure</span> App
        </h1>

        {/* Backend Connection Status */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-lg mx-auto mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Backend Connection</h3>
          {loading ? (
            <div className="text-gray-300">🔄 Testing connection...</div>
          ) : (
            <div className={`text-sm ${backendStatus.connected ? 'text-green-300' : 'text-red-300'}`}>
              {backendStatus.message}
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-md mx-auto">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Count is {count}
          </button>
          <p className="text-gray-300 mt-4">
            Edit <code className="bg-gray-800 px-2 py-1 rounded text-blue-300">src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <p className="text-gray-400 text-sm">
          🏋️‍♂️ Your workout tracking journey starts here
        </p>
      </div>
    </div>
  )
}

export default App
