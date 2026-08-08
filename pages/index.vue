<template>
  <div class="page-container">

    <!-- ====== 国家艺术基金 logo ====== -->
    <div class="flex justify-center pt-24 pb-2">
      <img src="/images/yishujijin.png" alt="国家艺术基金" class="max-w-[160px] lg:max-w-[200px] h-auto" />
    </div>

    <!-- ==================== HERO ==================== -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="/images/hero-bg.png" alt="太空长城" class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-space-deep/50 to-deep-space-950"></div>
      </div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[120vh] bg-gradient-to-b from-stellar-gold/[0.03] via-stellar-gold/[0.01] to-transparent blur-3xl pointer-events-none"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
        <div class="tag mx-auto mb-10 animate-float-slow">
          <span class="tag-dot"></span>
          从地球到月球 · 长城从未止步
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-[1.3] mb-6 space-y-4">
          <span class="text-glow-gold glow-text block">新河北太空长城月球基地</span>
          <span class="text-hologram-ice block">长城精神的地外延续</span>
        </h1>
        <p class="text-base lg:text-lg text-hologram-ice/40 max-w-xl mx-auto mb-12 leading-relaxed">
          从地球到月球，长城从未止步<br/>
          守护 · 连接 · 协作 · 开放
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <NuxtLink to="/story" class="btn-primary">探索基地</NuxtLink>
          <NuxtLink to="/comics" class="btn-ghost">观看漫画</NuxtLink>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard number="数千年" unit="" label="长城守望" />
          <StatCard number="11" unit="座" label="新河北新城" />
          <StatCard number="10+" unit="国" label="星际合作" />
          <StatCard number="∞" unit="" label="无限未来" />
        </div>
        <div class="mt-16 animate-bounce opacity-25">
          <svg class="w-5 h-5 mx-auto text-hologram-ice" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
        </div>
      </div>
    </section>

    <!-- ==================== LIVE DATA BAR ==================== -->
    <section class="relative -mt-1 z-20">
      <div class="max-w-6xl mx-auto px-6">
        <div class="holo-panel py-4 px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs text-hologram-ice/50 font-mono">
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400/80 animate-pulse"></span>
            基地在线：<strong class="text-hologram-ice/80">{{ onlineCount }}</strong> 人
          </span>
          <span>地月通讯延迟：<strong class="text-stellar-warm/80">1.3</strong> 秒</span>
          <span>月表温度：<strong class="text-hologram-ice/80">-63°C</strong></span>
          <span>下一班飞船：<strong class="text-stellar-warm/80">{{ countdown }}</strong></span>
        </div>
      </div>
    </section>

    <!-- ==================== LUNAR CITIES ==================== -->
    <section class="relative py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl lg:text-4xl font-display font-bold text-hologram-ice mb-4">
            月球新河北 · <span class="text-glow-gold glow-text">城市史诗</span>
          </h2>
          <p class="text-sm text-hologram-ice/35 max-w-lg mx-auto">每一座城市，都是地球文明的月球坐标</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CityCard v-for="city in cities" :key="city.name" :city="city" />
        </div>
        <div class="text-center mt-10">
          <NuxtLink to="/cities" class="btn-ghost text-sm">查看全部城市 →</NuxtLink>
        </div>
      </div>
    </section>

    <hr class="section-divider" />

    <!-- ==================== COMIC PREVIEW ==================== -->
    <section class="relative py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl lg:text-4xl font-display font-bold text-hologram-ice mb-4">
            太空长城的 <span class="text-glow-gold glow-text">漫画宇宙</span>
          </h2>
          <p class="text-sm text-hologram-ice/35 max-w-lg mx-auto">三段跨越时空的故事，同一座长城</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <NuxtLink to="/comics" class="holo-panel overflow-hidden group block">
            <div class="aspect-[16/9] bg-deep-space-800 relative overflow-hidden">
              <img src="/images/xuqing-chuanyue/1.png" alt="许青穿越" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/85 via-deep-space-950/20 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <div class="tag mb-3"><span class="tag-dot"></span>全11话</div>
                <h3 class="text-xl font-display font-bold text-stellar-warm mb-1">许青的星际穿越</h3>
                <p class="text-sm text-hologram-ice/50">明代守军穿越数百年时空，在月球新河北看见五星红旗飘扬</p>
              </div>
            </div>
          </NuxtLink>
          <NuxtLink to="/comics" class="holo-panel overflow-hidden group block">
            <div class="aspect-[16/9] bg-deep-space-800 relative overflow-hidden">
              <img src="/images/alien-danyuan/1.png" alt="阿澜的月球日记" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/85 via-deep-space-950/20 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <div class="tag mb-3"><span class="tag-dot"></span>全10话</div>
                <h3 class="text-xl font-display font-bold text-stellar-warm mb-1">阿澜的月球日记</h3>
                <p class="text-sm text-hologram-ice/50">外星小朋友与中外建设者一起见证月球基地的诞生</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <hr class="section-divider" />

    <!-- ==================== NARRATIVE HORIZONTAL SCROLL ==================== -->
    <section class="relative py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl lg:text-4xl font-display font-bold text-hologram-ice mb-4">
            太空长城 <span class="text-glow-gold glow-text">叙事画卷</span>
          </h2>
          <p class="text-sm text-hologram-ice/35 max-w-lg mx-auto">十幅概念作品，讲述从地球到月球的伟大征程</p>
        </div>
        <div class="flex gap-5 overflow-x-auto pb-4 snap-x -mx-2 px-2" ref="narrativeScroll">
          <div
            v-for="(item, i) in narratives"
            :key="i"
            class="flex-shrink-0 w-[280px] sm:w-[340px] snap-center holo-panel overflow-hidden group cursor-pointer"
            @click="openNarrative(i)"
          >
            <div class="aspect-[16/10] bg-deep-space-800 relative overflow-hidden">
              <img :src="item.img" :alt="item.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/80 via-transparent to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <span class="text-[10px] font-mono text-stellar-warm/60 tracking-widest">{{ item.num }}</span>
                <h4 class="text-sm font-display font-bold text-hologram-ice mt-0.5">{{ item.title }}</h4>
              </div>
            </div>
          </div>
        </div>
        <!-- Expanded detail modal -->
        <Teleport to="body">
          <div v-if="activeNarrative !== null" class="fixed inset-0 z-[10001] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm" @click.self="activeNarrative = null">
            <div class="max-w-4xl w-full holo-panel overflow-hidden relative">
              <div class="aspect-[16/9] bg-deep-space-800">
                <img :src="narratives[activeNarrative].img" :alt="narratives[activeNarrative].title" class="w-full h-full object-cover" />
              </div>
              <div class="p-6 lg:p-8">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <span class="text-xs font-mono text-stellar-warm/50 tracking-widest">{{ narratives[activeNarrative].num }}</span>
                    <h3 class="text-xl lg:text-2xl font-display font-bold text-stellar-warm mt-1">{{ narratives[activeNarrative].title }}</h3>
                  </div>
                  <button class="w-8 h-8 flex items-center justify-center rounded-lg text-hologram-ice/40 hover:text-hologram-ice hover:bg-white/[0.03] transition-all" @click="activeNarrative = null">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <p class="text-sm lg:text-base text-hologram-ice/50 leading-relaxed">{{ narratives[activeNarrative].desc }}</p>
                <p v-if="narratives[activeNarrative].slogan" class="text-xs font-mono text-stellar-warm/50 tracking-wider mt-4">{{ narratives[activeNarrative].slogan }}</p>
              </div>

              <!-- Prev -->
              <button v-if="activeNarrative > 0" class="absolute left-3 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 border border-white/[0.15] flex items-center justify-center text-white/50 hover:text-white hover:bg-black/60 hover:border-white/[0.3] transition-all backdrop-blur-sm"
                @click.stop="activeNarrative--">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <!-- Next -->
              <button v-if="activeNarrative < narratives.length - 1" class="absolute right-3 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 border border-white/[0.15] flex items-center justify-center text-white/50 hover:text-white hover:bg-black/60 hover:border-white/[0.3] transition-all backdrop-blur-sm"
                @click.stop="activeNarrative++">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </Teleport>
      </div>
    </section>

    <hr class="section-divider" />

    <!-- ==================== FEATURE HUB ==================== -->
    <section class="relative py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl lg:text-4xl font-display font-bold text-hologram-ice mb-4">
            探索 <span class="text-glow-gold glow-text">更多内容</span>
          </h2>
          <p class="text-sm text-hologram-ice/35 max-w-lg mx-auto">从星际交流到太空文创，发现无限可能</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <FeatureCard v-for="feat in features" :key="feat.title" :feature="feat" />
        </div>
      </div>
    </section>

    <hr class="section-divider" />

    <!-- ==================== TIMELINE COMPACT ==================== -->
    <section class="relative py-20 lg:py-28">
      <div class="max-w-6xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-14">
          <h2 class="text-3xl lg:text-4xl font-display font-bold text-hologram-ice mb-4">
            时空 <span class="text-glow-gold glow-text">编年史</span>
          </h2>
          <p class="text-sm text-hologram-ice/35 max-w-lg mx-auto">从地球长城到月球，一段跨越数百年岁月的守望</p>
        </div>
        <div class="flex gap-4 overflow-x-auto pb-3 snap-x">
          <div v-for="(event, i) in timeline" :key="i" class="flex-shrink-0 w-[220px] snap-start holo-panel p-5 text-center">
            <span class="text-2xl font-mono font-bold text-stellar-warm/60 tracking-wider">{{ event.year }}</span>
            <h4 class="text-sm font-display font-bold text-hologram-ice mt-2 mb-1.5">{{ event.title }}</h4>
            <p class="text-[11px] text-hologram-ice/40 leading-relaxed">{{ event.desc }}</p>
          </div>
        </div>
        <div class="text-center mt-10">
          <NuxtLink to="/timeline" class="btn-ghost text-sm">阅读完整编年史 →</NuxtLink>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const onlineCount = ref(1286)
