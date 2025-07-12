  <script setup>
  import { ref, inject, provide, onMounted } from 'vue'
  import AssetSelector from './AssetSelector.vue'

  const imagePaths = inject('imagePaths')

  const assetList = inject('assetList')

  const searchInput = ref('')
  const nftAssets = ref({})

    onMounted(async () => {
    const res = await fetch(import.meta.env.BASE_URL + '/assets/nftAssets.json')
    nftAssets.value = await res.json()
  })

  function loadNFT(id) {
  const nft = nftAssets.value[id]
  if (!nft) {
    alert("NFT introuvable.")
    return
  }

  for (const asset of assetList.value) {
    const key = asset.key
    const list = imagePaths.value[key]
    if (!list) continue

    const traitValue = nft[key]

    let index = -1

    if (traitValue) {
      // Trait présent → cherche la valeur exacte
      index = list.findIndex(path => {
        const filename = path.split('/').pop().replace('.webp', '')
        return filename === traitValue
      })

      if (index !== -1) {
        asset.index = index
        asset.value = traitValue
        continue
      }
    }

    // Trait absent OU non trouvé → cherche "Empty.webp"
    index = list.findIndex(path => path.includes('Empty.webp'))
    if (index !== -1) {
      asset.index = index
      asset.value = 'Empty'
    }
  }
}


  // 🔁 Navigation
  function updateValue(key, newIndex) {
    const asset = assetList.value.find(a => a.key === key)
    const list = imagePaths.value[key]
    if (!asset || !list) return

    const total = list.length
    const validIndex = (newIndex + total) % total

    asset.index = validIndex
    asset.value = key === 'overlays'
    ? validIndex
    : list[validIndex].split('/').pop().replace('.webp', '')
  }

  function handlePrev(key) {
    const asset = assetList.value.find(a => a.key === key)
    if (asset) updateValue(key, asset.index - 1)
  }

  function handleNext(key) {
    const asset = assetList.value.find(a => a.key === key)
    if (asset) updateValue(key, asset.index + 1)
  }
  </script>


  <template>
    <div class="assets">
      <div class="head-assets">
          <h1>Assets</h1>
          <div class="search-nft">
            <input
              type="text"
              v-model="searchInput"
              @keyup.enter="loadNFT(searchInput)"
              placeholder="12 → 4444"
            />
            <img
              src="/src/assets/recherche.png"
              alt="search"
              width="20px"
              height="20px"
              @click="loadNFT(searchInput)"
            >
          </div>
      </div>
      <div class="asset-selector-container">
        <AssetSelector
          v-for="asset in assetList"
          :key="asset.key"
          :label="asset.label"
          :value="asset.value"
          @prev="handlePrev(asset.key)"
          @next="handleNext(asset.key)"
        />
      </div>

    </div>
  </template>

  <style scoped>
  .assets {
    grid-row: 1 / span 2;
    grid-column: 1;
    padding: 10px;
  }

  
  @media (max-width: 768px) {
    h1 {
      font-size: 1.6rem;
    }
  }

  .head-assets {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search-nft {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 300px;
  }

  .search-nft input {
    height: 20px;
  }

  .search-nft img {
    cursor: pointer;
    margin: 0 8px;
  }

  .asset-selector-container {
    margin-top: 30px;
  }
  
  </style>
