import { defineStore } from 'pinia'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const config = useRuntimeConfig()

  // ✅ 로그인 (Google OAuth)
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) console.error('로그인 오류:', error.message)
  }

  // ✅ 로그아웃
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('로그아웃 오류:', error.message)
  }

  // ✅ 세션 강제 로드 (getSession() 대신 getUser() 사용)
  const fetchUser = async () => {
    console.log('🟢 세션 가져오는 중...')

    // 🔥 `getSession()`이 실패하면 `getUser()`로 유저 정보 가져오기
    const { data, error } = await supabase.auth.getSession()

    if (error || !data.user) {
      console.warn('❌ getUser() 실패, 유저 없음')
      return await restoreSession()
    }

    console.log('✅ 현재 세션:', data.session)
    return data.session.user
  }

  const restoreSession = async () => {
    console.log('🟢 세션 복구 시도...')
    
    const { data, error } = await supabase.auth.refreshSession()
  
    if (error) {
      console.error('❌ 세션 복구 실패:', error.message)
      return null
    }
  
    console.log('✅ 세션 복구 완료:', data.session)
    return data.session.user
  }

  // ✅ 로그인 상태 변경 감지
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('🔄 Auth 상태 변경 감지:', event)
    if (session) {
      console.log('✅ 로그인됨:', session.user)
    } else {
      console.log('🚪 로그아웃됨')
    }
  })

  return { user, signInWithGoogle, signOut, fetchUser }
})
