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

async function checkDatabase() {
  console.log('🔍 检查 Notion 数据库...')
  console.log('')

  if (!NOTION_TOKEN) {
    console.error('❌ 错误：未找到 NOTION_TOKEN')
    process.exit(1)
  }

  if (!DATABASE_ID) {
    console.error('❌ 错误：未找到 NOTION_DATABASE_ID')
    process.exit(1)
  }

  console.log('📡 连接数据库...')
  
  try {
    // 设置超时
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    const response = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
        },
        signal: controller.signal,
      }
    )

    clearTimeout(timeout)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`${response.status} ${response.statusText}: ${errorData.message || ''}`)
    }

    const database = await response.json()
    
    console.log('✅ 连接成功！')
    console.log('')
    console.log(`📋 数据库名称: ${database.title?.map(t => t.plain_text).join('') || '未命名'}`)
    console.log('')
    console.log('📝 字段列表:')
    console.log('')

    const properties = database.properties || {}
    const fieldNames = Object.keys(properties)
    
    // 需要的字段
    const requiredFields = [
      { name: 'Name', type: 'title', required: true },
      { name: 'ID', type: 'rich_text', required: true },
      { name: '拉丁学名', type: 'rich_text', required: true },
      { name: '类别', type: 'select', required: true },
      { name: '保护等级', type: 'select', required: true },
      { name: '简介', type: 'rich_text', required: true },
      { name: '分类阶元', type: 'select', required: false },
      { name: '界', type: 'rich_text', required: false },
      { name: '门', type: 'rich_text', required: false },
      { name: '纲', type: 'rich_text', required: false },
      { name: '目', type: 'rich_text', required: false },
      { name: '科', type: 'rich_text', required: false },
      { name: '属', type: 'rich_text', required: false },
      { name: '图片', type: 'files', required: false },
      { name: '形态特征', type: 'rich_text', required: false },
      { name: '生态作用', type: 'rich_text', required: false },
      { name: '生活环境', type: 'rich_text', required: false },
      { name: '生活习性', type: 'rich_text', required: false },
    ]

    console.log('当前数据库字段:')
    fieldNames.forEach((name) => {
      const prop = properties[name]
      console.log(`  - ${name} (${prop.type})`)
    })

    console.log('')
    console.log('✅ 检查结果:')
    console.log('')

    let missingRequired = []
    let typeMismatch = []

    requiredFields.forEach((field) => {
      const exists = fieldNames.includes(field.name)
      if (!exists) {
        if (field.required) {
          missingRequired.push(field.name)
          console.log(`  ❌ 缺少必填字段: ${field.name}`)
        } else {
          console.log(`  ⚠️  缺少可选字段: ${field.name} (不影响运行)`)
        }
      } else {
        const prop = properties[field.name]
        if (prop.type !== field.type) {
          typeMismatch.push({ name: field.name, expected: field.type, actual: prop.type })
          console.log(`  ⚠️  字段类型不对: ${field.name} (应为 ${field.type}，实际 ${prop.type})`)
        } else {
          console.log(`  ✅ ${field.name} ✓`)
        }
      }
    })

    console.log('')
    if (missingRequired.length > 0) {
      console.log('❌ 缺少必填字段，请添加后再同步')
    } else if (typeMismatch.length > 0) {
      console.log('⚠️  部分字段类型不对，可能影响数据读取')
    } else {
      console.log('🎉 所有字段都正确！可以开始同步数据了')
    }

  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('❌ 连接超时，请检查网络')
    } else {
      console.error('❌ 检查失败:', error.message)
    }
    process.exit(1)
  }
}

checkDatabase()
