import * as React from "npm:react";
import {useState, useEffect} from "npm:react";
import {FileAttachment} from "observablehq:stdlib";
import d3 from "npm:d3";
import { setPlayerID } from "../../sharedState.js";

async function loadPlayerData() {
        const data = await FileAttachment("../../data/aggregated_data.json").json();
        return data
}

async function loadPlayerIDs() {
        const IDs = await FileAttachment("../../data/playerIds.csv").csv();
        return IDs
}

export function NameCard({ playerNumber }) {
        const defaultPlayerID = "534670";
        const [IDs, setIDs] = useState([]);
        const [allPlayerData, setAllPlayerData] = useState([]);
        const [selectedPlayerID, setSelectedPlayerID] = useState(defaultPlayerID);
        const [selectedPlayerName, setSelectedPlayerName] = useState("Martin Odegaard");
        const [playerData, setPlayerData] = useState(null);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
                async function fetchData() {
                        setIsLoading(true);
                        const loadedIDs = await loadPlayerIDs();
                        setIDs(loadedIDs);

                        const loadedPlayerData = await loadPlayerData();
                        setAllPlayerData(loadedPlayerData);

                        const selectedPlayerData = loadedPlayerData[selectedPlayerID];
                        setPlayerData(selectedPlayerData);

                        setIsLoading(false);
                }
                fetchData();
        }, []);

        useEffect(() => {
                const selectedPlayerData = allPlayerData[selectedPlayerID];
                setPlayerData(selectedPlayerData);
                console.log(selectedPlayerID);


        }, [IDs, selectedPlayerID]);

        const handleSelectChange = (event) => {
                const selectedOptions = event.target.selectedOptions[0];
                const id = selectedOptions.value;
                const name = selectedOptions.getAttribute("data-name");
                setSelectedPlayerID(id);
                setSelectedPlayerName(name);
                setPlayerID(playerNumber, id)
        };


        if (isLoading) {
                return <div>Loading...</div>;
              }

        return (
        <div>
                <div className="card dropdown grid-colspan-2" id={selectedPlayerName}>
                        <select onChange={handleSelectChange} value={selectedPlayerID} id="player">
                        <option value="">Select a player</option>
                        {IDs.map((player) => (
                                <option key={player["Player Name"]} value={player["Player ID"]} data-name={player["Player Name"]}>
                                {player["Player Name"]}
                                </option>
                        ))}
                        </select>
                        <p>Position</p>
                </div>
                <div class="grid grid-cols-2">
                        <TopStatsCard data={playerData}></TopStatsCard>
                        <AttackStatsCard data={playerData}></AttackStatsCard>
                        <DefenseStatsCard data={playerData}></DefenseStatsCard>
                        <DuelStatsCard data={playerData}></DuelStatsCard>
                </div>
        </div>
  );
}

function TopStatsCard({ data }){
        return (
                <div className="TopStatsCard card">
                        <table className="statsTable">
                                <thead>
                                        <tr><th>Top Stats</th></tr>
                                </thead>
                                <tbody>
                                        <tr><td>Avg Rating: <div class="value">{data["Top stats"]["FotMob rating"].toFixed(2)}</div></td></tr>
                                        <tr><td>Minutes Playes: <div class="value">{data["Top stats"]["Minutes played"]}</div></td></tr>
                                        <tr><td>Goals: <div class="value">{data["Top stats"]["Goals"]}</div></td></tr>
                                        <tr><td>Assists: <div class="value">{data["Top stats"]["Assists"]}</div></td></tr>
                                        <tr><td>Chances Created: <div class="value">{data["Top stats"]["Chances created"]}</div></td></tr>
                                        <tr><td>Xg: <div class="value">{data["Top stats"]["Expected goals (xG)"].toFixed(2)}</div></td></tr>
                                        <tr><td>Xa: <div class="value">{data["Top stats"]["Expected assists (xA)"].toFixed(2)}</div></td></tr>
                                        <tr><td>Fantasy Points: <div class="value">{data["Top stats"]["Fantasy points"]}</div></td></tr>
                                        <tr><td>Games: <div class="value">{data["games_played"]}</div></td></tr>
                                </tbody>
                        </table>
                </div>
        );
}

