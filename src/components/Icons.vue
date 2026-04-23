<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="sizeProp"
    :height="sizeProp"
    viewBox="0 0 24 24"
    :fill="fillValue"
    :stroke="colorProp"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="iconClasses"
  >
    <template v-if="nameProp === 'home'">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </template>
    
    <template v-else-if="nameProp === 'video'">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </template>
    
    <template v-else-if="nameProp === 'user'">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </template>
    
    <template v-else-if="nameProp === 'check'">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </template>
    
    <template v-else-if="nameProp === 'star'">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </template>
    
    <template v-else-if="nameProp === 'play'">
      <polygon points="5 3 19 12 5 21 5 3" />
    </template>
    
    <template v-else-if="nameProp === 'pause'">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </template>
    
    <template v-else-if="nameProp === 'volume'">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </template>
    
    <template v-else-if="nameProp === 'expand'">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </template>
    
    <template v-else-if="nameProp === 'eye'">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </template>
    
    <template v-else-if="nameProp === 'bell'">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </template>
    
    <template v-else-if="nameProp === 'clock'">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </template>
    
    <template v-else-if="nameProp === 'calendar'">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </template>
    
    <template v-else-if="nameProp === 'alert'">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </template>
    
    <template v-else-if="nameProp === 'heart'">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </template>
    
    <template v-else-if="nameProp === 'message'">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </template>
    
    <template v-else-if="nameProp === 'settings'">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </template>
    
    <template v-else-if="nameProp === 'help'">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </template>
    
    <template v-else-if="nameProp === 'paw'">
      <circle cx="12" cy="12" r="3" />
      <circle cx="9" cy="7" r="2" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="7" cy="11" r="2" />
      <circle cx="17" cy="11" r="2" />
    </template>
    
    <template v-else-if="nameProp === 'close'">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </template>
    
    <template v-else-if="nameProp === 'chevron-right'">
      <polyline points="9 18 15 12 9 6" />
    </template>
    
    <template v-else-if="nameProp === 'location'">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </template>
    
    <template v-else-if="nameProp === 'phone'">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </template>
    
    <template v-else-if="nameProp === 'image'">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </template>
    
    <template v-else-if="nameProp === 'dollar'">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </template>
    
    <template v-else-if="nameProp === 'repeat'">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </template>
    
    <template v-else-if="nameProp === 'info'">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </template>
    
    <template v-else-if="nameProp === 'dog'">
      <circle cx="10" cy="9" r="1.5" fill="currentColor" />
      <circle cx="14" cy="9" r="1.5" fill="currentColor" />
      <path d="M12 14c-2 0-4 2.5-4 5v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1c0-2.5-2-5-4-5z" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <circle cx="5" cy="6" r="1.5" fill="currentColor" />
      <circle cx="19" cy="6" r="1.5" fill="currentColor" />
    </template>
    
    <template v-else-if="nameProp === 'cat'">
      <path d="M12 14c-2 0-4 2.5-4 5v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1c0-2.5-2-5-4-5z" />
      <circle cx="10" cy="11" r="1.5" fill="currentColor" />
      <circle cx="14" cy="11" r="1.5" fill="currentColor" />
      <path d="M5 4l2 3M19 4l-2 3" />
      <path d="M10 15c.5.5 1.5.5 2 0s1.5-.5 2 0" />
    </template>
    
    <template v-else-if="nameProp === 'hamster'">
      <circle cx="12" cy="14" r="5" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="16" cy="12" r="2" />
      <circle cx="10" cy="14" r="1" fill="currentColor" />
      <circle cx="14" cy="14" r="1" fill="currentColor" />
      <path d="M12 9v-2" />
    </template>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  fill: {
    type: String,
    default: 'none'
  },
  className: {
    type: String,
    default: ''
  }
})

const nameProp = computed(() => props.name)
const sizeProp = computed(() => props.size)
const colorProp = computed(() => props.color)
const fillValue = computed(() => props.fill || 'none')

const iconClasses = computed(() => {
  const classes = ['icon']
  if (props.className) {
    classes.push(props.className)
  }
  return classes
})
</script>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
