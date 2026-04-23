<template>
  <div class="app-container">
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from './components/BottomNav.vue'
</script>

<style scoped>
</style>
