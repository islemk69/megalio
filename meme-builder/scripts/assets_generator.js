import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const basePath = join(__dirname, '../public/assets/medium')
const output = {}

for (const category of readdirSync(basePath)) {
  const catPath = join(basePath, category)
  if (statSync(catPath).isDirectory()) {
    const files = readdirSync(catPath).filter(f => f.endsWith('.webp'))
    output[category.toLowerCase()] = files.map(f => `/assets/medium/${category}/${f}`)
  }
}

writeFileSync(join(__dirname, '../public/assets/assets.json'), JSON.stringify(output, null, 2))
console.log('✅ Fichier assets.json généré dans public/assets/')
