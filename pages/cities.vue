<template>
  <div class="page-container">
    <!-- Hero -->
    <section class="relative pt-32 pb-14 text-center border-b border-hologram-cyan/[0.04]">
      <div class="max-w-4xl mx-auto px-6">
        <div class="tag mx-auto mb-5"><span class="tag-dot"></span>图文故事</div>
        <h1 class="text-3xl lg:text-5xl font-display font-bold text-hologram-ice mb-4">
          新河北 <span class="text-glow-gold glow-text">· 城市史诗</span>
        </h1>
        <p class="text-sm lg:text-base text-hologram-ice/35 max-w-xl mx-auto">
          九座月球城市 · 从规划蓝图到万家灯火 · 一段跨越数百年的文明史诗
        </p>
      </div>
    </section>

    <!-- Content type toggle + City filter -->
    <section class="sticky top-0 z-30 bg-deep-space-950/85 backdrop-blur-xl border-b border-hologram-cyan/[0.04]">
      <div class="max-w-7xl mx-auto px-6 py-3">
        <!-- Type toggle -->
        <div class="flex items-center justify-center gap-1 mb-3">
          <button
            v-for="type in contentTypes"
            :key="type.key"
            class="px-5 py-2 rounded-full text-xs transition-all duration-300"
            :class="activeType === type.key
              ? 'bg-stellar-gold/10 text-stellar-warm border border-stellar-gold/25'
              : 'text-hologram-ice/40 hover:text-hologram-ice/70 hover:bg-white/[0.03] border border-transparent'"
            @click="activeType = type.key; activeTab = 'all'"
          >
            {{ type.label }}
          </button>
        </div>
        <!-- City tabs (wallpaper mode) -->
        <div v-if="activeType === 'wallpaper'" class="flex gap-1.5 overflow-x-auto scrollbar-none flex-nowrap justify-center">
          <button
            v-for="tab in wallpaperTabs"
            :key="tab.key"
            class="flex-shrink-0 px-4 py-2 rounded-full text-xs transition-all duration-300"
            :class="activeTab === tab.key
              ? 'bg-stellar-gold/10 text-stellar-warm border border-stellar-gold/25'
              : 'text-hologram-ice/40 hover:text-hologram-ice/70 hover:bg-white/[0.03] border border-transparent'"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- ===== CITY PROFILE (wallpaper mode) ===== -->
    <section v-if="activeType === 'wallpaper' && activeTab !== 'all'" class="py-14 lg:py-18 border-b border-hologram-cyan/[0.04]">
      <div class="max-w-5xl mx-auto px-6 lg:px-8">
        <CityProfile :city="cityMeta[activeTab]" />
      </div>
    </section>

    <!-- ===== WALLPAPER GRID ===== -->
    <section v-if="activeType === 'wallpaper'" class="py-14 lg:py-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div v-if="filteredWallpapers.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <FloatCard
            v-for="(item, i) in filteredWallpapers"
            :key="item.src"
            :item="item"
            :delay="i * 0.15"
            @click="openWallpaperLightbox(i)"
          />
        </div>
        <div v-else class="text-center py-20 text-hologram-ice/25 text-sm">暂无作品</div>
      </div>
    </section>

    <!-- ===== EARTH MEMORY WALLPAPER ===== -->
    <section v-if="activeType === 'comic'" class="py-14 lg:py-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div v-if="filteredComics.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <FloatCard
            v-for="(item, i) in filteredComics"
            :key="item.src"
            :item="item"
            :delay="i * 0.15"
            @click="openWallpaperLightbox(i)"
          />
        </div>
        <div v-else class="text-center py-20 text-hologram-ice/25 text-sm">暂无作品</div>
      </div>
    </section>

    <!-- Lightbox -->
    <ImageLightbox
      :item="lightboxItem"
      :has-prev="lightboxIndex > 0"
      :has-next="lightboxIndex < lightboxTotal - 1"
      @close="closeLightbox"
      @prev="lightboxIndex--"
      @next="lightboxIndex++"
    />

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeType = ref('wallpaper')
const activeTab = ref('all')
const lightboxIndex = ref(-1)

