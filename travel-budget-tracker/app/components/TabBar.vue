<template>
  <nav class="sticky bottom-0 left-0 w-full h-14 border-t border-gray-200 dark:border-gray-800">
    <ul class="flex h-full">
      <li v-for="(tab, idx) in tabs" :key="idx" class="flex-1">
        <NuxtLink :to="tab.route" v-if="!tab.dropdown" class="block w-full h-full flex justify-center items-center">
          <!-- <img :src="`${images[tab.icon]}`" alt="" class="block w-6 h-6"> // 이미지 사용 시 -->
          <UIcon :name="tab.icon" class="block w-6 h-6" />
        </NuxtLink>
        <SettingsDropDown v-else class="w-full h-full" />
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/useAuthStore'

const auth = useAuthStore()

const tabs = [
  { icon: "i-heroicons-home", route: "/" },
  { icon: "i-heroicons-plus-circle", route: "/create" },
  { icon: "i-heroicons-chart-bar", route: "/analysis" },
  { icon: "i-heroicons-cog", dropdown: true }
]

// 이미지 사용 시
// import { filename } from 'pathe/utils';
// const glob = import.meta.glob('~/assets/images/*.png', { eager: true})
// const images = Object.fromEntries(
//   Object.entries(glob).map(([key, value]) => [filename(key), value.default])
// )
// const tabs = [
//   { icon: "ico-list", route: "/" },
//   { icon: "ico-plus", route: "/create" },
//   { icon: "ico-chart", route: "/analysis" },
//   { icon: "ico-settings", route: "/settings"}
// ]
</script>