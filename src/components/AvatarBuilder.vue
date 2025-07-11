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
    background-color: white;
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
