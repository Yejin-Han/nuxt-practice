<template>
  <div class="container mx-auto max-w-xl h-full">
    <header>header</header>
    <main class="h-full pt-4 flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup>
useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
      crossorigin: "",
    },
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
#__nuxt {
  @apply h-full;
}
</style>