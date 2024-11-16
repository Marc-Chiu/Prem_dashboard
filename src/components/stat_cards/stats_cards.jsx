import * as React from "npm:react";
import {useState, useEffect} from "npm:react";
import d3 from "npm:d3";
import { setPlayerID } from "../../sharedState.js";

export function StatsComponent({ playerNumber, standardData, passingData, defenseData, possessionData, shootingData, IDs}) {
        const defaultPlayerID = "10863";
        const defaultName = "Martin Ødegaard";
        const [selectedPlayerID, setSelectedPlayerID] = useState(defaultPlayerID);
        const [selectedPlayerName, setSelectedPlayerName] = useState(defaultName);

        const handleSelectChange = (event) => {
                const selectedOptions = event.target.selectedOptions[0];
                const id = selectedOptions.value;
                const name = selectedOptions.getAttribute("data-name");
                setSelectedPlayerID(id);
                setSelectedPlayerName(name);
                setPlayerID(playerNumber, id)
        };

        return (
        <div>
                <div className="card dropdown grid-colspan-2" id={selectedPlayerName}>
                        <select onChange={handleSelectChange} value={selectedPlayerID} id="player">
                        <option value="">{selectedPlayerName}</option>
                        {IDs.map((player) => (
                                <option key={player["Player ID"]} value={player["Player ID"]} data-name={player["Player Name"]}>
                                {player["Player Name"]}
                                </option>
                        ))}
                        </select>
                        <p>Position</p>
                </div>
                <div class="grid grid-cols-2">
                        <TopStatsCard standardData={standardData} player={selectedPlayerName}></TopStatsCard>
                        <AttackStatsCard shootingData={shootingData} passingData={passingData} player={selectedPlayerName}></AttackStatsCard>
                        <DefenseStatsCard defenseData={defenseData} player={selectedPlayerName}></DefenseStatsCard>
                        <DribblingStatsCard possessionData={possessionData} player={selectedPlayerName}></DribblingStatsCard>
                </div>
        </div>
  );
}

function TopStatsCard({ standardData, player}){
        const data = standardData.filter(d => d.player == player)[0];
        console.log(player);
        return (
                <div className="TopStatsCard card">
                        <table className="statsTable">
                                <thead>
                                        <tr><th>Top Stats</th></tr>
                                </thead>
                                <tbody>
                                        <tr><td>Matches Played: <div class="value">{data["Playing Time_MP"]}</div></td></tr>
                                        <tr><td>Matches Started: <div class="value">{data["Playing Time_Starts"]}</div></td></tr>
                                        <tr><td>Minutes Played: <div class="value">{data["Playing Time_Min"]}</div></td></tr>
                                        <tr><td>Goals: <div class="value">{data["Performance_Gls"]}</div></td></tr>
                                        <tr><td>Assists: <div class="value">{data["Performance_Ast"]}</div></td></tr>
                                        <tr><td>Xg: <div class="value">{data["Expected_xG"]}</div></td></tr>
                                        <tr><td>Xa: <div class="value">{data["Expected_xAG"]}</div></td></tr>
                                        <tr><td>Progressive Passes: <div class="value">{data["Progression_PrgP"]}</div></td></tr>
                                        <tr><td>Progressive Runs: <div class="value">{data["Progression_PrgR"]}</div></td></tr>
                                        <tr><td>Progressive Carries: <div class="value">{data["Progression_PrgC"]}</div></td></tr>
                                </tbody>
                        </table>
                </div>
        );
}

function AttackStatsCard({ shootingData, passingData, player }) {
        const passing = passingData.filter(d => d.player == player)[0];
        const shooting = shootingData.filter(d => d.player == player)[0];
        return (
        <div className="AttackStatsCard card">
                <table className="statsTable">
                        <thead>
                                <tr><th>Attacking Stats</th></tr>
                        </thead>
                        <tbody>
                                <tr><td>Shots Accuracy: <div class="value">{shooting["Standard_SoT"]} of {shooting["Standard_Sh"]}</div></td></tr>
                                <tr><td>Passes Accuracy: <div class="value">{passing["Total_Cmp"]} of {passing["Total_Att"]}</div></td></tr>
                                <tr><td>Short Passes: <div class="value">{passing["Short_Cmp"]} of {passing["Short_Att"]}</div></td></tr>
                                <tr><td>Medium Passes: <div class="value">{passing["Medium_Cmp"]} of {passing["Medium_Att"]} </div></td></tr>
                                <tr><td>Long Passes: <div class="value">{passing["Long_Cmp"]} of {passing["Long_Att"]}</div> </td></tr>
                                <tr><td>Progressive Passes: <div class="value">{passing["PPA"]}</div></td></tr>
                                <tr><td>Non Penalty xG: <div class="value">{shooting["Expected_npxG"]}</div></td></tr>
                        </tbody>
                </table>
        </div>
        );
}

function DribblingStatsCard({ possessionData, player}) {
        const data = possessionData.filter(d => d.player == player)[0];
        return (
        <div className="DuelStatsCard card">
                <table className="statsTable">
                        <thead>
                                <tr><th>Dribbling Stats</th></tr>
                        </thead>
                        <tbody>
                                <tr><td>Touches: <div class="value">{data["Touches_Touches"]}</div></td></tr>
                                <tr><td>Final Third Touches: <div class="value">{data["Touches_Att 3rd"]}</div></td></tr>
                                <tr><td>Opp Penalty Touches: <div class="value">{data["Touches_Att Pen"]}</div></td></tr>
                                <tr><td>Successful Dribbles: <div class="value"> {data["Take-Ons_Succ"]} of {data["Take-Ons_Att"]}</div></td></tr>
                                <tr><td>Carries: <div class="value"> {data["Carries_Carries"]}</div></td></tr>
                                <tr><td>Progressive Carries <div class="value">{data["Carries_PrgC"]}</div></td></tr>
                        </tbody>
                </table>
        </div>
        );
}

function DefenseStatsCard({ defenseData, player }) {
        const data = defenseData.filter(d => d.player == player)[0];
        return (
        <div className="DefenseStatsCard card">
                <table className="statsTable">
                        <thead>
                                <tr><th>Defensive Stats</th></tr>
                        </thead>
                        <tbody>
                                <tr><td>Tackles Won <div class="value">{data["Tackles_TklW"]} of {data["Tackles_TklW"]} </div></td></tr>
                                <tr><td>Blocked Shots<div class="value">{data["Blocks_Sh"]}</div></td></tr>
                                <tr><td>Interceptions: <div class="value">{data["Int"]}</div></td></tr>
                                <tr><td>Clearances: <div class="value">{data["Clr"]}</div></td></tr>
                                <tr><td>Errors: <div class="value">{data["Err"]}</div></td></tr>
                        </tbody>
                </table>
        </div>
        );
}
