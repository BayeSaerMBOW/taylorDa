'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Model {
  id: string
  name: string
  description: string
  price: number
  image?: string
  createdAt: string
}

export default function Home() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await fetch('/api/models')
        if (response.ok) {
          const data = await response.json()
          setModels(data)
        }
      } catch (error) {
        console.error('Error loading models:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchModels()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative" style={{ zIndex: 1 }}>

      {/* Hero Section avec animations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-6xl md:text-7xl font-extrabold mb-6 animate-scaleIn">
            <span className="bg-gradient-to-r from-black via-gray-900 to-black bg-clip-text text-transparent animate-float">
              Bienvenue chez
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              DA COLLECTION
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Découvrez notre collection exclusive de vêtements sur mesure. 
            <span className="block mt-2 text-yellow-600 font-medium">
              Chaque pièce est créée avec passion et savoir-faire artisanal.
            </span>
          </p>
        </div>

        {/* Loading State avec animation */}
        {loading && (
          <div className="text-center py-20 animate-pulse-custom">
            <div className="loader mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Chargement des modèles...</p>
          </div>
        )}

        {/* Models Grid avec animations */}
        {!loading && models.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <div 
                key={model.id} 
                className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover card-animate border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden group">
                  {model.image ? (
                    <img 
                      src={model.image} 
                      alt={model.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
                      <svg className="w-24 h-24 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {model.name}
                  </h3>
                  <p className="text-gray-600 mb-5 leading-relaxed line-clamp-2">{model.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                      {model.price} FCFA
                    </span>
                    <Link
                      href={`/commande/${model.id}`}
                      className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-xl font-semibold overflow-hidden group/btn transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50 hover:-translate-y-1"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Commander
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      <span className="absolute inset-0 shimmer opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-20 animate-fadeIn">
              <div className="inline-block p-8 bg-white rounded-2xl shadow-lg">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-600 text-lg font-medium">Aucun modèle disponible pour le moment.</p>
              </div>
            </div>
          )
        )}
      </section>

      {/* Footer avec animation */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-24 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              DA COLLECTION
            </h3>
            <p className="text-gray-400 text-lg">Tailleur de Luxe - Créations sur mesure</p>
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-500 text-sm">© 2024 DA COLLECTION. Tous droits réservés.</p>
              <Link 
                href="/admin/login" 
                className="mt-4 inline-block text-gray-600 hover:text-yellow-400 text-xs transition-colors duration-300"
              >
                Espace Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
