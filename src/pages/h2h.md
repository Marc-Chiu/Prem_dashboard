---
title: League Overview
toc: false
---

```js
import {LeagueSummaryComponent} from "../components/h2hSummary/summary.js";
```

```jsx
const statsRoot = document.getElementById("summary-root");
const root = ReactDOM.createRoot(statsRoot);

root.render(
        <div class="grid grid-cols-1">
                <LeagueSummaryComponent></LeagueSummaryComponent>
        </div>
);
```

<div id="main-content">
        <div id="summary-root"></div>
</div>


<style>
        #leagueID {
                padding: 5px;
                margin-right: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
        }

        #leagueButton {
                padding: 5px 10px;
                background-color: grey;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
        }

        #leagueButton:hover {
                background-color: black;
        }
</style>