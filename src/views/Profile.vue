<template>
  <div class="profile-page">
    <header class="profile-header">
      <div class="profile-info">
        <div class="profile-avatar avatar">
          <span class="avatar-placeholder">{{ userInfo.avatar }}</span>
        </div>
        <div class="profile-details">
          <div class="profile-name-row">
            <h1 class="profile-name">{{ userInfo.name }}</h1>
            <span v-if="userInfo.verified" class="verified-badge">
              ✓ 已实名认证
            </span>
          </div>
          <p class="profile-phone">{{ userInfo.phone }}</p>
        </div>
      </div>
      
      <div class="profile-stats">
        <div class="stat-item">
          <span class="stat-value">{{ userInfo.petCount }}</span>
          <span class="stat-label">我的宠物</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">{{ userInfo.orderCount }}</span>
          <span class="stat-label">寄养订单</span>
        </div>
      </div>
    </header>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">异常提醒</h2>
        <span v-if="unreadAlerts.length > 0" class="alert-badge">
          {{ unreadAlerts.length }} 条未读
        </span>
      </div>
      
      <div v-if="alerts.length > 0" class="alerts-list">
        <div 
          v-for="alert in alerts" 
          :key="alert.id"
          class="alert-item card"
          :class="{ unread: !alert.read }"
          @click="markAsRead(alert)"
        >
          <div class="alert-header">
            <div class="alert-icon">
              {{ getAlertIcon(alert.type) }}
            </div>
            <div class="alert-info">
              <div class="alert-title-row">
                <h3 class="alert-title">{{ alert.title }}</h3>
                <span v-if="!alert.read" class="unread-dot"></span>
              </div>
              <p class="alert-meta">
                {{ alert.familyName }} · {{ alert.petName }}
              </p>
            </div>
            <span class="alert-time">{{ formatTime(alert.time) }}</span>
          </div>
          <p class="alert-message">{{ alert.message }}</p>
        </div>
      </div>
      
      <div v-else class="empty-state small">
        <div class="empty-icon">🔔</div>
        <h3 class="empty-title">暂无异常提醒</h3>
        <p class="empty-description">您的宠物状态一切正常</p>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">寄养订单</h2>
      </div>
      
      <div v-if="orders.length > 0" class="orders-list">
        <div 
          v-for="order in orders" 
          :key="order.id"
          class="order-item card"
        >
          <div class="order-header">
            <div class="order-family">
              <div class="order-family-avatar">
                {{ getFamilyAvatar(order.familyId) }}
              </div>
              <div>
                <h3 class="order-family-name">{{ order.familyName }}</h3>
                <p class="order-pet-info">
                  {{ getPetAvatar(order.petType) }} {{ order.petName }}
                </p>
              </div>
            </div>
            <span class="order-status" :class="getStatusClass(order.status)">
              {{ getStatusText(order.status) }}
            </span>
          </div>
          
          <div class="order-details">
            <div class="detail-row">
              <span class="detail-label">寄养时间</span>
              <span class="detail-value">{{ order.startDate }} 至 {{ order.endDate }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">寄养天数</span>
              <span class="detail-value">{{ order.days }} 天</span>
            </div>
            <div class="detail-row price-row">
              <span class="detail-label">订单金额</span>
              <span class="detail-value price">¥{{ order.price }}</span>
            </div>
          </div>
          
          <div v-if="order.hasAlert" class="order-alert">
            <span class="alert-icon-small">⚠️</span>
            <span class="alert-text">{{ order.alertMessage }}</span>
          </div>
          
          <div class="order-actions">
            <button 
              v-if="order.status === 'active'" 
              class="action-btn primary"
            >
              查看实时视频
            </button>
            <button 
              v-if="order.status === 'completed'"
              class="action-btn secondary"
            >
              再次寄养
            </button>
            <button class="action-btn text">
              订单详情
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-state small">
        <div class="empty-icon">📋</div>
        <h3 class="empty-title">暂无寄养订单</h3>
        <p class="empty-description">去首页挑选一个寄养家庭吧</p>
      </div>
    </section>

    <section class="section">
      <div class="settings-list">
        <div class="settings-item card">
          <span class="settings-icon">🐾</span>
          <span class="settings-label">我的宠物</span>
          <span class="settings-arrow">›</span>
        </div>
        <div class="settings-item card">
          <span class="settings-icon">⚙️</span>
          <span class="settings-label">账号设置</span>
          <span class="settings-arrow">›</span>
        </div>
        <div class="settings-item card">
          <span class="settings-icon">🔔</span>
          <span class="settings-label">通知设置</span>
          <span class="settings-arrow">›</span>
        </div>
        <div class="settings-item card">
          <span class="settings-icon">❓</span>
          <span class="settings-label">帮助中心</span>
          <span class="settings-arrow">›</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { userInfo, alerts, orders, fosterFamilies } from '../data/mockData.js'

const alertsList = ref(alerts)
const ordersList = ref(orders)

const unreadAlerts = computed(() => {
  return alertsList.value.filter(a => !a.read)
})

const getAlertIcon = (type) => {
  switch (type) {
    case 'health':
      return '🩺'
    case 'activity':
      return '🐾'
    default:
      return '🔔'
  }
}

const formatTime = (time) => {
  const date = new Date(time)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return '今天'
  } else if (diffDays === 1) {
    return '昨天'
  } else if (diffDays < 7) {
    return `${diffDays}天前`
  } else {
    return time.split(' ')[0]
  }
}

