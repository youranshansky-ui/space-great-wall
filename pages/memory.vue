<template>
  <div class="page-container">
    <PageHero title="河北长城数字记忆殿堂" subtitle="用科技守护千年遗产 · 新秦皇岛市" />

    <section class="py-16">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center mb-20">
          <div>
            <p class="text-sm text-hologram-ice/45 leading-relaxed mb-4">在地球的长城因岁月风蚀而逐渐老去时，月球上的数字记忆殿堂用科技永久保存着每一块砖、每一段城墙的精确数据。这是人类文明的地外备份。</p>
            <p class="text-sm text-hologram-ice/45 leading-relaxed mb-4">全长21196公里的长城，每一米都被以毫米级精度扫描存档。AI系统为每一个敌楼、每一段城墙建立了数字孪生，并关联了跨越两千年的历史文献。</p>
            <p class="text-sm text-hologram-ice/45 leading-relaxed">即使有一天，地球上的长城砖被风化为尘土，月球上的数字记忆殿堂仍将承载着它的全部信息。这是我们对祖先最郑重的承诺。</p>
          </div>
          <div class="relative rounded-2xl overflow-hidden holo-border aspect-[4/3] bg-deep-space-800">
            <img src="/images/earth-memory/1.png" alt="数字记忆殿堂" class="w-full h-full object-cover" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          <div class="holo-panel p-6 text-center">
            <div class="text-2xl font-bold text-glow-gold mb-2">21,196km</div>
            <div class="text-[11px] text-hologram-ice/35 tracking-widest">全线数字化长度</div>
          </div>
          <div class="holo-panel p-6 text-center">
            <div class="text-2xl font-bold text-glow-gold mb-2">毫米级</div>
            <div class="text-[11px] text-hologram-ice/35 tracking-widest">扫描精度</div>
          </div>
          <div class="holo-panel p-6 text-center">
            <div class="text-2xl font-bold text-glow-gold mb-2">TB 级</div>
            <div class="text-[11px] text-hologram-ice/35 tracking-widest">数据存储量</div>
          </div>
        </div>

        <SectionTitle>记忆档案</SectionTitle>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
          <div v-for="i in 10" :key="i" class="aspect-[3/4] rounded-xl overflow-hidden holo-border bg-deep-space-800">
            <img :src="`/images/earth-memory/${i}.png`" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
