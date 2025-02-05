<template>
  <div>
    <AccountBookForm @submit="saveAccountBook" :isLoading="isLoading" />
    <UNotifications />
  </div>
</template>

<script setup>
import { useAccountBookStore } from '@/stores/useAccountBookStore'

const accountBookStore = useAccountBookStore()
const isLoading = ref(false)

const { toastSuccess, toastFailure } = useAppToast()

const saveAccountBook = async (formData) => {
  isLoading.value = true

  try {
    await accountBookStore.createAccountBooks(formData)

    toastSuccess({
      title: '새로운 가계부가 등록되었습니다.',
      actionLabel: '확인',
      actionClick: () => navigateTo('/')
    })
  } catch (err) {
    toastFailure({
      title: '가계부 등록에 실패하였습니다.',
      actionLabel: '확인',
    })
  } finally {
    isLoading.value = false
  }
}
</script>

