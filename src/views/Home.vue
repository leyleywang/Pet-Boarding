<template>
  <div class="home-page">
    <header class="page-header">
      <div class="header-content">
        <div class="logo-section">
          <Icons name="paw" :size="32" fill="currentColor" class="logo-icon" />
          <h1 class="page-title">Pet Boarding</h1>
        </div>
        <p class="page-subtitle">为您的爱宠找到温馨的寄养之家</p>
      </div>
    </header>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">靠谱寄养家庭推荐</h2>
        <span class="section-badge">
          <Icons name="check" :size="12" />
          已实名认证
        </span>
      </div>
      
      <div class="family-list">
        <div 
          v-for="family in fosterFamilies" 
          :key="family.id"
          class="family-card card"
          @click="openOrderModal(family)"
        >
          <div class="family-header">
            <div class="family-avatar avatar">
              <Icons :name="getFamilyIcon(family)" :size="28" class="avatar-icon" fill="currentColor" />
            </div>
            <div class="family-info">
              <div class="family-name-row">
                <h3 class="family-name">{{ family.name }}</h3>
                <span v-if="family.verified" class="verified-badge">
                  <Icons name="check" :size="12" />
                  已认证
                </span>
              </div>
              <div class="family-meta">
                <div class="rating">
                  <Icons name="star" :size="14" fill="var(--warning)" class="rating-star" />
                  <span class="rating-value">{{ family.rating }}</span>
                  <span class="review-count">({{ family.reviewCount }}条评价)</span>
                </div>
                <span class="distance">
                  <Icons name="location" :size="12" class="distance-icon" />
                  {{ family.distance }}
                </span>
              </div>
            </div>
          </div>
          
          <p class="family-description">{{ family.description }}</p>
          
          <div class="family-tags">
            <span v-for="tag in family.petTypes" :key="tag" class="tag tag-default">
              <Icons :name="getPetTagIcon(tag)" :size="12" />
              {{ tag }}
            </span>
          </div>
          
          <div class="family-footer">
            <div class="price-info">
              <span class="price-label">价格</span>
              <span class="price-value">
                <Icons name="dollar" :size="16" />
                ¥{{ family.price.dog > 0 ? family.price.dog : family.price.cat }}
                <span class="price-unit">/天</span>
              </span>
            </div>
            <div class="family-actions">
              <span v-if="family.hasLiveStream" class="live-badge">
                <Icons name="video" :size="14" />
                支持视频
              </span>
            </div>
          </div>
          
          <div v-if="family.reviews.length > 0" class="reviews-section">
            <h4 class="reviews-title">用户评价</h4>
            <div class="review-item">
              <div class="review-header">
                <div class="review-avatar">
                  <Icons name="user" :size="16" />
                </div>
                <span class="review-user">{{ family.reviews[0].user }}</span>
                <div class="review-rating">
                  <Icons 
                    v-for="n in 5" 
                    :key="n" 
                    name="star" 
                    :size="12" 
                    :fill="n <= family.reviews[0].rating ? 'var(--warning)' : 'var(--border-color)'"
                    class="rating-star"
                  />
                </div>
              </div>
              <p class="review-content">{{ family.reviews[0].content }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <OrderModal 
      :is-open="isOrderModalOpen"
      :selected-family="selectedFamily"
      @close="closeOrderModal"
      @confirm="handleOrderConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { fosterFamilies } from '../data/mockData.js'
import OrderModal from '../components/OrderModal.vue'
import Icons from '../components/Icons.vue'
import { useOrders } from '../composables/useOrders.js'
import { useToast } from '../composables/useToast.js'

const { addOrder } = useOrders()
const { success } = useToast()

const isOrderModalOpen = ref(false)
const selectedFamily = ref(null)

const getFamilyIcon = (family) => {
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

const openOrderModal = (family) => {
  selectedFamily.value = family
  isOrderModalOpen.value = true
}

const closeOrderModal = () => {
  isOrderModalOpen.value = false
  selectedFamily.value = null
}

const handleOrderConfirm = (orderData) => {
  const newOrder = addOrder(orderData)
  console.log('订单确认:', newOrder)
  success('下单成功！您可以在"我的"页面查看订单详情。')
  closeOrderModal()
}
</script>

<style scoped>
.home-page {
  padding-bottom: 20px;
}

.page-header {
  padding: 32px 20px 24px;
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
}

.header-content {
  text-align: center;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 8px;
}

.logo-icon {
  color: var(--text-primary);
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(90deg, #ffffff 0%, #888888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

.section {
  padding: 0 20px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  padding: 4px 10px;
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--success);
  border-radius: 20px;
  font-weight: 500;
}

.family-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.family-card {
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.family-card:active {
  transform: scale(0.98);
}

.family-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.family-avatar {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  color: var(--text-secondary);
}

.family-info {
  flex: 1;
  min-width: 0;
}

.family-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.family-name {
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.family-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-star {
  flex-shrink: 0;
}

.rating-value {
  font-weight: 600;
  font-size: 14px;
}

.review-count {
  font-size: 12px;
  color: var(--text-tertiary);
}

.distance {
  font-size: 12px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.distance-icon {
  flex-shrink: 0;
}

.family-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 12px;
}

.family-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.family-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid var(--border-color);
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.price-label {
  font-size: 12px;
  color: var(--text-tertiary);
}

.price-value {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 20px;
  font-weight: 700;
}

.price-unit {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-secondary);
}

.live-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-secondary);
}

.reviews-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.reviews-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--text-secondary);
}

.review-item {
  background-color: var(--bg-tertiary);
  border-radius: 12px;
  padding: 12px;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.review-avatar {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}

.review-user {
  font-size: 13px;
  font-weight: 500;
}

.review-rating {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 2px;
}

.review-content {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}
</style>
