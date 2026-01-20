'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Toast from '@/components/Toast'
import Modal from '@/components/Modal'

interface Model {
  id: string
  name: string
  description: string
  price: number
  image?: string
  createdAt: string
}

interface Order {
  id: string
  modelId: string
  modelName: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress: string
  size?: string
  message?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'models' | 'orders'>('models')
  const [models, setModels] = useState<Model[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [showModelForm, setShowModelForm] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; modelId: string | null }>({
    isOpen: false,
    modelId: null,
  })
  const [modelForm, setModelForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  })

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = () => {
    const isAuth = localStorage.getItem('admin_authenticated')
    const sessionTime = localStorage.getItem('admin_session_time')
    
    if (isAuth === 'true' && sessionTime) {
      // Vérifier si la session n'a pas expiré (24 heures)
      const now = Date.now()
      const sessionAge = now - parseInt(sessionTime)
      const maxAge = 24 * 60 * 60 * 1000 // 24 heures
      
      if (sessionAge < maxAge) {
        setAuthenticated(true)
        setCheckingAuth(false)
        loadData()
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
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_session_time')
    router.push('/admin/login')
  }

  useEffect(() => {
    if (authenticated) {
      loadData()
    }
  }, [authenticated])

  async function loadData() {
    try {
      const [modelsRes, ordersRes] = await Promise.all([
        fetch('/api/models'),
        fetch('/api/orders'),
      ])
      const modelsData = await modelsRes.json()
      const ordersData = await ordersRes.json()
      setModels(modelsData)
      setOrders(ordersData)
    } catch (error) {
      console.error('Error loading data:', error)
      setToast({ message: 'Erreur lors du chargement des données', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  async function handleAddModel(e: React.FormEvent) {
    e.preventDefault()
    try {
      const response = await fetch('/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: modelForm.name,
          description: modelForm.description,
          price: parseFloat(modelForm.price),
          image: modelForm.image || undefined,
        }),
      })

      if (response.ok) {
        setToast({ message: 'Modèle ajouté avec succès !', type: 'success' })
        setModelForm({ name: '', description: '', price: '', image: '' })
        setShowModelForm(false)
        loadData()
      } else {
        setToast({ message: 'Erreur lors de l\'ajout du modèle', type: 'error' })
      }
    } catch (error) {
      setToast({ message: 'Erreur lors de l\'ajout du modèle', type: 'error' })
    }
  }

  const handleDeleteClick = (modelId: string) => {
    setDeleteModal({ isOpen: true, modelId })
  }

  const confirmDeleteModel = async () => {
    if (!deleteModal.modelId) return

    try {
      const response = await fetch(`/api/models?id=${deleteModal.modelId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setToast({ message: 'Modèle supprimé avec succès !', type: 'success' })
        setDeleteModal({ isOpen: false, modelId: null })
        loadData()
      } else {
        setToast({ message: 'Erreur lors de la suppression', type: 'error' })
      }
    } catch (error) {
      setToast({ message: 'Erreur lors de la suppression', type: 'error' })
    }
  }

  async function handleUpdateOrderStatus(orderId: string, status: Order['status']) {
    try {
      const response = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status }),
      })

      if (response.ok) {
        setToast({ message: 'Statut de la commande mis à jour !', type: 'success' })
        loadData()
      } else {
        setToast({ message: 'Erreur lors de la mise à jour', type: 'error' })
      }
    } catch (error) {
      setToast({ message: 'Erreur lors de la mise à jour', type: 'error' })
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'En attente'
      case 'confirmed':
        return 'Confirmée'
      case 'completed':
        return 'Terminée'
      case 'cancelled':
        return 'Annulée'
      default:
        return status
    }
  }

  // Afficher un loader pendant la vérification de l'authentification
  if (checkingAuth || !authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative flex items-center justify-center" style={{ zIndex: 1 }}>
        <div className="text-center">
          <div className="loader"></div>
          <p className="mt-4 text-gray-600 font-medium">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative flex items-center justify-center" style={{ zIndex: 1 }}>
        <div className="text-center">
          <div className="loader"></div>
          <p className="mt-4 text-gray-600 font-medium">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative" style={{ zIndex: 1 }}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('models')}
              className={`px-6 py-3 font-semibold transition-all duration-300 relative ${
                activeTab === 'models'
                  ? 'text-yellow-600'
                  : 'text-gray-600 hover:text-yellow-500'
              }`}
            >
              Modèles
              {activeTab === 'models' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 font-semibold transition-all duration-300 relative ${
                activeTab === 'orders'
                  ? 'text-yellow-600'
                  : 'text-gray-600 hover:text-yellow-500'
              }`}
            >
              Commandes ({orders.length})
              {activeTab === 'orders' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500"></span>
              )}
            </button>
          </div>
        </div>

        {/* Models Tab */}
        {activeTab === 'models' && (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Gestion des Modèles</h2>
              <button
                onClick={() => setShowModelForm(!showModelForm)}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {showModelForm ? 'Annuler' : '+ Ajouter un modèle'}
              </button>
            </div>

            {showModelForm && (
              <form onSubmit={handleAddModel} className="bg-white p-6 rounded-xl shadow-lg mb-8 animate-scaleIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom du modèle</label>
                    <input
                      type="text"
                      value={modelForm.name}
                      onChange={(e) => setModelForm({ ...modelForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prix (FCFA)</label>
                    <input
                      type="number"
                      value={modelForm.price}
                      onChange={(e) => setModelForm({ ...modelForm, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={modelForm.description}
                      onChange={(e) => setModelForm({ ...modelForm, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL de l'image (optionnel)</label>
                    <input
                      type="url"
                      value={modelForm.image}
                      onChange={(e) => setModelForm({ ...modelForm, image: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="https://exemple.com/image.jpg"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Ajouter le modèle
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => (
                <div key={model.id} className="bg-white rounded-xl shadow-lg overflow-hidden animate-scaleIn">
                  {model.image && (
                    <img src={model.image} alt={model.name} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                    <p className="text-gray-600 mb-4">{model.description}</p>
                    <p className="text-2xl font-bold text-yellow-600 mb-4">{model.price} FCFA</p>
                    <button
                      onClick={() => handleDeleteClick(model.id)}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Gestion des Commandes</h2>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                  <p className="text-gray-600 text-lg">Aucune commande pour le moment.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl shadow-lg p-6 animate-scaleIn">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{order.modelName}</h3>
                        <p className="text-gray-600"><strong>Client:</strong> {order.clientName}</p>
                        <p className="text-gray-600"><strong>Email:</strong> {order.clientEmail}</p>
                        <p className="text-gray-600"><strong>Téléphone:</strong> {order.clientPhone}</p>
                        <p className="text-gray-600"><strong>Adresse:</strong> {order.clientAddress}</p>
                        <p className="text-gray-600">
                          <strong>Taille:</strong> 
                          {order.size?.startsWith('Sur mesure:') ? (
                            <div className="mt-2 ml-0">
                              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold mb-2">
                                Sur mesure
                              </span>
                              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-sm font-semibold text-gray-700 mb-1">Mesures personnalisées :</p>
                                <p className="text-sm text-gray-600 whitespace-pre-line">{order.size.replace('Sur mesure: ', '')}</p>
                              </div>
                            </div>
                          ) : (
                            <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                              {order.size || 'Non spécifiée'}
                            </span>
                          )}
                        </p>
                        {order.message && (
                          <p className="text-gray-600 mt-2"><strong>Message:</strong> {order.message}</p>
                        )}
                        <p className="text-gray-500 text-sm mt-2">
                          Commandé le: {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, 'confirmed')}
                        disabled={order.status === 'confirmed'}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirmer
                      </button>
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                        disabled={order.status === 'completed'}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Terminer
                      </button>
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                        disabled={order.status === 'cancelled'}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Modal de confirmation de suppression */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, modelId: null })}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer ce modèle ? Cette action est irréversible."
        type="warning"
        confirmText="Supprimer"
        cancelText="Annuler"
        showCancel={true}
        onConfirm={confirmDeleteModel}
      />
    </div>
  )
}
