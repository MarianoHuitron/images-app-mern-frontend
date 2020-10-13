import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types";


const initialState = {
    checking: true
}

describe('Testing authReducer', () => {
    test('should to return the initialState', () => {
        const state = authReducer(initialState, {});
        expect( state ).toEqual(initialState);
    });

    test('should to login and logout ', () => {
        const state = authReducer(initialState, {
            type: types.authLogin,
            payload: {
                uid: '123456',
                name: 'Ana'
            }
        });

        expect(state).toEqual({ checking: false, uid: '123456', name: 'Ana' });
        
        const stateLogout = authReducer(state, {type: types.authLogout});
        expect( stateLogout ).toEqual({checking: false});
    });
    
    
})
