<template>
  <div class="page-container">
    <!-- ===== HERO ===== -->
    <section class="relative pt-32 pb-14 text-center border-b border-hologram-cyan/[0.04] overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="i in 40" :key="'s'+i" class="absolute rounded-full bg-white animate-pulse"
          :style="{ width: (1 + Math.sin(i)*1.5) + 'px', height: (1 + Math.cos(i)*1.5) + 'px',
            left: ((i*7+13)%100) + '%', top: ((i*11+7)%100) + '%',
            opacity: 0.15 + (i%5)*0.08, animationDelay: (i*0.3) + 's', animationDuration: (2 + (i%4)) + 's' }" />
        <div class="absolute top-20 right-[15%] w-16 h-16 rounded-full bg-gradient-to-br from-stellar-gold/20 to-hologram-cyan/10 border border-hologram-cyan/10 orbit-slow"
          style="animation-duration:12s"><div class="absolute top-2 left-2 w-3 h-3 rounded-full bg-stellar-gold/15"></div></div>
        <div class="absolute bottom-12 left-[10%] w-10 h-10 rounded-full bg-gradient-to-br from-hologram-cyan/15 to-transparent border border-hologram-cyan/8 orbit-slow"
          style="animation-duration:18s;animation-delay:2s"><div class="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-hologram-cyan/60"></div></div>
        <svg class="absolute top-16 left-[8%] w-12 h-12 opacity-[0.06]" viewBox="0 0 48 48">
          <ellipse cx="24" cy="22" rx="16" ry="18" fill="none" stroke="#88ccdd" stroke-width="0.5"/>
          <circle cx="18" cy="18" r="3.5" fill="none" stroke="#88ccdd" stroke-width="0.5"/>
          <circle cx="30" cy="18" r="3.5" fill="none" stroke="#88ccdd" stroke-width="0.5"/>
          <circle cx="18" cy="17" r="1.2" fill="#88ccdd" opacity="0.4"/>
          <circle cx="30" cy="17" r="1.2" fill="#88ccdd" opacity="0.4"/>
          <line x1="18" y1="28" x2="30" y2="28" stroke="#88ccdd" stroke-width="0.5"/>
        </svg>
      </div>
      <div class="max-w-4xl mx-auto px-6 relative z-10">
        <div class="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-hologram-cyan/15 bg-hologram-cyan/[0.03] backdrop-blur-md text-3xl lg:text-4xl font-display font-bold text-hologram-cyan/90 tracking-wider mx-auto mb-6"><span class="w-3 h-3 rounded-full bg-hologram-cyan shadow-[0_0_12px_#88ccdd] animate-pulse"></span>外 · 地人交流中心</div>
        <h1 class="text-3xl lg:text-5xl font-display font-bold text-hologram-ice mb-4">
          跨越<span class="text-glow-gold glow-text">光年</span>的对话
        </h1>
        <p class="text-sm lg:text-base text-hologram-ice/35 max-w-2xl mx-auto leading-relaxed">
          外星人和地月人交流中心<br/>星际使馆区官方通讯平台 · 已与七个文明建立外交关系
        </p>
      </div>
    </section>

    <!-- ===== 外·地人留言板 ===== -->
    <section class="sticky top-0 z-30 bg-deep-space-950/85 backdrop-blur-xl border-b border-hologram-cyan/[0.04]">
      <div class="max-w-6xl mx-auto px-6 py-3">
        <p class="text-center text-xs text-hologram-ice/25 font-mono tracking-widest mb-2">▸ 外 · 地人留言板 ▸ 外星人和地月人都可以留言</p>
        <div class="flex items-center justify-center gap-2 overflow-x-auto scrollbar-none flex-nowrap">
          <button v-for="tab in msgTabs" :key="tab.key"
            class="flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border-2"
            :class="activeMsgTab === tab.key ? 'bg-stellar-gold/15 text-stellar-warm border-stellar-gold/30 shadow-[0_0_20px_rgba(212,168,83,0.1)]' : 'text-hologram-ice/35 hover:text-hologram-ice/65 border-transparent hover:bg-white/[0.03]'"
            @click="activeMsgTab = tab.key">{{ tab.label }}</button>
        </div>
      </div>
    </section>

    <!-- TAB 1: 发送讯息 -->
    <section v-if="activeMsgTab === 'send'" class="py-16 lg:py-24">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="flex items-end gap-4 mb-10">
          <div><div class="tag mb-3"><span class="tag-dot"></span>星际通讯终端</div>
            <h2 class="text-3xl lg:text-5xl font-display font-bold text-hologram-ice">发送星际讯息</h2>
            <p class="text-sm lg:text-base text-hologram-ice/35 mt-2">向全宇宙发送你的讯息 · 任何文明都能接收</p></div>
        </div>
        <div class="holo-panel p-6 lg:p-8">
          <div class="flex items-center gap-3 mb-4 pb-4 border-b border-hologram-cyan/[0.06]">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-hologram-cyan/15 to-stellar-gold/10 border border-hologram-cyan/10 flex items-center justify-center">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" class="text-hologram-ice/60"><path d="M12 20a8 8 0 100-16 8 8 0 000 16z"/><path d="M12 14a2 2 0 100-4 2 2 0 000 4z"/><path d="M12 14v6"/></svg></div>
            <span class="text-xs text-hologram-ice/50 font-mono tracking-wider">发射信号到深空</span></div>
          <div class="flex flex-col gap-3 mb-4">
            <div class="flex flex-col sm:flex-row gap-3">
              <input v-model.trim="msgNickname" type="text" placeholder="你的星际代号" maxlength="20" class="flex-1 sm:w-48 bg-deep-space-800/60 border border-hologram-cyan/[0.08] rounded-lg px-4 py-2.5 text-sm text-hologram-ice placeholder:text-hologram-ice/20 focus:outline-none focus:border-stellar-gold/30 transition-colors" />
              <div class="flex gap-2"><button v-for="role in ['地月人','外星人']" :key="role" class="px-4 py-2.5 rounded-lg text-xs transition-all border" :class="msgRole === role ? 'bg-stellar-gold/10 text-stellar-warm border-stellar-gold/25' : 'text-hologram-ice/35 border-white/[0.05] hover:border-white/[0.1]'" @click="msgRole = role">{{ role }}</button></div>
            </div>
            <textarea v-model.trim="msgContent" placeholder="写下你想说的话..." maxlength="300" rows="3" class="w-full bg-deep-space-800/60 border border-hologram-cyan/[0.08] rounded-lg px-4 py-2.5 text-sm text-hologram-ice placeholder:text-hologram-ice/20 focus:outline-none focus:border-stellar-gold/30 transition-colors resize-none"></textarea>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-[11px] text-hologram-ice/25 font-mono">{{ msgContent.length }}/300</span>
            <button class="px-8 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2"
              :class="canPost ? 'bg-stellar-gold/15 text-stellar-warm border border-stellar-gold/25 hover:bg-stellar-gold/20 active:scale-95' : 'bg-white/[0.03] text-hologram-ice/20 border border-white/[0.04] cursor-not-allowed'"
              :disabled="!canPost" @click="postMessage">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>{{ sending ? '发送中' : '发射信号' }}</button>
          </div>
          <p v-if="postError" class="text-xs text-red-400/70 mt-2">{{ postError }}</p>
        </div>
        <div v-if="postedMessages.length" class="mt-8 space-y-3">
          <h3 class="text-sm text-hologram-ice/30 mb-4 font-mono tracking-wider">▸ 你的历史讯息</h3>
          <div v-for="msg in postedMessages" :key="msg.id" class="holo-panel p-4 flex gap-4">
            <div class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold border" :style="{ background: msg.avatarBg, borderColor: msg.avatarBorder }">
              <span :class="msg.role === '外星人' ? 'text-[16px]' : ''">{{ msg.avatarChar }}</span></div>
            <div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1">
                <span class="text-sm font-semibold text-stellar-warm/90">{{ msg.nickname }}</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full border" :class="msg.role === '外星人' ? 'text-hologram-cyan/50 border-hologram-cyan/20' : 'text-stellar-gold/50 border-stellar-gold/20'">{{ msg.role }}</span>
                <span class="text-[10px] text-hologram-ice/20 ml-auto">{{ msg.date }}</span></div>
              <p class="text-sm text-hologram-ice/55 leading-relaxed break-words">{{ msg.content }}</p></div>
          </div>
        </div>
      </div>
    </section>

    <!-- TAB 2: 最新留言 -->
    <section v-if="activeMsgTab === 'recent'" class="py-16 lg:py-24">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="flex items-end gap-4 mb-10">
          <div><div class="tag mb-3"><span class="tag-dot"></span>实时信标</div>
            <h2 class="text-3xl lg:text-5xl font-display font-bold text-hologram-ice">最新留言</h2>
            <p class="text-sm lg:text-base text-hologram-ice/35 mt-2">跨文明留言按时间排序 · 来自地球、月球与深空的最新声音</p></div>
          <div class="flex-1"></div><span class="text-xs text-hologram-ice/20 font-mono">共 {{ recentMessages.length }} 条</span>
        </div>
        <div class="space-y-3">
          <div v-for="msg in recentMessages" :key="msg.id" class="holo-panel p-4 group transition-all duration-300"
            :class="msg.type === 'alien' ? 'border-l-[3px] border-l-hologram-cyan/20' : 'border-l-[3px] border-l-stellar-gold/20'">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2 relative overflow-hidden"
                :style="{ background: msg.avatarBg, borderColor: msg.avatarBorder }">
                <span class="text-base font-bold" :class="msg.type === 'alien' ? 'text-hologram-cyan/70' : 'text-stellar-warm/70'">{{ msg.avatarChar }}</span></div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="text-sm font-semibold" :class="msg.type === 'alien' ? 'text-hologram-cyan/90' : 'text-stellar-warm/90'">{{ msg.username }}</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full border" :class="msg.type === 'alien' ? 'text-hologram-cyan/50 border-hologram-cyan/20' : 'text-stellar-gold/50 border-stellar-gold/20'">{{ msg.type === 'alien' ? '外星文明' : '地月文明' }}</span>
                  <span v-if="msg.civilization" class="text-[9px] px-1 py-0.5 rounded border border-hologram-cyan/15 text-hologram-cyan/40">{{ msg.civilization }}</span>
                  <span class="text-[10px] text-hologram-ice/15 ml-auto">{{ msg.date }}</span></div>
                <p class="text-sm leading-relaxed" :class="msg.type === 'alien' ? 'text-hologram-ice/50 font-alien' : 'text-hologram-ice/55'">{{ isTranslated(msg) ? msg.translation : msg.content }}</p>
                <button v-if="msg.type === 'alien' && msg.translation" class="mt-1.5 text-[11px] transition-colors"
                  :class="translationShown[msg.id] ? 'text-stellar-warm/55 hover:text-stellar-warm/75' : 'text-hologram-cyan/45 hover:text-hologram-cyan/65'"
                  @click="toggleTranslation(msg.id)">{{ translationShown[msg.id] ? '▲ 收起翻译' : '▼ 翻译为中文' }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TAB 3: 精选留言 -->
    <section v-if="activeMsgTab === 'featured'" class="py-16 lg:py-24">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="flex items-end gap-4 mb-10">
          <div><div class="tag mb-3"><span class="tag-dot"></span>跨越文明的对话</div>
            <h2 class="text-3xl lg:text-5xl font-display font-bold text-hologram-ice">精选留言</h2>
            <p class="text-sm lg:text-base text-hologram-ice/35 mt-2">30条来自不同文明的声音 · 点击外星语留言下的"翻译"查看中文</p></div>
          <div class="flex-1"></div><span class="text-xs text-hologram-ice/20 font-mono">共 30 条</span>
        </div>
        <div class="space-y-3">
          <div v-for="msg in featuredMessages" :key="msg.id" class="holo-panel p-5 group transition-all duration-300"
            :class="msg.type === 'alien' ? 'border-l-[3px] border-l-hologram-cyan/20' : 'border-l-[3px] border-l-stellar-gold/20'">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center border-2 relative overflow-hidden"
                :style="{ background: msg.avatarBg, borderColor: msg.avatarBorder }">
                <span class="text-lg font-bold" :class="msg.type === 'alien' ? 'text-hologram-cyan/80' : 'text-stellar-warm/80'">{{ msg.avatarChar }}</span></div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-sm font-semibold" :class="msg.type === 'alien' ? 'text-hologram-cyan/90' : 'text-stellar-warm/90'">{{ msg.username }}</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full border" :class="msg.type === 'alien' ? 'text-hologram-cyan/50 border-hologram-cyan/20' : 'text-stellar-gold/50 border-stellar-gold/20'">{{ msg.type === 'alien' ? '外星文明' : '地月文明' }}</span>
                  <span class="text-[10px] text-hologram-ice/15 ml-auto">{{ msg.date }}</span></div>
                <p class="text-sm leading-relaxed" :class="msg.type === 'alien' ? 'text-hologram-ice/55 font-alien' : 'text-hologram-ice/60'">{{ isTranslated(msg) ? msg.translation : msg.content }}</p>
                <button v-if="msg.type === 'alien' && msg.translation" class="mt-2 text-[11px] transition-colors"
                  :class="translationShown[msg.id] ? 'text-stellar-warm/60 hover:text-stellar-warm/80' : 'text-hologram-cyan/50 hover:text-hologram-cyan/70'"
                  @click="toggleTranslation(msg.id)">{{ translationShown[msg.id] ? '▲ 收起翻译' : '▼ 翻译为中文' }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TAB 4: 地月留言 -->
    <section v-if="activeMsgTab === 'earth'" class="py-16 lg:py-24">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="flex items-end gap-4 mb-10">
          <div><div class="tag mb-3"><span class="tag-dot"></span>来自地球与月球的声音</div>
            <h2 class="text-3xl lg:text-5xl font-display font-bold text-hologram-ice">地月留言</h2>
            <p class="text-sm lg:text-base text-hologram-ice/35 mt-2">30条地月文明留言 · 中文与英文</p></div>
          <div class="flex-1"></div><span class="text-xs text-hologram-ice/20 font-mono">共 30 条</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="msg in earthMessages" :key="msg.id" class="holo-panel p-4 group transition-all duration-300 hover:border-stellar-gold/10">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold border" :style="{ background: msg.avatarBg, borderColor: msg.avatarBorder }">
                <span class="text-stellar-warm/70">{{ msg.avatarChar }}</span></div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5 mb-1"><span class="text-xs font-semibold text-stellar-warm/85">{{ msg.username }}</span><span class="text-[9px] text-hologram-ice/15 ml-auto">{{ msg.date }}</span></div>
                <p class="text-xs text-hologram-ice/50 leading-relaxed line-clamp-3">{{ msg.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TAB 5: 外星人留言 -->
    <section v-if="activeMsgTab === 'alien'" class="py-16 lg:py-24">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="flex items-end gap-4 mb-10">
          <div><div class="tag mb-3"><span class="tag-dot"></span>来自星辰深处的问候</div>
            <h2 class="text-3xl lg:text-5xl font-display font-bold text-hologram-ice">外星人留言</h2>
            <p class="text-sm lg:text-base text-hologram-ice/35 mt-2">40条外星文明留言 · 点击"翻译"查看中文含义</p></div>
          <div class="flex-1"></div><span class="text-xs text-hologram-ice/20 font-mono">共 40 条</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-for="msg in alienMessages" :key="msg.id" class="holo-panel p-4 group transition-all duration-300 hover:border-hologram-cyan/15"
            :class="{ 'border-hologram-cyan/15': msg.showTranslation }">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center border relative overflow-hidden" :style="{ background: msg.avatarBg, borderColor: msg.avatarBorder }">
                <span class="text-lg font-bold text-hologram-cyan/70">{{ msg.avatarChar }}</span></div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5 mb-1"><span class="text-xs font-semibold text-hologram-cyan/85">{{ msg.username }}</span><span class="text-[9px] px-1 py-0.5 rounded border border-hologram-cyan/15 text-hologram-cyan/50">{{ msg.civilization }}</span><span class="text-[9px] text-hologram-ice/15 ml-auto">{{ msg.date }}</span></div>
                <p class="text-xs leading-relaxed font-alien" :class="isTranslated(msg) ? 'text-hologram-ice/60' : 'text-hologram-cyan/55'">{{ isTranslated(msg) ? msg.translation : msg.content }}</p>
                <button class="mt-1.5 text-[10px] transition-colors" :class="translationShown[msg.id] ? 'text-stellar-warm/50 hover:text-stellar-warm/70' : 'text-hologram-cyan/40 hover:text-hologram-cyan/60'" @click="toggleTranslation(msg.id)">{{ translationShown[msg.id] ? '▲ 收起' : '▼ 翻译' }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== VIDEO SHOWCASE ===== -->
    <hr class="section-divider" />
    <section class="py-16 lg:py-24">
      <div class="max-w-6xl mx-auto px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-start gap-10">
          <!-- Left: illustration + info -->
          <div class="lg:w-[380px] flex-shrink-0">
            <div class="holo-panel p-6 text-center cursor-pointer group transition-all duration-300 hover:border-hologram-cyan/20" @click="showVideoModal = true">
              <svg class="w-20 h-20 mx-auto mb-4 opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="56" r="36" fill="url(#vidGrad)" stroke="#88ccdd" stroke-width="0.8" opacity="0.3"/>
                <ellipse cx="60" cy="56" rx="22" ry="28" fill="#0a122e" stroke="#88ccdd" stroke-width="0.6" opacity="0.5"/>
                <polygon points="52,42 52,70 76,56" fill="#88ccdd" opacity="0.5"/>
                <circle cx="88" cy="36" r="8" fill="url(#vidGrad2)" stroke="#d4a853" stroke-width="0.5" opacity="0.4"/>
                <circle cx="92" cy="30" r="2" fill="#d4a853" opacity="0.3"/>
                <circle cx="30" cy="24" r="3" fill="white" opacity="0.08"/>
                <circle cx="102" cy="48" r="1.5" fill="white" opacity="0.06"/>
                <defs>
                  <radialGradient id="vidGrad"><stop offset="0%" stop-color="#88ccdd" stop-opacity="0.2"/><stop offset="100%" stop-color="#88ccdd" stop-opacity="0"/></radialGradient>
                  <radialGradient id="vidGrad2"><stop offset="0%" stop-color="#d4a853" stop-opacity="0.3"/><stop offset="100%" stop-color="#d4a853" stop-opacity="0"/></radialGradient>
                </defs>
              </svg>
              <div class="tag mx-auto mb-3"><span class="tag-dot"></span>视频展示</div>
              <h3 class="text-xl font-display font-bold text-hologram-ice mb-2">星际影像档案馆</h3>
              <p class="text-sm text-hologram-ice/35 leading-relaxed mb-4">观看来自地球、月球与深空的珍贵影像记录<br/>共 {{ uploadedVideos.length }} 部影片</p>
              <span class="text-[10px] text-hologram-cyan/40 font-mono tracking-wider">点击进入 →</span>
            </div>
          </div>
          <!-- Right: video list -->
          <div class="flex-1 min-w-0">
            <div class="flex items-end gap-4 mb-6">
              <div><div class="tag mb-2"><span class="tag-dot"></span>热门影片</div><h3 class="text-2xl font-display font-bold text-hologram-ice">最新上传</h3></div>
              <button class="ml-auto w-10 h-10 rounded-full border border-hologram-cyan/15 text-hologram-cyan/50 hover:bg-hologram-cyan/5 hover:border-hologram-cyan/25 transition-all flex items-center justify-center" @click="showVideoModal = true" title="上传视频">
                <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="vid in uploadedVideos" :key="vid.id" class="holo-panel p-4 group cursor-pointer transition-all duration-300 hover:border-stellar-gold/15" @click="showVideoModal = true">
                <div class="flex gap-4">
                  <div class="w-16 h-12 rounded-lg bg-gradient-to-br from-hologram-cyan/10 to-stellar-gold/5 border border-hologram-cyan/10 flex-shrink-0 flex items-center justify-center group-hover:border-stellar-gold/20 transition-colors">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24" class="text-hologram-cyan/50"><polygon points="5,3 19,12 5,21" fill="#88ccdd" opacity="0.3"/></svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-semibold text-hologram-ice/80 mb-1 truncate">{{ vid.title }}</h4>
                    <p class="text-[11px] text-hologram-ice/30 mb-1.5 line-clamp-2">{{ vid.desc }}</p>
                    <div class="flex items-center gap-3 text-[10px] text-hologram-ice/20 font-mono"><span>{{ vid.duration }}</span><span>{{ vid.views }} 次播放</span><span>{{ vid.date }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Detail Modal -->
    <Teleport to="body">
      <div v-if="showVideoModal" class="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" @click.self="showVideoModal = false">
        <div class="max-w-3xl w-full max-h-[90vh] holo-panel overflow-y-auto">
          <div class="sticky top-0 z-10 bg-deep-space-950/95 backdrop-blur-xl p-5 border-b border-hologram-cyan/[0.06] flex items-center justify-between">
            <h3 class="text-lg font-display font-bold text-hologram-ice">星际影像档案馆</h3>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg text-hologram-ice/40 hover:text-hologram-ice hover:bg-white/[0.03]" @click="showVideoModal = false">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="p-5 space-y-6">
            <!-- Upload -->
            <div class="holo-panel p-5">
              <h4 class="text-sm font-semibold text-stellar-warm/80 mb-4 flex items-center gap-2">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>上传新视频
              </h4>
              <div class="flex flex-col gap-3">
                <input v-model="videoTitle" type="text" placeholder="视频标题" maxlength="60" class="bg-deep-space-800/60 border border-hologram-cyan/[0.08] rounded-lg px-4 py-2.5 text-sm text-hologram-ice placeholder:text-hologram-ice/20 focus:outline-none focus:border-stellar-gold/30 transition-colors" />
                <textarea v-model="videoDesc" placeholder="视频简介（选填）" maxlength="200" rows="2" class="bg-deep-space-800/60 border border-hologram-cyan/[0.08] rounded-lg px-4 py-2.5 text-sm text-hologram-ice placeholder:text-hologram-ice/20 focus:outline-none focus:border-stellar-gold/30 transition-colors resize-none"></textarea>
                <div class="flex items-center gap-3">
                  <label class="flex-1 flex items-center justify-center gap-2 py-3 border border-dashed border-hologram-cyan/[0.12] rounded-lg cursor-pointer hover:border-hologram-cyan/25 transition-colors text-xs text-hologram-ice/30">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                    {{ videoFile ? videoFile.name : '选择视频文件' }}
                    <input type="file" accept="video/*" class="hidden" @change="handleVideoFile" />
                  </label>
                  <button class="px-5 py-2.5 rounded-lg text-xs font-medium transition-all bg-stellar-gold/15 text-stellar-warm border border-stellar-gold/25 hover:bg-stellar-gold/20 disabled:opacity-30 disabled:cursor-not-allowed" :disabled="!videoTitle || !videoFile || videoUploading" @click="uploadVideo">
                    {{ videoUploading ? '上传中...' : '上传' }}
                  </button>
                </div>
              </div>
            </div>
            <!-- Video list -->
            <div class="space-y-3">
              <h4 class="text-sm font-semibold text-hologram-ice/50">全部影片 ({{ uploadedVideos.length }})</h4>
              <div v-for="vid in uploadedVideos" :key="vid.id" class="holo-panel p-4 flex gap-4">
                <div class="w-20 h-14 rounded-lg bg-gradient-to-br from-hologram-cyan/10 to-stellar-gold/5 border border-hologram-cyan/10 flex-shrink-0 flex items-center justify-center">
                  <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24" class="text-hologram-cyan/45"><polygon points="5,3 19,12 5,21" fill="#88ccdd" opacity="0.25"/></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <h5 class="text-sm font-semibold text-hologram-ice/75 mb-1">{{ vid.title }}</h5>
                  <p class="text-[11px] text-hologram-ice/30 mb-1.5">{{ vid.desc }}</p>
                  <div class="flex items-center gap-3 text-[10px] text-hologram-ice/20 font-mono"><span>{{ vid.duration }}</span><span>{{ vid.views }} 次播放</span><span>{{ vid.date }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ===== ESSAY COMPETITION ===== -->
    <hr class="section-divider" />
    <section class="py-16 lg:py-24">
      <div class="max-w-6xl mx-auto px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-start gap-10">
          <!-- Left: illustration + info -->
          <div class="lg:w-[380px] flex-shrink-0">
            <div class="holo-panel p-6 text-center">
              <svg class="w-20 h-20 mx-auto mb-4 opacity-80" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="52" r="34" fill="url(#essayGrad)" stroke="#d4a853" stroke-width="0.6" opacity="0.25"/>
                <rect x="38" y="24" width="44" height="56" rx="3" fill="#0a122e" stroke="#d4a853" stroke-width="0.6" opacity="0.5"/>
                <line x1="46" y1="38" x2="74" y2="38" stroke="#d4a853" stroke-width="0.5" opacity="0.3"/>
                <line x1="46" y1="46" x2="68" y2="46" stroke="#d4a853" stroke-width="0.5" opacity="0.25"/>
                <line x1="46" y1="54" x2="72" y2="54" stroke="#d4a853" stroke-width="0.5" opacity="0.25"/>
                <line x1="46" y1="62" x2="60" y2="62" stroke="#d4a853" stroke-width="0.5" opacity="0.2"/>
                <circle cx="22" cy="30" r="3" fill="white" opacity="0.06"/>
                <circle cx="100" cy="76" r="2" fill="white" opacity="0.05"/>
                <defs>
                  <radialGradient id="essayGrad"><stop offset="0%" stop-color="#d4a853" stop-opacity="0.2"/><stop offset="100%" stop-color="#d4a853" stop-opacity="0"/></radialGradient>
                </defs>
              </svg>
              <div class="tag mx-auto mb-3"><span class="tag-dot"></span>太空长城作文竞赛</div>
              <h3 class="text-xl font-display font-bold text-stellar-warm mb-3">笔落星辰 · 文载长城</h3>
              <div class="text-sm text-hologram-ice/35 leading-relaxed space-y-2 mb-5">
                <p>参赛年龄：<span class="text-stellar-warm/60">3 - 200 岁</span></p>
                <p>分为三个赛道：</p>
                <div class="flex justify-center gap-2 flex-wrap">
                  <span class="text-[10px] px-2 py-1 rounded-full border border-hologram-cyan/15 text-hologram-cyan/60">少儿赛道 3-17岁</span>
                  <span class="text-[10px] px-2 py-1 rounded-full border border-stellar-gold/15 text-stellar-gold/60">中青年赛道 18-59岁</span>
                  <span class="text-[10px] px-2 py-1 rounded-full border border-purple-400/15 text-purple-300/60">老年赛道 60-200岁</span>
                </div>
                <p class="text-hologram-ice/20 mt-3">用文字描绘你心中的太空长城<br/>优秀作品将收录于星际数字记忆殿堂</p>
              </div>
              <button class="btn-primary text-sm" @click="showEssayModal = true; resetEssay()">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>我要投稿
              </button>
            </div>
          </div>
          <!-- Right: sample essays -->
          <div class="flex-1 min-w-0">
            <div class="flex items-end gap-4 mb-6">
              <div><h3 class="text-2xl font-display font-bold text-hologram-ice">优秀作品展示</h3></div>
            </div>
            <div class="space-y-6">
              <div v-for="track in essayTracks" :key="track.key">
                <div class="flex items-center gap-3 mb-3">
                  <span class="text-sm lg:text-base font-semibold" :class="track.key === 'junior' ? 'text-hologram-cyan/80' : track.key === 'youth' ? 'text-stellar-warm/80' : 'text-purple-300/80'">{{ track.label }}</span>
                  <span class="text-[10px] text-hologram-ice/25 font-mono">{{ track.age }}</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div v-for="essay in sampleEssays.filter(e => e.track === track.key)" :key="essay.id" class="holo-panel p-4 group cursor-pointer transition-all duration-300" @click="openEssayDetail(essay)">
                    <h5 class="text-sm font-semibold text-hologram-ice/80 mb-1.5" :class="{ 'font-alien': essay.type === 'alien' }">{{ essay.type === 'alien' ? essay.title.slice(0, 30) + '...' : essay.title }}</h5>
                    <div class="flex items-center gap-2 mb-2 text-[10px]">
                      <span class="text-stellar-warm/50">{{ essay.name }}</span>
                      <span v-if="essay.civilization" class="text-emerald-300/50 px-1 py-0.5 rounded border border-emerald-400/15 text-[9px]">{{ essay.civilization }}</span>
                      <span class="text-hologram-ice/20">{{ essay.age }}岁</span>
                      <span class="text-hologram-ice/15 ml-auto">{{ essay.date }}</span>
                    </div>
                    <p class="text-xs leading-relaxed line-clamp-3" :class="essay.type === 'alien' ? 'text-hologram-cyan/35 font-alien' : 'text-hologram-ice/40'">{{ essay.type === 'alien' ? essay.content.slice(0, 100) : essay.content.slice(0, 120) }}...</p>
                    <span class="text-[10px] text-hologram-cyan/30 mt-1.5 inline-block">点击阅读全文 →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Essay Submission Modal -->
    <Teleport to="body">
      <div v-if="showEssayModal" class="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" @click.self="showEssayModal = false">
        <div class="max-w-2xl w-full max-h-[90vh] holo-panel overflow-y-auto">
          <div class="sticky top-0 z-10 bg-deep-space-950/95 backdrop-blur-xl p-5 border-b border-hologram-cyan/[0.06] flex items-center justify-between">
            <h3 class="text-lg font-display font-bold text-hologram-ice">我要投稿</h3>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg text-hologram-ice/40 hover:text-hologram-ice" @click="showEssayModal = false">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="p-5 space-y-5">
            <!-- Success state -->
            <div v-if="essaySubmitted" class="text-center py-10">
              <svg class="w-16 h-16 mx-auto mb-4 opacity-60" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="30" stroke="#88ccdd" stroke-width="1" opacity="0.3"/><path d="M25 40l10 10 20-20" stroke="#d4a853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <h4 class="text-lg font-display font-bold text-stellar-warm mb-2">投稿成功！</h4>
              <p class="text-sm text-hologram-ice/35 mb-4">你的作文已通过星际量子网络发送至评审委员会。请留意通讯终端的反馈通知。</p>
              <button class="btn-ghost text-sm" @click="showEssayModal = false">返回</button>
            </div>
            <!-- Form -->
            <template v-else>
              <div class="holo-panel p-5">
                <h4 class="text-sm font-semibold text-hologram-ice/70 mb-4">投稿信息</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <input v-model="essayForm.name" type="text" placeholder="姓名" maxlength="20" class="bg-deep-space-800/60 border border-hologram-cyan/[0.08] rounded-lg px-4 py-2.5 text-sm text-hologram-ice placeholder:text-hologram-ice/20 focus:outline-none focus:border-stellar-gold/30 transition-colors" />
                  <input v-model="essayForm.age" type="number" placeholder="年龄" min="3" max="200" class="bg-deep-space-800/60 border border-hologram-cyan/[0.08] rounded-lg px-4 py-2.5 text-sm text-hologram-ice placeholder:text-hologram-ice/20 focus:outline-none focus:border-stellar-gold/30 transition-colors" />
                </div>
                <input v-model="essayForm.title" type="text" placeholder="作文题目" maxlength="50" class="w-full bg-deep-space-800/60 border border-hologram-cyan/[0.08] rounded-lg px-4 py-2.5 text-sm text-hologram-ice placeholder:text-hologram-ice/20 focus:outline-none focus:border-stellar-gold/30 transition-colors mb-4" />
                <div class="mb-4">
                  <p class="text-xs text-hologram-ice/30 mb-2">选择赛道</p>
                  <div class="flex gap-2">
                    <button v-for="track in essayTracks" :key="track.key" class="flex-1 py-2.5 rounded-lg text-xs transition-all border" :class="selectedTrack === track.key ? 'bg-stellar-gold/10 text-stellar-warm border-stellar-gold/25' : 'text-hologram-ice/35 border-white/[0.05] hover:border-white/[0.1]'" @click="selectedTrack = track.key">{{ track.label }}<br/><span class="text-[9px] opacity-50">{{ track.age }}</span></button>
                  </div>
                </div>
                <label class="flex items-center justify-center gap-2 py-4 border border-dashed border-hologram-cyan/[0.12] rounded-lg cursor-pointer hover:border-hologram-cyan/25 transition-colors text-xs text-hologram-ice/30">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                  {{ essayForm.file ? essayForm.file.name : '上传作文文件（支持 .doc .pdf .txt）' }}
                  <input type="file" accept=".doc,.docx,.pdf,.txt" class="hidden" @change="handleEssayFile" />
                </label>
              </div>
              <button class="w-full py-3 rounded-lg text-sm font-medium transition-all bg-stellar-gold/15 text-stellar-warm border border-stellar-gold/25 hover:bg-stellar-gold/20 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                :disabled="!essayForm.name || !essayForm.age || !essayForm.title || essaySubmitting" @click="submitEssay">
                {{ essaySubmitting ? '提交中...' : '提交投稿' }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Essay Detail Modal -->
    <Teleport to="body">
      <div v-if="showEssayDetail && selectedEssay" class="fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" @click.self="showEssayDetail = false">
        <div class="max-w-3xl w-full max-h-[92vh] holo-panel overflow-y-auto">
          <div class="sticky top-0 z-10 bg-deep-space-950/95 backdrop-blur-xl p-5 border-b border-hologram-cyan/[0.06] flex items-center justify-between">
            <div class="min-w-0 flex-1 mr-4">
              <span class="text-[10px] text-hologram-ice/30 font-mono">{{ essayTracks.find(t=>t.key===selectedEssay.track)?.label }}</span>
              <h3 class="text-lg font-display font-bold text-hologram-ice truncate">{{ selectedEssay.type === 'alien' && isTranslated(selectedEssay) ? selectedEssay.translation.split('\n')[0].slice(0, 30) : selectedEssay.title }}</h3>
            </div>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg text-hologram-ice/40 hover:text-hologram-ice flex-shrink-0" @click="showEssayDetail = false">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="p-6 lg:p-8">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-hologram-cyan/[0.06]">
              <div class="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border flex-shrink-0"
                :style="{ background: selectedEssay.type === 'alien' ? 'linear-gradient(135deg, hsl(170,40%,20%), hsl(200,30%,15%))' : selectedEssay.track === 'junior' ? 'linear-gradient(135deg,hsl(190,40%,20%),hsl(210,40%,25%))' : selectedEssay.track === 'youth' ? 'linear-gradient(135deg,hsl(40,40%,20%),hsl(60,40%,25%))' : 'linear-gradient(135deg,hsl(280,40%,20%),hsl(310,40%,25%))',
                  borderColor: selectedEssay.type === 'alien' ? 'rgba(80,200,180,0.5)' : selectedEssay.track === 'junior' ? 'rgba(136,204,221,0.4)' : selectedEssay.track === 'youth' ? 'rgba(212,168,83,0.4)' : 'rgba(180,140,220,0.4)' }">
                <span :class="selectedEssay.type === 'alien' ? 'text-emerald-300/70 text-lg' : selectedEssay.track === 'junior' ? 'text-hologram-cyan/70' : selectedEssay.track === 'youth' ? 'text-stellar-warm/70' : 'text-purple-300/70'">{{ selectedEssay.type === 'alien' ? (selectedEssay.avatarChar || '◆') : selectedEssay.name.charAt(0) }}</span></div>
              <div>
                <p class="text-base font-semibold text-hologram-ice/80">{{ selectedEssay.name }}</p>
                <p class="text-xs text-hologram-ice/25 flex items-center gap-2">
                  <span>{{ selectedEssay.age }}岁</span>
                  <span v-if="selectedEssay.civilization" class="px-1.5 py-0.5 rounded border border-emerald-400/20 text-emerald-300/50 text-[10px]">{{ selectedEssay.civilization }}</span>
                  <span>{{ selectedEssay.date }}</span>
                </p>
              </div>
            </div>
            <h4 class="text-xl font-display font-bold text-hologram-ice mb-6">{{ isTranslated(selectedEssay) ? selectedEssay.translation.split('\n')[0] : selectedEssay.title }}</h4>
            <button v-if="selectedEssay.type === 'alien' && selectedEssay.translation" class="mb-4 text-sm transition-colors flex items-center gap-1.5"
              :class="translationShown[selectedEssay.id] ? 'text-stellar-warm/60 hover:text-stellar-warm/80' : 'text-hologram-cyan/50 hover:text-hologram-cyan/70'"
              @click="toggleTranslation(selectedEssay.id)">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/><path d="M2 12h20M12 2c2.5 2.5 4 6 4 10s-1.5 7.5-4 10M12 2C9.5 4.5 8 8 8 12s1.5 7.5 4 10"/></svg>
              {{ translationShown[selectedEssay.id] ? '▲ 收起翻译' : '▼ 翻译为中文' }}
            </button>
            <div class="text-sm lg:text-base text-hologram-ice/60 leading-relaxed whitespace-pre-line" :class="{ 'font-alien': selectedEssay.type === 'alien' && !translationShown[selectedEssay.id] }">{{ isTranslated(selectedEssay) ? selectedEssay.translation : selectedEssay.content }}</div>
          </div>
        </div>
      </div>
    </Teleport>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { featuredMessages as _featured } from '~/data/message-data.js'
import { earthMessages as _earth } from '~/data/earth-messages.js'
import { alienMessages as _alien } from '~/data/alien-messages.js'
import { essayTracks, sampleEssays } from '~/data/essay-data.js'

// Wrap data in ref for reactivity (translation toggle)
const featuredMessages = ref(_featured)
const earthMessages = ref(_earth)
const alienMessages = ref(_alien)

// Translation state map: { messageId: boolean }
const translationShown = ref({})
function toggleTranslation(id) {
  translationShown.value = { ...translationShown.value, [id]: !translationShown.value[id] }
}
function isTranslated(msg) {
  return !!(translationShown.value[msg.id] && msg.translation)
}

const activeMsgTab = ref('send')
const msgTabs = [
  { key: 'send', label: '发送讯息' },
  { key: 'recent', label: '最新留言' },
  { key: 'featured', label: '精选留言' },
  { key: 'earth', label: '地月留言' },
  { key: 'alien', label: '外星人留言' },
]

// Combined recent messages from all sources, sorted by date descending
const recentMessages = computed(() => {
  const featured = featuredMessages.value.map(m => ({ ...m, type: m.type }))
  const earth = earthMessages.value.map(m => ({ ...m, type: 'human' }))
  const alien = alienMessages.value.map(m => ({ ...m, type: 'alien' }))
  return [...featured, ...earth, ...alien]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 30)
})

// ---- Send message state ----
const msgNickname = ref('')
const msgContent = ref('')
const msgRole = ref('地月人')
const sending = ref(false)
const postError = ref('')
const postedMessages = ref([])
const canPost = computed(() => msgNickname.value.length >= 2 && msgContent.value.length >= 1 && !sending.value)

function randomAvatar(h) { return `linear-gradient(135deg, hsl(${h},40%,25%), hsl(${h+30},30%,15%))` }
const alienChars = ['◈','◆','◇','⬡','⬢','▣','◎','◉','⏣','✧','⬟','⬠','◈','◆','⬡','⬢','◎','▣','⏣','✧']

async function postMessage() {
  if (!canPost.value) return; sending.value = true; postError.value = ''
  try { await $fetch('/api/messages', { method:'POST', body:{ nickname: msgNickname.value, content: msgContent.value } })
    postedMessages.value.unshift({ id: Date.now(), nickname: msgNickname.value, content: msgContent.value, role: msgRole.value,
      avatarChar: msgRole.value==='外星人' ? alienChars[Math.floor(Math.random()*alienChars.length)] : msgNickname.value.charAt(0),
      avatarBg: randomAvatar(msgRole.value==='外星人'?200:40), avatarBorder: msgRole.value==='外星人'?'rgba(136,204,221,0.35)':'rgba(212,168,83,0.35)',
      date: new Date().toISOString().slice(0,10) }); msgContent.value = ''
  } catch { postError.value = '信号传输失败' } finally { sending.value = false }
}

// ---- Video Showcase State ----
const showVideoModal = ref(false)
const videoTitle = ref('')
const videoDesc = ref('')
const videoFile = ref(null)
const videoUploading = ref(false)
const uploadedVideos = ref([
  { id:'v1', title:'太空长城建设纪实：从第一块月砖到百里巨龙', desc:'历时十年拍摄，记录了太空长城从奠基到全线贯通的每一个关键节点。', date:'2229-10-01', duration:'48:22', views:'1.2万' },
  { id:'v2', title:'澜族文化纪录片：来自半人马座的问候', desc:'澜族使团首次向人类开放母星影像档案，展现了一个与地球截然不同却同样伟大的文明。', date:'2228-05-15', duration:'36:10', views:'8.9千' },
])
function handleVideoFile(e) { videoFile.value = e.target.files?.[0] || null }
function uploadVideo() {
  if (!videoTitle.value || !videoFile.value) return
  videoUploading.value = true
  setTimeout(() => {
    uploadedVideos.value.unshift({
      id: 'v' + Date.now(),
      title: videoTitle.value,
      desc: videoDesc.value,
      date: new Date().toISOString().slice(0, 10),
      duration: '--:--',
      views: '0'
    })
    videoTitle.value = ''; videoDesc.value = ''; videoFile.value = null
    videoUploading.value = false
  }, 800)
}

// ---- Essay Competition State ----
const showEssayModal = ref(false)
const showEssayDetail = ref(false)
const selectedEssay = ref(null)
const selectedTrack = ref('junior')
const essayForm = ref({ name: '', age: '', title: '', file: null })
const essaySubmitting = ref(false)
const essaySubmitted = ref(false)
function openEssayDetail(essay) {
  selectedEssay.value = essay
  showEssayDetail.value = true
}
function handleEssayFile(e) { essayForm.value.file = e.target.files?.[0] || null }
function submitEssay() {
  if (!essayForm.value.name || !essayForm.value.age || !essayForm.value.title) return
  essaySubmitting.value = true
  setTimeout(() => { essaySubmitting.value = false; essaySubmitted.value = true }, 1000)
}
function resetEssay() {
  essayForm.value = { name: '', age: '', title: '', file: null }
  selectedTrack.value = 'junior'
  essaySubmitted.value = false
}
</script>
