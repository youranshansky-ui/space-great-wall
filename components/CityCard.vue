<template>
  <NuxtLink :to="`/cities?city=${city.name}`" class="holo-panel overflow-hidden group block">
    <div class="aspect-[4/3] bg-deep-space-800 relative overflow-hidden">
      <img :src="city.image" :alt="city.name" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
      <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/85 via-deep-space-950/20 to-transparent"></div>
      <div class="absolute top-3 left-3 z-10">
        <span class="tag text-[10px] bg-deep-space-950/60">{{ city.subtitle }}</span>
      </div>
      <div class="absolute bottom-0 left-0 right-0 p-5">
        <h3 class="text-lg font-display font-bold text-stellar-warm mb-1.5">{{ city.name }}</h3>
        <p class="text-xs text-hologram-ice/50 leading-relaxed line-clamp-2">{{ city.desc }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({ city: Object })
</script>