const countdown = ref('72:15:33')
let cdTimer = null

onMounted(() => {
  onlineCount.value = 1200 + Math.floor(Math.random() * 200)
  cdTimer = setInterval(() => {
    const [h, m, s] = countdown.value.split(':').map(Number)
    let total = h * 3600 + m * 60 + s - 1
    if (total < 0) total = 72 * 3600 + 15 * 60 + 33
    countdown.value = `${String(Math.floor(total / 3600)).padStart(2, '0')}:${String(Math.floor((total % 3600) / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
  }, 1000)
})
onUnmounted(() => { if (cdTimer) clearInterval(cdTimer) })

const activeNarrative = ref(null)
function openNarrative(i) { activeNarrative.value = i }

const cities = [
  { name: '新石家庄', subtitle: '新河北首府 · 政治文化中心', image: '/images/space-great-wall/1.png', desc: '月球新河北行政中枢，"月宫行政中心"融合传统飞檐与现代航天材料，星河宪法广场矗立泰山花岗岩宪法碑。' },
  { name: '新唐山市', subtitle: '工业制造 · 能源中心', image: '/images/space-great-wall/5.png', desc: '月面最大工业集群，三座聚变电站环网、月壤高炉与3D打印生产线——"工业母城"供应全月80%建材。' },
  { name: '新沧州市', subtitle: '月面水利 · 生命之源', image: '/images/space-great-wall/2.png', desc: '月面水脉系统枢纽，封闭式水循环损耗率不到0.3%，水晶穹顶水族馆是全月最受欢迎的休闲胜地。' },
  { name: '新山海关', subtitle: '月面防御 · 安全屏障', image: '/images/space-great-wall/3.png', desc: '"天下第一关"的太空传承，星河护盾系统三分钟内展开全月粒子屏障，已抵御十七次太阳风暴。' },
  { name: '新秦皇岛', subtitle: '地月港口 · 物流枢纽', image: '/images/space-great-wall/10.png', desc: '地月航线主港，数字记忆殿堂永久保存长城全部数据——"记住来时的路，才能走得更远"。' },
  { name: '新承德', subtitle: '文化教育 · 国际研学', image: '/images/space-great-wall/4.png', desc: '太空长城国际学校所在地，来自世界各国的孩子在此学习中文——"和"字是跨越星际的第一课。' },
  { name: '新张家口', subtitle: '月面运动 · 极限探索', image: '/images/space-great-wall/9.png', desc: '环形山竞技场与深空实验室并存，低重力运动的天然赛场——人类的勇气在1/6重力下仍是满格。' },
  { name: '新保定', subtitle: '星际外交 · 跨文明交流', image: '/images/space-great-wall/7.png', desc: '七大文明使馆所在地，星桥会堂融合人类斗拱与外星能量场技术，星际集市每月开放。' },
  { name: '新邯郸', subtitle: '月壤农业 · 粮食基地', image: '/images/space-great-wall/8.png', desc: '月面第一穗麦诞生地，闭环生态农业系统年产两千吨粮食——"在月球上咬一口新鲜番茄，胜于一切"。' },
]

const features = [
  { title: '外.地人交流中心', desc: '外星留言板 · 视频通讯站 · 作文竞赛', icon: 'alien', to: '/aliens' },
  { title: '地月河北', desc: '知识问答 · 旅游路线 · 历史沿革', icon: 'map', to: '/hebei' },
  { title: '太空文创', desc: '3D预览 · 长城周边 · 限量藏品', icon: 'shop', to: '/shop' },
  { title: '旅游研学', desc: '五条线路 · 报名参团 · 城市探索', icon: 'travel', to: '/travel' },
]

const narratives = [
  { img: '/images/长城内部和研学/ChatGPT Image 2026年8月1日 23_27_30 (1).png', num: '01', title: '地月长城指挥中心', desc: '新石家庄长城指挥中心的大厅中，数十块全息屏幕实时显示着11座月球城市和22个能源区块的运行状态。值班工程师们来自七个不同的星球文明，调度着从地月航线到穹顶生态的全部日常——这里是太空长城的神经中枢。', slogan: '十一城的数字心脏' },
  { img: '/images/长城内部和研学/ChatGPT Image 2026年8月1日 23_27_30 (2).png', num: '02', title: '太空长城核心设备', desc: '长城能源枢纽的聚变反应堆控制室中，工程师正在监测等离子体约束磁场。这台被命名为"金山一号"的装置为整条太空长城提供60%的电力——在月球上种下一颗人造太阳，照亮万家灯火。', slogan: '月面之上的人造太阳' },
  { img: '/images/长城内部和研学/ChatGPT Image 2026年8月1日 23_27_30 (3).png', num: '03', title: '新河北太空高铁环线', desc: '银色列车在月面穹顶之间飞驰，串联起新唐山市、新石家庄市、新山海关等十一座城市。全封闭真空管道将三小时的车程压缩至四十分钟，乘客透过全景舷窗可以一路欣赏地球的蓝白光辉与月面群山的壮美轮廓。', slogan: '十一城，一条线，四十亿年风景' },
  { img: '/images/长城内部和研学/ChatGPT Image 2026年8月1日 23_27_30 (4).png', num: '04', title: '太空长城儿童医院健康检测', desc: '月球低重力环境对儿童骨骼发育的影响一直是医学团队关注的重点。长城儿童医院配备了低重力适应性生长监测系统，每季度为基地所有未成年人进行全身扫描。检测舱里，孩子们看着天花板上的星空动画，在不知不觉中完成了检查。', slogan: '守护月球的第一代孩子' },
  { img: '/images/长城内部和研学/ChatGPT Image 2026年8月1日 23_27_30 (5).png', num: '05', title: '外星人信息接收站', desc: '新山海关深空信号接收阵列全天候监听来自比邻星和猎户座方向的电磁信号。天线阵列由七种不同文明的技术标准联合建造，既能接收澜族的量子密文，也能解析人类传统的无线电波——宇宙的回声，在这里被翻译成文明的语言。', slogan: '聆听宇宙的每一次心跳' },
  { img: '/images/长城内部和研学/ChatGPT Image 2026年8月4日 22_07_01.png', num: '06', title: '新唐山太空长城修护', desc: '新唐山市段的维护工程队正在更换一块被微流星击穿的墙体面板。月面微流星以每秒二十公里的速度飞行，即使最小的碎片也足以击穿合金外壳。修护队每周巡检一百二十公里，每一道焊痕都是对这座钢铁城墙最长情的守护。', slogan: '每一道焊痕，都是誓言' },
  { img: '/images/长城内部和研学/ChatGPT Image 2026年8月4日 22_07_09.png', num: '07', title: '新山海关集市', desc: '新山海关的穹顶集市汇集了来自十一个城市的特产——新唐山的陶瓷、新保定的酱驴肉、外星摊主带来的发光矿石和量子工艺品。地月居民和比邻星商人在此讨价还价，市井的烟火气冲淡了月球的冷寂。', slogan: '月球上最热闹的一条街' },
  { img: '/images/长城内部和研学/ChatGPT Image 2026年8月4日 22_07_13.png', num: '08', title: '月球新秦皇岛月冰采集场', desc: '新秦皇岛南极月冰采集场是月球水资源的核心来源。巨型采掘机在永久阴影区的陨石坑中工作，将远古封存的月冰转化为饮用水、呼吸氧和火箭燃料——每一滴水都经过四十亿年的沉淀，如今汇入人类文明的命脉。', slogan: '四十亿年的冰，今天的生命之源' },
  { img: '/images/长城内部和研学/ChatGPT Image 2026年8月4日 22_07_16.png', num: '09', title: '太空长城建造实况', desc: '工程无人机群正在月面展开大规模建造作业，数百架3D打印机器人在预编程轨迹上协同工作。月壤粉末在微波烧结下层层堆叠，每一小时就有两米长的墙体成型——在月球上，建造不仅是一种技术，更是一种对苍茫宇宙的回答。', slogan: '以月为砖，以志为墙' },
  { img: '/images/长城内部和研学/ChatGPT Image 2026年8月4日 22_07_19.png', num: '10', title: '太空长城古风街区', desc: '长城内部的生活区保留了一条仿明代砖木结构的古风街道——青石板路面、飞檐斗拱、红灯笼与木窗棂，而街角的全息广告屏和无声穿梭的磁浮车则提醒人们：这里是月球。最古老与最未来的美学，在这条街上达成了默契的和解。', slogan: '汉唐飞檐，月面之上' },
]

const timeline = [
  { year: '前369', title: '中山长城始筑', desc: '战国中山国在河北境内修筑长城，史称"中山长城"，是河北最早的城墙防御体系。' },
  { year: '前214', title: '秦连万里长城', desc: '秦始皇命蒙恬连接修缮各国城墙，万里长城初具规模，河北段成为重要防线。' },
  { year: '前119', title: '汉武拓疆筑塞', desc: '汉武帝北击匈奴后，在河北北部大规模修筑烽燧城障，长城防线大幅北推。' },
  { year: '555', title: '北齐重筑千里墙', desc: '北齐文宣帝发民百万，在河北境内修筑西起恒州东至海的长城防线千余里。' },
  { year: '607', title: '隋炀续修永济渠', desc: '隋朝征发丁男百余万修筑长城，河北段与运河并行，形成水陆双重防线。' },
  { year: '1368', title: '明开国筑九边', desc: '明朝立国后设立九边重镇，河北境内的蓟镇、宣府镇成为拱卫京師的关键屏障。' },
  { year: '1568', title: '戚继光督修河北长城', desc: '明代名将戚继光督修河北长城，成为万里长城最精华、最壮丽的段落。' },
  { year: '1644', title: '长城易代', desc: '清军入关，长城从军事防线转变为民族融合的象征，河北内外再无壁垒。' },
  { year: '1987', title: '长城列入世界遗产', desc: '联合国教科文组织将长城列入世界文化遗产名录，成为全人类的共同财富。' },
  { year: '2090', title: '新河北太空计划启动', desc: '以河北长城为精神起点，中国启动月球永久基地建设——"太空长城"计划正式立项。' },
  { year: '2112', title: '首批移民定居月球', desc: '新唐山市迎来首批500名居民，月球亮起万家灯火，长城文明迈入地外时代。' },
  { year: '2125', title: '月轨长城合龙', desc: '环月轨道防御与通讯阵列建成，全长11,000公里，被各国媒体称为"月之长城"。' },
  { year: '2152', title: '外星文明建交', desc: '人类与首个外星友好文明——澜族正式建交，新保定设立星际使馆区。' },
  { year: '2198', title: '七文明联合宣言', desc: '七个星际文明在太空长城签署和平宣言，新河北成为地月外交中心。' },
  { year: '2250', title: '星际文明共同体', desc: '地月文明与多文明共同成立星际文明共同体，长城精神在宇宙中永续传承。' },
]
</script>
