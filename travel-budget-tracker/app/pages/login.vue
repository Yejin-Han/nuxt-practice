<template>
  <SocialSignInButton />
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
const auth = useAuthStore()

onMounted(() => {
  if (auth.user) {
    navigateTo('/'); // ✅ 로그인되어 있으면 메인 페이지로 이동
  }
});
</script>