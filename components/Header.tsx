'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Logo from './Logo'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const isAdminPage = pathname?.startsWith('/admin')
  const isAdminDashboard = pathname === '/admin/dashboard'

  useEffect(() => {
    // Vérifier l'authentification
    const checkAuth = () => {
      const auth = localStorage.getItem('admin_authenticated')
      const sessionTime = localStorage.getItem('admin_session_time')
      
      if (auth === 'true' && sessionTime) {
        const now = Date.now()
        const sessionAge = now - parseInt(sessionTime)
        const maxAge = 24 * 60 * 60 * 1000 // 24 heures
        
        if (sessionAge < maxAge) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('admin_authenticated')
          localStorage.removeItem('admin_session_time')
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
    }

    checkAuth()
    // Vérifier périodiquement
    const interval = setInterval(checkAuth, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_session_time')
    setIsAuthenticated(false)
    router.push('/admin/login')
  }

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center">
          <div className="animate-slideInLeft">
            <Logo size="medium" showTagline={false} />
          </div>
          <nav className="flex gap-8 animate-slideInRight items-center">
            <Link 
              href="/" 
              className={`font-semibold transition-all duration-300 hover:scale-110 relative group ${
                pathname === '/' 
                  ? 'text-yellow-600' 
                  : 'text-gray-700 hover:text-yellow-600'
              }`}
            >
              Accueil
              <span className={`absolute bottom-0 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${
                pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            {/* Lien Admin ou statut Admin */}
            {isAuthenticated && isAdminDashboard ? (
              <>
                <span className="text-yellow-600 font-semibold relative">
                  Admin
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500"></span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 font-semibold transition-all duration-300 hover:scale-110 relative group px-3 py-1 rounded-lg hover:bg-red-50"
                >
                  Déconnexion
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </>
            ) : (
              <Link 
                href="/admin/login" 
                className={`font-semibold transition-all duration-300 hover:scale-110 relative group ${
                  isAdminPage && !isAdminDashboard
                    ? 'text-yellow-600' 
                    : 'text-gray-700 hover:text-yellow-600'
                }`}
              >
                Admin
                <span className={`absolute bottom-0 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ${
                  isAdminPage && !isAdminDashboard ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
