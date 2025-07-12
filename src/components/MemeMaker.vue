<script setup>
import { inject, ref } from 'vue'
import html2canvas from 'html2canvas'

const topText = inject('topText')
const bottomText = inject('bottomText')

const downloadImage = async () => {
  const canvasElement = document.querySelector('.avatar-canvas')
  if (!canvasElement) return

  const canvas = await html2canvas(canvasElement, {
    useCORS: true, // important si tu charges des images externes
    allowTaint: false,
    backgroundColor: null, // garde la transparence
    scale: 2 // pour une meilleure qualité
  })

  const link = document.createElement('a')
  link.download = 'meme.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
</script>

<template>
    <div class="meme-maker">

      <div class="input-box">
        <input v-model="topText" type="text" class="top-text" placeholder="TOP TEXT">
        <input v-model="bottomText" type="text" class="bottom-text" placeholder="BOTTOM TEXT">
      </div>
      <button class="download-button" @click="downloadImage">Download</button>
    </div>
</template>


<style scoped>

/* Colonne 2 : meme-maker (bas) */
.meme-maker {
  grid-row: 2;
  grid-column: 2;
  padding: 10px;
  height: 100%;
}

.input-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-box input {
  width: 50%;
  height: 30px;
  margin: 10px 0;
  text-align: center;
  font-size: 1.2rem;
}

.download-button {
   margin-left: 50%;
   margin-top: 30px;
    transform: translateX(-50%);
}


</style>