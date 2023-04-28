const initialState = {
    isLoading: false
}

interface setIsLoading {
    type: 'SET_IS_LOADING_STATE',
    payload: boolean
}

type action = setIsLoading;

const CommonReducer = (state = initialState, action: action) => {
   switch (action.type) {
    case 'SET_IS_LOADING_STATE': {
        return {
            ...state,
            isLoading: action.payload
        }
    }
   
    default:
        return state;
   }
};

export default CommonReducer;

export const SetIsLoadingState = (state: boolean): setIsLoading => {
    return {
        type: 'SET_IS_LOADING_STATE',
        payload: state
    }
}