import { types } from "../types/types";

const initialState = {
    errorForm: {
        ok: false,
        msg: null
    },
    loading: false
}

export const uiReducer = (state = initialState, action ) => {

    switch (action.type) {
       
        case types.uiSetError:
            return {
                ...state,
                ...action.payload
            }

        case types.uiRemoveError:
            return initialState;
        
        case types.uiSetLoading:
            return {
                ...state,
                loading: true
            }
        
        case types.uiRemoveLoading:
            return {
                ...state,
                loading: false
            }
    
        default:
            return state;
    }

}