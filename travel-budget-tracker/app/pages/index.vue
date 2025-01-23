<template>
  <div class="h-[200vh]">
    <div>테스트용</div>
    <button class="border border-white" @click="handleSignOut">로그아웃</button>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
const auth = useAuthStore()

const handleSignOut = async () => {
  await auth.signOut()
  navigateTo('/login')
}
</script>