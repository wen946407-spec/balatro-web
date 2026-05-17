import { reactive, computed } from 'vue'
import { createDeck, shuffle, calculateScore } from './useCardEngine.js'

// 所有游戏状态和逻辑封装在这里
const state = reactive({
  deck: [],
  hand: [],
  selected: [],
  score: 0,
  target: 300,
  handsLeft: 4,
  discardsLeft: 3,
  gameStatus: 'playing', // 'playing' | 'win' | 'lose'
  playedCards: [],       // 最近一次出的牌，用于展示
  scorePopupText: '',    // 得分弹出文字
  scorePopupKey: 0,      // 每次出牌变化，触发动画重放
})

function dealCards(count) {
  const needed = Math.min(count, state.deck.length)
  for (let i = 0; i < needed; i++) {
    state.hand.push(state.deck.pop())
  }
}

function refillHand() {
  const missing = 8 - state.hand.length
  if (missing > 0) dealCards(missing)
}

function initGame() {
  state.deck = shuffle(createDeck())
  state.hand = []
  state.selected = []
  state.score = 0
  state.target = 300
  state.handsLeft = 4
  state.discardsLeft = 3
  state.gameStatus = 'playing'
  state.playedCards = []
  state.scorePopupText = ''
  state.scorePopupKey = 0

  dealCards(8)
}

function toggleSelect(cardId) {
  if (state.gameStatus !== 'playing') return
  const idx = state.selected.indexOf(cardId)
  if (idx >= 0) {
    state.selected.splice(idx, 1)
  } else {
    if (state.selected.length < 5) {
      state.selected.push(cardId)
    }
  }
}

function playHand() {
  if (state.selected.length === 0 || state.handsLeft <= 0) return
  if (state.gameStatus !== 'playing') return

  const playedCards = state.hand.filter((c) => state.selected.includes(c.id))
  const { score } = calculateScore(playedCards)

  state.playedCards = playedCards
  state.score += score
  state.handsLeft--
  state.scorePopupText = '+' + score + ' 分'
  state.scorePopupKey++

  // 移除已出的牌
  state.hand = state.hand.filter((c) => !state.selected.includes(c.id))
  state.selected = []

  refillHand()

  // 胜负判断
  if (state.score >= state.target) {
    state.gameStatus = 'win'
  } else if (state.handsLeft <= 0 && state.score < state.target) {
    state.gameStatus = 'lose'
  }

  // 2 秒后清除出牌展示（仅在 playing 状态）
  setTimeout(() => {
    if (state.gameStatus === 'playing') {
      state.playedCards = []
    }
  }, 2000)
}

function discardHand() {
  if (state.selected.length === 0 || state.discardsLeft <= 0) return
  if (state.gameStatus !== 'playing') return

  state.hand = state.hand.filter((c) => !state.selected.includes(c.id))
  state.selected = []
  state.discardsLeft--

  refillHand()
}

// 已选中的牌型（用于 badge 展示）
const selectedHandType = computed(() => {
  if (state.selected.length === 0) return null
  const selCards = state.hand.filter((c) => state.selected.includes(c.id))
  const { handType } = calculateScore(selCards)
  return handType
})

// 进度百分比
const progressPct = computed(() => {
  return Math.min(100, (state.score / state.target) * 100).toFixed(1)
})

export function useGame() {
  return {
    state,
    selectedHandType,
    progressPct,
    toggleSelect,
    playHand,
    discardHand,
    initGame,
  }
}
