const initialState = {
        player1ID: "13",
        player1Name: "Martin Ødegaard",
        player2ID: "13",
        player2Name: "Martin Ødegaard",
      };

export default function playerReducer(state = initialState, action) {
        switch (action.type) {
                case 'UPDATE_PLAYER_ID':
                        return {
                                ...state,
                                [`player${action.payload.playerNumber}ID`]: action.payload.id,
        };

        case 'UPDATE_PLAYER_NAME':
                return {
                        ...state,
                        [`player${action.payload.playerNumber}Name`]: action.payload.name,
        };

        default:
                return state;
        }
}
