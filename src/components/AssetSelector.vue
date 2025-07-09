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
      <p>{{ value }}</p>
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
  display: flex;
  align-items: center;
  margin: 10px 0;
  border: 1px solid white;
  padding: 0px 10px;
}

.categorie {
  width: 100px; /* fixe ou min-width si tu veux plus souple */
  flex-shrink: 0; /* empêche de rétrécir */
  display: flex;
  justify-content: center;
}

.switch {
  flex: 1; /* prend le reste de la place */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  white-space: nowrap;
}

.switch p {
  display: inline-block;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

  .left,
  .right {
    cursor: pointer;
    font-weight: bold;
    padding: 0 10px;
    user-select: none;
  }

</style>
