<script setup>
import { inject, computed } from 'vue'

const assetList = inject('assetList')
const imagePaths = inject('imagePaths')

const topText = inject('topText')
const bottomText = inject('bottomText')


const zOrder = ['backgrounds', 'body', 'clothes', 'eyes', 'mouth', 'necklace', 'glasses', 'hair','hats', 'horns', 'accessories', 'overlays']

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
console.log(topText)
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
      <div class="meme-text top">{{ topText }}</div>
      <div class="meme-text bottom">{{ bottomText }}</div>
    </div>

  </div>
</template>

<style scoped>


.avatar {
  grid-row: 1;
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
}

.avatar-canvas {
  position: relative;
  width: 100%;
  max-width: 512px;
  aspect-ratio: 1;
}

.avatar-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}
.meme-text {
  position: absolute;
  width: 100%;
  color: white;
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 4px black;
  pointer-events: none;
  padding: 10px;
  word-break: break-word;
  font-family: 'ImpactCustom', Impact, sans-serif;
  text-shadow:
    -4px -4px 0 #000,
    4px -4px 0 #000,
    -4px 4px 0 #000,
    4px 4px 0 #000,
    0 -4px 0 #000,
    0 4px 0 #000,
    -4px 0 0 #000,
    4px 0 0 #000;
    letter-spacing: 2px;
}

.meme-text.top {
  top: 0;
}

.meme-text.bottom {
  bottom: 0;

}
</style>

