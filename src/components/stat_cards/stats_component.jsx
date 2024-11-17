import * as React from "npm:react";
import {useState, useEffect} from "npm:react";
import d3 from "npm:d3";
import { setPlayerID } from "../../sharedState.js";
import { TopStatsCard, AttackStatsCard, DribblingStatsCard, DefenseStatsCard } from "./stats_cards.js";

export function StatsComponent({ playerNumber, standardData, passingData, defenseData, possessionData, shootingData, IDs}) {
        const defaultPlayerID = "10863";
        const defaultName = "Martin Ødegaard";
        const [selectedPlayerID, setSelectedPlayerID] = useState(defaultPlayerID);
        const [selectedPlayerName, setSelectedPlayerName] = useState(defaultName);

        const handleSelectChange = (event) => {
                const selectedOptions = event.target.selectedOptions[0];
                const id = selectedOptions.value;
                const name = selectedOptions.getAttribute("data-name");
                if (name) {
                        setSelectedPlayerID(id);
                        setSelectedPlayerName(name);
                        setPlayerID(playerNumber, id)
                }
        };

        return (
        <div>
                <div class="card dropdown grid-colspan-2" id={selectedPlayerName}>
                        <select onChange={handleSelectChange} value={selectedPlayerID} id="player">
                        <option value="">{selectedPlayerName}</option>
                        {IDs.map((player) => (
                                <option key={player["Player ID"]} value={player["Player ID"]} data-name={player["Player Name"]}>
                                {player["Player Name"]}
                                </option>
                        ))}
                        </select>
                        <div class="details">
                        <p>Position</p>
                        <p>Team</p>
                        </div>
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

