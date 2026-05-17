<template>
  <div id="hand-area">
    <PokerCard
      v-for="card in hand"
      :key="card.id"
      :card="card"
      :selected="selected.includes(card.id)"
      :disabled="disabled"
      @click="emit('toggle-select', card.id)"
    />
  </div>
</template>

<script setup>
import PokerCard from './PokerCard.vue'

defineProps({
  hand: {
    type: Array,
    default: () => [],
  },
  selected: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-select'])
</script>

<style scoped>
#hand-area {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 24px 8px;
  min-height: 140px;
  gap: 10px;
  flex-shrink: 0;
}
</style>
