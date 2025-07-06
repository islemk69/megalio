  <script setup>
  import { ref, inject, provide } from 'vue'
  import AssetSelector from './AssetSelector.vue'

  const imagePaths = inject('imagePaths')

  const assetList = inject('assetList')


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
      <h1>Assets</h1>
      <AssetSelector
        v-for="asset in assetList"
        :key="asset.key"
        :label="asset.label"
        :value="asset.value"
        @prev="handlePrev(asset.key)"
        @next="handleNext(asset.key)"
      />
    </div>
  </template>

  <style scoped>
  .assets {
    grid-row: 1 / span 2;
    grid-column: 1;
    background-color: blue;
    padding: 10px;
  }

  
  </style>
