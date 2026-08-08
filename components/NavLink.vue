<template>
  <NuxtLink
    :to="to"
    class="relative px-3 py-2 text-sm font-medium text-hologram-ice/70 hover:text-hologram-ice rounded-lg transition-all duration-300"
  >
    <slot />
  </NuxtLink>
</template>
<script setup>
defineProps({ to: { type: String, required: true } })
</script>
