<template>
  <div class="relative container mx-auto max-w-xl h-full bg-white dark:bg-gray-900">
    <AppHeader />
    <main class="h-full px-4 pt-14 pb-6 bg-white dark:bg-gray-900">
      <div class="h-[calc(100%-1rem)] mt-4 overflow-y-auto">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
useHead({
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
});
</script>

<style>
body {
  font-family: 'Pretendard';
  @apply bg-slate-400 dark:bg-black;
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