// ---- Content type tabs ----
const contentTypes = [
  { key: 'wallpaper', label: '太空新城壁纸' },
  { key: 'comic', label: '地月记忆壁纸' },
]

const wallpaperTabs = [
  { key: 'all', label: '全部城市' },
  { key: 'shijiazhuang', label: '新石家庄' },
  { key: 'tangshan', label: '新唐山' },
  { key: 'cangzhou', label: '新沧州' },
  { key: 'shanhaiguan', label: '新山海关' },
  { key: 'qinhuangdao', label: '新秦皇岛' },
  { key: 'chengde', label: '新承德' },
  { key: 'zhangjiakou', label: '新张家口' },
  { key: 'baoding', label: '新保定' },
  { key: 'handan', label: '新邯郸' },
]

// ---- City profiles (600+ chars each) ----
const cityMeta = {
  shijiazhuang: {
    name: '新石家庄',
    subtitle: '新河北首府 · 省级政治文化中心',
    position: '首府新城 · 新河北中枢',
    profile: `新石家庄是月球新河北的行政首府和综合指挥中心，由中国国家航天局与河北省政府联合规划建设，首任市长为前中国探月工程总指挥李尚福。

作为月球新河北的"大脑"，这座城市承载着整个月球基地的行政决策、战略规划和星际外交协调职能。新石家庄的核心建筑——"月宫行政中心"——是一座融合了中国传统宫殿飞檐造型和现代航天材料的地标性建筑，其穹顶高达百米，内部设有全月基地的管理中枢和地月通讯主站。

新石家庄的建城历程充满了开创性。2102年，当第一批行政官员从地球抵达月球时，他们面临的首要挑战是如何在38万公里之外维持高效的地月治理。为此，新石家庄率先建成了"地月量子通讯网"——利用量子纠缠技术实现地月之间近乎实时的信息传输，将通讯延迟从1.3秒压缩到了可忽略的水平。这项技术后来成为全月基地通讯的基础设施标准。

城市的另一个重要身份是新河北"宪法广场"所在地。广场中央矗立着"星河宪法碑"——一块来自地球泰山的花岗岩，上面镌刻着月球新河北的基本治理章程。每年3月15日，全月各城市的代表聚集在此，举行"月面代表大会"。会议中，来自八个城市和多个国际合作伙伴的代表共同商讨月球基地的发展大计。

新石家庄还建有月球最大的档案馆——"星河文档中心"，保存着从第一批建设者登月至今的全部规划图纸、施工日志和会议记录。档案馆的馆长是一位退休的老航天员，他常说："人类的月球史还不足百年，但这里的每一页纸都值得被记住。因为我在地球上读过长城的历史——那些没有记录下来的故事，永远地消失了。在月球上，我们不会让同样的事情发生。"

新石家庄的城市精神是"居中而治"——如北斗之于星空，它是整个月球新河北的定位与方向。`,
  },
  shanhaiguan: {
    name: '新山海关',
    subtitle: '月面防御 · 安全屏障 · 长城的起点',
    position: '雄关新城 · 月球门户',
    profile: `新山海关是月球新河北的防御前哨与安全屏障，由中国国防科技大学与国家航天防御局联合规划建设，首任指挥官为前战略支援部队副司令员赵克志将军。

在地球上，山海关被称为"天下第一关"——它是明长城东端的起点，见证了数百年的烽火与守望。在月球上，新山海关延续了这份守护的使命——它坐落在月球新河北的最前沿，是抵御太阳风暴、小行星碎片和宇宙辐射的第一道防线。

新山海关最核心的设施是"星河护盾系统"——一套由巨型电磁场发生器和纳米粒子散布器组成的主动防御体系。当太阳风暴来袭时，护盾系统能在三分钟内展开一道覆盖全月基地的粒子屏障，将高能辐射粒子偏转至安全方向。自2108年投入使用以来，星河护盾已成功抵御了十七次大型太阳风暴，保护了数十万月球居民的生命安全。

除了防御功能，新山海关还是太空交通管制中心所在地。所有进入月球空域的飞船——无论是地月航线的客运飞船、货运船，还是来自外星文明的使节舰——都需要在新山海关领航员的引导下完成降落。领航员们的口号是："地球的山海关是陆地的第一关，月球的山海关是星空的第一关。"

新山海关的城市风貌也独具特色。城市建筑大量采用月面玄武岩——一种由月球火山活动形成的深灰色岩石，质地坚硬、耐辐射、隔热性能极佳。新山海关因此成为全月最"冷峻"的城市——灰黑色的建筑群在银色月面上形成强烈的视觉对比，被称为"月面水墨画"。

值得一提的是新山海关的"烽火传承仪式"。每年农历正月十五，守城的值勤官兵会在城市最高处的瞭望塔上点燃一盏特制的等离子灯——这是对地球长城烽火台的致敬。等离子灯的光芒在月球漆黑的夜空中格外醒目，方圆数百公里都能看到。一位老兵说："几百年前，山海关的烽火告诉人们——敌人来了，准备战斗。今天，新山海关的等离子灯告诉人们——一切安全，安心生活。"

新山海关的城市精神是"万无一失"——在太空中，任何疏忽都可能造成无法挽回的后果。这座城市的每一位守护者都记得一句古老的城训：天下安危，系于一关。`,
  },
  tangshan: {
    name: '新唐山市',
    subtitle: '月球工业制造与能源中心',
    position: '工业新城 · 能源基地',
    profile: `新唐山市是月球新河北的首座工业城市，也是整个月球基地的"心脏地带"。由中国航天科工集团、河北钢铁集团与中国核工业集团联合规划建设，首任城市总工为中国工程院院士、材料科学权威张振华教授。

城市的核心使命是：在月球上实现重工业的自主化。新唐山的建设者们面临的首要难题是——月球上没有钢铁厂、没有水泥窑、没有任何基础工业设施，一切都要从零开始。第一批建设团队在月面搭建了临时实验舱，采用月壤烧结和3D打印技术逐步建立起小型冶炼炉。经过三年攻坚，第一炉"月钢"顺利出炉——这是人类历史上首次在地球之外冶炼金属。

如今的新唐山市拥有三座聚变电站组成的环网、两座大型月壤高炉、五条3D打印建筑生产线和一座月面最大的机械装配基地。城市分为上中下三层结构：上层为生活区，涵盖住宅、学校、医院和市集；中层为生产区，分布着各类工厂和实验室；下层为能源与维护层，承载着生命维持系统的核心设备。

特别值得铭记的是"新唐山百日会战"。2095年，为赶在太阳风暴季之前完成防护穹顶的密封工程，全市三千名建设者连续奋战一百天，最终在极限时间内完成了东区穹顶的闭合。总工张振华在竣工仪式上落泪——他的父亲是1976年唐山大地震的生还者，他说："父亲重建了地上的唐山，我在月球上重建了一座新的。"

新唐山市的城市精神是"钢与火之歌"——以钢铁般的意志，在极限环境中点亮万家灯火。如今，新唐山向全月基地供应80%以上的建筑材料和工业品，是名副其实的月球"工业母城"。`,
  },
  cangzhou: {
    name: '新沧州市',
    subtitle: '月面水利 · 生态绿洲 · 生命之源',
    position: '水乡新城 · 月球绿洲',
    profile: `新沧州市是月球新河北的生命水脉枢纽，由中国水利水电科学研究院与国家航天生命保障局联合规划建设，首任水务总监为原南水北调工程副总指挥王浩院士的团队成员刘明远。

地球上的沧州以"狮城"闻名，是大运河畔的千年水城。月球上的新沧州延续了这份与水共生的基因——它的核心使命是在月球上实现水资源的循环自给。在月球上，水比钢铁更珍贵：每一滴水都必须回收、净化、再利用，没有任何浪费的余地。

新沧州市最引以为傲的工程是"月面水脉系统"——一套覆盖全月球基地的封闭式水循环网络，包含四条主干管道和六十二个分布式净化节点。系统从居民生活用水开始，经过生物膜过滤、反渗透和紫外消毒三重净化后，回灌至农业灌溉管道和工业冷却系统。整个循环的损耗率不到0.3%——这意味着每1000升水，只有3升需要从地球补给。

城市的标志性建筑是"水晶穹顶水族馆"——一座高三十米的透明穹顶之下，是一片波光粼粼的活水湖区，湖中养殖着从地球带来的锦鲤和淡水植物。这里不仅仅是一个生命维持设施，更是全月居民最爱的休闲场所。一位新唐山来的炼钢工人第一次走进水族馆时感慨道："我在月球待了五年，直到今天才重新听到水的声音——那是地球上最普通的声响，在月球上却是奢侈品。"

新沧州还承担着"月面天眼"水文监测任务。城市建有一座高灵敏度的地震与水文联合观测站，实时监测月球表面及地下冰层的动态变化。这些数据不仅服务于新河北基地的水资源规划，也为全人类的月球科学研究提供了宝贵的基础数据。

新沧州市的城市精神是"滴水成海"——每一滴循环利用的水，都是人类在太空中长久生存的基石。正如大运河连接了南北中国，月面水脉系统连接着月球上的每一座城市、每一个人。`,
  },
  qinhuangdao: {
    name: '新秦皇岛',
    subtitle: '地月港口 · 物流枢纽 · 数字文明备份中心',
    position: '港口新城 · 数字文明枢纽',
    profile: `新秦皇岛是月球最大的交通枢纽与数字文明备份中心，由中国国家航天局、交通运输部与国家文物局三方联合主导规划，首任城市执行官为前中国载人航天工程副总设计师陈远明。

选址于月面"静海"盆地边缘的平坦区域，这里是月球地质最稳定的地带，天然适合建设大型航天港。新秦皇岛港是地月航线的主港——所有往返地球的客运飞船和货运飞船均在此起降。港口包含四个大型泊位，年吞吐能力达五十万吨，是月球最大的物资集散地。"建设新河北号"旗舰飞船的母港也设在此地，这艘飞船是将建设者从地球不断运往月球的主力。

然而新秦皇岛最独特的身份并非港口——而是数字记忆殿堂。在国家文物局"数字长城"专项的推动下，新秦皇岛建成了全月最大的文明数据备份中心。激光点云扫描技术对地球长城、嘉峪关、八达岭等长城精华段落进行了毫米级三维数字化，所有数据通过地月中继卫星实时同步至月球备份。老一辈文物专家说："即使地球上长城在岁月中消逝，月球上也保存着它永恒的数字影像，这是科技对文明最崇高的致敬。"

数字记忆殿堂由著名数字艺术家徐冰担任总策展人，包含全息文献馆、沉浸式长城漫游体验厅和AI长城文化索引系统。参观者可以穿越虚拟时空，在月球上漫步地球长城。年接待研学团体超过三万人次，已成为月球最具文化影响力的地标之一。

新秦皇岛的城市精神是"港湾与火种"——既是千万建设者抵达月球的第一站，也是人类文明永不熄灭的数字火种。`,
  },
  chengde: {
    name: '新承德',
    subtitle: '国际教育与文化传承基地',
    position: '教育新城 · 文化圣地',
    profile: `新承德是月球最大的教育文化中心，由教育部与联合国教科文组织联合规划，首任校长为著名教育家、原清华大学附属中学校长王殿军教授。这座城市承载着一个特别的使命：让长城精神在太空中传承给下一代。

月球第一所K12国际学校——太空长城国际学校——就坐落在新承德的核心区。学校招收来自地球50多个国家和多个外星文明的学生，课程涵盖中文、长城文化、月球科学和跨文明交流四大板块。每周三下午的"地球连线"是最受欢迎的课——全息通讯接通地球长城，孩子们能实时看到蜿蜒的长城、听到燕山的风声。一位来自巴西的小学生曾在作文中写道："我以为长城是一堵墙，但我现在知道，她是一座桥。"

新承德还建有月球最大的研学营地，可同时容纳500名学生。研学课程包括月壤实验、低重力体育、长城模型搭建和太空植物观察等。自建城以来，已有超过十万名地球学生在这里度过了他们的"月球学期"。营地的口号是："每个孩子都应在月球上数一次星星。"

值得一提的是新承德的"中外共育计划"。在中文课堂上，中外小朋友一起学习写汉字。"城"字——由"土"和"成"组成——成为第一课。老师解释说：用土筑成的墙，就是城。一个小外星人举手问："那太空长城是用什么土筑成的？"老师回答："用所有文明共同的愿望。"

新承德的城市精神是"薪火相传"——它不是工业中心，不是交通枢纽，却是月球基地最重要的一环：它确保长城的故事，将永远有人讲述。`,
  },
  zhangjiakou: {
    name: '新张家口',
    subtitle: '月面体育竞技与极限探索中心',
    position: '体育新城 · 探险之都',
    profile: `新张家口是月球极限运动与深空探索的策源地，由国家体育总局与中国科学院联合规划，首任执行官为前中国航天员大队大队长、四次执行太空任务的聂海胜将军。

地球上的张家口因冬奥会而闻名，月球上的新张家口则将这份运动基因带入了低重力环境。城市的标志性建筑——环形山竞技场——建在一座直径两公里的陨石坑内，利用天然地形改造成为综合运动场，可容纳八千名观众。月球的1/6重力使得运动员可以跳至六米高，人类的运动极限在这里被彻底重新定义。

先后举办了首届月球马拉松（全程42.195公里，冠军用时仅1小时47分，创造人类最低重力长跑纪录）、环形山攀岩大赛和月面跳伞锦标赛。国际奥委会已正式将"月球冬季运动项目群"列入23世纪奥运会候选项目。

新张家口同时也是深空探索的基地。中科院的"深空一号"实验室设在此地，专注于研发下一代星际航行技术和深空探测装备。城市建立了月球探险者协会，凡完成月面环形山穿越或极地探险的探险者，均可获得"月面先锋"勋章。

特别值得记录的是2118年"月面救援行动"。一名探险家在月球南极陷入冰隙，新张家口救援队在零下180度的极寒条件下紧急出动，历时17小时成功将被困者营救。这次行动催生了月面应急救援体系的建立，新张家口因此被授予"月球勇士之城"称号。

新张家口的城市精神是"永不止步"——在1/6重力下，人类的勇气仍是满格。`,
  },
  baoding: {
    name: '新保定',
    subtitle: '星际外交与跨文明交流中心',
    position: '外交新城 · 星际会客厅',
    profile: `新保定是人类与外星文明交流的桥头堡，由中华人民共和国外交部与中国科学院外星文明研究所共同规划建设，首任星际大使为著名外交家、前联合国副秘书长吴红波。

这是一座因"相遇"而诞生的城市。2152年，人类与首个外星友好文明——来自半人马座α星系的"澜族"——建立了正式外交关系。新保定因此被选定为星际使馆区的所在地，目前已容纳来自七个文明的使馆和三个星际贸易代表处。联合国星际事务协调办公室（UNISCO）的月球分部也设在此地。

新保定最具代表性的建筑是"星桥会堂"——一座由人类建筑师和阿澜族工程师共同设计的建筑，融合了地球的斗拱结构和外星的能量场技术。会堂的大厅中悬挂着所有建交文明的旗帜，正中央是一面特殊的长城旗——这是星际文明共同体的象征。

每月举办一次的"星际集市"是新保定最盛大的文化活动。来自不同星球的特产、音乐、艺术品在这里展销。人类的手工陶瓷与外星的能量晶体同台展示，地球的茶叶与外星的信息素香料交融成新的味道。一位人类摊主说："在这里做生意，你学到的不是经济学，而是宇宙学。"

星际交流并非没有挑战。不同文明的沟通方式、时间观念、甚至对"和平"的定义都截然不同。新保定的跨文明研究院专门负责研究这些差异，培养了一批批"星际译员"。有趣的是，中文因其表意文字的特性，被多个外星文明认为是最适合星际通用语之一的语言——因为"一个汉字，就是一个故事"。

新保定的城市精神是"和而不同"——正如长城砖各不相同，但筑在一起就是世上最坚固的城墙。`,
  },
  handan: {
    name: '新邯郸',
    subtitle: '月壤农业与食品工程基地',
    position: '农业新城 · 生命之源',
    profile: `新邯郸是月球粮食安全的核心堡垒，由农业农村部与中国农业科学院联合规划，首任农业总监为中国工程院院士、"杂交小麦之父"李振声教授的学生团队成员陈明远。

"如果月球基地不能自己生产食物，那它永远只是一个科学考察站，而不是一座城市。"这是新邯郸建城时的最高原则。城市选址于月海区域——这里的月壤富含铁、钛和多种矿物元素，经过特定配方改良后，能够支持部分地球作物的生长。

新邯郸最令人瞩目的成就是"月面第一穗麦"。2115年，经过六年改良实验，农业团队成功在月壤中培育出了第一株杂交小麦。当金黄的麦穗在月球的模拟阳光下摇曳时，所有见证者都热泪盈眶——这意味着人类在月球上的永久定居有了食物保障。如今，新邯郸的月壤农场年产小麦、水稻和各类蔬菜超过两千吨，可满足全月基地60%的粮食需求。

除了主粮生产，新邯郸还建立了闭环生态农业系统——"地月农场"。这套系统将作物种植、水产养殖和微生物分解整合在一个完全封闭的循环中。鱼类的排泄物滋养植物，植物的残体回馈微生物，没有任何物质被浪费。这套系统的设计灵感来自中国古老的生态农业传统——桑基鱼塘，只不过这一次，池塘和鱼塘都在月球的穹顶之下。

新邯郸还承担着"太空菜篮子"工程：为全月居民提供新鲜蔬菜、水果和肉类。城市的中央市集每周营业七天，被称为"月球最有烟火气的地方"。一位新唐山来的工人说："在新邯郸，你可以买到新鲜的番茄——在月球上咬一口新鲜番茄，那种滋味，胜过地球上的一切。"

新邯郸的城市精神是"耕耘星辰"——以最朴素的方式，完成最伟大的事业：让人类在另一个星球上，也能吃到家乡的味道。`,
  },
}

