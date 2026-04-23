<template>
  <div class="family-page">
    <header class="page-header">
      <h1 class="page-title">
        <Icons name="video" :size="28" class="title-icon" />
        实时视频
      </h1>
      <p class="page-subtitle">随时查看宠物寄养状态</p>
    </header>

    <section class="section">
      <div class="live-status-bar">
        <span class="live-indicator">
          <span class="live-dot"></span>
          LIVE
        </span>
        <span class="live-count">{{ liveStreams.length }} 个摄像头在线</span>
      </div>
    </section>

    <section class="section">
      <div class="stream-list">
        <div 
          v-for="stream in liveStreams" 
          :key="stream.id"
          class="stream-card card"
          @click="openStream(stream)"
        >
          <div class="stream-thumbnail">
            <div class="thumbnail-placeholder">
              <Icons name="image" :size="64" fill="var(--text-tertiary)" />
            </div>
            <div class="stream-overlay">
              <span class="stream-live-badge">
                <span class="live-dot small"></span>
                LIVE
              </span>
              <span class="stream-viewers">
                <Icons name="eye" :size="14" />
                {{ stream.viewers }} 人观看
              </span>
            </div>
            <div class="stream-play">
              <Icons name="play" :size="24" fill="var(--bg-primary)" class="play-icon" />
            </div>
          </div>
          <div class="stream-info">
            <h3 class="stream-title">{{ stream.title }}</h3>
            <p class="stream-family">{{ stream.familyName }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="activeStreams.length > 0" class="section">
      <div class="section-header">
        <h2 class="section-title">
          <Icons name="paw" :size="18" class="section-icon" />
          我的宠物监控
        </h2>
      </div>
      
      <div class="my-pets-list">
        <div 
          v-for="order in activeStreams" 
          :key="order.id"
          class="pet-stream-card card"
        >
          <div class="pet-stream-header">
            <div class="pet-info">
              <div class="pet-avatar avatar">
                <Icons :name="getPetIcon(order.petType)" :size="20" class="avatar-icon" fill="currentColor" />
              </div>
              <div>
                <h4 class="pet-name">{{ order.petName }}</h4>
                <p class="pet-location">{{ order.familyName }}</p>
              </div>
            </div>
            <span class="status-badge status-active">寄养中</span>
          </div>
          
          <div class="pet-stream-preview" @click="viewPetStream(order)">
            <div class="preview-placeholder">
              <Icons name="video" :size="40" fill="var(--text-tertiary)" />
              <p class="preview-text">点击查看实时视频</p>
            </div>
            <div class="preview-overlay">
              <span class="preview-live">
                <span class="live-dot small"></span>
                实时直播中
              </span>
            </div>
          </div>
          
          <div class="pet-stream-actions">
            <button class="action-btn primary" @click="viewPetStream(order)">
              <Icons name="play" :size="14" />
              查看视频
            </button>
            <button class="action-btn secondary">
              <Icons name="message" :size="14" />
              联系寄养家庭
            </button>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="section">
      <div class="empty-state">
        <div class="empty-icon-wrapper">
          <Icons name="video" :size="56" fill="var(--text-tertiary)" />
        </div>
        <h3 class="empty-title">暂无寄养中的宠物</h3>
        <p class="empty-description">
          您当前没有正在进行中的寄养订单<br>
          去首页挑选一个靠谱的寄养家庭吧
        </p>
      </div>
    </section>

    <Transition name="fade">
      <div v-if="isStreamModalOpen" class="stream-modal-overlay" @click.self="closeStream">
        <div class="stream-modal-content">
          <div class="stream-modal-header">
            <button class="stream-modal-close" @click="closeStream">
              <Icons name="close" :size="16" />
            </button>
            <h3 class="stream-modal-title">{{ selectedStream?.title || '实时视频' }}</h3>
            <div class="stream-modal-live">
              <span class="live-dot small"></span>
              LIVE
            </div>
          </div>
          
          <div class="stream-modal-player">
            <div class="player-placeholder">
              <Icons name="video" :size="64" fill="rgba(255,255,255,0.2)" />
              <p class="player-text">视频直播中...</p>
              <p class="player-hint">（实际项目中将接入真实视频流）</p>
            </div>
            <div class="player-controls">
              <button class="control-btn">
                <Icons name="pause" :size="18" />
              </button>
              <button class="control-btn">
                <Icons name="volume" :size="18" />
              </button>
              <button class="control-btn">
                <Icons name="phone" :size="18" />
              </button>
              <button class="control-btn">
                <Icons name="expand" :size="18" />
              </button>
            </div>
          </div>
          
          <div class="stream-modal-info">
            <div class="info-row">
              <span class="info-label">位置</span>
              <span class="info-value">{{ selectedStream?.familyName }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">当前观看</span>
              <span class="info-value">{{ selectedStream?.viewers }} 人</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { liveStreams, orders } from '../data/mockData.js'
import Icons from '../components/Icons.vue'

const isStreamModalOpen = ref(false)
const selectedStream = ref(null)

const activeStreams = computed(() => {
  return orders.filter(order => order.status === 'active')
})

const getPetIcon = (type) => {
  switch (type) {
    case '狗':
      return 'dog'
    case '猫':
      return 'cat'
    case '小型宠物':
      return 'hamster'
    default:
      return 'paw'
  }
}

const openStream = (stream) => {
  selectedStream.value = stream
  isStreamModalOpen.value = true
}

const closeStream = () => {
  isStreamModalOpen.value = false
  selectedStream.value = null
}

const viewPetStream = (order) => {
  const familyStream = liveStreams.find(s => s.familyName === order.familyName)
  if (familyStream) {
    openStream(familyStream)
  }
}
</script>

<style scoped>
.family-page {
  padding-bottom: 20px;
}

.page-header {
  padding: 32px 20px 16px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  flex-shrink: 0;
}

.page-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

.section {
  padding: 0 20px;
  margin-bottom: 24px;
}

.live-status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--danger);
}

