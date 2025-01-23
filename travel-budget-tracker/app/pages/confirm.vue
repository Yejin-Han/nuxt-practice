<template>
  <div>로그인 확인 중 ...</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'

const auth = useAuthStore()

onMounted(async () => {
  console.log('🟢 /confirm 페이지에서 세션 확인 중...')
  await auth.fetchUser()
  
  // ✅ 세션이 설정된 후 홈으로 이동
  if (auth.user) {
    console.log('✅ 유저 확인됨, 홈으로 이동')
    navigateTo('/')
  } else {
    console.warn('❌ 유저가 없음, 다시 로그인 필요')
    navigateTo('/login')
  }
})
</script>