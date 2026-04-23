<template>
  <div class="profile-page">
    <header class="profile-header">
      <div class="profile-info">
        <div class="profile-avatar avatar">
          <Icons name="user" :size="36" class="avatar-icon" fill="currentColor" />
        </div>
        <div class="profile-details">
          <div class="profile-name-row">
            <h1 class="profile-name">{{ userInfo.name }}</h1>
            <span v-if="userInfo.verified" class="verified-badge">
              <Icons name="check" :size="12" />
              已实名认证
            </span>
          </div>
          <p class="profile-phone">
            <Icons name="phone" :size="14" class="phone-icon" />
            {{ userInfo.phone }}
          </p>
        </div>
      </div>
      
      <div class="profile-stats">
        <div class="stat-item">
          <span class="stat-value">{{ userInfo.petCount }}</span>
          <span class="stat-label">我的宠物</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">{{ allOrders.length }}</span>
          <span class="stat-label">寄养订单</span>
        </div>
      </div>
    </header>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">
          <Icons name="bell" :size="18" class="section-icon" />
          异常提醒
        </h2>
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
              <Icons :name="getAlertIcon(alert.type)" :size="24" :fill="getAlertColor(alert.type)" />
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
        <div class="empty-icon-wrapper">
          <Icons name="bell" :size="48" fill="var(--text-tertiary)" />
        </div>
        <h3 class="empty-title">暂无异常提醒</h3>
        <p class="empty-description">您的宠物状态一切正常</p>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">
          <Icons name="calendar" :size="18" class="section-icon" />
          寄养订单
        </h2>
      </div>
      
      <div v-if="allOrders.length > 0" class="orders-list">
        <div 
          v-for="order in allOrders" 
          :key="order.id"
          class="order-item card"
        >
          <div class="order-header">
            <div class="order-family">
              <div class="order-family-avatar avatar">
                <Icons :name="getOrderFamilyIcon(order)" :size="24" class="avatar-icon" fill="currentColor" />
              </div>
              <div>
                <h3 class="order-family-name">{{ order.familyName }}</h3>
                <p class="order-pet-info">
                  <Icons :name="getPetTagIcon(order.petType)" :size="14" class="pet-type-icon" />
                  {{ order.petName }}
                </p>
              </div>
            </div>
            <span class="order-status" :class="getStatusClass(order.status)">
              {{ getStatusText(order.status) }}
            </span>
          </div>
          
          <div class="order-details">
            <div class="detail-row">
              <span class="detail-label">
                <Icons name="clock" :size="12" class="detail-icon" />
                寄养时间
              </span>
              <span class="detail-value">{{ order.startDate }} 至 {{ order.endDate }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">
                <Icons name="calendar" :size="12" class="detail-icon" />
                寄养天数
              </span>
              <span class="detail-value">{{ order.days }} 天</span>
            </div>
            <div class="detail-row price-row">
              <span class="detail-label">
                <Icons name="dollar" :size="12" class="detail-icon" />
                订单金额
              </span>
              <span class="detail-value price">¥{{ order.price }}</span>
            </div>
          </div>
          
          <div v-if="order.hasAlert" class="order-alert">
            <Icons name="alert" :size="16" fill="var(--warning)" />
            <span class="alert-text">{{ order.alertMessage }}</span>
          </div>
          
          <div class="order-actions">
            <button 
              v-if="order.status === 'active'" 
              class="action-btn primary"
              @click="goToVideo(order)"
            >
              <Icons name="video" :size="14" />
              查看视频
            </button>
            <button 
              v-if="order.status === 'completed'"
              class="action-btn secondary"
              @click="goToHome"
            >
              <Icons name="repeat" :size="14" />
              再次寄养
            </button>
            <button class="action-btn text" @click="openOrderDetail(order)">
              <Icons name="info" :size="14" />
              订单详情
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-state small">
        <div class="empty-icon-wrapper">
          <Icons name="calendar" :size="48" fill="var(--text-tertiary)" />
        </div>
        <h3 class="empty-title">暂无寄养订单</h3>
        <p class="empty-description">去首页挑选一个寄养家庭吧</p>
      </div>
    </section>

    <section class="section">
      <div class="settings-list">
        <div class="settings-item card">
          <Icons name="paw" :size="20" class="settings-icon" fill="currentColor" />
          <span class="settings-label">我的宠物</span>
          <Icons name="chevron-right" :size="16" fill="var(--text-tertiary)" />
        </div>
        <div class="settings-item card">
          <Icons name="settings" :size="20" class="settings-icon" fill="currentColor" />
          <span class="settings-label">账号设置</span>
          <Icons name="chevron-right" :size="16" fill="var(--text-tertiary)" />
        </div>
        <div class="settings-item card">
          <Icons name="bell" :size="20" class="settings-icon" fill="currentColor" />
          <span class="settings-label">通知设置</span>
          <Icons name="chevron-right" :size="16" fill="var(--text-tertiary)" />
        </div>
        <div class="settings-item card">
          <Icons name="help" :size="20" class="settings-icon" fill="currentColor" />
          <span class="settings-label">帮助中心</span>
          <Icons name="chevron-right" :size="16" fill="var(--text-tertiary)" />
        </div>
      </div>
    </section>

    <OrderDetail
      :is-open="isDetailOpen"
      :order="selectedOrder"
      :foster-family="getFosterFamily(selectedOrder)"
      @close="closeDetail"
      @go-to-video="goToVideo"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { userInfo, alerts, orders, fosterFamilies } from '../data/mockData.js'
import { useOrders } from '../composables/useOrders.js'
import Icons from '../components/Icons.vue'
import OrderDetail from '../components/OrderDetail.vue'

const router = useRouter()
const { orders: persistedOrders } = useOrders()

const alertsList = ref(alerts)
const isDetailOpen = ref(false)
const selectedOrder = ref(null)

const allOrders = computed(() => {
  const mockIds = orders.map(o => o.id)
  const filteredPersisted = persistedOrders.value.filter(o => !mockIds.includes(o.id))
  return [...orders, ...filteredPersisted].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1
    if (b.status === 'active' && a.status !== 'active') return 1
    return new Date(b.startDate) - new Date(a.startDate)
  })
})

