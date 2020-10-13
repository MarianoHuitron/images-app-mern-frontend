import { uiReducer } from "../../reducers/uiReducer"
import { uiRemoveError, uiSetError, uiSetLoading, uiStopLoading } from '../../actions/ui';


const initialState = {
    errorForm: {
        ok: false,
        msg: null
    },
    loading: false
}

describe('uiReducer', () => {
    
    test('should to return de initialState', () => {
        const state = uiReducer(initialState, {});
        expect( state ).toEqual(initialState);
    });
    
    test('should to set and remove the error form', () => {
        const errorForm = uiSetError({
            errorForm: {
                ok: true,
                msg: 'Any error message'
            }
        });
        const state = uiReducer(initialState, errorForm);
        expect(state).toEqual({
            errorForm: {
                ok: true,
                msg: 'Any error message'
            },
            loading: false
        });

        const errorClean = uiRemoveError();
        const stateErrorRemove = uiReducer(state, errorClean);
        expect( stateErrorRemove ).toEqual(initialState);
    });

    test('should to startLoadin and StopLoading', () => {
        const startLoading = uiSetLoading();
        const state = uiReducer(initialState, startLoading);
        expect( state ).toEqual({
            errorForm: {
                ok: false,
                msg: null
            },
            loading: true
        });

        const stopLoading = uiStopLoading();
        const stateLoadingFalse = uiReducer(state, stopLoading);
        expect( stateLoadingFalse ).toEqual(initialState);
    })  

});
