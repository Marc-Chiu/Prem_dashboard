import { playerState } from "../../sharedState";
import {useState, useEffect} from "npm:react";

export function FantasyComponent({ playerNumber }) {
        const [player, setPlayer] = useState(playerState[`player${playerNumber}Name`]);
        const [playerID, setPlayerID] = useState(playerState[`player${playerNumber}ID`]);

        useEffect(() => {
                console.log(player, playerID);
        }, [playerID]);
}