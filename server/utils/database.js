import Database from 'better-sqlite3'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import { createRequire } from 'module'

const _require = createRequire(import.meta.url)

const DB_DIR = join(process.cwd(), 'data')
const DB_PATH = join(DB_DIR, 'space-great-wall.db')

let _db = null

export function getDb() {
  if (!_db) {
    if (!existsSync(DB_DIR)) {
      mkdirSync(DB_DIR, { recursive: true })
    }

    _db = new Database(DB_PATH)
    _db.pragma('journal_mode = WAL')
    _db.pragma('foreign_keys = ON')

    // Create tables
    _db.exec(`
      -- 地月纪元的序章 章节
      CREATE TABLE IF NOT EXISTS story_chapters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        series TEXT NOT NULL DEFAULT 'prologue',
        chapter_num INTEGER NOT NULL,
        title TEXT NOT NULL,
        desc TEXT DEFAULT '',
        content TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- 星际文明的联合 章节
      CREATE TABLE IF NOT EXISTS alliance_chapters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chapter_num INTEGER NOT NULL,
        title TEXT NOT NULL,
        desc TEXT DEFAULT '',
        content TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- 时空编年史
      CREATE TABLE IF NOT EXISTS timeline_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year TEXT NOT NULL,
        title TEXT NOT NULL,
        summary TEXT DEFAULT '',
        content TEXT DEFAULT '',
        era TEXT NOT NULL DEFAULT 'history',
        sort_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- 核心科技
      CREATE TABLE IF NOT EXISTS technologies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tech_id TEXT NOT NULL UNIQUE,
        icon TEXT DEFAULT '',
        name TEXT NOT NULL,
        subtitle TEXT DEFAULT '',
        city TEXT DEFAULT '',
        content TEXT NOT NULL,
        metrics TEXT DEFAULT '[]',
        sort_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- 旅游研学路线
      CREATE TABLE IF NOT EXISTS travel_routes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        route_id TEXT NOT NULL UNIQUE,
        icon TEXT DEFAULT '',
        title TEXT NOT NULL,
        duration TEXT DEFAULT '',
        level TEXT DEFAULT '',
        budget TEXT DEFAULT '',
        max_people INTEGER DEFAULT 20,
        desc TEXT DEFAULT '',
        tags TEXT DEFAULT '[]',
        itinerary TEXT DEFAULT '[]',
        sort_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- 叙事画卷
      CREATE TABLE IF NOT EXISTS narratives (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT DEFAULT '',
        num TEXT DEFAULT '',
        title TEXT NOT NULL,
        desc TEXT DEFAULT '',
        slogan TEXT DEFAULT '',
        sort_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- 漫画章节
      CREATE TABLE IF NOT EXISTS comics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        series TEXT NOT NULL,
        series_label TEXT DEFAULT '',
        chapter_num INTEGER NOT NULL,
        title TEXT NOT NULL,
        desc TEXT DEFAULT '',
        image TEXT DEFAULT '',
        sort_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- 城市信息
      CREATE TABLE IF NOT EXISTS cities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        subtitle TEXT DEFAULT '',
        image TEXT DEFAULT '',
        desc TEXT DEFAULT '',
        type TEXT DEFAULT 'city',
        sort_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- 作文竞赛数据
      CREATE TABLE IF NOT EXISTS essays (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT DEFAULT '',
        school TEXT DEFAULT '',
        track TEXT DEFAULT '',
        content TEXT NOT NULL,
        image TEXT DEFAULT '',
        likes INTEGER DEFAULT 0,
        sort_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- 留言板消息
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender_name TEXT DEFAULT '',
        sender_type TEXT DEFAULT 'human',
        sender_planet TEXT DEFAULT '地球',
        content TEXT NOT NULL,
        is_read INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      );

      -- 管理员会话
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT NOT NULL UNIQUE,
        created_at TEXT DEFAULT (datetime('now')),
        expires_at TEXT DEFAULT (datetime('now', '+24 hours'))
      );

      -- 图片管理
      CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT NOT NULL,
        original_name TEXT DEFAULT '',
        file_size INTEGER DEFAULT 0,
        mime_type TEXT DEFAULT '',
        url TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      );

      -- 系统设置
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE,
        value TEXT DEFAULT '',
        updated_at TEXT DEFAULT (datetime('now'))
      );

      -- 首页城市卡片
      CREATE TABLE IF NOT EXISTS home_cities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        subtitle TEXT DEFAULT '',
        image TEXT DEFAULT '',
        desc TEXT DEFAULT '',
        sort_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );
    `)

    // Seed default data if empty
    seedDefaultData(_db)
  }
  return _db
}

