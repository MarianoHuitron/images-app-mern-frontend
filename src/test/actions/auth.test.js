import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startChecking, startLogin, startLogout, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../services/fetch';

const middleware = [thunk];
const mockStore = configureStore(middleware);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();
Storage.prototype.clear = jest.fn();

let token = '';

describe('testing auth actions', () => {
    
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    test('startLoging works ', async () => {
        const email = 'test@test.com';
        const password = '123456';

        await store.dispatch( startLogin({email, password}) );
        const actions = store.getActions();
   
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
        token = localStorage.setItem.mock.calls[0][1];
    });

    test('startLogin incorrect', async () => {
        const email = 'test@test.com';
        const password = '123456s';

        await store.dispatch( startLogin({email, password}) );
        const actions = store.getActions();
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: {
                errorForm: {
                    ok: true,
                    msg: expect.any(String)
                }
            }
        });
   
    })
    

    test('startRegister works', async () => {
        const email = 'test@test.com';
        const password = '123456';

        fetchModule.simpleFetch = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '1234',
                    name: 'Jose',
                    token: '54248213s'
                }
            }
        }));

        await store.dispatch( startRegister({email, password}) );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '1234',
                name: 'Jose'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', '54248213s');
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });

    test('startChecking works', async () => {
        fetchModule.tokenFetch = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '1234',
                    name: 'Jose',
                    token: '54248213s'
                }
            }
        }));

        await store.dispatch( startChecking() );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '1234',
                name: 'Jose'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', '54248213s');
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });
    
    test('startLogout works', async () => {
        await store.dispatch( startLogout() );
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.authLogout
        });

        expect( localStorage.clear ).toHaveBeenCalled();
    }); 
    

    
});
