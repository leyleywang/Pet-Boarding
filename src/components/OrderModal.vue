<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
        <Transition name="slide-up">
          <div v-if="isOpen && selectedFamily" class="modal-content">
            <div class="modal-handle"></div>
            
            <div class="modal-header">
              <h2 class="modal-title">确认寄养订单</h2>
              <button class="modal-close" @click="handleClose">✕</button>
            </div>
            
            <div class="family-summary">
              <div class="family-summary-header">
                <div class="family-summary-avatar avatar">
                  <span class="avatar-placeholder">{{ selectedFamily.avatar }}</span>
                </div>
                <div class="family-summary-info">
                  <h3 class="family-summary-name">{{ selectedFamily.name }}</h3>
                  <div class="family-summary-meta">
                    <span class="verified-badge">✓ 已认证</span>
                    <div class="rating">
                      <span class="rating-star">★</span>
                      <span class="rating-value">{{ selectedFamily.rating }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="form-section">
              <div class="form-group">
                <label class="form-label">宠物姓名</label>
                <input 
                  type="text" 
                  v-model="formData.petName"
                  class="form-input"
                  placeholder="请输入您的宠物姓名"
                />
              </div>
              
              <div class="form-group">
                <label class="form-label">宠物类型</label>
                <div class="pet-type-options">
                  <button 
                    v-for="type in availablePetTypes" 
                    :key="type"
                    class="pet-type-btn"
                    :class="{ active: formData.petType === type }"
                    @click="formData.petType = type"
                  >
                    {{ getPetTypeIcon(type) }} {{ type }}
                  </button>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">开始日期</label>
                  <input 
                    type="date" 
                    v-model="formData.startDate"
                    class="form-input"
                    @change="calculateDays"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">结束日期</label>
                  <input 
                    type="date" 
                    v-model="formData.endDate"
                    class="form-input"
                    @change="calculateDays"
                  />
                </div>
              </div>
              
              <div v-if="days > 0" class="duration-info">
                <div class="duration-item">
                  <span class="duration-label">寄养天数</span>
                  <span class="duration-value">{{ days }} 天</span>
                </div>
                <div class="duration-item">
                  <span class="duration-label">每日费用</span>
                  <span class="duration-value">¥{{ dailyPrice }}</span>
                </div>
              </div>
            </div>
            
            <div class="amenities-section">
              <h4 class="amenities-title">服务设施</h4>
              <div class="amenities-list">
                <span 
                  v-for="amenity in selectedFamily.amenities" 
                  :key="amenity"
                  class="amenity-tag"
                >
                  ✓ {{ amenity }}
                </span>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="price-summary">
              <div class="price-row">
                <span class="price-label">寄养费用</span>
                <span class="price-amount">¥{{ totalPrice }}</span>
              </div>
              <div class="price-row price-total">
                <span class="price-label">总计</span>
                <span class="price-amount">¥{{ totalPrice }}</span>
              </div>
            </div>
            
            <div class="modal-actions">
              <button class="btn btn-secondary" @click="handleClose">
                取消
              </button>
              <button 
                class="btn btn-primary"
                :disabled="!isFormValid"
                @click="handleConfirm"
              >
                确认下单
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  selectedFamily: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'confirm'])

const formData = ref({
  petName: '',
  petType: '',
  startDate: '',
  endDate: ''
})

const days = ref(0)

const availablePetTypes = computed(() => {
  if (!props.selectedFamily) return []
  return props.selectedFamily.petTypes || []
})

const dailyPrice = computed(() => {
  if (!props.selectedFamily || !formData.value.petType) return 0
  const price = props.selectedFamily.price
  switch (formData.value.petType) {
    case '狗':
      return price.dog
    case '猫':
      return price.cat
    case '小型宠物':
      return price.smallPet
    default:
      return 0
  }
})

const totalPrice = computed(() => {
  return days.value * dailyPrice.value
})

const isFormValid = computed(() => {
  return formData.value.petName.trim() !== '' && 
         formData.value.petType !== '' && 
         formData.value.startDate !== '' && 
         formData.value.endDate !== '' && 
         days.value > 0
})

const calculateDays = () => {
  if (!formData.value.startDate || !formData.value.endDate) {
    days.value = 0
    return
  }
  
  const start = new Date(formData.value.startDate)
  const end = new Date(formData.value.endDate)
  const diffTime = end - start
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  days.value = diffDays > 0 ? diffDays : 0
}

const getPetTypeIcon = (type) => {
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

const handleClose = () => {
  emit('close')
}

const handleConfirm = () => {
  if (!isFormValid.value) return
  
  const orderData = {
    familyId: props.selectedFamily.id,
    familyName: props.selectedFamily.name,
    petName: formData.value.petName,
    petType: formData.value.petType,
    startDate: formData.value.startDate,
    endDate: formData.value.endDate,
    days: days.value,
    price: totalPrice.value
  }
  
  emit('confirm', orderData)
}

const resetForm = () => {
  formData.value = {
    petName: '',
    petType: '',
    startDate: '',
    endDate: ''
  }
  days.value = 0
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    resetForm()
    const today = new Date().toISOString().split('T')[0]
    formData.value.startDate = today
    
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    formData.value.endDate = tomorrow.toISOString().split('T')[0]
    
    if (availablePetTypes.value.length > 0) {
      formData.value.petType = availablePetTypes.value[0]
    }
    
    calculateDays()
  }
})
</script>

<style scoped>
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
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
  font-size: 14px;
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

.family-summary {
  background-color: var(--bg-tertiary);
  border-radius: 12px;
  padding: 16px;
}

.family-summary-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.family-summary-avatar {
  width: 48px;
  height: 48px;
}

.family-summary-avatar .avatar-placeholder {
  font-size: 24px;
}

.family-summary-info {
  flex: 1;
}

.family-summary-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
}

.family-summary-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.form-section {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  border-color: var(--text-secondary);
}

.form-input::placeholder {
  color: var(--text-tertiary);
}

.form-row {
  display: flex;
  gap: 12px;
}

.form-row .form-group {
  flex: 1;
}

.pet-type-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.pet-type-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pet-type-btn:hover {
  border-color: var(--text-secondary);
}

.pet-type-btn.active {
  background-color: var(--accent-white);
  border-color: var(--accent-white);
  color: var(--bg-primary);
}

.duration-info {
  background-color: var(--bg-tertiary);
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
}

.duration-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.duration-item:last-child {
  margin-bottom: 0;
}

.duration-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.duration-value {
  font-size: 14px;
  font-weight: 500;
}

.amenities-section {
  margin-bottom: 20px;
}

.amenities-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-secondary);
}

.amenities-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.amenity-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.price-summary {
  margin-bottom: 20px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.price-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.price-amount {
  font-size: 16px;
  font-weight: 500;
}

.price-total {
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
  margin-top: 8px;
}

.price-total .price-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.price-total .price-amount {
  font-size: 20px;
  font-weight: 700;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-actions .btn {
  flex: 1;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
</style>
