export const playerState = {
        player1ID: "13",
        player1Name: "Martin Ødegaard",
        player2ID: "13",
        player2Name: "Martin Ødegaard"
    };

export const playerStateEvent = new EventTarget();

export function setPlayerID(playerNumber, id) {
playerState[`player${playerNumber}ID`] = id;
playerStateEvent.dispatchEvent(new CustomEvent("playerIDUpdate", {
        detail: { playerNumber, id }
        }));
        //console.log(playerState);
}

export function setPlayerName(playerNumber, name) {
        playerState[`player${playerNumber}Name`] = name;
        playerStateEvent.dispatchEvent(new CustomEvent("playerNameUpdate", {
                detail: { playerNumber, name }
        }));
}

