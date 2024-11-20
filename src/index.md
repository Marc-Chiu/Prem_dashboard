---
title: Premier League Player Comparison
toc: false
---

```js
import {StatsComponent} from "/components/stat_cards/stats_component.js";
import * as React from "npm:react";
import * as d3 from "npm:d3";
import * as ReactDOM from "npm:react-dom";
```

```js
const standard_data = await FileAttachment("/fbrefData/player_standard.csv").csv();
const passing_data = await FileAttachment("/fbrefData/player_passing.csv").csv();
const defense_data = await FileAttachment("/fbrefData/player_defense.csv").csv();
const possession_data = await FileAttachment("/fbrefData/player_possession.csv").csv();
const shooting_data = await FileAttachment("/fbrefData/player_shooting.csv").csv();
const IDs = await FileAttachment("data/playerIds.csv").csv();
```

```jsx
const statsRoot = document.getElementById("stats-root");
const root = ReactDOM.createRoot(statsRoot);

root.render(
        <div class="grid grid-cols-2">
                <div class="stats" id="player1">
                        <StatsComponent
                        playerNumber={1}
                        standardData={standard_data}
                        passingData={passing_data}
                        defenseData={defense_data}
                        possessionData={possession_data}
                        shootingData= {shooting_data}
                        IDs={IDs}>
                        </StatsComponent>
                </div>
                <div class="stats" id="player2">
                        <StatsComponent
                        playerNumber={2}
                        standardData={standard_data}
                        passingData={passing_data}
                        defenseData={defense_data}
                        possessionData={possession_data}
                        shootingData= {shooting_data}
                        IDs={IDs}>
                        </StatsComponent>
                </div>
        </div>
);
```

<div id="main-content">
        <div id="stats-root"></div>
        <div style="margin-left: 10%" id="radial-container" class="grid grid-cols-2"></div>
</div>