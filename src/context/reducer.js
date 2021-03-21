export const initialState = {
    user: null,
    currentRoom: {
        general: null,
        media: null
    },
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
                currentRoom: action.payload
            };
        
        default:
            return state;
    }
};

export default reducer;