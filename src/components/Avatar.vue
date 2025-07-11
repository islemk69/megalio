<script setup>
import { inject, computed, watchEffect, ref, onMounted } from 'vue'

const assetList = inject('assetList')
const imagePaths = inject('imagePaths')
const topText = inject('topText')               // ✅ Manquait
const bottomText = inject('bottomText')         // ✅ Manquait
const avatarVisible = ref(true)


const zOrder = ['backgrounds', 'body', 'clothes', 'eyes', 'mouth', 'necklace', 'glasses', 'hair','hats', 'horns', 'accessories']

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

const avatarCanvas = ref(null)
const textFontSize = ref('600px') // taille par défaut raisonnable
const miniFontSize = ref('10px')

onMounted(() => {
  if (avatarCanvas.value) {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        const fontSize = width * 0.1
        textFontSize.value = `${fontSize}px`
      }
    })
    resizeObserver.observe(avatarCanvas.value)

    // ⬇️ Observe si l'avatar est visible à l'écran
    const observer = new IntersectionObserver(([entry]) => {
      avatarVisible.value = entry.isIntersecting
    }, { threshold: 0.01 })

    observer.observe(avatarCanvas.value)
  }

  // Taille de police mini-avatar : fixée à une valeur raisonnable
  miniFontSize.value = '24px'
})




</script>

<template>
  <div class="avatar">
    <div class="avatar-canvas" ref="avatarCanvas">
      <img
        v-for="layer in activeImages"
        :key="layer.key"
        :src="layer.path"
        class="avatar-layer"
      />
    <div class="meme-text top" :style="{ fontSize: textFontSize }">{{ topText }}</div>
    <div class="meme-text bottom" :style="{ fontSize: textFontSize }">{{ bottomText }}</div>
    </div>

  </div>
  <div v-if="!avatarVisible" class="avatar-mini">
  <div class="avatar-canvas mini">
    <img
      v-for="layer in activeImages"
      :key="layer.key"
      :src="layer.path"
      class="avatar-layer"
    />
    <div class="meme-text top" :style="{ fontSize: miniFontSize }">{{ topText }}</div>
    <div class="meme-text bottom" :style="{ fontSize: miniFontSize }">{{ bottomText }}</div>
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

.avatar-mini {
  position: fixed;
  bottom: 12px;
  left: 12px;
  width: 256px;
  height: 256px;
  z-index: 1000;
  pointer-events: none;
  opacity: 0.9;
  border: 1px solid white;
  background: #111;
  border-radius: 8px;
}

.avatar-canvas.mini {
  width: 100%;
  height: 100%;
  position: relative;
  aspect-ratio: 1;
}
</style>

