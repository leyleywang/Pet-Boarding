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
    <Toast />
  </div>
</template>

<script setup>
import BottomNav from './components/BottomNav.vue'
import Toast from './components/Toast.vue'
</script>

<style scoped>
</style>
