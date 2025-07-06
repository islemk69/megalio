<script setup>
const props = defineProps({
  label: String,
  value: [String, Number]  // ✅ accepte String ou Number
})

const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <div class="asset-selector">
    <div class="categorie">
      <p>{{ label }}</p>
    </div>
    <div class="switch">
      <span class="left" @click="emit('prev')">‹</span>
      {{ value }}
      <span class="right" @click="emit('next')">›</span>
    </div>
  </div>
</template>

<style scoped>
  @media (max-width: 768px) {
  .asset-selector {
    font-size: 1rem;
  }   
}
.asset-selector {
  height: 50px;
  background-color: yellow;
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.categorie {
  background-color: aqua;
  width: 200px; /* fixe ou min-width si tu veux plus souple */
  flex-shrink: 0; /* empêche de rétrécir */
  display: flex;
  justify-content: center;
}

.switch {
  background-color: white;
  flex: 1; /* prend le reste de la place */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  white-space: nowrap;
}

  .left,
  .right {
    cursor: pointer;
    font-weight: bold;
    padding: 0 10px;
    user-select: none;
  }
</style>
