const fs = require('fs')
const path = require('path')

// 手动读取 .env 文件
function loadEnv() {
  const envPath = path.join(__dirname, '../.env')
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8')
    const lines = content.split('\n')
    lines.forEach((line) => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=')
        const value = valueParts.join('=')
        process.env[key.trim()] = value.trim()
      }
    })
  }
}

loadEnv()

const NOTION_TOKEN = process.env.NOTION_TOKEN
const DATABASE_ID = process.env.NOTION_DATABASE_ID

// 提取文本内容
function getRichText(property) {
  if (!property) return ''
  if (property.type === 'title') {
    return property.title.map((t) => t.plain_text).join('')
  }
  if (property.type === 'rich_text') {
    return property.rich_text.map((t) => t.plain_text).join('')
  }
  if (property.type === 'select') {
    return property.select?.name || ''
  }
  if (property.type === 'url') {
    return property.url || ''
  }
  if (property.type === 'files') {
    if (property.files && property.files.length > 0) {
      const file = property.files[0]
      return file.file?.url || file.external?.url || ''
    }
    return ''
  }
  if (property.type === 'multi_select') {
    return property.multi_select?.map((s) => s.name) || []
  }
  if (property.type === 'relation') {
    return property.relation?.map((r) => r.id) || []
  }
  return ''
}

// 同步所有分类数据
async function syncTaxonomy() {
  console.log('🚀 开始从 Notion 同步分类数据...')
  console.log('')

  if (!NOTION_TOKEN) {
    console.error('❌ 错误：未找到 NOTION_TOKEN')
    process.exit(1)
  }

  if (!DATABASE_ID) {
    console.error('❌ 错误：未找到 NOTION_DATABASE_ID')
    process.exit(1)
  }

  try {
    console.log('📡 连接 Notion 数据库...')
    
    // 查询所有数据
    const response = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`${response.status} ${response.statusText}: ${errorData.message || ''}`)
    }

    const data = await response.json()
    const results = data.results || []

    console.log(`✅ 连接成功！找到 ${results.length} 条数据`)
    console.log('')

    // 转换数据格式
    const allItems = results.map((page) => {
      const props = page.properties
      
      // 优先用路径标识，没有的话用 page.id
      const pathId = getRichText(props['路径标识'])
      const id = pathId || page.id

      return {
        id: id,
        pageId: page.id,
        name: getRichText(props['名称']),
        scientificName: getRichText(props['拉丁学名']),
        rank: getRichText(props['分类阶元']) || '种',
        category: 'animal',
        imageUrl: getRichText(props['配图']),
        description: getRichText(props['描述备注']),
        morphology: getRichText(props['形态特征']),
        habits: getRichText(props['生态习性']),
        tags: getRichText(props['标签']),
        model3d: getRichText(props['3D模型路径']),
        status: getRichText(props['审核状态']),
        parentIds: getRichText(props['上级分类']),
      }
    })

    // 统计各层级数量
    const rankCount = {}
    allItems.forEach((item) => {
      rankCount[item.rank] = (rankCount[item.rank] || 0) + 1
    })

    console.log('📊 分类层级统计：')
    Object.entries(rankCount).forEach(([rank, count]) => {
      console.log(`  ${rank}: ${count} 个`)
    })
    console.log('')

    // 保存完整数据
    const outputPath = path.join(__dirname, '../src/data/notion-taxonomy.json')
    fs.writeFileSync(outputPath, JSON.stringify(allItems, null, 2), 'utf-8')

    // 同时保存物种列表（种级别），兼容现有代码
    const species = allItems.filter((item) => item.rank === '种')
    const speciesPath = path.join(__dirname, '../src/data/notion-species.json')
    fs.writeFileSync(speciesPath, JSON.stringify(species, null, 2), 'utf-8')

    console.log('✅ 同步完成！')
    console.log(`📁 完整分类数据: src/data/notion-taxonomy.json`)
    console.log(`📁 物种列表: src/data/notion-species.json (${species.length} 个种)`)
    console.log('')

    // 打印完整分类树
    console.log('🌳 分类树预览：')
    printTree(allItems)

    console.log('')
    console.log('🎉 同步成功！网站会自动热更新')
  } catch (error) {
    console.error('❌ 同步失败:', error.message)
    process.exit(1)
  }
}

// 打印分类树
function printTree(items) {
  // 建立 ID 映射
  const itemMap = {}
  items.forEach((item) => {
    itemMap[item.pageId] = item
    item.children = []
  })

  // 建立父子关系
  const roots = []
  items.forEach((item) => {
    if (item.parentIds && item.parentIds.length > 0) {
      item.parentIds.forEach((parentId) => {
        if (itemMap[parentId]) {
          itemMap[parentId].children.push(item)
        }
      })
    } else {
      roots.push(item)
    }
  })

  // 递归打印
  function printNode(node, indent = 0) {
    const prefix = '  '.repeat(indent)
    console.log(`${prefix}├─ ${node.name} (${node.rank})`)
    node.children.forEach((child) => {
      printNode(child, indent + 1)
    })
  }

  roots.forEach((root) => {
    printNode(root)
  })
}

// 运行
syncTaxonomy()
