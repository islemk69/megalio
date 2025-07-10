<script setup>
import { inject, ref } from 'vue'

const topText = inject('topText')
const bottomText = inject('bottomText')
const downloadImage = inject('downloadImage')
</script>

<template>
    <div class="meme-maker">

      <div class="input-box">
        <input v-model="topText" type="text" class="top-text" placeholder="TOP TEXT">
        <input v-model="bottomText" type="text" class="bottom-text" placeholder="BOTTOM TEXT">
      </div>
      <button @click="downloadImage">Download</button>
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

</style>