function AttackStatsCard({ data }){
        return (
        <div className="AttackStatsCard card">
                <table className="statsTable">
                        <thead>
                                <tr><th>Attacking Stats</th></tr>
                        </thead>
                        <tbody>
                                <tr><td>Shots Accuracy:
                                        <div class="value">
                                        {data["Attack stats"]["Shot accuracy"]["value"]} of {data["Attack stats"]["Shot accuracy"]["total"]}
                                        </div>
                                </td></tr>
                                <tr><td>Passes Accuracy:
                                        <div class="value">
                                        {data["Top stats"]["Accurate passes"]["value"]} of {data["Top stats"]["Accurate passes"]["total"]}
                                        </div>
                                </td></tr>
                                <tr><td>Cross Accuracy
                                        <div class="value">
                                        {data["Attack stats"]["Accurate crosses"]["value"]} of {data["Attack stats"]["Accurate crosses"]["total"]}
                                        </div>
                                </td></tr>
                                <tr><td>Long Ball Accuracy
                                        <div class="value">
                                        {data["Attack stats"]["Accurate long balls"]["value"]} of {data["Attack stats"]["Accurate long balls"]["total"]}
                                        </div>
                                </td></tr>
                                <tr><td>Passes into Final Third <div class="value">{data["Attack stats"]["Passes into final third"]}</div></td></tr>
                                <tr><td>Touches: <div class="value">{data["Attack stats"]["Touches"]}</div></td></tr>
                                <tr><td>Touches in opposition box: <div class="value">{data["Attack stats"]["Touches in opposition box"]}</div></td></tr>
                                <tr><td>Sucessful Dribbles:
                                        <div class="value">
                                        {data["Attack stats"]["Successful dribbles"]["value"]} of {data["Attack stats"]["Successful dribbles"]["total"]}
                                        </div>
                                </td></tr>
                                <tr><td>Dispossed: <div class="value">{data["Attack stats"]["Dispossessed"]}</div></td></tr>
                        </tbody>
                </table>
        </div>
        );
}

function DuelStatsCard({ data }) {
        return (
        <div className="DuelStatsCard card">
                <table className="statsTable">
                        <thead>
                                <tr><th>Duels Stats</th></tr>
                        </thead>
                        <tbody>
                                <tr><td>Duels Won: <div class="value">{data["Duels"]["Duels won"]}</div></td></tr>
                                <tr><td>Duels Lost<div class="value">{data["Duels"]["Duels lost"]}</div></td></tr>
                                <tr><td>Aerial Duels Won:
                                        <div class="value">
                                        {data["Duels"]["Aerial duels won"]["value"]} of {data["Duels"]["Aerial duels won"]["total"]}
                                        </div>
                                </td></tr>
                                <tr><td>Ground Duels Won:
                                        <div class="value"> {data["Duels"]["Ground duels won"]["value"]} of {data["Duels"]["Ground duels won"]["total"]}</div>
                                </td></tr>
                                <tr><td>Was Fouled: <div class="value">{data["Duels"]["Was fouled"]}</div></td></tr>
                                <tr><td>Fouls Commited: <div class="value">{data["Duels"]["Fouls committed"]}</div></td></tr>
                        </tbody>
                </table>
        </div>
        );
}

function DefenseStatsCard({ data }) {
        return (
        <div className="DefenseStatsCard card">
                <table className="statsTable">
                        <thead>
                                <tr><th>Defensive Stats</th></tr>
                        </thead>
                        <tbody>
                                <tr><td>Tackles Won
                                        <div class="value">
                                        {data["Defense stats"]["Tackles won"]["value"]} of {data["Defense stats"]["Tackles won"]["total"]}
                                        </div>
                                </td></tr>
                                <tr><td>Blocks<div class="value">{data["Defense stats"]["Blocks"]}</div></td></tr>
                                <tr><td>Interceptions: <div class="value">{data["Defense stats"]["Interceptions"]}</div></td></tr>
                                <tr><td>Recoveries: <div class="value">{data["Defense stats"]["Recoveries"]}</div></td></tr>
                                <tr><td>Drbbled Past: <div class="value">{data["Defense stats"]["Dribbled past"]}</div></td></tr>
                        </tbody>
                </table>
        </div>
        );
}
