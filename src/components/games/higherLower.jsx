import { useState, useEffect, useRef } from "npm:react";

const STAT_MAP = {
  // Tackles and Challenges
  Tackles_Tkl: "Tackles",
  Tackles_TklW: "Tackles Won",
  "Tackles_Def 3rd": "Tackles in Defensive Third",
  "Tackles_Mid 3rd": "Tackles in Midfield Third",
  "Tackles_Att 3rd": "Tackles in Attacking Third",
  Challenges_Tkl: "Challenges Tackles",
  Challenges_Att: "Challenges Attempted",
  "Challenges_Tkl%": "Challenges Tackle Percentage Won",
  Challenges_Lost: "Challenges Lost",

  // Blocks, Interceptions, and Errors
  Blocks_Blocks: "Total Blocks",
  Blocks_Sh: "Blocks on Shots",
  Blocks_Pass: "Blocks on Passes",
  Int: "Interceptions",
  "Tkl+Int": "Tackles Plus Interceptions",
  Clr: "Clearances",
  Err: "Errors",

  // Passing
  Total_Cmp: "Total Passes Completed",
  Total_Att: "Total Passes Attempted",
  "Total_Cmp%": "Total Pass Completion Percentage",
  Total_TotDist: "Total Pass Distance",
  Total_PrgDist: "Progressive Pass Distance",
  Short_Cmp: "Short Passes Completed",
  Short_Att: "Short Passes Attempted",
  "Short_Cmp%": "Short Pass Completion Percentage",
  Medium_Cmp: "Medium Passes Completed",
  Medium_Att: "Medium Passes Attempted",
  "Medium_Cmp%": "Medium Pass Completion Percentage",
  Long_Cmp: "Long Passes Completed",
  Long_Att: "Long Passes Attempted",
  "Long_Cmp%": "Long Pass Completion Percentage",
  Ast: "Assists",
  xAG: "Expected Assists Generated",
  Expected_xA: "Expected Assists",
  "Expected_A-xAG": "Expected Assists Minus xAG",
  KP: "Key Passes",
  "1/3": "Passes into Final Third",
  PPA: "Passes into Penalty Area",
  CrsPA: "Crosses into Penalty Area",
  PrgP: "Progressive Passes",

  // Touches
  Touches_Touches: "Touches",
  "Touches_Def Pen": "Touches in Defensive Penalty Area",
  "Touches_Def 3rd": "Touches in Defensive Third",
  "Touches_Mid 3rd": "Touches in Midfield Third",
  "Touches_Att 3rd": "Touches in Attacking Third",
  "Touches_Att Pen": "Touches in Attacking Penalty Area",
  Touches_Live: "Touches in Live Play",

  // Take-Ons
  "Take-Ons_Att": "Take-Ons Attempted",
  "Take-Ons_Succ": "Successful Take-Ons",
  "Take-Ons_Succ%": "Take-On Success Percentage",
  "Take-Ons_Tkld": "Take-Ons Tackled",
  "Take-Ons_Tkld%": "Take-On Tackled Percentage",

  // Carries
  Carries_Carries: "Carries",
  Carries_TotDist: "Carry Total Distance",
  Carries_PrgDist: "Progressive Carry Distance",
  Carries_PrgC: "Progressive Carries",
  "Carries_1/3": "Carries into Final Third",
  Carries_CPA: "Carries into Penalty Area",
  Carries_Mis: "Carries Miscontrolled",
  Carries_Dis: "Carries Dispossessed",

  // Receiving
  Receiving_Rec: "Passes Received",
  Receiving_PrgR: "Progressive Passes Received",

  // Standard Stats
  Standard_Gls: "Goals",
  Standard_Sh: "Shots",
  Standard_SoT: "Shots on Target",
  "Standard_SoT%": "Shots on Target Percentage",
  "Standard_Sh/90": "Shots per 90 Minutes",
  "Standard_SoT/90": "Shots on Target per 90 Minutes",
  "Standard_G/Sh": "Goals per Shot",
  "Standard_G/SoT": "Goals per Shot on Target",
  Standard_Dist: "Average Shot Distance",
  Standard_FK: "Free Kick Shots",
  Standard_PK: "Penalty Kicks Made",
  Standard_PKatt: "Penalty Kicks Attempted",
  Expected_xG: "Expected Goals",
  Expected_npxG: "Non-Penalty Expected Goals",
  "Expected_npxG/Sh": "Non-Penalty xG per Shot",
  "Expected_G-xG": "Goals Minus xG",
  "Expected_np:G-xG": "Non-Penalty Goals Minus xG",

  // Playing Time and Performance
  "Playing Time_MP": "Matches Played",
  "Playing Time_Starts": "Starts",
  "Playing Time_Min": "Minutes Played",
  "Playing Time_90s": "90-Minute Increments",
  Performance_Gls: "Goals",
  Performance_Ast: "Assists",
  "Performance_G+A": "Goals Plus Assists",
  "Performance_G-PK": "Non-Penalty Goals",
  Performance_PK: "Penalty Goals",
  Performance_PKatt: "Penalty Attempts",
  Performance_CrdY: "Yellow Cards",
  Performance_CrdR: "Red Cards",
  Expected_xG: "Expected Goals",
  Expected_npxG: "Non-Penalty Expected Goals",
  Expected_xAG: "Expected Assists",
  "Expected_npxG+xAG": "Non-Penalty xG + Expected Assists",
  Progression_PrgC: "Progressive Carries",
  Progression_PrgP: "Progressive Passes",
  Progression_PrgR: "Progressive Passes Received",

  // Per 90 Minutes
  "Per 90 Minutes_Gls": "Goals per 90 Minutes",
  "Per 90 Minutes_Ast": "Assists per 90 Minutes",
  "Per 90 Minutes_G+A": "Goals Plus Assists per 90 Minutes",
  "Per 90 Minutes_G-PK": "Non-Penalty Goals per 90 Minutes",
  "Per 90 Minutes_G+A-PK": "Non-Penalty Goals Plus Assists per 90 Minutes",
  "Per 90 Minutes_xG": "xG per 90 Minutes",
  "Per 90 Minutes_xAG": "Expected Assists per 90 Minutes",
  "Per 90 Minutes_xG+xAG": "xG Plus xAG per 90 Minutes",
  "Per 90 Minutes_npxG": "Non-Penalty xG per 90 Minutes",
  "Per 90 Minutes_npxG+xAG": "Non-Penalty xG Plus xAG per 90 Minutes",
};

