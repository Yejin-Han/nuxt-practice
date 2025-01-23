import { useAuthStore } from '@/stores/useAuthStore'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore()

  console.log('🔍 미들웨어 체크 - user:', auth.user)

  // 유저가 없으면 세션 강제 복구 시도
  const user = auth.user || (await auth.fetchUser())

  console.log('🔍 미들웨어 체크 - fetchUser() 후 user:', user)
})
