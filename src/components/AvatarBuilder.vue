<script setup>
import Assets from './Assets.vue'
import Avatar from './Avatar.vue'
import MemeMaker from './MemeMaker.vue';

import { provide, inject, ref } from 'vue';

const imagePaths = inject('imagePaths');
const topText = ref('')
const bottomText = ref('')


const assetList = ref(
  Object.entries(imagePaths.value).map(([type, paths]) => {
    const randomIndex = Math.floor(Math.random() * paths.length)
    return {
      key: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      index: randomIndex,
      value: type === 'overlays' ? randomIndex : paths[randomIndex].split('/').pop().replace('.webp', '')
    }
  })
)



provide('assetList', assetList)


provide('topText', topText)
provide('bottomText', bottomText)

const downloadImage = async () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const size = 1024
  canvas.width = size
  canvas.height = size

  const zOrder = ['backgrounds', 'body', 'clothes', 'eyes', 'mouth', 'necklace', 'glasses', 'hair','hats', 'horns', 'accessories', 'overlays']
  for (const key of zOrder) {
    const asset = assetList.value.find(a => a.key === key)
    const path = imagePaths.value[key]?.[asset?.index]
    if (!path || path.includes('Empty')) continue

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = path
    await new Promise(resolve => {
      img.onload = resolve
      img.onerror = resolve
    })
    ctx.drawImage(img, 0, 0, size, size)
  }

  // Texte mème (haut)
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 15
  ctx.font = 'bold 150px impact'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  if (topText.value) {
    ctx.strokeText(topText.value.toUpperCase(), size / 2, 20)
    ctx.fillText(topText.value.toUpperCase(), size / 2, 20)
  }

  // Texte mème (bas)
  if (bottomText.value) {
    ctx.textBaseline = 'bottom'
    ctx.strokeText(bottomText.value.toUpperCase(), size / 2, size - 20)
    ctx.fillText(bottomText.value.toUpperCase(), size / 2, size - 20)
  }

  const link = document.createElement('a')
  link.download = 'avatar.png'
  link.href = canvas.toDataURL()
  link.click()
}

provide('downloadImage', downloadImage)

</script>

<template>
  <div class="megalio-grid">
      <Avatar />
    <Assets />
    <MemeMaker />
  </div>
</template>

<style scoped>
.megalio-grid {
    box-sizing: border-box;
    font-size: 1.2rem;
    display: grid;
    width: 1000px;
    height: 800px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 1fr;
    gap: 10px;
     background: rgba(255, 255, 255, 0.1); /* blanc très transparent */
    backdrop-filter: blur(10px);          /* effet de flou derrière */
    -webkit-backdrop-filter: blur(10px);  /* compatibilité Safari */
    border: 1px solid rgba(255, 255, 255, 0.2); /* léger bord blanc */
    padding: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* ombre douce */
}

@media (max-width: 768px) {
  .megalio-grid {
    display: flex;
    flex-direction: column;
    width: 380px;
    height: 1500px;
  }
}


</style>