function getNames(data, minutes) {
  const player_names = data
    .filter((d) => d["Playing Time_Min"] > minutes)
    .map((p) => p.player);
  return player_names;
}

export function HigherLower({ statsCategories }) {
  const names = getNames(statsCategories[0], 200);
  const [player1, setPlayer1] = useState(
    names[Math.floor(Math.random() * names.length)]
  );
  const [player2, setPlayer2] = useState(
    names[Math.floor(Math.random() * names.length)]
  );
  const [data, setData] = useState(
    statsCategories[Math.floor(Math.random() * statsCategories.length)]
  );
  const [stats, setStats] = useState(Object.keys(data[0]).slice(8));
  const [statToCompare, setStatToCompare] = useState(
    stats[Math.floor(Math.random() * stats.length)]
  );
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleGuess = async (chosenPlayer) => {
    if (gameOver || transitioning) return;
    // Reveal stats with fade-in effect
    setTransitioning(true);
    document.querySelectorAll(".game-stat").forEach((el) => {
      el.classList.remove("hidden");
      el.classList.add("visible");
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    transition(chosenPlayer);
    setTransitioning(false);
  };

  const transition = (chosenPlayer) => {
    // Determine correct player logic
    const player1Stat = data.filter((d) => d.player === player1)[0][
      statToCompare
    ];
    const player2Stat = data.filter((d) => d.player === player2)[0][
      statToCompare
    ];
    const correctPlayer =
      parseFloat(player1Stat ? player1Stat : 0) >
      parseFloat(player2Stat ? player2Stat : 0)
        ? player1
        : player2;

    if (chosenPlayer === correctPlayer || player1Stat === player2Stat) {
      setScore(score + 1);

      // Reset stats visibility
      document.querySelectorAll(".game-stat").forEach((el) => {
        el.classList.remove("visible");
        el.classList.add("hidden");
      });

      // Update players and stats for the next round
      const newPlayer = names[Math.floor(Math.random() * names.length)];
      if (chosenPlayer === player1) {
        setPlayer2(newPlayer);
      } else {
        setPlayer1(newPlayer);
      }
      const newData =
        statsCategories[Math.floor(Math.random() * statsCategories.length)];
      const newStats = Object.keys(newData[0]).slice(8);
      const newStatToCompare =
        newStats[Math.floor(Math.random() * newStats.length)];

      setData(newData);
      setStats(newStats);
      setStatToCompare(newStatToCompare);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setPlayer1(names[Math.floor(Math.random() * names.length)]);
    setPlayer2(names[Math.floor(Math.random() * names.length)]);
    setStatToCompare(stats[Math.floor(Math.random() * stats.length)]);
    setScore(0);
    setGameOver(false);
    document.querySelectorAll(".game-stat").forEach((el) => {
      el.classList.remove("visible");
      el.classList.add("hidden");
    });
  };

  return (
    <div>
      <h1>Higher or Lower</h1>
      <div className="grid grid-cols-2">
        <Player
          player={player1}
          stat={statToCompare}
          data={data}
          onClick={() => handleGuess(player1)}
        />
        <Player
          player={player2}
          stat={statToCompare}
          data={data}
          onClick={() => handleGuess(player2)}
        />
      </div>
      {gameOver ? (
        <div>
          <h2>Game Over! Your score: {score}</h2>
          <button onClick={resetGame}>New Game</button>
        </div>
      ) : (
        <div>
          <h2>Score: {score}</h2>
        </div>
      )}
    </div>
  );
}

function Player({ player, data, stat, onClick }) {
  const playerData = data.filter((d) => d.player === player)[0];
  return (
    <div class="card game-card">
      <h1>{player}</h1>
      <p>
        {STAT_MAP[stat]}:{" "}
        <span class="game-stat hidden">
          {playerData[stat] ? playerData[stat] : 0}
        </span>
      </p>
      <button onClick={onClick}>Higher</button>
    </div>
  );
}
