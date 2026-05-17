<template>
  <div id="modal-overlay" :class="{ show: visible }">
    <div id="modal-card" :class="gameStatus">
      <div id="modal-title">{{ gameStatus === 'win' ? '胜利！' : '失败' }}</div>
      <div id="modal-score-label">最终得分</div>
      <div id="modal-score">{{ score }}</div>
      <button class="btn-modal-restart" @click="emit('restart')">再来一局</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  gameStatus: {
    type: String,
    default: 'lose',
  },
  score: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['restart'])
</script>

<style scoped>
#modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(3px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms ease;
}

#modal-overlay.show {
  opacity: 1;
  pointer-events: all;
}

#modal-card {
  background: #111;
  border-radius: 20px;
  padding: 40px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  transform: scale(0.85);
  transition: transform 300ms ease;
}

#modal-overlay.show #modal-card {
  transform: scale(1);
}

#modal-card.win {
  border: 2px solid var(--color-gold);
  box-shadow: 0 0 40px rgba(212, 160, 23, 0.3);
}

#modal-card.lose {
  border: 2px solid #a83232;
  box-shadow: 0 0 40px rgba(168, 50, 50, 0.3);
}

#modal-title {
  font-size: 42px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

#modal-card.win #modal-title {
  color: var(--color-gold);
}

#modal-card.lose #modal-title {
  color: #e06060;
}

#modal-score-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 15px;
}

#modal-score {
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
  font-size: 36px;
  font-weight: 700;
  color: var(--color-score);
  font-variant-numeric: tabular-nums;
}

.btn-modal-restart {
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.4);
  padding: 12px 40px;
  border-radius: var(--radius-btn);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif;
  transition: background 150ms ease, border-color 150ms ease;
}

.btn-modal-restart:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: white;
}
</style>
