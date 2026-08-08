<template>
  <div class="group cursor-pointer rounded-xl overflow-hidden holo-border bg-deep-space-800/50 hover:border-stellar-gold/15 transition-all duration-500">
    <div class="aspect-square bg-deep-space-700 relative overflow-hidden">
      <img :src="`/images/${folder}/${comic.id}.png`" :alt="comic.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" @error="onImgErr" />
      <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
        <span class="text-[10px] text-stellar-warm/90 tracking-widest">{{ comic.episode }}</span>
      </div>
    </div>
    <div class="p-3">
      <p class="text-[11px] text-hologram-ice/40 tracking-wide">{{ comic.episode }}</p>
      <h4 class="text-sm text-hologram-ice group-hover:text-stellar-warm/90 transition-colors">{{ comic.title }}</h4>
    </div>
  </div>
</template>
<script setup>
defineProps({ comic: Object, folder: String })
function onImgErr(e) { e.target.style.display = 'none' }
</script>
