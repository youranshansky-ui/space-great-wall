<template>
  <NuxtLink :to="to" class="text-sm text-hologram-ice/40 hover:text-stellar-warm/80 transition-colors duration-300">
    <slot />
  </NuxtLink>
</template>
<script setup>
defineProps({ to: { type: String, required: true } })
</script>
