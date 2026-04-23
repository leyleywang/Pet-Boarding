<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
        <Transition name="slide-up">
          <div v-if="order" class="modal-content order-detail-modal">
            <div class="modal-handle"></div>
            
            <div class="modal-header">
              <h2 class="modal-title">订单详情</h2>
              <button class="modal-close" @click="handleClose">
                <Icons name="close" :size="18" />
              </button>
            </div>
            
            <div class="order-status-section">
              <div class="order-status-badge" :class="`status-${order.status}`">
                <Icons :name="getStatusIcon(order.status)" :size="16" />
                <span>{{ getStatusText(order.status) }}</span>
              </div>
              <span class="order-id">订单号: #{{ order.id }}</span>
            </div>
            
            <div class="divider"></div>
            
            <div class="detail-section">
              <h3 class="detail-title">寄养家庭</h3>
              <div class="family-card">
                <div class="family-info">
                  <div class="family-avatar">
                    <Icons :name="getFamilyIcon(order.familyId)" :size="24" fill="currentColor" />
                  </div>
                  <div>
                    <h4 class="family-name">{{ order.familyName }}</h4>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="detail-section">
              <h3 class="detail-title">宠物信息</h3>
              <div class="pet-info-card">
                <div class="pet-icon">
                  <Icons :name="getPetIcon(order.petType)" :size="28" />
                </div>
                <div class="pet-details">
                  <div class="pet-name">{{ order.petName }}</div>
                  <div class="pet-type">{{ order.petType }}</div>
                </div>
              </div>
            </div>
            
            <div class="detail-section">
              <h3 class="detail-title">寄养时间</h3>
              <div class="time-info">
                <div class="time-item">
                  <Icons name="calendar" :size="18" class="time-icon" />
                  <div>
                    <div class="time-label">开始日期</div>
                    <div class="time-value">{{ order.startDate }}</div>
                  </div>
                </div>
                <div class="time-arrow">
                  <Icons name="chevron-right" :size="20" />
                </div>
                <div class="time-item">
                  <Icons name="calendar" :size="18" class="time-icon" />
                  <div>
                    <div class="time-label">结束日期</div>
                    <div class="time-value">{{ order.endDate }}</div>
                  </div>
                </div>
              </div>
              <div class="days-info">
                <Icons name="clock" :size="16" />
                <span>共 {{ order.days }} 天</span>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="detail-section">
              <h3 class="detail-title">费用明细</h3>
              <div class="price-breakdown">
                <div class="price-row">
                  <span class="price-label">寄养费用</span>
                  <span class="price-value">¥{{ order.price / order.days }} × {{ order.days }} 天</span>
                </div>
                <div class="price-row total">
                  <span class="price-label">实付金额</span>
                  <span class="price-value">¥{{ order.price }}</span>
                </div>
              </div>
            </div>
            
            <div v-if="order.hasAlert" class="alert-section">
              <div class="alert-header">
                <Icons name="alert" :size="18" class="alert-icon" />
                <span class="alert-title">异常提醒</span>
              </div>
              <p class="alert-message">{{ order.alertMessage }}</p>
            </div>
            
            <div class="modal-actions">
              <button v-if="order.status === 'active'" class="btn btn-primary" @click="viewVideo">
                <Icons name="video" :size="18" />
                查看实时视频
              </button>
              <button v-else class="btn btn-secondary" @click="handleClose">
                关闭
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Icons from './Icons.vue'
import { fosterFamilies } from '../data/mockData.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  order: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'viewVideo'])

const router = useRouter()

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

const getStatusIcon = (status) => {
  switch (status) {
    case 'active':
      return 'play'
    case 'completed':
      return 'check'
    default:
      return 'info'
  }
}

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

const getFamilyIcon = (familyId) => {
  const family = fosterFamilies.find(f => f.id === familyId)
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

const handleClose = () => {
  emit('close')
}

const viewVideo = () => {
  emit('viewVideo', props.order)
  router.push('/family')
  handleClose()
}
</script>

<style scoped>
.order-detail-modal {
  max-height: 85vh;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
}

.modal-close {
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

.modal-close:hover {
  background-color: var(--border-color);
  color: var(--text-primary);
}

.order-status-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.order-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.status-active {
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success);
}

.status-completed {
  background-color: rgba(160, 160, 160, 0.1);
  color: var(--text-secondary);
}

.order-id {
  font-size: 12px;
  color: var(--text-tertiary);
}

.detail-section {
  margin-bottom: 20px;
}

.detail-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.family-card {
  background-color: var(--bg-tertiary);
  border-radius: 12px;
  padding: 14px;
}

.family-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.family-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.family-name {
  font-size: 15px;
  font-weight: 600;
}

.pet-info-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: var(--bg-tertiary);
  border-radius: 12px;
  padding: 16px;
}

.pet-icon {
  color: var(--text-secondary);
}

.pet-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.pet-type {
  font-size: 13px;
  color: var(--text-secondary);
}

.time-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background-color: var(--bg-tertiary);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
}

.time-item {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.time-icon {
  color: var(--text-secondary);
}

.time-label {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: 4px;
}

.time-value {
  font-size: 14px;
  font-weight: 500;
}

.time-arrow {
  color: var(--text-tertiary);
}

.days-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  justify-content: center;
}

.price-breakdown {
  background-color: var(--bg-tertiary);
  border-radius: 12px;
  padding: 16px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.price-row.total {
  padding-top: 12px;
  margin-top: 8px;
  border-top: 1px solid var(--border-color);
}

.price-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.price-row.total .price-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.price-value {
  font-size: 14px;
  font-weight: 500;
}

.price-row.total .price-value {
  font-size: 18px;
  font-weight: 700;
}

.alert-section {
  background-color: rgba(245, 158, 11, 0.05);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 20px;
}

.alert-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.alert-icon {
  color: var(--warning);
}

.alert-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--warning);
}

.alert-message {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  padding-left: 26px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.modal-actions .btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