const markAsRead = (alert) => {
  const index = alertsList.value.findIndex(a => a.id === alert.id)
  if (index !== -1) {
    alertsList.value[index].read = true
  }
}

const getFamilyAvatar = (familyId) => {
  const family = fosterFamilies.find(f => f.id === familyId)
  return family?.avatar || '🏠'
}

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

const getStatusText = (status) => {
  switch (status) {
    case 'active':
      return '寄养中'
    case 'completed':
      return '已完成'
    case 'cancelled':
      return '已取消'
    default:
      return status
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'active':
      return 'status-active'
    case 'completed':
      return 'status-completed'
    default:
      return 'status-default'
  }
}
</script>

<style scoped>
.profile-page {
  padding-bottom: 20px;
}

.profile-header {
  padding: 32px 20px 24px;
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.profile-avatar {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
}

.profile-avatar .avatar-placeholder {
  font-size: 36px;
}

.profile-details {
  flex: 1;
  min-width: 0;
}

.profile-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.profile-name {
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-phone {
  font-size: 14px;
  color: var(--text-secondary);
}

.profile-stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
  background-color: var(--bg-secondary);
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
}

.stat-label {
  font-size: 12px;
  color: var(--text-secondary);
}

.stat-divider {
  width: 1px;
  height: 32px;
  background-color: var(--border-color);
}

.section {
  padding: 0 20px;
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
}

.alert-badge {
  padding: 4px 10px;
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--danger);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alert-item {
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.alert-item.unread {
  border-left: 3px solid var(--danger);
  background-color: rgba(239, 68, 68, 0.05);
}

.alert-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.alert-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.alert-info {
  flex: 1;
  min-width: 0;
}

.alert-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.alert-title {
  font-size: 14px;
  font-weight: 600;
}

.unread-dot {
  width: 6px;
  height: 6px;
  background-color: var(--danger);
  border-radius: 50%;
  flex-shrink: 0;
}

.alert-meta {
  font-size: 12px;
  color: var(--text-secondary);
}

.alert-time {
  font-size: 12px;
  color: var(--text-tertiary);
  flex-shrink: 0;
}

.alert-message {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  padding-left: 40px;
}

.empty-state.small {
  padding: 40px 20px;
}

.empty-state.small .empty-icon {
  font-size: 48px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-item {
  padding: 16px;
}

.order-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.order-family {
  display: flex;
  align-items: center;
  gap: 12px;
}

.order-family-avatar {
  font-size: 28px;
}

.order-family-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.order-pet-info {
  font-size: 13px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.order-status {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.order-status.status-active {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

.order-status.status-completed {
  background-color: rgba(160, 160, 160, 0.1);
  color: var(--text-secondary);
}

.order-status.status-default {
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
}

.order-details {
  padding: 12px;
  background-color: var(--bg-tertiary);
  border-radius: 12px;
  margin-bottom: 12px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
}

.detail-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.detail-value {
  font-size: 13px;
  font-weight: 500;
}

.detail-value.price {
  font-size: 16px;
  font-weight: 700;
}

.price-row {
  padding-top: 8px;
  margin-top: 4px;
  border-top: 1px solid var(--border-color);
}

.order-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: rgba(245, 158, 11, 0.1);
  border-radius: 10px;
  margin-bottom: 12px;
}

.alert-icon-small {
  font-size: 16px;
}

.alert-text {
  font-size: 13px;
  color: var(--warning);
}

.order-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 13px;
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

.action-btn.text {
  background-color: transparent;
  color: var(--text-secondary);
  padding: 10px 8px;
}

.action-btn.text:hover {
  color: var(--text-primary);
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.settings-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.settings-item:hover {
  border-color: var(--text-secondary);
}

.settings-icon {
  font-size: 20px;
}

.settings-label {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

.settings-arrow {
  font-size: 16px;
  color: var(--text-tertiary);
}
</style>