// ---- Comic profiles ----
const comicMeta = {
  xuqing: {
    name: '许青的星际穿越',
    subtitle: '明代守军 · 时空奇点 · 古今同守',
    position: '跨越数百年的长城守望',
    profile: `"许青的星际穿越"是一部将中国历史与太空科幻深度融合的漫画作品，以明代河北长城守军许青为主角，讲述了一段跨越数百年的长城奇迹。

公元1568年，河北长城守军许青在一次例行晨巡中踏入一座奇异的发光拱门——一个时空奇点。当他走出来时，眼前不再是燕山连绵的苍翠，而是一片银色的陌生大地。他被穿着奇怪服装的人围住，接受了一场"跨越数百年的盘问"。直到一面五星红旗在他面前展开——那红色如此眼熟，像他战袍上的系带。

建设者告诉许青：这里叫"新河北"，是他守护的河北长城的后代们在月球上建的新家。四百年过去了，长城的建设者从未停下脚步——只不过这一次，城墙延伸到了月球。许青在新河北度过了七天。他走进"一座会生活的敌楼"——外形像他熟悉的敌楼，但里面住着人，有市集和学校；他交到了"新朋友"——来自外星的孩子阿澜；他看见"古今同守"——穿着明代甲胄的自己，和穿着太空服的新建设者并肩站在银色城墙上，守望家园的眼神一模一样。

第七日，时空之门再次出现。许青该回去了。他带走的不是困惑，而是一个信念：长城从未变过，它只是长大了。回到河北长城后，许青在山上种下了一棵松树——他说，等这棵树长高，他从树顶就能看到月球上的长城。那是他的第二个故乡。`,
  },
  alan: {
    name: '阿澜的月球日记',
    subtitle: '外星来客 · 共建家园 · 漫画全10话',
    position: '跨文明建设的温情童话',
    profile: `"阿澜的月球日记"是以外星小朋友"阿澜"为主角的漫画系列，讲述了来自半人马座α星系的他与中外建设者一起，在月球新河北共同建设太空长城的故事。

阿澜是澜族派往月球的友好使者——尽管他的年龄换算成地球时间只有八岁。当飞船在新保定降落时，他睁大着眼睛看着银色的城墙问："这就是长城吗？和我在家乡星图上看到的一模一样。"

阿澜带着来自澜族的知识和技术融入月球建设。他用家乡的探测器"读懂月壤"——发现月球的土壤和长城砖土有相似的矿物结构，这发现为后来的月壤改良实验提供了关键线索。他还发现太空长城"会连接"——每座敌楼都是网络节点，把月球的六座城市和地球的万里长城连在一起。

当细小的月尘成为建造者的头疼难题时，阿澜提出了澜族的过滤方案——"共同方案"让月尘防护场得以建成。他参加了建设者夜校学中文——第一个学会的汉字是"和"，他说这个字在他家乡的语言里也有几乎相同的发音和含义。

阿澜最喜欢的是新保定的星际集市——每个月的开放日，不同星球的特产和食物挤满街道。他第一次尝到饺子时，激动地向全星系播报："我发现宇宙间最美味的食物！"他也喜欢共同用餐的长桌——地球菜和阿澜家乡的食物摆在一起，大家分享彼此的故事。

漫画的最终话叫"共同的家"。夕阳下的太空长城（虽然是模拟的），阿澜站在城墙上眺望远方。他已经分不清哪个是地球、哪个是家乡了——因为这里，便是共同的家。"地球长城的建设者从不拒绝远方的来客，"阿澜在日记里写道，"他们只会说：来吧，一起筑城。"`,
  },
}

