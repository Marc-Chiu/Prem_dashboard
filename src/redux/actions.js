export const updatePlayerID = (playerNumber, id) => ({
        type: 'UPDATE_PLAYER_ID',
        payload: { playerNumber, id },
});

export const updatePlayerName = (playerNumber, name) => ({
        type: 'UPDATE_PLAYER_NAME',
        payload: { playerNumber, name },
});
