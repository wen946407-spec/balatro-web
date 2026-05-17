<template>
  <div id="scale-wrapper" ref="wrapperRef">
    <div id="game-container">
      <GameHud :state="state" :progress-pct="progressPct" />

      <PlayArea
        :played-cards="state.playedCards"
        :selected-hand-type="selectedHandType"
        :score-popup-text="state.scorePopupText"
        :score-popup-key="state.scorePopupKey"
      />

      <HandArea
        :hand="state.hand"
        :selected="state.selected"
        :disabled="state.gameStatus !== 'playing'"
        @toggle-select="toggleSelect"
      />

      <ActionBar
        :state="state"
        @play="playHand"
        @discard="discardHand"
        @restart="handleRestart"
      />

      <!-- 胜负弹窗：游戏结束后 2.1s 展示 -->
      <GameModal
        :visible="modalVisible"
        :game-status="state.gameStatus"
        :score="state.score"
        @restart="handleRestart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useGame } from './composables/useGame.js'
import GameHud from './components/GameHud.vue'
import PlayArea from './components/PlayArea.vue'
import HandArea from './components/HandArea.vue'
import ActionBar from './components/ActionBar.vue'
import GameModal from './components/GameModal.vue'

const { state, selectedHandType, progressPct, toggleSelect, playHand, discardHand, initGame } =
  useGame()

const wrapperRef = ref(null)
const modalVisible = ref(false)
let modalTimer = null

// 监听游戏状态，游戏结束时延迟 2.1s 显示弹窗
watch(
  () => state.gameStatus,
  (newStatus) => {
    if (newStatus === 'win' || newStatus === 'lose') {
      clearTimeout(modalTimer)
      modalTimer = setTimeout(() => {
        modalVisible.value = true
      }, 2100)
    }
  }
)

function handleRestart() {
  clearTimeout(modalTimer)
  modalVisible.value = false
  initGame()
}

// 缩放逻辑
function scaleGame() {
  if (!wrapperRef.value) return
  const vw = window.innerWidth
  const vh = window.innerHeight
  const scale = Math.min(vw / 1080, vh / 640)
  wrapperRef.value.style.transform = `translate(-50%, -50%) scale(${scale})`
}

onMounted(() => {
  window.addEventListener('resize', scaleGame)
  scaleGame()
  initGame()
})

onUnmounted(() => {
  window.removeEventListener('resize', scaleGame)
  clearTimeout(modalTimer)
})
</script>

<style scoped>
#scale-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
  /* transform 由 JS 动态设置 */
}

#game-container {
  width: 1080px;
  height: 640px;
  background: var(--color-table);
  background-image: radial-gradient(ellipse at center, #3a7a52 0%, #2d5a3d 60%, #1e3d29 100%),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255, 255, 255, 0.015) 10px,
      rgba(255, 255, 255, 0.015) 20px
    );
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  position: relative;
}
</style>
