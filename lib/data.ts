import fs from 'fs'
import path from 'path'

// Lazy initialization - only get paths when needed
function getDataDir() {
  return path.join(process.cwd(), 'data')
}

function getModelsFile() {
  return path.join(getDataDir(), 'models.json')
}

function getOrdersFile() {
  return path.join(getDataDir(), 'orders.json')
}

// Initialize data directory and files if needed
let initialized = false

function ensureDataFiles() {
  if (initialized) return
  
  try {
    const dataDir = getDataDir()
    const modelsFile = getModelsFile()
    const ordersFile = getOrdersFile()

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    if (!fs.existsSync(modelsFile)) {
      fs.writeFileSync(modelsFile, JSON.stringify([], null, 2), 'utf8')
    }

    if (!fs.existsSync(ordersFile)) {
      fs.writeFileSync(ordersFile, JSON.stringify([], null, 2), 'utf8')
    }
    
    initialized = true
  } catch (error: any) {
    console.error('Error initializing data files:', error?.message || error)
    // Don't throw, just log the error
  }
}

export interface Model {
  id: string
  name: string
  description: string
  price: number
  image?: string
  createdAt: string
}

export interface Order {
  id: string
  modelId: string
  modelName: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress: string
  size?: string // Optionnel pour compatibilité avec anciennes commandes
  message?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

export function getModels(): Model[] {
  try {
    ensureDataFiles()
    const modelsFile = getModelsFile()
    const data = fs.readFileSync(modelsFile, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading models:', error)
    return []
  }
}

export function getModel(id: string): Model | null {
  const models = getModels()
  return models.find(m => m.id === id) || null
}

export function saveModel(model: Omit<Model, 'id' | 'createdAt'>): Model {
  ensureDataFiles()
  const models = getModels()
  const newModel: Model = {
    ...model,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  models.push(newModel)
  const modelsFile = getModelsFile()
  fs.writeFileSync(modelsFile, JSON.stringify(models, null, 2))
  return newModel
}

export function deleteModel(id: string): boolean {
  ensureDataFiles()
  const models = getModels()
  const filtered = models.filter(m => m.id !== id)
  if (filtered.length === models.length) {
    return false
  }
  const modelsFile = getModelsFile()
  fs.writeFileSync(modelsFile, JSON.stringify(filtered, null, 2))
  return true
}

export function getOrders(): Order[] {
  try {
    ensureDataFiles()
    const ordersFile = getOrdersFile()
    const data = fs.readFileSync(ordersFile, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading orders:', error)
    return []
  }
}

export function getOrder(id: string): Order | null {
  const orders = getOrders()
  return orders.find(o => o.id === id) || null
}

export function saveOrder(order: Omit<Order, 'id' | 'createdAt' | 'status' | 'modelName'>): Order {
  ensureDataFiles()
  const orders = getOrders()
  const model = getModel(order.modelId)
  const newOrder: Order = {
    ...order,
    modelName: model?.name || 'Modèle inconnu',
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  orders.push(newOrder)
  const ordersFile = getOrdersFile()
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2))
  return newOrder
}

export function updateOrderStatus(id: string, status: Order['status']): boolean {
  ensureDataFiles()
  const orders = getOrders()
  const order = orders.find(o => o.id === id)
  if (!order) {
    return false
  }
  order.status = status
  const ordersFile = getOrdersFile()
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2))
  return true
}