// ---- Wallpaper data (no comics) ----
const wallpaperItems = [
  // 新石家庄
  { src: '/images/space-great-wall/1.png', city: '新石家庄', cityKey: 'shijiazhuang', title: '各国工作者共建太空长城', desc: '来自世界各国的建设者汇聚月球，用汗水与智慧在银色的月面上筑起人类文明的新坐标。' },
  { src: '/images/space-great-wall/6.png', city: '新石家庄', cityKey: 'shijiazhuang', title: '太空农场长城枢纽', desc: '长城脚下，太空农场延伸至天际——科技与传统农耕在月面达成和解，每一粒种子都是生命的远征。' },

  // 新唐山市
  { src: '/images/space-great-wall/5.png', city: '新唐山市', cityKey: 'tangshan', title: '星际列车运输物资', desc: '银色列车穿行于月面穹顶之间，将钢铁、粮食与希望运往每一座月球城市。' },

  // 新沧州
  { src: '/images/space-great-wall/2.png', city: '新沧州市', cityKey: 'cangzhou', title: '地月部队在太空长城巡逻', desc: '月面巡逻部队沿着银色城墙行进——从山海关到嘉峪关，守护从未止步。' },

  // 新山海关
  { src: '/images/space-great-wall/3.png', city: '新山海关', cityKey: 'shanhaiguan', title: '外星居民安检入境', desc: '新山海关入境大厅，来自不同星球的居民接受安全检查——这里是月球的第一道国门。' },

  // 新秦皇岛
  { src: '/images/space-great-wall/10.png', city: '新秦皇岛', cityKey: 'qinhuangdao', title: '铭记新旧长城史，不忘地月来时路', desc: '数字记忆殿堂中，古老长城与太空长城影像交叠——记住来时的路，才能走得更远。' },

  // 新承德
  { src: '/images/space-great-wall/4.png', city: '新承德', cityKey: 'chengde', title: '研学活动了解地球长城', desc: '孩子们在全息影像中触摸地球长城的砖石——对月球上的新生代而言，地球长城是课本里最动人的故事。' },

  // 新张家口
  { src: '/images/space-great-wall/9.png', city: '新张家口', cityKey: 'zhangjiakou', title: '太空长城中国年', desc: '大红灯笼挂上银色城墙，饺子与烟花在低重力下升腾——月球上最盛大的节日。' },

  // 新保定
  { src: '/images/space-great-wall/7.png', city: '新保定', cityKey: 'baoding', title: '太空长城脚下的光伏实验', desc: '长城基座变身光伏阵列——千年城墙与最新能源科技在此交汇，古老与未来并肩而行。' },

  // 新邯郸
  { src: '/images/space-great-wall/8.png', city: '新邯郸', cityKey: 'handan', title: '修筑高科技钢铁长城', desc: '自动化机械臂与建设者协同作业——高科技钢铁正一层层地筑起太空长城的新段落。' },
]

