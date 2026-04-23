import { ref, watch } from 'vue'

const STORAGE_KEY = 'pet_boarding_orders'

const loadOrders = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load orders from localStorage:', e)
  }
  return []
}

const orders = ref(loadOrders())

watch(orders, (newOrders) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrders))
  } catch (e) {
    console.error('Failed to save orders to localStorage:', e)
  }
}, { deep: true })

const addOrder = (orderData) => {
  const newOrder = {
    id: Date.now(),
    ...orderData,
    status: 'active',
    hasAlert: false,
    createdAt: new Date().toISOString()
  }
  orders.value.unshift(newOrder)
  return newOrder
}

const updateOrder = (orderId, updates) => {
  const index = orders.value.findIndex(o => o.id === orderId)
  if (index !== -1) {
    orders.value[index] = {
      ...orders.value[index],
      ...updates
    }
  }
}

const getOrderById = (orderId) => {
  return orders.value.find(o => o.id === orderId)
}

const clearAllOrders = () => {
  orders.value = []
}

export function useOrders() {
  return {
    orders,
    addOrder,
    updateOrder,
    getOrderById,
    clearAllOrders
  }
}
