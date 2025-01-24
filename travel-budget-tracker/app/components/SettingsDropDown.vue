<template>
  <div v-if="!auth.user" class="w-full h-full flex justify-center items-center">
    <UIcon name="i-heroicons-cog-8-tooth" class="block w-6 h-6" />
  </div>
  <UDropdown v-else :items="items" :popper="{ placement: 'bottom-end' }" :ui="{ item: { disabled: 'opacity-50' }, width: 'w-48' }" class="flex justify-center items-center">
    <UAvatar :src="avatarUrl" alt="Profile Image" size="xs" class="mx-auto ring-2 ring-gray-600 dark:ring-gray-300" />
    <template #account="{ item }">
      <div class="w-full">
        <p class="text-center">{{ item.label }}님, 환영합니다!</p>
      </div>
    </template>
    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <!-- label 속성 없이 user.email을 바로 사용하라는데.. (이메일 불러오는게 좀 늦다고) 나는 문제가 읎다! -->
      <UIcon
        :name="item.icon"
        class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500 ms-auto"
      />
    </template>
  </UDropdown>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'

const auth = useAuthStore()

const avatarUrl = auth.user?.user_metadata.avatar_url;

const items = [
  [{
    label: auth.user?.user_metadata.name,
    slot: 'account',
    disabled: true,
  }],
  [{
      label: '설정',
      icon: 'i-heroicons-cog-8-tooth',
      click: () => navigateTo('/settings/profile')
  }],
  [{
      label: '로그아웃',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: async () => {
        await useSupabaseClient().auth.signOut()
        return navigateTo('/login')
      }
  }]
]
</script>