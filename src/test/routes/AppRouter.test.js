import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import '@testing-library/jest-dom';
import { AppRouter } from '../../routes/AppRouter';

const middlewares = [thunk];
const mockstore = configureStore(middlewares);

describe('Testing <AppRouter />', () => {
    
    test('loading...', () => {
        
        const initState = {
            auth: {
                checking: true
            }
        };
        const store = mockstore(initState);

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        )
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('Public routes', () => {
        const initState = {
            auth: {
                checking: false
            },
            ui: {
                errorForm: {}      
            }
        };
        const store = mockstore(initState);

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        )
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('form').exists() ).toBe(true);
    });

    test('Private routes', () => {
        const initState = {
            auth: {
                checking: false,
                uid: '123',
                name: 'Jose'
            },
            ui: {
                errorForm: {}      
            }
        };
        const store = mockstore(initState);

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        )
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('img').exists() ).toBe(true);
    })
    
    

})