// ---- Comic data ----
const xuqingComics = []

const alanComics = []

// ---- Earth Memory data ----
const earthMemoryItems = [
  { src: '/images/earth-memory/1.png', city: '地月记忆', cityKey: 'earth', title: '数字记忆殿堂入口', desc: '坐落在新秦皇岛核心区，是人类文明的地外备份，守护着地球长城的全部数字灵魂。' },
  { src: '/images/earth-memory/2.png', city: '地月记忆', cityKey: 'earth', title: '长城数据归档', desc: '量子存储器中，从地球长城到嘉峪关的每个细节都被精确永存，永不磨灭。' },
  { src: '/images/earth-memory/3.png', city: '地月记忆', cityKey: 'earth', title: '虚拟还原地球长城', desc: '全息投影还原地球长城全貌，在月球上漫步地球的长城，触摸历史的光影。' },
  { src: '/images/earth-memory/4.png', city: '地月记忆', cityKey: 'earth', title: '全息文献馆', desc: '收藏自汉代以来所有长城相关文献、碑刻与舆图，千年文脉在月球流淌。' },
  { src: '/images/earth-memory/5.png', city: '地月记忆', cityKey: 'earth', title: 'AI长城文化索引', desc: 'AI对长城文化全面索引——诗词、传说、建筑技法，瞬间检索千年文明。' },
  { src: '/images/earth-memory/6.png', city: '地月记忆', cityKey: 'earth', title: '点云扫描地球长城', desc: '毫米级激光扫描，每块砖的磨损痕迹都被忠实记录为数字档案。' },
  { src: '/images/earth-memory/7.png', city: '地月记忆', cityKey: 'earth', title: '数字工匠修复', desc: '利用数字化长城数据，在月球上精确复原多段长城，跨越时空的匠心。' },
  { src: '/images/earth-memory/8.png', city: '地月记忆', cityKey: 'earth', title: '沉浸式长城漫游', desc: '戴上全息设备，在月球或地球上都能漫步长城、感受燕山的风。' },
  { src: '/images/earth-memory/9.png', city: '地月记忆', cityKey: 'earth', title: '月球数据备份中心', desc: '即使地球遭遇灾难，长城的全部数据也将在月球永久保存。' },
  { src: '/images/earth-memory/10.png', city: '地月记忆', cityKey: 'earth', title: '地月双备份', desc: '地球长城与月球新秦皇岛实时同步、互为备份——文明永续。' },
]

// ---- Computed ----
const filteredWallpapers = computed(() => {
  if (activeTab.value === 'all') return wallpaperItems
  return wallpaperItems.filter(i => i.cityKey === activeTab.value)
})

const filteredComics = computed(() => {
  return earthMemoryItems
})

const lightboxTotal = computed(() => {
  return activeType.value === 'wallpaper' ? filteredWallpapers.value.length : filteredComics.value.length
})

const lightboxItem = computed(() => {
  if (lightboxIndex.value < 0) return null
  if (activeType.value === 'wallpaper') return filteredWallpapers.value[lightboxIndex.value] || null
  return filteredComics.value[lightboxIndex.value] || null
})

function openWallpaperLightbox(i) {
  console.log('[cities] 壁纸灯箱打开, index:', i)
  lightboxIndex.value = i
}
function closeLightbox() {
  console.log('[cities] 灯箱关闭')
  lightboxIndex.value = -1
}
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>
