import { types } from "../types/types";


export const uiSetError = (msg) => ({ 
    type: types.uiSetError,
    payload: msg
});

export const uiSetLoading = () => ({type: types.uiSetLoading});
export const uiStopLoading = () => ({type: types.uiRemoveLoading});

export const uiRemoveError = () => ({ type: types.uiRemoveError});