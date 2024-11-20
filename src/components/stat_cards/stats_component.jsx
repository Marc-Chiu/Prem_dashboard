import * as React from "npm:react";
import {useState, useEffect} from "npm:react";
import { useDispatch, useSelector } from "npm:react-redux";
import { TopStatsCard, AttackStatsCard, DribblingStatsCard, DefenseStatsCard } from "./stats_cards.js";
import store from '../../redux/store.js';
import { updatePlayerID, updatePlayerName } from '../../redux/actions.js';

const POSITION_MAP = {
        "DF": "Defender",
        "FW": "Forward",
        "MF": "Midfielder",
        "GK": "Goalkeeper",
        "DF,FW": "Defender, Forward",
        "DF,MF": "Defender, Midfielder",
        "FW,MF": "Forward, Midfielder",
        "MF,FW": "Midfielder, Forward",
        "MF,DF": "Midfielder, Defender",
        "FW,DF": "Forward, Defender",
};

export function StatsComponent({ playerNumber, standardData, passingData, defenseData, possessionData, shootingData, IDs}) {
        const state = store.getState();
        const [selectedPlayerID, setSelectedPlayerID] = useState(state[`player${playerNumber}ID`]);
        const [selectedPlayerName, setSelectedPlayerName] = useState(state[`player${playerNumber}Name`]);

        const defaultData = standardData.filter((d) => d.player === selectedPlayerName);

        const [team, setTeam] = useState(defaultData[0].team);
        const [position, setPosition] = useState(POSITION_MAP[defaultData[0].pos]);

        const handleSelectChange = (event) => {
                const selectedOptions = event.target.selectedOptions[0];
                const id = selectedOptions.getAttribute("data-id");
                const name = selectedOptions.getAttribute("data-name");
                if (name) {
                        setSelectedPlayerID(id);
                        setSelectedPlayerName(name);
                        const data = standardData.filter((d) => d.player === name);
                        setTeam(data[0].team);
                        setPosition(POSITION_MAP[data[0].pos]);
                        store.dispatch(updatePlayerID(playerNumber, id));
                        store.dispatch(updatePlayerName(playerNumber, name));
                }
        };

        return (
        <div>
                <div class="card dropdown grid-colspan-2" id={selectedPlayerName}>
                        <select onChange={handleSelectChange} value={selectedPlayerID} id="player">
                        <option value="">{selectedPlayerName}</option>
                        {IDs.map((player) => (
                                <option key={player["Player ID"]} data-id={player["Player ID"]} data-name={player["Player Name"]}>
                                {player["Player Name"]}
                                </option>
                        ))}
                        </select>
                        <div class="details">
                        <p>{team}</p>
                        <p>{position}</p>
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

