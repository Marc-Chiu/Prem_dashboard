---
title: Games
toc: false
---

```js
import{HigherLower} from "/components/games/higherLower.js";
import * as React from "npm:react";

const standard_data = await FileAttachment("/fbrefData/player_standard.csv").csv();
const passing_data = await FileAttachment("/fbrefData/player_passing.csv").csv();
const defense_data = await FileAttachment("/fbrefData/player_defense.csv").csv();
const possession_data = await FileAttachment("/fbrefData/player_possession.csv").csv();
const shooting_data = await FileAttachment("/fbrefData/player_shooting.csv").csv();
const IDs = await FileAttachment("data/playerIds.csv").csv();
```

  <!-- <div id="Games-header" class="grid grid-cols-4">
                        <button class="card clicked">Daily Challenge</button>
                        <button class="card">Higher Lower</button>
                </div> -->

```jsx
const statsRoot = document.getElementById("games-root");
const root = ReactDOM.createRoot(statsRoot);

root.render(
        <div>

                <HigherLower
                statsCategories={[standard_data, passing_data, defense_data, possession_data, shooting_data]}
                >
                </HigherLower>
        </div>
);
```

<div id="main-content">
        <div id="games-root"></div>
</div>

<style>
        .card {
                background-color: #f0f0f0;
                border: 1px solid #ccc;
                padding: 10px;
                cursor: pointer;
        }

        .card.clicked {
                background-color: #d0d0d0;
                border-color: #999;
        }
</style>

<!-- <script>
        document.querySelectorAll('.card').forEach(button => {
                button.addEventListener('click', () => {
                        document.querySelectorAll('.card').forEach(btn => btn.classList.remove('clicked'));
                        button.classList.add('clicked');
                });
        });
</script> -->