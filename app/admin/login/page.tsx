'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Toast from '@/components/Toast'
import Logo from '@/components/Logo'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Vérifier si déjà connecté
    const isAuthenticated = localStorage.getItem('admin_authenticated')
    if (isAuthenticated === 'true') {
      router.push('/admin')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Stocker la session
        localStorage.setItem('admin_authenticated', 'true')
        localStorage.setItem('admin_session_time', Date.now().toString())
        
        setToast({ message: 'Connexion réussie !', type: 'success' })
        
        // Rediriger vers la page admin dashboard après un court délai
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 1000)
      } else {
        setToast({ message: data.message || 'Mot de passe incorrect', type: 'error' })
        setPassword('')
      }
    } catch (error) {
      setToast({ message: 'Erreur de connexion. Veuillez réessayer.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative flex items-center justify-center" style={{ zIndex: 1 }}>
      <div className="max-w-md w-full mx-4">
        {/* Card de login avec animations */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 animate-scaleIn">
          <div className="text-center mb-8">
            <div className="mb-6 flex justify-center">
              <Logo size="medium" showTagline={true} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Espace Administrateur</h2>
            <p className="text-gray-600">Veuillez entrer le mot de passe pour accéder</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 outline-none"
                placeholder="Entrez le mot de passe"
                required
                disabled={loading}
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-yellow-600 transition-colors duration-300 text-sm"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
