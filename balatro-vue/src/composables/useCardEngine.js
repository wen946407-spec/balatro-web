// 纯函数：牌型判断和计分，不依赖任何 Vue API

const SUITS = ['♥', '♦', '♣', '♠']
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

const RANK_VALUE = {
  A: 11, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
  '8': 8, '9': 9, '10': 10, J: 10, Q: 10, K: 10,
}

const HAND_RANKINGS = {
  'Royal Flush':     { name: '皇家同花顺', base: 100, mult: 8 },
  'Straight Flush':  { name: '同花顺',     base: 100, mult: 8 },
  'Four of a Kind':  { name: '四条',       base: 60,  mult: 7 },
  'Full House':      { name: '葫芦',       base: 40,  mult: 4 },
  'Flush':           { name: '同花',       base: 35,  mult: 4 },
  'Straight':        { name: '顺子',       base: 30,  mult: 4 },
  'Three of a Kind': { name: '三条',       base: 30,  mult: 3 },
  'Two Pair':        { name: '两对',       base: 20,  mult: 2 },
  'One Pair':        { name: '对子',       base: 10,  mult: 2 },
  'High Card':       { name: '高牌',       base: 5,   mult: 1 },
}

export function createDeck() {
  const deck = []
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank, value: RANK_VALUE[rank], id: suit + rank })
    }
  }
  return deck
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function rankIndex(rank) {
  return RANKS.indexOf(rank)
}

export function evaluateHand(cards) {
  if (!cards || cards.length === 0) return null

  const n = cards.length
  const suits = cards.map((c) => c.suit)
  const ranks = cards.map((c) => c.rank)
  const indices = ranks.map((r) => rankIndex(r)).sort((a, b) => a - b)

  const rankCount = {}
  for (const r of ranks) rankCount[r] = (rankCount[r] || 0) + 1
  const counts = Object.values(rankCount).sort((a, b) => b - a)

  const isFlush = n === 5 && suits.every((s) => s === suits[0])

  const isStraight5 = (idxs) => {
    if (idxs.length !== 5) return false
    const normal = idxs[4] - idxs[0] === 4 && new Set(idxs).size === 5
    if (normal) return true
    const hasAce = idxs.includes(0)
    if (hasAce) {
      const withoutAce = idxs.filter((i) => i !== 0)
      if (new Set(withoutAce).size === 4) {
        if (withoutAce[0] === 1 && withoutAce[3] === 4) return true   // A-2-3-4-5
        if (withoutAce[0] === 9 && withoutAce[3] === 12) return true  // 10-J-Q-K-A
      }
    }
    return false
  }

  const isStraight = n === 5 && isStraight5(indices)

  // Royal Flush: A-10-J-Q-K 同花
  if (isFlush && n === 5) {
    const sortedIdx = [...indices].sort((a, b) => a - b)
    if (
      sortedIdx[0] === 0 &&
      sortedIdx[1] === 9 &&
      sortedIdx[2] === 10 &&
      sortedIdx[3] === 11 &&
      sortedIdx[4] === 12
    ) {
      return 'Royal Flush'
    }
  }

  if (isFlush && isStraight) return 'Straight Flush'
  if (counts[0] === 4) return 'Four of a Kind'
  if (counts[0] === 3 && counts[1] === 2) return 'Full House'
  if (isFlush) return 'Flush'
  if (isStraight) return 'Straight'
  if (counts[0] === 3) return 'Three of a Kind'
  if (counts[0] === 2 && counts[1] === 2) return 'Two Pair'
  if (counts[0] === 2) return 'One Pair'
  return 'High Card'
}

export function calculateScore(cards) {
  if (!cards || cards.length === 0) return { handKey: null, handType: null, score: 0 }
  const handKey = evaluateHand(cards)
  const hand = HAND_RANKINGS[handKey]
  const pointsSum = cards.reduce((sum, c) => sum + c.value, 0)
  const score = (hand.base + pointsSum) * hand.mult
  return { handKey, handType: hand.name, score }
}
