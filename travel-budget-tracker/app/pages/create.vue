<template>
  <div>
    <AccountBookForm @submit="saveAccountBook" :isLoading="isLoading" />
  </div>
</template>

<script setup>
import { useAccountBookStore } from '@/stores/useAccountBookStore'

const accountBookStore = useAccountBookStore()
const isLoading = ref(false)

const saveAccountBook = async (formData) => {
  isLoading.value = true

  try {
    await accountBookStore.createAccountBooks(formData)
    navigateTo('/')
  } finally {
    isLoading.value = false
  }
}
</script>