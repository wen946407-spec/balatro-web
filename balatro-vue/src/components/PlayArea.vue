<template>
  <div id="play-area">
    <!-- 得分弹出动画：key 变化时重新挂载触发动画 -->
    <div
      v-if="scorePopupText"
      :key="scorePopupKey"
      id="score-popup"
      class="animate"
    >
      {{ scorePopupText }}
    </div>

    <!-- 出牌展示区 -->
    <div id="played-cards-display">
      <div
        v-for="card in playedCards"
        :key="card.id"
        class="played-card-mini"
        :class="isRed(card) ? 'red' : 'black'"
      >
        <div class="mini-rank">{{ card.rank }}</div>
        <div class="mini-suit">{{ card.suit }}</div>
      </div>
    </div>

    <!-- 牌型 badge -->
    <div id="hand-type-area">
      <div
        id="hand-type-badge"
        :class="{ hidden: !selectedHandType }"
      >
        {{ selectedHandType || '高牌' }}
      </div>
      <div id="hint-text" :class="{ hidden: !!selectedHandType }">选 1–5 张出牌</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  playedCards: {
    type: Array,
    default: () => [],
  },
  selectedHandType: {
    type: String,
    default: null,
  },
  scorePopupText: {
    type: String,
    default: '',
  },
  scorePopupKey: {
    type: Number,
    default: 0,
  },
})

function isRed(card) {
  return card.suit === '♥' || card.suit === '♦'
}
</script>

<style scoped>
#play-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px 8px;
  min-height: 0;
  position: relative;
}

#played-cards-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 90px;
  flex-wrap: nowrap;
}

.played-card-mini {
  width: 60px;
  height: 80px;
  background: var(--color-card-bg);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  font-size: 13px;
  font-weight: 700;
  animation: cardFloat 0.3s ease;
}

.played-card-mini .mini-rank {
  font-size: 14px;
  font-weight: 700;
}
.played-card-mini .mini-suit {
  font-size: 18px;
}
.played-card-mini.red {
  color: var(--color-card-red);
}
.played-card-mini.black {
  color: #1a1a1a;
}

@keyframes cardFloat {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

#hand-type-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

#hand-type-badge {
  background: var(--color-accent);
  color: white;
  padding: 5px 18px;
  border-radius: var(--radius-btn);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.04em;
  transition: opacity 200ms ease, transform 200ms ease;
}

#hand-type-badge.hidden {
  opacity: 0;
  transform: scale(0.85);
  pointer-events: none;
}

#hint-text {
  color: rgba(255, 255, 255, 0.45);
  font-size: 13px;
  transition: opacity 200ms ease;
}

#hint-text.hidden {
  opacity: 0;
}

#score-popup {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-score);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  opacity: 0;
}

#score-popup.animate {
  animation: scoreRise 2s ease forwards;
}

@keyframes scoreRise {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(0);
  }
  15% {
    opacity: 1;
    transform: translateX(-50%) translateY(-4px);
  }
  70% {
    opacity: 1;
    transform: translateX(-50%) translateY(-20px);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-36px);
  }
}
</style>