const unreadAlerts = computed(() => {
  return alertsList.value.filter(a => !a.read)
})

const getAlertIcon = (type) => {
  switch (type) {
    case 'health':
      return 'alert'
    case 'activity':
      return 'paw'
    default:
      return 'bell'
  }
}

const getAlertColor = (type) => {
  switch (type) {
    case 'health':
      return 'var(--danger)'
    case 'activity':
      return 'var(--warning)'
    default:
      return 'var(--text-secondary)'
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

const getOrderFamilyIcon = (order) => {
  const family = fosterFamilies.find(f => f.id === order.familyId)
  if (!family) return 'paw'
  if (family.petTypes.includes('狗') && family.petTypes.includes('猫')) {
    return 'paw'
  } else if (family.petTypes.includes('狗')) {
    return 'dog'
  } else if (family.petTypes.includes('猫')) {
    return 'cat'
  }
  return 'paw'
}

const getPetTagIcon = (type) => {
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

const getFosterFamily = (order) => {
  if (!order) return null
  return fosterFamilies.find(f => f.id === order.familyId)
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

const openOrderDetail = (order) => {
  selectedOrder.value = order
  isDetailOpen.value = true
}

const closeDetail = () => {
  isDetailOpen.value = false
  selectedOrder.value = null
}

const goToVideo = (order) => {
  router.push('/family')
  closeDetail()
}

const goToHome = () => {
  router.push('/')
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  color: var(--text-secondary);
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
  display: flex;
  align-items: center;
  gap: 6px;
}

.phone-icon {
  flex-shrink: 0;
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-icon {
  flex-shrink: 0;
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
  text-align: center;
}

.empty-icon-wrapper {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
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
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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

.pet-type-icon {
  flex-shrink: 0;
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
  display: flex;
  align-items: center;
  gap: 6px;
}

.detail-icon {
  flex-shrink: 0;
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
  gap: 6px;
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
  color: var(--text-secondary);
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
