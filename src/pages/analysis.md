<!--
## Attack Stats

```js
// loading data
import {FileAttachment} from "observablehq:stdlib";
import * as d3 from "npm:d3";
import {passingChart} from "/components/charts/passing.js";
import {radialChart} from "/components/charts/radial.js";

const loadStats = await FileAttachment("data/attack_stats.json").json();
const data = Object.entries(loadStats).map(([key, value]) => {
  return {
    id: key,
    ...value
  };
}).filter(d => d["Top stats"]["Minutes played"] > 0);

const numPlayers = data.length;
```

```js
// filtering data for radial chart
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

const radialRank = radialData.map((player, index) => ({
  id: parseInt(player.id),
  "xG + xA": xGxARank[index] / numPlayers,
  "Chances Created per 90": chancesCreatedRank[index] / numPlayers,
  "Conversion Rate": shotConversionRank[index] / numPlayers,
  "Shots per 90": shotsRank[index] / numPlayers,
  "Dispossessed per 90": dispossessedRank[index] / numPlayers,
  "Touches per 90": touchesRank[index] / numPlayers,
  "Minutes Played": minutesPlayedRank[index] / numPlayers
}));

const radialPoints = radialRank.flatMap(({ id, ...values }) =>
  Object.entries(values).map(([key, value]) => ({id, key, value }))
).filter(d => d.id == "737066");
```


<div class=card>
        <p>Passes into final third vs. Accurate passes</p>
        ${passingChart(data)}
</div>

<div>
${radialChart(radialPoints)}
</div>



<style>
  .card {
        align-items: center;
        border: 1px solid black;
  }
  g[aria-label=area] path {fill-opacity: 0.1; transition: fill-opacity .2s;}
  g[aria-label=area]:hover path:not(:hover) {fill-opacity: 0.05; transition: fill-opacity .2s;}
  g[aria-label=area] path:hover {fill-opacity: 0.3; transition: fill-opacity .2s;}
</style>
 -->
