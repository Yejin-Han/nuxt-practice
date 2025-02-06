<template>
  <div v-if="isLoading" class="w-full h-full flex justify-center items-center">
    <LoadingIndicator />
  </div>
  <div v-else>
    <div v-if="accounts.length">
      <UCard v-for="(account, idx) in accounts" :key="idx" :ui="{ background: 'bg-white dark:bg-gray-800', ring: 'ring-0' }" class="border border-gray-200 dark:border-gray-700 cursor-pointer" >
        <div>
          <div>
            <h3 class="text-xl">{{ account.name }}</h3>
            <p class="text-sm">{{ account.start_date }} ~ {{ account.end_date }}</p>
          </div>
          <div class="text-xs mt-6 flex justify-between">
            <span>{{ account.country_label }}</span>
            <span>{{ calculateDday(account.start_date) }}</span>
          </div>
        </div>
      </UCard>
    </div>
    <div v-else>없어요</div>
  </div>
</template>

<script setup>
import { useAccountBookStore } from '@/stores/useAccountBookStore'

const accountBookStore = useAccountBookStore()
const { calculateDday } = useDdayCalculator()

accountBookStore.fetchAccountBooks() // mount된 후에 fetch를 실행하면 그제서야 isLoading이 업데이트 되므로, isLoading이 false인 상태에서 DOM이 먼저 보이고 나서 fetch가 실행되기 때문에 데이터 없음->로딩->데이터 있음!으로 뜨게 됨 but 내가 원하는건 로딩->데이터 없음/있음 이므로 그냥 setup 단계에서 바로 실행

const accounts = computed(() => accountBookStore.accountBooks)
const isLoading = computed(() => accountBookStore.isLoading)


</script>