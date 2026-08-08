<template>
  <NuxtLink :to="to" class="px-4 py-2.5 text-sm text-hologram-ice/70 hover:text-hologram-ice hover:bg-white/[0.03] rounded-lg transition-all">
    <slot />
  </NuxtLink>
</template>
<script setup>
defineProps({ to: { type: String, required: true } })
</script>
