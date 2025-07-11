import fs from 'fs'

// 📥 Chargement des fichiers
const nftAssets = JSON.parse(fs.readFileSync('../public/assets/nftAssets.json', 'utf8'))
const assets = JSON.parse(fs.readFileSync('../public/assets/assets.json', 'utf8'))

// 📦 Conteneur des traits manquants
const missing = {}

for (const [nftId, traits] of Object.entries(nftAssets)) {
  for (const [key, value] of Object.entries(traits)) {
    if (!assets[key]) {
      // Si le type de trait n'existe même pas côté assets
      if (!missing[key]) missing[key] = new Set()
      missing[key].add('[TYPE MANQUANT]')
      continue
    }

    const valueExists = assets[key].some(path => {
      const filename = path.split('/').pop().replace('.webp', '')
      return filename === value
    })

    if (!valueExists) {
      if (!missing[key]) missing[key] = new Set()
      missing[key].add(value)
    }
  }
}

// 🧾 Affichage clair des résultats
console.log('\n🔎 Traits manquants entre NFTs et assets locaux :\n')
let totalMissing = 0
for (const [key, values] of Object.entries(missing)) {
  console.log(`❌ ${key} :`)
  for (const value of values) {
    console.log(`   - ${value}`)
    totalMissing++
  }
}

if (totalMissing === 0) {
  console.log('✅ Tous les traits sont présents localement !')
}
