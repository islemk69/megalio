<script setup>
import { inject, computed } from 'vue'

const assetList = inject('assetList')
const imagePaths = inject('imagePaths')

const zOrder = ['backgrounds', 'body', 'clothes', 'horns', 'eyes', 'mouth', 'necklace', 'glasses', 'hair','hats', 'accessories', 'overlays']

const activeImages = computed(() =>
  zOrder.map(key => {
    const asset = assetList.value.find(a => a.key === key)
    const path = imagePaths.value[key]?.[asset?.index]
    return {
      key,
      path
    }
  }).filter(img => img.path && !img.path.includes('Empty'))
)
</script>

<template>
  <div class="avatar">
    <div class="avatar-canvas">
      <img
        v-for="layer in activeImages"
        :key="layer.key"
        :src="layer.path"
        class="avatar-layer"
      />
    </div>
  </div>
</template>

<style scoped>
.avatar {
  grid-row: 1;
  grid-column: 2;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-canvas {
  position: relative;
  width: 512px;
  height: 512px;
}

.avatar-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 512px;
  height: 512px;
  object-fit: contain;
  pointer-events: none;
}
</style>

