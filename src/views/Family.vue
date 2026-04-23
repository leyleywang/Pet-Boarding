<template>
  <div class="family-page">
    <header class="page-header">
      <h1 class="page-title">📹 实时视频</h1>
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
              <span class="thumbnail-icon">{{ stream.thumbnail }}</span>
            </div>
            <div class="stream-overlay">
              <span class="stream-live-badge">
                <span class="live-dot small"></span>
                LIVE
              </span>
              <span class="stream-viewers">
                👁 {{ stream.viewers }} 人观看
              </span>
            </div>
            <div class="stream-play">
              <span class="play-icon">▶</span>
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
        <h2 class="section-title">我的宠物监控</h2>
      </div>
      
      <div class="my-pets-list">
        <div 
          v-for="order in activeStreams" 
          :key="order.id"
          class="pet-stream-card card"
        >
          <div class="pet-stream-header">
            <div class="pet-info">
              <span class="pet-avatar">{{ getPetAvatar(order.petType) }}</span>
              <div>
                <h4 class="pet-name">{{ order.petName }}</h4>
                <p class="pet-location">{{ order.familyName }}</p>
              </div>
            </div>
            <span class="status-badge status-active">寄养中</span>
          </div>
          
          <div class="pet-stream-preview">
            <div class="preview-placeholder">
              <div class="preview-icon">📹</div>
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
              <span class="action-icon">▶</span>
              查看视频
            </button>
            <button class="action-btn secondary">
              <span class="action-icon">💬</span>
              联系寄养家庭
            </button>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="section">
      <div class="empty-state">
        <div class="empty-icon">🎥</div>
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
            <button class="stream-modal-close" @click="closeStream">✕</button>
            <h3 class="stream-modal-title">{{ selectedStream?.title || '实时视频' }}</h3>
            <div class="stream-modal-live">
              <span class="live-dot small"></span>
              LIVE
            </div>
          </div>
          
          <div class="stream-modal-player">
            <div class="player-placeholder">
              <div class="player-icon">📹</div>
              <p class="player-text">视频直播中...</p>
              <p class="player-hint">（实际项目中将接入真实视频流）</p>
            </div>
            <div class="player-controls">
              <button class="control-btn">⏸</button>
              <button class="control-btn">🔊</button>
              <button class="control-btn">📱</button>
              <button class="control-btn">⛶</button>
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

const isStreamModalOpen = ref(false)
const selectedStream = ref(null)

const activeStreams = computed(() => {
  return orders.filter(order => order.status === 'active')
})

const getPetAvatar = (type) => {
  switch (type) {
    case '狗':
      return '🐕'
    case '猫':
      return '🐱'
    case '小型宠物':
      return '🐹'
    default:
      return '🐾'
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

.thumbnail-icon {
  font-size: 64px;
  opacity: 0.5;
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
  font-size: 20px;
  color: var(--bg-primary);
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
  font-size: 32px;
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
}

.preview-icon {
  font-size: 40px;
  margin-bottom: 8px;
  opacity: 0.5;
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

.action-icon {
  font-size: 16px;
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
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
}

.player-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.3;
}

.player-text {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 8px;
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
  font-size: 16px;
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
