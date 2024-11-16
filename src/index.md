---
theme: "cotton"
title: Premier League Player Comparison
toc: false
---

```js
import {NameCard} from "/components/stat_cards/top_stats.js";
import {StatsComponent} from "/components/stat_cards/stats_cards.js";
import * as React from "npm:react";
import * as d3 from "npm:d3";
import {passingChart} from "/components/charts/passing.js";
import {radialChart} from "/components/charts/radial.js";
```

```js
const stats = await FileAttachment("/data/attack_stats.json").json();
const data = Object.entries(stats).map(([key, value]) => {
        return {
        id: key,
        ...value
        };
}).filter(d => d["Top stats"]["Minutes played"] > 0);
const radialData = d3.map(data, d => ({
        id: d.id,
        "xG + xA": (d["Top stats"]["xG + xA"] / (d["Top stats"]["Minutes played"] + .001)  * 90),
        "Chances Created per 90": (d["Top stats"]["Chances created"] / (d["Top stats"]["Minutes played"] + .001) * 90),
        "Conversion Rate": (d["Top stats"]["Goals"]),
        "Shots per 90": (d["Top stats"]["Total shots"] / (d["Top stats"]["Minutes played"] + .001) * 90),
        "Dispossessed per 90": (d["Attack stats"]["Dispossessed"] / (d["Top stats"]["Minutes played"] + .001)* 90),
        "Touches per 90": (d["Attack stats"]["Touches"] / (d["Top stats"]["Minutes played"] + .001) * 90),
        "Minutes Played": d["Top stats"]["Minutes played"]
}));

const chancesCreatedRank = d3.rank(radialData, d => d["Chances Created per 90"]);
const shotsRank = d3.rank(radialData, d => d["Shots per 90"]);
const xGxARank = d3.rank(radialData, d => d["xG + xA"]);
const shotConversionRank = d3.rank(radialData, d => d["Conversion Rate"]);
const dispossessedRank = d3.rank(radialData, d => d["Dispossessed per 90"]);
const touchesRank = d3.rank(radialData, d => d["Touches per 90"]);
const minutesPlayedRank = d3.rank(radialData, d => d["Minutes Played"]);

const NUM_PLAYERS = radialData.length;

const radialRank = radialData.map((player, index) => ({
        id: parseInt(player.id),
        "xG + xA": xGxARank[index] / NUM_PLAYERS,
        "Chances Created per 90": chancesCreatedRank[index] / NUM_PLAYERS,
        "Conversion Rate": shotConversionRank[index] / NUM_PLAYERS,
        "Shots per 90": shotsRank[index] / NUM_PLAYERS,
        "Dispossessed per 90": dispossessedRank[index] / NUM_PLAYERS,
        "Touches per 90": touchesRank[index] / NUM_PLAYERS,
        "Minutes Played": minutesPlayedRank[index] / NUM_PLAYERS
}));
```

```js
function renderRadialCharts(playerRadialData) {
        return html`<div style= "margin-right: 20px">${radialChart(playerRadialData)}</div>`
}
```


```js
console.log("loading data");
const standard_data = await FileAttachment("/fbrefData/player_standard.csv").csv();
const passing_data = await FileAttachment("/fbrefData/player_passing.csv").csv();
const defense_data = await FileAttachment("/fbrefData/player_defense.csv").csv();
const possession_data = await FileAttachment("/fbrefData/player_possession.csv").csv();
const shooting_data = await FileAttachment("/fbrefData/player_shooting.csv").csv();
const IDs = await FileAttachment("data/playerIds.csv").csv();
```


```jsx
import * as ReactDOM from "npm:react-dom";

const statsRoot = document.getElementById("stats-root");
const root = ReactDOM.createRoot(statsRoot);
console.log("rendering stats");

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

```js
function getRadialPoints(playerId) {
        return radialRank.flatMap(({ id, ...values }) =>
                Object.entries(values).map(([key, value]) => ({id, key, value }))
        ).filter(d => d.id == playerId);
}
```

<div id="main-content">
        <h1>Premier League Player Comparison</h1>
        <div id="stats-root"></div>
        <div style="margin-left: 10%" id="radial-container" class="grid grid-cols-2"></div>
</div>

<!--
```js
import { playerState, playerStateEvent } from "./sharedState.js";
let player1RadialData = getRadialPoints(playerState.player1ID);
let player2RadialData = getRadialPoints(playerState.player2ID);

const radialContainer = document.getElementById("radial-container");

radialContainer.appendChild(renderRadialCharts(player1RadialData));
radialContainer.appendChild(renderRadialCharts(player2RadialData));

playerStateEvent.addEventListener("playerIDUpdate", (event) => {
        console.log(playerState.player1ID, playerState.player2ID);
        // Trigger re-render or update radial data
        player1RadialData = getRadialPoints(playerState.player1ID);
        player2RadialData = getRadialPoints(playerState.player2ID);


        radialContainer.innerHTML = "";

        radialContainer.appendChild(renderRadialCharts(player1RadialData));
        radialContainer.appendChild(renderRadialCharts(player2RadialData));
});
``` -->

<style>
        .card {
                border: 1px solid black; /* Corrected CSS property */
        }
        .stats {
                margin-top: 20px;
                margin-left: 20px;
                margin-right: 20px;
        }
        /* .card:hover {
                cursor: pointer;
        } */
        .value {
                float: right;
                text-align: right;
        }
        .radial {                display: flex;
                margin-top: 20px;
                justify-content: center;
        }
        .statsCard{
                padding: 0;
                width: 100%;
                display: flex;
                flex-direction:column;
                justify-content:center;
                align-items: center;
        }
        .statsTable {
                width: 80%;
                text-align:left;
                margin: 20px;
        }

        /* Dropdown styling */
        .dropdown select {
        width: 35%; /* Full width */
        padding: 8px 12px;
        margin-top: 10px;
        background-color: #f1f1f1; /* Light background to blend in */
        border: none;
        border-radius: 12px; /* Rounded corners */
        font-size: 16px;
        transition: background-color 0.3s ease; /* Smooth hover effect */
        }

        /* Hover and focus styles */
        .dropdown select:hover,
        .dropdown select:focus {
        background-color: #e2e2e2; /* Slightly darker on hover */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Light shadow on focus */
        }

        /* Style for dropdown arrow */
        .dropdown select::after {
        content: "▼"; /* Custom arrow */
        position: absolute;
        right: 10px;
        top: calc(50% - 5px);
        color: #888; /* Lighter arrow color */
        pointer-events: none;
        }

        /* Ensuring the dropdown blends in with mobile devices */
        .dropdown select {
        -webkit-appearance: none; /* Safari */
        -moz-appearance: none; /* Firefox */
        }


  g[aria-label=area] path {fill-opacity: 0.1; transition: fill-opacity .2s;}
  g[aria-label=area]:hover path:not(:hover) {fill-opacity: 0.05; transition: fill-opacity .2s;}
  g[aria-label=area] path:hover {fill-opacity: 0.3; transition: fill-opacity .2s;}
</style>
