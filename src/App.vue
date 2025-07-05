<script setup>
import { ref, onMounted, provide} from 'vue'
import AvatarBuilder from './components/AvatarBuilder.vue'

const isReady = ref(false)
const imagePaths = ref([])

const preloadImages = async (paths) => {
  await Promise.all(paths.map(src =>
    new Promise((resolve) => {
      const img = new Image()
      img.src = src
      img.onload = resolve
      img.onerror = resolve
    })
  ))
}

onMounted(async () => {
  try {
    const res = await fetch('/assets/assets.json')
    const data = await res.json()

    // On a un objet : { category: [url1, url2, ...], ... }
    // On transforme tout en une seule liste d'URLs
    const allPaths = Object.values(data).flat()
    imagePaths.value = data;

    await preloadImages(allPaths)
    
    console.log(imagePaths.value)
    isReady.value = true
  } catch (err) {
    console.error('Erreur chargement assets.json :', err)
  }
})
provide('imagePaths', imagePaths);
</script>

<template>
  <div>
    <div v-if="!isReady" style="height: 100vh; display: flex; align-items: center; justify-content: center;"><div class="lds-dual-ring"></div></div>
    <div v-else>
      <main>
        <AvatarBuilder/>
      </main>
    </div>
  </div>
</template>

<style scoped>

main {

  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}


.lds-dual-ring,
.lds-dual-ring:after {
  box-sizing: border-box;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  color: #333;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6.4px solid currentColor;
  border-color: currentColor transparent currentColor transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


</style>