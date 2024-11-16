// sharedState.js
export const playerState = {
        player1ID: "534670",
        player2ID: "534670"
    };

export const playerStateEvent = new EventTarget();

export function setPlayerID(playerNumber, id) {
playerState[`player${playerNumber}ID`] = id;
playerStateEvent.dispatchEvent(new CustomEvent("playerIDUpdate", {
        detail: { playerNumber, id }
}));
}
