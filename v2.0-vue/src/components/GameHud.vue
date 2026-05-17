<template>
  <div id="hud">
    <div class="hud-item">
      <span class="hud-label">目标分数</span>
      <span class="hud-value target">{{ state.target }}</span>
    </div>

    <div class="hud-divider"></div>

    <div class="hud-item">
      <span class="hud-label">当前分数</span>
      <div class="hud-score-block">
        <span class="hud-value score">{{ state.score }}</span>
        <span class="hud-slash">/</span>
        <span class="hud-value target">{{ state.target }}</span>
      </div>
      <div id="progress-bar-container">
        <div id="progress-bar" :style="{ width: progressPct + '%' }"></div>
      </div>
    </div>

    <div class="hud-divider"></div>

    <div class="hud-item">
      <span class="hud-label">剩余出牌</span>
      <span class="hud-value hands">{{ state.handsLeft }}</span>
    </div>

    <div class="hud-divider"></div>

    <div class="hud-item">
      <span class="hud-label">剩余弃牌</span>
      <span class="hud-value discards">{{ state.discardsLeft }}</span>
    </div>

    <div class="hud-divider"></div>

    <div class="hud-item">
      <span class="hud-label">牌堆剩余</span>
      <span class="hud-value" style="color: rgba(255, 255, 255, 0.7)">{{ state.deck.length }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  state: {
    type: Object,
    required: true,
  },
  progressPct: {
    type: [Number, String],
    default: 0,
  },
})
</script>

<style scoped>
#hud {
  height: 64px;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 24px;
  gap: 12px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hud-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.hud-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.hud-value {
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
  font-weight: 700;
  font-size: 22px;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.hud-value.target {
  color: var(--color-gold);
}
.hud-value.score {
  color: var(--color-score);
}
.hud-value.hands {
  color: var(--color-accent);
}
.hud-value.discards {
  color: #e06060;
}

.hud-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.12);
}

.hud-score-block {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hud-slash {
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
  color: rgba(255, 255, 255, 0.4);
  font-size: 20px;
}

#progress-bar-container {
  width: 240px;
  height: 8px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
  overflow: hidden;
}

#progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-score), #a8f0be);
  border-radius: 4px;
  transition: width 400ms ease;
  max-width: 100%;
}
</style>
