# CLAUDE.md

## 项目定位

小丑牌 Web V1.0.0 — 基于扑克牌型的单机数值小游戏（Balatro 简化版）。
课堂演示项目，目标是让零基础学员体验「AI 全流程开发」。

## 技术栈

- 纯 HTML + CSS + JS 单文件（`index.html`），无框架、无构建工具
- 不依赖任何外部 CDN 或 npm 包

## 目录约定

| 路径 | 说明 |
|------|------|
| `index.html` | 游戏全部逻辑，CSS 变量定义在 `:root`，JS 全局状态在 `state` 对象 |
| `PRD.html` | 产品需求文档，包含玩法规则、牌型计分表、验收 Checklist |
| `DESIGN.html` | 视觉设计规范，包含 Design Tokens、卡牌组件、游戏主界面 mock |

## 常用命令

```bash
# 启动本地开发服务器
python3 -m http.server 8080

# 查看游戏
open http://localhost:8080
```

## 核心游戏状态（index.html）

```js
state = {
  deck, hand, selected,
  score, target: 300,
  handsLeft,    // 出牌机会，初始 4
  discardsLeft, // 弃牌机会，初始 3
  gameStatus    // 'playing' | 'win' | 'lose'
}
```

## 计分规则

得分 = `(基础分 + 入选牌点数之和) × 倍数`
点数：A=11，K/Q/J=10，2–10 按面值。

## V1.0.0 明确不做

小丑牌 / 星球牌 / 增益系统 / 商店 / 关卡 / 动画音效 / 多人联机
