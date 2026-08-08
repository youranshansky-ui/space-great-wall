<template>
  <div class="page-container">
    <!-- ===== HERO ===== -->
    <section class="relative pt-32 pb-14 text-center border-b border-hologram-cyan/[0.04] overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="i in 30" :key="'s'+i" class="absolute rounded-full bg-white animate-pulse"
          :style="{ width: (1 + Math.sin(i)*1.2) + 'px', height: (1 + Math.cos(i)*1.2) + 'px',
            left: ((i*7+13)%100) + '%', top: ((i*11+7)%100) + '%',
            opacity: 0.12 + (i%5)*0.06, animationDelay: (i*0.3) + 's', animationDuration: (2 + (i%4)) + 's' }" />
        <svg class="absolute top-12 right-[10%] w-20 h-20 opacity-[0.04]" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" fill="none" stroke="#88ccdd" stroke-width="0.5"/>
          <path d="M40 5 L40 75 M5 40 L75 40" stroke="#88ccdd" stroke-width="0.3"/>
          <circle cx="40" cy="40" r="12" fill="none" stroke="#d4a853" stroke-width="0.4" opacity="0.5"/>
        </svg>
        <div class="absolute bottom-16 left-[12%] w-14 h-14 rounded-full bg-gradient-to-br from-stellar-gold/[0.06] to-hologram-cyan/[0.04] border border-hologram-cyan/[0.06] orbit-slow" style="animation-duration:15s"><div class="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-stellar-gold/10"></div></div>
      </div>
      <div class="max-w-4xl mx-auto px-6 relative z-10">
        <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-stellar-gold/15 bg-stellar-gold/[0.03] backdrop-blur-md text-2xl lg:text-3xl font-display font-bold text-stellar-warm/90 tracking-wider mx-auto mb-6">
          <span class="w-2.5 h-2.5 rounded-full bg-stellar-gold shadow-[0_0_10px_#d4a853] animate-pulse"></span>地月河北
        </div>
        <h1 class="text-3xl lg:text-5xl font-display font-bold text-hologram-ice mb-4">
          从<span class="text-glow-gold glow-text">燕赵大地</span>到月球新河北
        </h1>
        <p class="text-sm lg:text-base text-hologram-ice/35 max-w-2xl mx-auto leading-relaxed">
          了解河北，认识月球城市 · 答题闯关 · 探秘旅游路线 · 追溯历史沿革
        </p>
      </div>
    </section>

    <!-- ===== Tab Nav ===== -->
    <section class="sticky top-0 z-30 bg-deep-space-950/85 backdrop-blur-xl border-b border-hologram-cyan/[0.04]">
      <div class="max-w-6xl mx-auto px-6 py-3 flex items-center justify-center gap-2 overflow-x-auto scrollbar-none flex-nowrap">
        <button v-for="tab in tabs" :key="tab.key"
          class="flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border-2"
          :class="activeTab === tab.key ? 'bg-stellar-gold/15 text-stellar-warm border-stellar-gold/30 shadow-[0_0_20px_rgba(212,168,83,0.1)]' : 'text-hologram-ice/35 hover:text-hologram-ice/65 border-transparent hover:bg-white/[0.03]'"
          @click="activeTab = tab.key">{{ tab.label }}</button>
      </div>
    </section>

    <!-- ===== TAB 1: 知识问答 ===== -->
    <section v-if="activeTab === 'quiz'" class="py-16 lg:py-24">
      <div class="max-w-3xl mx-auto px-6 lg:px-8">
        <div class="flex items-end gap-4 mb-10">
          <div>
            <div class="tag mb-3"><span class="tag-dot"></span>知识挑战</div>
            <h2 class="text-3xl lg:text-5xl font-display font-bold text-hologram-ice">知识问答</h2>
            <p class="text-sm lg:text-base text-hologram-ice/35 mt-2">测试你对河北、长城与月球基地的了解 · 共 {{ quizQuestions.length }} 题</p>
          </div>
        </div>

        <!-- Score bar -->
        <div v-if="quizStarted" class="holo-panel px-6 py-4 mb-6 flex items-center justify-between">
          <span class="text-xs font-mono text-hologram-ice/40">第 {{ currentQ + 1 }} / {{ quizQuestions.length }} 题</span>
          <span class="text-sm font-semibold text-stellar-warm/80">正确：{{ score }} 题</span>
          <div class="flex gap-1.5">
            <div v-for="i in quizQuestions.length" :key="'dot'+i" class="w-2 h-2 rounded-full transition-colors duration-300"
              :class="i <= currentQ ? (quizAnswers[i-1]?.correct ? 'bg-emerald-400/70' : 'bg-red-400/50') : 'bg-white/[0.06]'"></div>
          </div>
        </div>

        <!-- Start screen -->
        <div v-if="!quizStarted" class="holo-panel p-8 lg:p-10 text-center">
          <div class="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-stellar-gold/15 to-hologram-cyan/10 border border-stellar-gold/15 flex items-center justify-center">
            <svg width="28" height="28" fill="none" stroke="#d4a853" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          </div>
          <h3 class="text-xl font-display font-bold text-hologram-ice mb-3">准备挑战吗？</h3>
          <p class="text-sm text-hologram-ice/40 mb-6">15道关于河北、长城和月球基地的选择题，每题60秒限时</p>
          <button class="btn-primary text-lg px-10 py-3" @click="startQuiz">开始答题</button>
        </div>

        <!-- Quiz question -->
        <div v-if="quizStarted && !quizFinished" class="holo-panel p-6 lg:p-8">
          <div class="flex items-center justify-between mb-5">
            <span class="text-[10px] text-hologram-ice/30 font-mono uppercase">{{ quizQuestions[currentQ].category }}</span>
            <span class="text-xs text-hologram-ice/30 font-mono" :class="{ 'text-red-400/60': timer < 15 }">⏱ {{ timer }}s</span>
          </div>
          <h3 class="text-lg lg:text-xl font-display font-bold text-hologram-ice mb-6">{{ quizQuestions[currentQ].question }}</h3>
          <div class="space-y-2.5">
            <button v-for="(opt, oi) in quizQuestions[currentQ].options" :key="oi"
              class="w-full text-left px-5 py-3.5 rounded-lg border transition-all duration-300 text-sm flex items-center gap-3"
              :class="quizAnswers[currentQ] ? (oi === quizQuestions[currentQ].correct ? 'bg-emerald-400/10 border-emerald-400/30 text-emerald-300' : oi === quizAnswers[currentQ].selected ? 'bg-red-400/10 border-red-400/30 text-red-300' : 'bg-white/[0.02] border-white/[0.04] text-hologram-ice/30') : 'bg-white/[0.02] border-white/[0.04] text-hologram-ice/55 hover:border-stellar-gold/20 hover:bg-stellar-gold/[0.03] hover:text-hologram-ice/80'"
              :disabled="!!quizAnswers[currentQ]"
              @click="selectAnswer(oi)">
              <span class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono flex-shrink-0 border"
                :class="quizAnswers[currentQ] ? (oi === quizQuestions[currentQ].correct ? 'bg-emerald-400/20 border-emerald-400/30' : oi === quizAnswers[currentQ].selected ? 'bg-red-400/20 border-red-400/30' : 'bg-white/[0.03] border-white/[0.06]') : 'bg-white/[0.03] border-white/[0.06]'">{{ ['A','B','C','D'][oi] }}</span>
              {{ opt }}
            </button>
          </div>
          <div v-if="quizAnswers[currentQ]" class="mt-5 pt-4 border-t border-hologram-cyan/[0.05]">
            <p class="text-xs leading-relaxed" :class="quizAnswers[currentQ].correct ? 'text-emerald-300/60' : 'text-red-300/60'">
              {{ quizAnswers[currentQ].correct ? '✓' : '✗' }} {{ quizQuestions[currentQ].explanation }}
            </p>
            <button class="mt-3 px-6 py-2 rounded-lg text-sm font-medium transition-all bg-stellar-gold/10 text-stellar-warm border border-stellar-gold/20 hover:bg-stellar-gold/15" @click="nextQuestion">
              {{ currentQ < quizQuestions.length - 1 ? '下一题 →' : '查看结果' }}
            </button>
          </div>
        </div>

        <!-- Result screen -->
        <div v-if="quizFinished" class="holo-panel p-8 lg:p-10 text-center">
          <div class="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center border-2"
            :class="score >= 12 ? 'bg-emerald-400/10 border-emerald-400/30' : score >= 8 ? 'bg-stellar-gold/10 border-stellar-gold/30' : 'bg-red-400/10 border-red-400/30'">
            <span class="text-3xl font-bold" :class="score >= 12 ? 'text-emerald-300' : score >= 8 ? 'text-stellar-warm' : 'text-red-300'">{{ score }}/{{ quizQuestions.length }}</span>
          </div>
          <h3 class="text-xl font-display font-bold text-hologram-ice mb-2">{{ score >= 12 ? '河北通！月球通！' : score >= 8 ? '不错，继续加油！' : '再接再厉，多了解河北吧！' }}</h3>
          <p class="text-sm text-hologram-ice/40 mb-5" v-if="score >= 12">你已经掌握了从燕赵大地到月球新河北的核心知识。</p>
          <p class="text-sm text-hologram-ice/40 mb-5" v-else>还有进步空间——点击下方按钮重新挑战。</p>
          <button class="btn-primary py-3 px-8" @click="resetQuiz">重新挑战</button>

          <!-- Review answers -->
          <div class="mt-8 space-y-3 text-left">
            <h4 class="text-sm text-hologram-ice/30 font-mono tracking-wider mb-3">▸ 答题回顾</h4>
            <div v-for="(q, qi) in quizQuestions" :key="qi" class="holo-panel p-4">
              <div class="flex items-start gap-2 mb-2">
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                  :class="quizAnswers[qi].correct ? 'bg-emerald-400/20 text-emerald-400' : 'bg-red-400/20 text-red-400'">{{ quizAnswers[qi].correct ? '✓' : '✗' }}</span>
                <div>
                  <p class="text-xs text-hologram-ice/70 font-semibold">{{ q.question }}</p>
                  <p class="text-[10px] mt-0.5" :class="quizAnswers[qi].correct ? 'text-emerald-300/50' : 'text-red-300/50'">
                    {{ quizAnswers[qi].correct ? '回答正确' : `你选了 ${q.options[quizAnswers[qi].selected]}，正确答案是 ${q.options[q.correct]}` }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== TAB 2: 旅游路线 ===== -->
    <section v-if="activeTab === 'routes'" class="py-16 lg:py-24">
      <div class="max-w-6xl mx-auto px-6 lg:px-8">
        <div class="flex items-end gap-4 mb-10">
          <div>
            <div class="tag mb-3"><span class="tag-dot"></span>星际漫游</div>
            <h2 class="text-3xl lg:text-5xl font-display font-bold text-hologram-ice">旅游路线</h2>
            <p class="text-sm lg:text-base text-hologram-ice/35 mt-2">6条精选路线 · 从地月港口到环形山深处 · 探秘月球上的河北新城</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div v-for="route in routes" :key="route.id" class="holo-panel overflow-hidden group cursor-pointer transition-all duration-500 hover:border-stellar-gold/20 hover:shadow-[0_0_40px_rgba(212,168,83,0.05)]" @click="selectedRoute = route; showRouteDetail = true">
            <div class="relative aspect-[16/7] bg-deep-space-800 overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center" :style="{ background: route.bg }">
                <div class="flex items-center gap-2 text-white/8">
                  <div v-for="c in route.stops.length" :key="c" class="w-14 h-14 rounded-full border border-current flex items-center justify-center text-lg font-bold" :style="{ opacity: 0.3 + c * 0.1 }">{{ route.stops[c-1]?.char }}</div>
                </div>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-deep-space-950/90 via-deep-space-950/30 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="text-xs px-2 py-0.5 rounded-full border border-stellar-gold/25 text-stellar-warm/70">{{ route.duration }}</span>
                  <span class="text-xs px-2 py-0.5 rounded-full border border-hologram-cyan/15 text-hologram-cyan/50">{{ route.stops.length }}个站点</span>
                </div>
                <h3 class="text-xl font-display font-bold text-hologram-ice mb-1">{{ route.name }}</h3>
                <p class="text-sm text-hologram-ice/55 line-clamp-2">{{ route.desc }}</p>
              </div>
            </div>
            <div class="p-4 flex items-center gap-2 flex-wrap">
              <span v-for="stop in route.stops" :key="stop.name" class="text-xs text-hologram-ice/50 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full" :class="stop.type === 'port' ? 'bg-stellar-gold/60' : stop.type === 'city' ? 'bg-hologram-cyan/50' : 'bg-purple-400/50'"></span>{{ stop.name }}
              </span>
            </div>
          </div>
        </div>

        <!-- Route detail modal -->
        <Teleport to="body">
          <div v-if="showRouteDetail && selectedRoute" class="fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" @click.self="showRouteDetail = false">
            <div class="max-w-2xl w-full max-h-[90vh] holo-panel overflow-y-auto">
              <div class="sticky top-0 z-10 bg-deep-space-950/95 backdrop-blur-xl p-5 border-b border-hologram-cyan/[0.06] flex items-center justify-between">
                <div class="min-w-0 flex-1 mr-4">
                  <span class="text-xs text-hologram-ice/40 font-mono">{{ selectedRoute.duration }}</span>
                  <h3 class="text-xl font-display font-bold text-hologram-ice truncate">{{ selectedRoute.name }}</h3>
                </div>
                <button class="w-8 h-8 flex items-center justify-center rounded-lg text-hologram-ice/40 hover:text-hologram-ice flex-shrink-0" @click="showRouteDetail = false">
                  <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div class="p-6 lg:p-8">
                <p class="text-base text-hologram-ice/60 leading-relaxed mb-6">{{ selectedRoute.fullDesc }}</p>
                <div class="space-y-3">
                  <div v-for="(stop, si) in selectedRoute.stops" :key="stop.name" class="flex gap-4">
                    <div class="flex flex-col items-center">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border flex-shrink-0"
                        :style="{ background: stop.type === 'port' ? 'linear-gradient(135deg,hsl(40,40%,20%),hsl(60,40%,15%))' : stop.type === 'city' ? 'linear-gradient(135deg,hsl(190,40%,20%),hsl(210,40%,15%))' : 'linear-gradient(135deg,hsl(280,40%,20%),hsl(310,40%,15%))',
                          borderColor: stop.type === 'port' ? 'rgba(212,168,83,0.5)' : stop.type === 'city' ? 'rgba(136,204,221,0.4)' : 'rgba(180,140,220,0.4)' }">
                        <span :class="stop.type === 'port' ? 'text-stellar-warm/70' : stop.type === 'city' ? 'text-hologram-cyan/70' : 'text-purple-300/70'">{{ stop.char }}</span></div>
                      <div v-if="si < selectedRoute.stops.length - 1" class="w-px h-5 bg-hologram-cyan/[0.08]"></div>
                    </div>
                    <div class="pb-4 flex-1">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="text-base font-semibold text-hologram-ice/85">{{ stop.name }}</span>
                        <span class="text-[10px] px-1.5 py-0.5 rounded border"
                          :class="stop.type === 'port' ? 'text-stellar-gold/50 border-stellar-gold/20' : stop.type === 'city' ? 'text-hologram-cyan/50 border-hologram-cyan/20' : 'text-purple-300/50 border-purple-400/20'">{{ stop.type === 'port' ? '交通枢纽' : stop.type === 'city' ? '城市' : '自然景观' }}</span>
                      </div>
                      <p class="text-sm text-hologram-ice/55 leading-relaxed">{{ stop.tip }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Teleport>
      </div>
    </section>

    <!-- ===== TAB 3: 历史沿革 ===== -->
    <section v-if="activeTab === 'history'" class="py-16 lg:py-24">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="flex items-end gap-4 mb-10">
          <div>
            <div class="tag mb-3"><span class="tag-dot"></span>两千年燕赵</div>
            <h2 class="text-3xl lg:text-5xl font-display font-bold text-hologram-ice">历史沿革</h2>
            <p class="text-sm lg:text-base text-hologram-ice/35 mt-2">从中山国到太空长城 · 河北的前世今生</p>
          </div>
        </div>

        <div class="space-y-0">
          <div v-for="(event, ei) in historyTimeline" :key="ei" class="flex gap-4 group">
            <!-- Timeline center line & dot -->
            <div class="flex flex-col items-center flex-shrink-0 w-16">
              <div v-if="ei > 0 && event.era !== historyTimeline[ei-1].era" class="w-full text-center pb-1 pt-3">
                <span class="text-[9px] font-mono tracking-widest text-hologram-cyan/30 uppercase">{{ event.era }}</span>
              </div>
              <div class="w-3 h-3 rounded-full border-2 flex-shrink-0 mt-2.5"
                :class="event.fictional ? 'bg-purple-400/20 border-purple-400/50' : 'bg-stellar-gold/20 border-stellar-gold/40'"></div>
              <div class="w-px flex-1 min-h-[20px] bg-hologram-cyan/[0.06] group-last:bg-transparent"></div>
            </div>

            <!-- Content -->
            <div class="pb-8 flex-1 pt-1">
              <div class="holo-panel p-4 lg:p-5 transition-all duration-300"
                :class="event.fictional ? 'border-l-[3px] border-l-purple-400/30' : 'border-l-[3px] border-l-stellar-gold/25'">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="text-sm font-mono font-bold" :class="event.fictional ? 'text-purple-300/80' : 'text-stellar-warm/80'">{{ event.year }}</span>
                  <span class="text-[9px] px-1.5 py-0.5 rounded-full border"
                    :class="event.fictional ? 'text-purple-300/40 border-purple-400/20' : 'text-stellar-gold/40 border-stellar-gold/20'">{{ event.fictional ? '未来纪元' : '史实' }}</span>
                  <span class="text-[9px] text-hologram-ice/20 ml-auto">{{ event.dynasty }}</span>
                </div>
                <h4 class="text-sm font-display font-bold text-hologram-ice/85 mb-1">{{ event.title }}</h4>
                <p class="text-xs text-hologram-ice/45 leading-relaxed">{{ event.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const activeTab = ref('quiz')
const tabs = [
  { key: 'quiz', label: '知识问答' },
  { key: 'routes', label: '旅游路线' },
  { key: 'history', label: '历史沿革' },
]

// ==================== QUIZ ====================
const quizStarted = ref(false)
const quizFinished = ref(false)
const currentQ = ref(0)
const score = ref(0)
const timer = ref(60)
let timerInterval = null
const quizAnswers = ref([])

const quizQuestions = [
  { category: '河北历史', question: '河北境内最早修筑的长城由哪个国家所建？', options: ['赵国', '中山国', '燕国', '齐国'], correct: 1, explanation: '公元前369年，战国中山国在河北境内修筑了"中山长城"，是河北最早的城墙防御体系。' },
  { category: '长城知识', question: '明代名将戚继光督修的是河北境内哪一段长城？', options: ['山海关', '居庸关', '河北长城', '娘子关'], correct: 2, explanation: '戚继光督修河北长城，工程浩大，成为万里长城最精华的段落。' },
  { category: '河北地理', question: '河北省的简称"冀"来源于古代哪个九州？', options: ['青州', '兖州', '冀州', '幽州'], correct: 2, explanation: '古代九州中的冀州，其核心区域即今天的河北省，因此河北简称为"冀"。' },
  { category: '月球基地', question: '月球新河北的第一座城市是什么？', options: ['新保定市', '新唐山市', '新邯郸市', '新秦皇岛'], correct: 1, explanation: '新唐山市是月球新河北的工业核心，也是第一座建成并投入运行的月球城市。' },
  { category: '河北历史', question: '秦始皇派谁连接修缮各国长城？', options: ['王翦', '蒙恬', '李斯', '扶苏'], correct: 1, explanation: '秦始皇命大将蒙恬连接修缮燕、赵、秦等国的城墙，形成万里长城的雏形。' },
  { category: '长城知识', question: '长城在哪一年被列入世界文化遗产名录？', options: ['1985', '1987', '1990', '1978'], correct: 1, explanation: '1987年，联合国教科文组织将长城列入世界文化遗产名录，成为全人类的共同财富。' },
  { category: '河北文化', question: '以下哪座城市不属于新河北月球基地的六座主要城市？', options: ['新承德', '新张家口', '新石家庄', '新秦皇岛'], correct: 2, explanation: '新河北月球基地目前共有六座主要城市：新唐山、新秦皇岛、新承德、新张家口、新保定和新邯郸。' },
  { category: '月球知识', question: '地月通讯的延迟大约是多少秒？', options: ['0.5秒', '1.3秒', '3秒', '5秒'], correct: 1, explanation: '地球到月球的平均距离约38万公里，光速往返通信延迟约为1.3秒。' },
  { category: '河北历史', question: '北齐在河北境内重修长城时，防线西起何处？', options: ['居庸关', '恒州', '雁门关', '玉门关'], correct: 1, explanation: '北齐文宣帝发民百万，西起恒州（今河北正定一带）东至大海修筑长城。' },
  { category: '月球基地', question: '外星文明建交后，新河北哪座城市设立了星际使馆区？', options: ['新唐山', '新秦皇岛', '新承德', '新保定'], correct: 3, explanation: '新保定市在2152年设立星际使馆区，是外星友好文明在月球的外交中心。' },
  { category: '河北地理', question: '河北省与哪个直辖市相邻？', options: ['上海', '天津', '重庆', '以上都是'], correct: 1, explanation: '天津是紧邻河北省的直辖市，历史上曾是河北省的一部分。' },
  { category: '长城知识', question: '长城全长大约多少公里？', options: ['约5000公里', '约10000公里', '约21000公里', '约30000公里'], correct: 2, explanation: '根据国家文物局数据，历代长城总长度超过21000公里，横跨多个省区。' },
  { category: '月球基地', question: '新邯郸市的主要产业是什么？', options: ['工业制造', '地月港口', '月壤农业', '极限运动'], correct: 2, explanation: '新邯郸是月壤改良实验田所在地，成功培育了首批月面小麦，是月球粮食基地。' },
  { category: '河北文化', question: '河北省会石家庄在地球上又被称为？', options: ['古城', '铁路拉来的城市', '水城', '山城'], correct: 1, explanation: '石家庄因京汉、正太铁路交汇而崛起，被称为"铁路拉来的城市"。' },
  { category: '未来展望', question: '太空长城月球基地的核心精神是什么？', options: ['征服与扩张', '守护·连接·协作·开放', '速度与效率', '科技至上'], correct: 1, explanation: '太空长城精神是"守护、连接、协作、开放"，这是从地球长城一脉相承的价值观。' },
]

function startQuiz() {
  quizStarted.value = true
  currentQ.value = 0
  score.value = 0
  quizAnswers.value = new Array(quizQuestions.length).fill(null)
  quizFinished.value = false
  startTimer()
}

function selectAnswer(oi) {
  if (quizAnswers.value[currentQ.value]) return
  const correct = oi === quizQuestions[currentQ.value].correct
  quizAnswers.value[currentQ.value] = { selected: oi, correct }
  if (correct) score.value++
  clearInterval(timerInterval)
}

function nextQuestion() {
  if (currentQ.value < quizQuestions.length - 1) {
    currentQ.value++
    startTimer()
  } else {
    quizFinished.value = true
    clearInterval(timerInterval)
  }
}

function resetQuiz() {
  quizStarted.value = false
  quizFinished.value = false
  currentQ.value = 0
  score.value = 0
  quizAnswers.value = []
}

function startTimer() {
  timer.value = 60
  clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    timer.value--
    if (timer.value <= 0) {
      clearInterval(timerInterval)
      if (!quizAnswers.value[currentQ.value]) {
        quizAnswers.value[currentQ.value] = { selected: -1, correct: false }
      }
    }
  }, 1000)
}

onUnmounted(() => clearInterval(timerInterval))

// ==================== ROUTES ====================
const selectedRoute = ref(null)
const showRouteDetail = ref(false)

const routes = [
  {
    id: 'r1', name: '港口穿梭线', duration: '1天', bg: 'linear-gradient(135deg, #0a1a2e, #1a2a3e)',
    desc: '从新秦皇岛港出发，穿越月面平原抵达新唐山工业区，体验月球交通枢纽。',
    fullDesc: '这是最基础的旅行路线，适合首次到达月球的游客。从地月航线主港新秦皇岛出发，沿途可观赏月面平原的壮丽景色，远眺地球升起的美景。最终抵达月球最大的工业城市新唐山市，在穹顶市集品尝月球烧烤。',
    stops: [
      { name: '新秦皇岛港', char: '秦', type: 'port', tip: '地月航线主港，所有往返地球的飞船在此起降。数字记忆殿堂永久保存着地球长城的每一块砖的扫描数据。' },
      { name: '月面平原观景台', char: '观', type: 'nature', tip: '途中停靠，可远眺地球升起——蔚蓝的星球悬挂在漆黑的星空之中，令人终身难忘。' },
      { name: '新唐山市', char: '唐', type: 'city', tip: '工业之都，穹顶市集的月球烧烤闻名全月。低重力环境下的夜市比地球更热闹。' },
    ]
  },
  {
    id: 'r2', name: '长城溯源之旅', duration: '2天', bg: 'linear-gradient(135deg, #1a1a0a, #2a1a0a)',
    desc: '沿太空长城的城垣步道徒步，感受从地球到月球的城墙文明传承。',
    fullDesc: '深度文化线路。从太空长城的起点出发，沿11,000公里的月轨长城步道徒步（精华段约50公里）。结合全息投影技术，在行走中看到地球明长城的历史画面叠加在月面城墙上——一种跨越时空的沉浸体验。',
    stops: [
      { name: '新唐山车站', char: '唐', type: 'city', tip: '搭乘月面轨道车前往月轨长城南段入口。' },
      { name: '太空长城·南段', char: '长', type: 'nature', tip: '与明长城形制一脉相承的月面城墙，每一块合成砖都刻有对应地球城砖的坐标信息。' },
      { name: '月轨长城·河北长城复刻点', char: '金', type: 'nature', tip: '按1:1比例复刻了河北长城段最壮丽的敌楼群，全息投影展示戚继光督修的历史场景。' },
      { name: '新保定星际使馆区', char: '保', type: 'city', tip: '终点。每月开放的星际集市汇集七个文明的商品与艺术，是最受欢迎的跨文明交流场所。' },
    ]
  },
  {
    id: 'r3', name: '教育与自然环线', duration: '3天', bg: 'linear-gradient(135deg, #0a1a2a, #1a0a2a)',
    desc: '新承德国际学校研学 → 环形山攀岩 → 陨石坑跳伞，寓教于乐的家庭路线。',
    fullDesc: '适合亲子出行的路线。在新承德国际学校体验月球课堂，与来自世界各地的学生一起做低重力实验。第二天前往环形山国家地质公园攀岩，第三天在新张家口体验陨石坑跳伞——月球独有的极限运动。',
    stops: [
      { name: '新承德国际学校', char: '承', type: 'city', tip: '月球第一所国际学校，可旁听中文课、观看学生科学实验、品尝学校菜园的月壤蔬菜。' },
      { name: '环形山国家地质公园', char: '环', type: 'nature', tip: '低重力环境让攀岩变得格外有趣——普通人也能挑战垂直环形山壁。' },
      { name: '新张家口运动中心', char: '张', type: 'city', tip: '陨石坑跳伞、月面马拉松、零重力瑜伽——冒险者的乐园。' },
    ]
  },
  {
    id: 'r4', name: '农业与历史深度线', duration: '3天', bg: 'linear-gradient(135deg, #1a2a0a, #2a1a1a)',
    desc: '新邯郸月壤农场 → 太空长城北段遗址 → 历史博物馆，农耕文明与太空的对话。',
    fullDesc: '适合对农业科技和历史感兴趣的游客。第一天在新邯郸参观月壤改良实验田，亲手触摸比人还高的月面小麦。次日沿月轨长城北段徒步，探访早期基地遗迹。最后在历史博物馆回顾从地球到月球的完整历程。',
    stops: [
      { name: '新邯郸月壤农场', char: '邯', type: 'city', tip: '月壤改良实验田——低重力环境让麦穗长得比人还高，是最受欢迎的打卡地。' },
      { name: '太空长城·北段', char: '长', type: 'nature', tip: '较原始的长城段落，保留着第一批建设者的施工痕迹，历史的厚重感扑面而来。' },
      { name: '月球历史博物馆', char: '史', type: 'city', tip: '从中山长城到太空长城，完整展示两千五百年城墙文明的演进历程。' },
    ]
  },
  {
    id: 'r5', name: '夜光摄影特别线', duration: '2天', bg: 'linear-gradient(135deg, #0a1a2a, #2a0a2a)',
    desc: '月夜专属路线，环形山观星台 → 穹顶灯光秀 → 星轨长城摄影，为摄影爱好者设计。',
    fullDesc: '月球的夜晚持续14个地球日，是天文摄影的绝佳时机。从环形山观星台拍摄无大气干扰的银河，在新唐山穹顶拍城市灯光与星轨的梦幻叠加，最后在月轨长城拍摄城墙剪影与地球升起的经典构图。',
    stops: [
      { name: '环形山观星台', char: '观', type: 'nature', tip: '没有大气层的干扰，银河清晰如一条光河横贯天际，肉眼可见星云的颜色。' },
      { name: '新唐山市穹顶广场', char: '唐', type: 'city', tip: '穹顶透光层在月夜开启，城市灯光与头顶的星空交相辉映。' },
      { name: '太空长城摄影点', char: '长', type: 'nature', tip: '月球上最经典的摄影构图：城墙剪影 + 地平线上的蓝色地球。' },
    ]
  },
  {
    id: 'r6', name: '星际文明交流之旅', duration: '4天', bg: 'linear-gradient(135deg, #1a0a1a, #0a2a2a)',
    desc: '新保定星际使馆区 → 外星文明集市 → 多文明联合艺术展，体验跨文明交流。',
    fullDesc: '深度文化交流线路。在新保定星际使馆区拜访澜族、硅基生命等文明的驻月代表处。参与每月一次的星际集市，购买外星手工艺品、品尝异星美食。最后参观七个文明共同创作的艺术展——用不同文明的视角诠释"长城"这一共同意象。',
    stops: [
      { name: '新保定星际使馆区', char: '保', type: 'city', tip: '七个外星文明的驻月使馆所在地，建筑融合了各文明的独特风格。' },
      { name: '星际市集', char: '集', type: 'city', tip: '每月开放一次，可购买外星乐器、能量态文明的光雕艺术品、深海文明的矿物质饰品。' },
      { name: '多文明艺术馆', char: '艺', type: 'city', tip: '七个文明的艺术家共同以"长城"为主题创作——同一意象，七种表达。' },
      { name: '新秦皇岛港', char: '秦', type: 'port', tip: '返回地月航线主港，带着跨文明的友谊回到地球。' },
    ]
  },
]

// ==================== HISTORY ====================
const historyTimeline = [
  { year: '前369', era: '先秦', dynasty: '战国·中山国', title: '中山国修筑中山长城', desc: '战国中期，中山国在河北西部太行山区修筑长城，史称"中山长城"，是河北境内最早的城墙防御体系。', fictional: false },
  { year: '前307', era: '先秦', dynasty: '战国·赵国', title: '赵武灵王胡服骑射', desc: '赵武灵王推行军事改革，赵长城成为抵御北方游牧民族的重要屏障，河北北部正式纳入中原防御体系。', fictional: false },
  { year: '前214', era: '秦', dynasty: '秦朝', title: '秦连万里长城于河北', desc: '蒙恬率部连接修缮燕、赵等国城墙，万里长城横贯河北北部，成为中国最早的统一防线。', fictional: false },
  { year: '555', era: '南北朝', dynasty: '北齐', title: '北齐修筑千里长城', desc: '文宣帝发民百万，西起恒州（今正定）东至大海，修筑千余里长城，河北北部的防线格局基本定型。', fictional: false },
  { year: '1368', era: '明', dynasty: '明朝', title: '九边重镇立河北', desc: '明朝设立蓟镇、宣府镇等九边重镇，河北成为拱卫京师最重要的军事屏障。', fictional: false },
  { year: '1569', era: '明', dynasty: '明朝', title: '戚继光创河北长城杰作', desc: '蓟镇总兵戚继光督修河北长城，创造了万里长城的建筑巅峰——空心敌台、障墙、文字砖，技艺精绝。', fictional: false },
  { year: '1644', era: '清', dynasty: '清朝', title: '长城从防线变为象征', desc: '清军入关后长城不再承担军事功能，逐渐成为中华民族的精神图腾与文化遗产。', fictional: false },
  { year: '1928', era: '近代', dynasty: '民国', title: '河北省正式定名', desc: '直隶省更名为河北省，"河北"之名正式确立，省域涵盖京津周边广大区域。', fictional: false },
  { year: '1949', era: '现代', dynasty: '新中国', title: '河北在新中国成立', desc: '新中国成立后河北省定省会于保定（后迁石家庄），开始现代化建设的新篇章。', fictional: false },
  { year: '1987', era: '现代', dynasty: '改革开放', title: '河北长城列入世界遗产', desc: '长城被联合国教科文组织列入世界文化遗产名录，山海关、河北长城成为河北最著名的文化名片。', fictional: false },
  { year: '2090', era: '太空', dynasty: '新河北计划', title: '太空长城计划启动', desc: '以河北长城为精神起点，中国在月球启动永久基地建设，"新河北"成为月球基地的正式名称。', fictional: true },
  { year: '2102', era: '太空', dynasty: '新河北', title: '新唐山市率先建成', desc: '月球第一座城市新唐山市落成，承接地球唐山工业基因，成为月面制造中心。', fictional: true },
  { year: '2125', era: '太空', dynasty: '新河北', title: '月轨长城全线合龙', desc: '环月防御通讯阵列建成，全长11,000公里，各国媒体称其为"月之长城"。', fictional: true },
  { year: '2152', era: '太空', dynasty: '星际时代', title: '新保定星际使馆区设立', desc: '与首个外星文明建交后，新保定市设立星际使馆区，河北正式进入星际外交时代。', fictional: true },
  { year: '2250', era: '太空', dynasty: '星际文明共同体', title: '河北精神传播宇宙', desc: '以河北长城文明为核心的星际文明共同体正式成立，"守护·连接·协作·开放"的河北精神成为星际公约的基石。', fictional: true },
]
</script>