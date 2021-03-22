export const initialState = {
    user: null,
    currentRoomId: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };

        case 'SET_ROOM':
            return {
                ...state,
                currentRoomId: action.payload
            };
        
        default:
            return state;
    }
};

export default reducer;