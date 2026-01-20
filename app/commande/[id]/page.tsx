'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Toast from '@/components/Toast'

interface Model {
  id: string
  name: string
  description: string
  price: number
  image?: string
}

export default function CommandePage() {
  const router = useRouter()
  const params = useParams()
  const modelId = params?.id as string
  const [model, setModel] = useState<Model | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    size: '',
    customMeasurements: {
      chest: '',      // Tour de poitrine
      waist: '',      // Tour de taille
      hips: '',       // Tour de hanches
      shoulder: '',   // Largeur d'épaule
      sleeve: '',     // Longueur de manche
      pants: '',      // Longueur de pantalon
      neck: '',       // Tour de cou
      back: '',       // Longueur dos
    },
    message: '',
  })

  useEffect(() => {
    async function fetchModel() {
      if (!modelId) return
      try {
        const response = await fetch('/api/models')
        const models = await response.json()
        const foundModel = models.find((m: Model) => m.id === modelId)
        setModel(foundModel)
      } catch (error) {
        console.error('Error fetching model:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchModel()
  }, [modelId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelId: modelId,
          clientName: formData.clientName,
          clientEmail: formData.clientEmail,
          clientPhone: formData.clientPhone,
          clientAddress: formData.clientAddress,
          size: formData.size === 'Sur mesure' 
            ? `Sur mesure: Poitrine ${formData.customMeasurements.chest}cm, Taille ${formData.customMeasurements.waist}cm, Hanches ${formData.customMeasurements.hips}cm${formData.customMeasurements.shoulder ? `, Épaule ${formData.customMeasurements.shoulder}cm` : ''}${formData.customMeasurements.sleeve ? `, Manche ${formData.customMeasurements.sleeve}cm` : ''}${formData.customMeasurements.pants ? `, Pantalon ${formData.customMeasurements.pants}cm` : ''}${formData.customMeasurements.neck ? `, Cou ${formData.customMeasurements.neck}cm` : ''}${formData.customMeasurements.back ? `, Dos ${formData.customMeasurements.back}cm` : ''}`
            : formData.size,
          message: formData.message || undefined,
        }),
      })

      if (response.ok) {
        setToast({ 
          message: 'Votre commande a été enregistrée avec succès !', 
          type: 'success' 
        })
        // Rediriger après 2 secondes
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        setToast({ 
          message: 'Erreur lors de l\'enregistrement de la commande. Veuillez réessayer.', 
          type: 'error' 
        })
      }
    } catch (error) {
      console.error('Error submitting order:', error)
      setToast({ 
        message: 'Erreur lors de l\'enregistrement de la commande. Veuillez réessayer.', 
        type: 'error' 
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center animate-fadeIn">
          <div className="loader mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center animate-scaleIn">
          <div className="inline-block p-8 bg-white rounded-2xl shadow-xl">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-gray-600 mb-6 text-lg font-medium">Modèle introuvable</p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative" style={{ zIndex: 1 }}>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 animate-scaleIn border border-gray-100">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2 animate-fadeIn">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Passer une commande
            </span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg">Remplissez le formulaire ci-dessous pour finaliser votre commande</p>

          {/* Model Info avec animation */}
          <div className="mb-10 pb-8 border-b border-gray-200 animate-fadeIn">
            <div className="flex gap-6 items-center bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-md">
                {model.image ? (
                  <img 
                    src={model.image} 
                    alt={model.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  <svg className="w-16 h-16 text-gray-400 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                  {model.name}
                </h3>
                <p className="text-gray-600 mb-3 leading-relaxed">{model.description}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                  {model.price} FCFA
                </p>
              </div>
            </div>
          </div>

          {/* Order Form avec animations */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
            <div className="animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="clientName" className="block text-sm font-semibold text-gray-700 mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                id="clientName"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-gray-300"
                placeholder="Votre nom complet"
              />
            </div>

            <div className="animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="clientEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="clientEmail"
                required
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-gray-300"
                placeholder="votre@email.com"
              />
            </div>

            <div className="animate-slideInLeft" style={{ animationDelay: '0.3s' }}>
              <label htmlFor="clientPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                Téléphone *
              </label>
              <input
                type="tel"
                id="clientPhone"
                required
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-gray-300"
                placeholder="+221 XX XXX XX XX"
              />
            </div>

            <div className="animate-slideInLeft" style={{ animationDelay: '0.4s' }}>
              <label htmlFor="clientAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                Adresse complète *
              </label>
              <textarea
                id="clientAddress"
                required
                rows={3}
                value={formData.clientAddress}
                onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-gray-300 resize-none"
                placeholder="Votre adresse complète"
              />
            </div>

            <div className="animate-slideInLeft" style={{ animationDelay: '0.45s' }}>
              <label htmlFor="size" className="block text-sm font-semibold text-gray-700 mb-2">
                Taille *
              </label>
              <select
                id="size"
                required
                value={formData.size}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  size: e.target.value,
                  customMeasurements: e.target.value !== 'Sur mesure' 
                    ? { chest: '', waist: '', hips: '', shoulder: '', sleeve: '', pants: '', neck: '', back: '' }
                    : formData.customMeasurements
                })}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-gray-300 bg-white"
              >
                <option value="">Sélectionnez une taille</option>
                <option value="XS">XS (Extra Small)</option>
                <option value="S">S (Small)</option>
                <option value="M">M (Medium)</option>
                <option value="L">L (Large)</option>
                <option value="XL">XL (Extra Large)</option>
                <option value="XXL">XXL (Double Extra Large)</option>
                <option value="XXXL">XXXL (Triple Extra Large)</option>
                <option value="Sur mesure">Sur mesure</option>
              </select>
            </div>

            {/* Formulaire de mesures personnalisées - affiché uniquement si "Sur mesure" est sélectionné */}
            {formData.size === 'Sur mesure' && (
              <div className="animate-slideInLeft animate-fadeIn bg-yellow-50/50 border-2 border-yellow-200 rounded-xl p-6" style={{ animationDelay: '0.5s' }}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vos mesures personnalisées (en cm) *
                  </label>
                  <p className="text-xs text-gray-600 mb-4">
                    <span className="font-semibold text-yellow-600">Important :</span> Veuillez indiquer toutes les mesures en centimètres. Demandez de l'aide si nécessaire.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tour de poitrine */}
                  <div>
                    <label htmlFor="chest" className="block text-sm font-medium text-gray-700 mb-1">
                      Tour de poitrine (cm) *
                    </label>
                    <input
                      type="number"
                      id="chest"
                      required={formData.size === 'Sur mesure'}
                      min="0"
                      step="0.5"
                      value={formData.customMeasurements.chest}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        customMeasurements: { ...formData.customMeasurements, chest: e.target.value }
                      })}
                      className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-white"
                      placeholder="Ex: 95"
                    />
                  </div>

                  {/* Tour de taille */}
                  <div>
                    <label htmlFor="waist" className="block text-sm font-medium text-gray-700 mb-1">
                      Tour de taille (cm) *
                    </label>
                    <input
                      type="number"
                      id="waist"
                      required={formData.size === 'Sur mesure'}
                      min="0"
                      step="0.5"
                      value={formData.customMeasurements.waist}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        customMeasurements: { ...formData.customMeasurements, waist: e.target.value }
                      })}
                      className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-white"
                      placeholder="Ex: 80"
                    />
                  </div>

                  {/* Tour de hanches */}
                  <div>
                    <label htmlFor="hips" className="block text-sm font-medium text-gray-700 mb-1">
                      Tour de hanches (cm) *
                    </label>
                    <input
                      type="number"
                      id="hips"
                      required={formData.size === 'Sur mesure'}
                      min="0"
                      step="0.5"
                      value={formData.customMeasurements.hips}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        customMeasurements: { ...formData.customMeasurements, hips: e.target.value }
                      })}
                      className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-white"
                      placeholder="Ex: 100"
                    />
                  </div>

                  {/* Largeur d'épaule */}
                  <div>
                    <label htmlFor="shoulder" className="block text-sm font-medium text-gray-700 mb-1">
                      Largeur d'épaule (cm)
                    </label>
                    <input
                      type="number"
                      id="shoulder"
                      min="0"
                      step="0.5"
                      value={formData.customMeasurements.shoulder}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        customMeasurements: { ...formData.customMeasurements, shoulder: e.target.value }
                      })}
                      className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-white"
                      placeholder="Ex: 42"
                    />
                  </div>

                  {/* Longueur de manche */}
                  <div>
                    <label htmlFor="sleeve" className="block text-sm font-medium text-gray-700 mb-1">
                      Longueur de manche (cm)
                    </label>
                    <input
                      type="number"
                      id="sleeve"
                      min="0"
                      step="0.5"
                      value={formData.customMeasurements.sleeve}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        customMeasurements: { ...formData.customMeasurements, sleeve: e.target.value }
                      })}
                      className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-white"
                      placeholder="Ex: 60"
                    />
                  </div>

                  {/* Longueur de pantalon */}
                  <div>
                    <label htmlFor="pants" className="block text-sm font-medium text-gray-700 mb-1">
                      Longueur de pantalon (cm)
                    </label>
                    <input
                      type="number"
                      id="pants"
                      min="0"
                      step="0.5"
                      value={formData.customMeasurements.pants}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        customMeasurements: { ...formData.customMeasurements, pants: e.target.value }
                      })}
                      className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-white"
                      placeholder="Ex: 105"
                    />
                  </div>

                  {/* Tour de cou */}
                  <div>
                    <label htmlFor="neck" className="block text-sm font-medium text-gray-700 mb-1">
                      Tour de cou (cm)
                    </label>
                    <input
                      type="number"
                      id="neck"
                      min="0"
                      step="0.5"
                      value={formData.customMeasurements.neck}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        customMeasurements: { ...formData.customMeasurements, neck: e.target.value }
                      })}
                      className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-white"
                      placeholder="Ex: 38"
                    />
                  </div>

                  {/* Longueur dos */}
                  <div>
                    <label htmlFor="back" className="block text-sm font-medium text-gray-700 mb-1">
                      Longueur dos (cm)
                    </label>
                    <input
                      type="number"
                      id="back"
                      min="0"
                      step="0.5"
                      value={formData.customMeasurements.back}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        customMeasurements: { ...formData.customMeasurements, back: e.target.value }
                      })}
                      className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-white"
                      placeholder="Ex: 75"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="animate-slideInLeft" style={{ animationDelay: formData.size === 'Sur mesure' ? '0.6s' : '0.5s' }}>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Message (optionnel)
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 hover:border-gray-300 resize-none"
                placeholder={formData.size === 'Sur mesure' ? "Informations supplémentaires, préférences de style, etc." : "Informations supplémentaires, préférences de style, etc."}
              />
            </div>

            <div className="flex gap-4 pt-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 relative bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/50 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 group/btn"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Confirmer la commande
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </span>
                {!submitting && (
                  <span className="absolute inset-0 shimmer opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                )}
              </button>
              <Link
                href="/"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold hover:-translate-y-1"
              >
                Annuler
              </Link>
            </div>
          </form>
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
