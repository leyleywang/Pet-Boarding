import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

const addToast = (message, type = 'info', duration = 3000) => {
  const id = ++toastId
  const toast = {
    id,
    message,
    type,
    visible: true
  }
  
  toasts.value.push(toast)
  
  if (duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }
  
  return id
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index !== -1) {
    toasts.value[index].visible = false
    setTimeout(() => {
      const currentIndex = toasts.value.findIndex(t => t.id === id)
      if (currentIndex !== -1) {
        toasts.value.splice(currentIndex, 1)
      }
    }, 300)
  }
}

const success = (message, duration) => addToast(message, 'success', duration)
const error = (message, duration) => addToast(message, 'error', duration)
const warning = (message, duration) => addToast(message, 'warning', duration)
const info = (message, duration) => addToast(message, 'info', duration)

export function useToast() {
  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
}