function seedDefaultData(db) {
  // Check if story chapters exist
  const chapterCount = db.prepare('SELECT COUNT(*) as cnt FROM story_chapters').get().cnt
  if (chapterCount === 0) {
    // Seed from data/chapters.js if available
    try {
      const { chapters } = _require('../../data/chapters.js')
      const insert = db.prepare('INSERT INTO story_chapters (series, chapter_num, title, desc, content) VALUES (?, ?, ?, ?, ?)')
      const tx = db.transaction(() => {
        for (const ch of chapters) {
          insert.run('prologue', ch.id, ch.title, ch.desc || '', (ch.content || []).join('\n\n'))
        }
      })
      tx()
    } catch (e) {
      console.log('[DB] Could not seed story chapters:', e.message)
    }
  }

  // Check alliance chapters
  const allianceCount = db.prepare('SELECT COUNT(*) as cnt FROM alliance_chapters').get().cnt
  if (allianceCount === 0) {
    try {
      const { allianceChapters } = _require('../../data/chapters.js')
      const insert = db.prepare('INSERT INTO alliance_chapters (chapter_num, title, desc, content) VALUES (?, ?, ?, ?)')
      const tx = db.transaction(() => {
        for (const ch of allianceChapters) {
          insert.run(ch.id, ch.title, ch.desc || '', (ch.content || []).join('\n\n'))
        }
      })
      tx()
    } catch (e) {
      console.log('[DB] Could not seed alliance chapters:', e.message)
    }
  }

  // Seed technologies
  const techCount = db.prepare('SELECT COUNT(*) as cnt FROM technologies').get().cnt
  if (techCount === 0) {
    try {
      const { technologies } = _require('../../data/technologies.js')
      const insert = db.prepare('INSERT INTO technologies (tech_id, icon, name, subtitle, city, content, metrics) VALUES (?, ?, ?, ?, ?, ?, ?)')
      const tx = db.transaction(() => {
        technologies.forEach((t, i) => {
          insert.run(t.id, t.icon || '', t.title || t.name, t.subtitle || '', t.city || '', (t.detail || t.content || []).join('\n\n'), JSON.stringify(t.stats || t.metrics || []))
        })
      })
      tx()
    } catch (e) {
      console.log('[DB] Could not seed technologies:', e.message)
    }
  }

  // Seed travel routes
  const routeCount = db.prepare('SELECT COUNT(*) as cnt FROM travel_routes').get().cnt
  if (routeCount === 0) {
    try {
      const { routes } = _require('../../data/travel-routes.js')
      const insert = db.prepare('INSERT INTO travel_routes (route_id, icon, title, duration, level, budget, max_people, desc, tags, itinerary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      const tx = db.transaction(() => {
        routes.forEach((r, i) => {
          insert.run(r.id, r.icon, r.title, r.duration, r.level, r.budget, r.maxPeople, r.desc, JSON.stringify(r.tags), JSON.stringify(r.itinerary))
        })
      })
      tx()
    } catch (e) {
      console.log('[DB] Could not seed travel routes:', e.message)
    }
  }

  // Seed narratives from index.vue
  const narrativeCount = db.prepare('SELECT COUNT(*) as cnt FROM narratives').get().cnt
  if (narrativeCount === 0) {
    const defaultNarratives = [
      { image: '/images/长城内部和研学/ChatGPT Image 2026年8月1日 23_27_30 (1).png', num: '01', title: '地月长城指挥中心', desc: '新石家庄长城指挥中心的大厅中，数十块全息屏幕实时显示着11座月球城市和22个能源区块的运行状态。', slogan: '十一城的数字心脏' },
      { image: '/images/长城内部和研学/ChatGPT Image 2026年8月1日 23_27_30 (2).png', num: '02', title: '太空长城核心设备', desc: '长城能源枢纽的聚变反应堆控制室中，工程师正在监测等离子体约束磁场。', slogan: '月面之上的人造太阳' },
      { image: '/images/长城内部和研学/ChatGPT Image 2026年8月1日 23_27_30 (3).png', num: '03', title: '新河北太空高铁环线', desc: '银色列车在月面穹顶之间飞驰，串联起新唐山市、新石家庄市、新山海关等十一座城市。', slogan: '十一城，一条线，四十亿年风景' },
      { image: '/images/长城内部和研学/ChatGPT Image 2026年8月1日 23_27_30 (4).png', num: '04', title: '太空长城儿童医院健康检测', desc: '月球低重力环境对儿童骨骼发育的影响一直是医学团队关注的重点。', slogan: '守护月球的第一代孩子' },
      { image: '/images/长城内部和研学/ChatGPT Image 2026年8月1日 23_27_30 (5).png', num: '05', title: '外星人信息接收站', desc: '新山海关深空信号接收阵列全天候监听来自比邻星和猎户座方向的电磁信号。', slogan: '聆听宇宙的每一次心跳' },
      { image: '/images/长城内部和研学/ChatGPT Image 2026年8月4日 22_07_01.png', num: '06', title: '新唐山太空长城修护', desc: '新唐山市段的维护工程队正在更换一块被微流星击穿的墙体面板。', slogan: '每一道焊痕，都是誓言' },
      { image: '/images/长城内部和研学/ChatGPT Image 2026年8月4日 22_07_09.png', num: '07', title: '新山海关集市', desc: '新山海关的穹顶集市汇集了来自十一个城市的特产。', slogan: '月球上最热闹的一条街' },
      { image: '/images/长城内部和研学/ChatGPT Image 2026年8月4日 22_07_13.png', num: '08', title: '月球新秦皇岛月冰采集场', desc: '新秦皇岛南极月冰采集场是月球水资源的核心来源。', slogan: '四十亿年的冰，今天的生命之源' },
      { image: '/images/长城内部和研学/ChatGPT Image 2026年8月4日 22_07_16.png', num: '09', title: '太空长城建造实况', desc: '工程无人机群正在月面展开大规模建造作业。', slogan: '以月为砖，以志为墙' },
      { image: '/images/长城内部和研学/ChatGPT Image 2026年8月4日 22_07_19.png', num: '10', title: '太空长城古风街区', desc: '长城内部的生活区保留了一条仿明代砖木结构的古风街道。', slogan: '汉唐飞檐，月面之上' },
    ]
    const insert = db.prepare('INSERT INTO narratives (image, num, title, desc, slogan, sort_order) VALUES (?, ?, ?, ?, ?, ?)')
    const tx = db.transaction(() => {
      defaultNarratives.forEach((n, i) => {
        insert.run(n.image, n.num, n.title, n.desc, n.slogan, i)
      })
    })
    tx()
  }
}
