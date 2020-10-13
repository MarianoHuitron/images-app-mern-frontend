import { simpleFetch, tokenFetch } from "../services/fetch"
import { types } from "../types/types";
import { imagesLogout } from "./images";
import { uiRemoveError, uiSetError, uiStopLoading } from "./ui";

export const startRegister = ({name, email, password}) => {
    return async (dispatch) => {

        const resp = await simpleFetch('user/new', { name, email, password }, 'POST');
        const body = await resp.json();

        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
            dispatch( uiRemoveError() )
        } else {
            dispatch( uiSetError({
                errorForm: {
                    ok: true,
                    msg: body.msg
                }
            }));
        }
        dispatch( uiStopLoading() );

    }
}

export const startLogin = ({email, password}) => {
    return async (dispatch) => {
    
        const resp = await simpleFetch('user/login', { email, password }, 'POST');
        const body = await resp.json();
      
        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
            dispatch( uiRemoveError() )
        } else {
            dispatch( uiSetError({
                errorForm: {
                    ok: true,
                    msg: body.msg
                }
            }));
        }
        dispatch( uiStopLoading() );

    }
}

export const startChecking = () => {
    return async (dispatch) => {

        const resp = await tokenFetch('user/renew');
        const body = await resp.json();
        
        if(body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            dispatch( checkingFinish() );
        }

    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch( logout() );
        dispatch( imagesLogout() );
    }
}

export const checkingFinish = () => ({type: types.authCheckingFinish});


export const login = (user) => ({
    type: types.authLogin,
    payload: user
});

const logout = () => ({type: types.authLogout});
