<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div 
          v-for="toast in toasts" 
          :key="toast.id"
          class="toast"
          :class="`toast-${toast.type}`"
          :style="{ opacity: toast.visible ? 1 : 0, transform: toast.visible ? 'translateX(0)' : 'translateX(100%)' }"
        >
          <div class="toast-icon">
            <Icons :name="getIconName(toast.type)" :size="20" />
          </div>
          <div class="toast-message">{{ toast.message }}</div>
          <button class="toast-close" @click="removeToast(toast.id)">
            <Icons name="close" :size="16" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '../composables/useToast.js'
import Icons from './Icons.vue'

const { toasts, removeToast } = useToast()

const getIconName = (type) => {
  switch (type) {
    case 'success':
      return 'check'
    case 'error':
      return 'alert'
    case 'warning':
      return 'alert'
    case 'info':
    default:
      return 'info'
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 280px;
  max-width: 400px;
  padding: 14px 16px;
  background-color: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.toast-success {
  border-left: 4px solid var(--success);
}

.toast-success .toast-icon {
  color: var(--success);
}

.toast-error {
  border-left: 4px solid var(--danger);
}

.toast-error .toast-icon {
  color: var(--danger);
}

.toast-warning {
  border-left: 4px solid var(--warning);
}

.toast-warning .toast-icon {
  color: var(--warning);
}

.toast-info {
  border-left: 4px solid var(--text-secondary);
}

.toast-info .toast-icon {
  color: var(--text-secondary);
}

.toast-icon {
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.4;
}

.toast-close {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.toast-close:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
}

.toast-enter-active {
  animation: toastIn 0.3s ease;
}

.toast-leave-active {
  animation: toastOut 0.3s ease;
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes toastOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
