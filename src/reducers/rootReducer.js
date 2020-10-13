import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { imageReducer } from "./imageReducr";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    images: imageReducer,
});