export const initialState = {
    user: null,
    rooms: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };

        case 'SET_ROOMS':
            return {
                ...state,
                rooms: [action.payload, ...state.rooms]
            };
        
        default:
            return state;
    }
};

export default reducer;