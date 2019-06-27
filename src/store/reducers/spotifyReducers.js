const spotifyReducerDefaultState = {
    access_token : undefined
}

const spotifyReducer = (state = spotifyReducerDefaultState, action) => {
    switch(action.type) {
        case 'RECIVED_ACCESS_TOKEN': {
            return {...state, access_token : action.access_token};
        }
        default :{
            return state;
        }
    }
}