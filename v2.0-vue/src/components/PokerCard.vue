<template>
  <div
    class="card"
    :class="{
      red: isRed,
      black: !isRed,
      selected: selected,
      disabled: disabled,
    }"
    @click="!disabled && emit('click')"
  >
    <div class="card-corner top-left">
      <div class="corner-rank">{{ card.rank }}</div>
      <div class="corner-suit">{{ card.suit }}</div>
    </div>
    <div class="card-center-suit">{{ card.suit }}</div>
    <div class="card-corner bottom-right">
      <div class="corner-rank">{{ card.rank }}</div>
      <div class="corner-suit">{{ card.suit }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const isRed = computed(() => props.card.suit === '♥' || props.card.suit === '♦')
</script>

<style scoped>
.card {
  width: 88px;
  height: 118px;
  background: var(--color-card-bg);
  border-radius: var(--radius-card);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  position: relative;
  transition: transform var(--ease-card), box-shadow var(--ease-card);
  user-select: none;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card:hover:not(.disabled) {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(0, 0, 0, 0.12);
}

.card.selected {
  transform: translateY(-12px);
  box-shadow: 0 0 0 2.5px var(--color-accent), 0 8px 20px rgba(232, 104, 42, 0.35);
}

.card.selected:hover {
  transform: translateY(-14px);
}

.card.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.card-corner {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.1;
  font-weight: 700;
}

.card-corner.top-left {
  top: 6px;
  left: 8px;
}

.card-corner.bottom-right {
  bottom: 6px;
  right: 8px;
  transform: rotate(180deg);
}

.corner-rank {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}

.corner-suit {
  font-size: 12px;
  line-height: 1;
}

.card-center-suit {
  font-size: 36px;
  line-height: 1;
}

.card.red {
  color: var(--color-card-red);
}

.card.black {
  color: #1a1a1a;
}
</style>
