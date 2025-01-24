<template>
  <div class="relative container mx-auto max-w-xl h-full bg-white dark:bg-gray-900">
    <AppHeader />
    <main class="h-[calc(100%-7.75rem)] px-4 py-6 bg-white dark:bg-gray-900">
      <div class="h-full overflow-x-hidden overflow-y-auto">
        <slot />
      </div>
    </main>
    <TabBar />
  </div>
</template>

<script setup>
useHead({
  title: '여행가계부',
  link: [
    {
      rel: 'preconnect',
      href: 'https://fastly.jsdelivr.net',
      crossorigin: 'anonymous'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css'
    }
  ],
  htmlAttrs: {
    class: 'h-full',
  },
  bodyAttrs: {
    class: 'h-full',
  },
})
</script>

<style>
body {
  font-family: 'Pretendard';
  @apply bg-slate-400 dark:bg-black selection:bg-sky-200 dark:selection:bg-sky-700;
}
#__nuxt {
  @apply h-full;
}

::-webkit-scrollbar {
  @apply w-[0.325rem];
}
::-webkit-scrollbar-thumb {
  @apply bg-gray-200 dark:bg-gray-800 rounded;
}
::-webkit-scrollbar-track {
  @apply bg-transparent;
}
</style>