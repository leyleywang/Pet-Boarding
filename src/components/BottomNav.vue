<template>
  <nav class="bottom-nav">
    <div class="bottom-nav-inner">
      <router-link 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
      >
        <Icons :name="item.icon" :size="22" class="nav-icon" />
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Icons from './Icons.vue'

const route = useRoute()

const navItems = [
  { path: '/', label: '首页', icon: 'home' },
  { path: '/family', label: '寄养家庭', icon: 'video' },
  { path: '/profile', label: '我的', icon: 'user' }
]

const isActive = (path) => {
  return route.path === path
}
</script>

<style scoped>
.router-link-active,
.router-link-exact-active {
  color: var(--accent-white);
}

.router-link-active .nav-icon,
.router-link-exact-active .nav-icon {
  transform: scale(1.1);
}

.nav-item {
  color: var(--text-tertiary);
  text-decoration: none;
}

.nav-item.active,
.nav-item.router-link-active,
.nav-item.router-link-exact-active {
  color: var(--text-primary);
}

.nav-icon {
  transition: transform 0.2s ease;
}
</style>