.live-dot {
  width: 8px;
  height: 8px;
  background-color: var(--danger);
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

.live-dot.small {
  width: 6px;
  height: 6px;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.live-count {
  font-size: 13px;
  color: var(--text-secondary);
}

.section-header {
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  flex-shrink: 0;
}

.stream-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stream-card {
  overflow: hidden;
  cursor: pointer;
}

.stream-thumbnail {
  position: relative;
  height: 180px;
  background-color: var(--bg-tertiary);
  overflow: hidden;
}

.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
}

.stream-overlay {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stream-live-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: rgba(239, 68, 68, 0.9);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
}

.stream-viewers {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 6px;
  font-size: 11px;
  color: #fff;
}

.stream-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.play-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.stream-card:hover .play-icon {
  transform: scale(1.1);
  background-color: #fff;
}

.stream-info {
  padding: 16px;
}

.stream-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.stream-family {
  font-size: 13px;
  color: var(--text-secondary);
}

.my-pets-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pet-stream-card {
  padding: 16px;
}

.pet-stream-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.pet-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pet-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-icon {
  color: var(--text-secondary);
}

.pet-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 2px;
}

.pet-location {
  font-size: 13px;
  color: var(--text-secondary);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-active {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

.pet-stream-preview {
  position: relative;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  cursor: pointer;
}

.preview-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
  gap: 8px;
}

.preview-text {
  font-size: 14px;
  color: var(--text-secondary);
}

.preview-overlay {
  position: absolute;
  top: 12px;
  left: 12px;
}

.preview-live {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: rgba(239, 68, 68, 0.9);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
}

.pet-stream-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.primary {
  background-color: var(--accent-white);
  color: var(--bg-primary);
}

.action-btn.primary:hover {
  opacity: 0.9;
}

.action-btn.secondary {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.action-btn.secondary:hover {
  border-color: var(--text-secondary);
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
}

.empty-icon-wrapper {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.empty-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.empty-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.stream-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stream-modal-content {
  width: 100%;
  max-width: 600px;
  background-color: var(--bg-secondary);
  border-radius: 16px;
  overflow: hidden;
  margin: 20px;
}

.stream-modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.stream-modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.stream-modal-close:hover {
  background-color: var(--border-color);
  color: var(--text-primary);
}

.stream-modal-title {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
}

.stream-modal-live {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: rgba(239, 68, 68, 0.2);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: var(--danger);
}

.stream-modal-player {
  position: relative;
  background-color: #000;
  aspect-ratio: 16/9;
}

.player-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.player-text {
  font-size: 16px;
  color: var(--text-secondary);
}

.player-hint {
  font-size: 12px;
  color: var(--text-tertiary);
}

.player-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}

.control-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.stream-modal-info {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.info-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.info-value {
  font-size: 14px;
  font-weight: 500;
}
</style>
