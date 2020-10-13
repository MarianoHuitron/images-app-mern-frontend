import React from 'react';
import { mount } from "enzyme"
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk' 
import { HomePage } from '../../../pages/home/HomePage';
import { Provider } from 'react-redux';
import { types } from '../../../types/types';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const initState = {
    auth: {
        checking: false,
        user: {
            uid: '123',
            name: 'jose'
        }
    }
};
const store = mockStore(initState);

const wrapper = mount(
    <Provider store={ store } >
        <HomePage />
    </Provider>
);

describe('Testing <HomePagr />', () => {

    test('should to show the <HomePage />', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should to logout', () => {
        wrapper.find('button').prop('onClick')();
        const actions = store.getActions();
        expect( actions[0] ).toEqual({type: types.authLogout})
    })
    
    

})

