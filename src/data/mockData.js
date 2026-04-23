export const fosterFamilies = [
  {
    id: 1,
    name: '张阿姨宠物之家',
    owner: '张阿姨',
    avatar: '👩',
    verified: true,
    rating: 4.9,
    reviewCount: 128,
    distance: '1.2km',
    price: {
      dog: 88,
      cat: 68,
      smallPet: 38
    },
    description: '10年养宠经验，家中有独立宠物房间，24小时专人照顾。',
    petTypes: ['狗', '猫', '小型宠物'],
    amenities: ['独立房间', '24小时监控', '专业护理', '每日遛弯'],
    reviews: [
      { id: 1, user: '王先生', avatar: '👨', rating: 5, content: '非常专业的寄养服务，狗狗回家时状态很好！', date: '2024-03-15' },
      { id: 2, user: '李女士', avatar: '👩', rating: 5, content: '张阿姨很有耐心，对猫咪照顾得非常周到。', date: '2024-03-10' },
      { id: 3, user: '陈先生', avatar: '👨', rating: 4, content: '整体服务不错，价格也合理，下次还会选择。', date: '2024-03-05' }
    ],
    hasLiveStream: true
  },
  {
    id: 2,
    name: '阳光宠物乐园',
    owner: '小李',
    avatar: '👦',
    verified: true,
    rating: 4.8,
    reviewCount: 96,
    distance: '2.5km',
    price: {
      dog: 78,
      cat: 58,
      smallPet: 28
    },
    description: '拥有大型户外活动空间，适合活泼的狗狗。每日提供运动和社交时间。',
    petTypes: ['狗', '猫'],
    amenities: ['户外空间', '宠物社交', '运动时间', '健康检查'],
    reviews: [
      { id: 1, user: '赵女士', avatar: '👩', rating: 5, content: '我家狗狗很喜欢这里，每天都有很多玩伴！', date: '2024-03-12' },
      { id: 2, user: '孙先生', avatar: '👨', rating: 4, content: '场地很大，服务也很专业。', date: '2024-03-08' }
    ],
    hasLiveStream: true
  },
  {
    id: 3,
    name: '温馨猫咪公寓',
    owner: '王小姐',
    avatar: '👧',
    verified: true,
    rating: 4.95,
    reviewCount: 215,
    distance: '0.8km',
    price: {
      dog: 0,
      cat: 78,
      smallPet: 48
    },
    description: '专注猫咪寄养服务，安静舒适的环境，提供猫咪专属玩具和爬架。',
    petTypes: ['猫', '小型宠物'],
    amenities: ['猫咪专属空间', '安静环境', '爬架玩具', '每日梳毛'],
    reviews: [
      { id: 1, user: '刘女士', avatar: '👩', rating: 5, content: '猫咪在这里住了一周，状态非常好，环境很适合猫咪。', date: '2024-03-14' },
      { id: 2, user: '周先生', avatar: '👨', rating: 5, content: '非常专业的猫咪寄养，价格合理，服务周到。', date: '2024-03-11' }
    ],
    hasLiveStream: true
  },
  {
    id: 4,
    name: '宠物医疗寄养中心',
    owner: '陈医生',
    avatar: '👨‍⚕️',
    verified: true,
    rating: 4.7,
    reviewCount: 84,
    distance: '3.1km',
    price: {
      dog: 98,
      cat: 88,
      smallPet: 58
    },
    description: '具备宠物医疗背景，适合需要特殊照顾或术后恢复的宠物。',
    petTypes: ['狗', '猫', '小型宠物'],
    amenities: ['医疗背景', '特殊护理', '术后恢复', '健康监测'],
    reviews: [
      { id: 1, user: '吴女士', avatar: '👩', rating: 5, content: '我家狗狗术后在这里寄养，照顾得非常专业，恢复得很好。', date: '2024-03-13' },
      { id: 2, user: '郑先生', avatar: '👨', rating: 5, content: '有医疗背景让人很放心，价格虽然高一点但值得。', date: '2024-03-09' }
    ],
    hasLiveStream: false
  }
]

export const orders = [
  {
    id: 1,
    familyId: 1,
    familyName: '张阿姨宠物之家',
    petName: '旺财',
    petType: '狗',
    startDate: '2024-03-20',
    endDate: '2024-03-25',
    days: 5,
    price: 440,
    status: 'active',
    hasAlert: false
  },
  {
    id: 2,
    familyId: 3,
    familyName: '温馨猫咪公寓',
    petName: '咪咪',
    petType: '猫',
    startDate: '2024-03-10',
    endDate: '2024-03-15',
    days: 5,
    price: 390,
    status: 'completed',
    hasAlert: false
  },
  {
    id: 3,
    familyId: 2,
    familyName: '阳光宠物乐园',
    petName: '豆豆',
    petType: '狗',
    startDate: '2024-02-01',
    endDate: '2024-02-03',
    days: 2,
    price: 156,
    status: 'completed',
    hasAlert: true,
    alertMessage: '宠物在寄养期间出现轻微呕吐，已及时处理并恢复正常。'
  }
]

export const alerts = [
  {
    id: 1,
    orderId: 3,
    familyName: '阳光宠物乐园',
    petName: '豆豆',
    type: 'health',
    title: '健康提醒',
    message: '宠物在寄养期间出现轻微呕吐，已及时处理并恢复正常。',
    time: '2024-02-02 14:30',
    read: false
  },
  {
    id: 2,
    orderId: 1,
    familyName: '张阿姨宠物之家',
    petName: '旺财',
    type: 'activity',
    title: '活动提醒',
    message: '旺财今天已完成2次户外遛弯，状态良好。',
    time: '2024-03-21 16:00',
    read: true
  }
]

export const userInfo = {
  name: '用户',
  avatar: '👤',
  phone: '138****8888',
  verified: true,
  petCount: 2,
  orderCount: 12
}

export const liveStreams = [
  {
    id: 1,
    familyId: 1,
    familyName: '张阿姨宠物之家',
    title: '主客厅监控',
    thumbnail: '🐾',
    isLive: true,
    viewers: 3
  },
  {
    id: 2,
    familyId: 1,
    familyName: '张阿姨宠物之家',
    title: '户外庭院',
    thumbnail: '🌳',
    isLive: true,
    viewers: 5
  },
  {
    id: 3,
    familyId: 2,
    familyName: '阳光宠物乐园',
    title: '活动区域',
    thumbnail: '🎾',
    isLive: true,
    viewers: 8
  },
  {
    id: 4,
    familyId: 3,
    familyName: '温馨猫咪公寓',
    title: '猫咪休息区',
    thumbnail: '😺',
    isLive: true,
    viewers: 2
  }
]
