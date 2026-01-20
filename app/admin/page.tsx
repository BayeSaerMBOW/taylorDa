'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Redirection automatique : /admin -> /admin/login si non connecté, sinon -> /admin/dashboard
export default function AdminRedirect() {
  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated')
    const sessionTime = localStorage.getItem('admin_session_time')
    
    if (isAuth === 'true' && sessionTime) {
      const now = Date.now()
      const sessionAge = now - parseInt(sessionTime)
      const maxAge = 24 * 60 * 60 * 1000 // 24 heures
      
      if (sessionAge < maxAge) {
        // Session valide, rediriger vers le dashboard
        router.push('/admin/dashboard')
      } else {
        // Session expirée
        localStorage.removeItem('admin_authenticated')
        localStorage.removeItem('admin_session_time')
        router.push('/admin/login')
      }
    } else {
      // Non authentifié, rediriger vers login
      router.push('/admin/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative flex items-center justify-center" style={{ zIndex: 1 }}>
      <div className="text-center">
        <div className="loader mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Redirection...</p>
      </div>
    </div>
  )
}
