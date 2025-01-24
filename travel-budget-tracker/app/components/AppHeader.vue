<template>
  <header class="sticky inset-0 w-full h-16 px-4 py-4 z-[1000] text-center bg-white dark:bg-gray-900 shadow-[0_0.3125rem_0.625rem_-0.3rem] shadow-gray-200 dark:shadow-gray-600">
    <h1 class="h-full inline-block select-none"><NuxtLink to="/"><img src="../assets/images/logo.png" alt="" class="h-full"></NuxtLink></h1>
    <div class="flex items-center absolute top-1/2 right-4 -translate-y-1/2">
      <span class="text-gray-700 dark:text-gray-300 text-xs">{{ currentMode }}</span>
      <input type="checkbox" id="dark-toggle" class="appearance-none peer">
      <label for="dark-toggle" class="bg-amber-200 inline-block cursor-pointer w-5 h-5 rounded-full ml-1 transition-all duration-300 ease-[cubic-bezier(0.49,0.59,0.82,0.92)] peer-checked:bg-transparent peer-checked:shadow-[inset_-0.4rem_-0.25rem_1px_1px_#111827]" @click="toggleMode"></label>
      <!-- 타이밍 펑션 좀 좋은거 찾아보자... 머리아파 -->
    </div>
  </header>
</template>

<script setup>
const isDarkMode = ref(null)
const currentMode = computed(() => isDarkMode.value ? 'Dark' : 'Light')
const toggleMode = () => {
  isDarkMode.value = !isDarkMode.value
}

onMounted(() => {
  const prefersScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDarkMode.value = prefersScheme
})

useHead({
  htmlAttrs: {
    class: computed(() => (isDarkMode.value ? 'dark' : ''))
  }
})
</script>