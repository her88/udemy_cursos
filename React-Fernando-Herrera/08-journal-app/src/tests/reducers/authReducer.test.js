import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {

    test('debe de realizar el login ', () => {
        const initialState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'pepe'
            }
        };

        const state = authReducer(initialState, action);

        expect(state).toEqual({
            uid: 'abc',
            name: 'pepe'
        });
    });

    test('debe de realizar el logout ', () => {
        const initialState = {
            uid: 'abc',
            name: 'pepe'
        };

        const action = {
            type: types.logout
        };

        const state = authReducer(initialState, action);

        expect(state).toEqual({});
    });

    test('debe de retornar el default state ', () => {
        const initialState = {};

        const action = {
            type: 'default'
        };

        const state = authReducer(initialState, action);

        expect(state).toEqual(initialState);
    });



})
