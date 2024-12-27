---
title: Fantasy Report
toc: true
---

```js
import store from '/redux/store.js';
const URL_BASE = "https://5xl9q45a8g.execute-api.us-east-2.amazonaws.com/prod/element-summary/";


const state = store.getState();
console.log(state.player1ID, state.player1Name);

const player1Data = await fetch(`${URL_BASE}${state.player1ID}`).then(response => response.json());
const player2Data = await fetch(`${URL_BASE}${state.player2ID}`).then(response => response.json());
console.log(player1Data, player2Data);
```

```js
// const url = `${URL_BASE}${state.player1ID}/`;
// console.log(url);
// const response = await fetch(url);
// if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
// const data = await response.json();
// console.log(data);
```

## Fantasy Report




