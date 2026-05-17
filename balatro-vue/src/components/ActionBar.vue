<template>
  <div id="action-bar">
    <button
      class="btn btn-play"
      :disabled="!hasSelection || state.handsLeft <= 0 || !isPlaying"
      @click="emit('play')"
    >
      出牌
    </button>
    <button
      class="btn btn-discard"
      :disabled="!hasSelection || state.discardsLeft <= 0 || !isPlaying"
      @click="emit('discard')"
    >
      弃牌
    </button>
    <button class="btn btn-restart" @click="emit('restart')">重新开始</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  state: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['play', 'discard', 'restart'])

const hasSelection = computed(() => props.state.selected.length > 0)
const isPlaying = computed(() => props.state.gameStatus === 'playing')
</script>

<style scoped>
#action-bar {
  height: 72px;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 24px;
  flex-shrink: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.btn {
  padding: 10px 28px;
  border-radius: var(--radius-btn);
  font-size: 15px;
  font-weight: 700;
  font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif;
  cursor: pointer;
  border: none;
  transition: transform 120ms ease, opacity 150ms ease, filter 120ms ease;
  letter-spacing: 0.04em;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  filter: brightness(1.12);
}

.btn:active:not(:disabled) {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  filter: none;
}

.btn-play {
  background: var(--color-accent);
  color: white;
  box-shadow: 0 4px 14px rgba(232, 104, 42, 0.35);
}

.btn-discard {
  background: var(--color-discard);
  color: white;
  box-shadow: 0 4px 14px rgba(168, 50, 50, 0.35);
}

.btn-restart {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.btn-restart:hover:not(:disabled) {
  border-color: white;
}
</style>
