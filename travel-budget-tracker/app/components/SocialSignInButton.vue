<template>
  <button @click="handleSignIn">
    <i class="inline-block w-6 h-6 bg-[url('/assets/images/ico-google.png')] bg-center bg-no-repeat bg-contain"></i>
    Google 로그인
  </button>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
const auth = useAuthStore()

const handleSignIn = async () => {
  const { error } = await auth.signInWithGoogle()
  if(error) console.log('signIn error');

  setTimeout(async () => {
    await auth.fetchUser()
    navigateTo('/')
  }, 1000)
};
</script>