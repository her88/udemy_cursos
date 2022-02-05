import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas con las acciones de auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('login y logout deben de crear la accion respectiva ', () => {

        const uid = '123adc';
        const displayName = 'hernan';

        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        expect(loginAction).toMatchObject({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        expect(logoutAction).toEqual({
            type: types.logout
        });
    });

    test('debe de realizar el startlogout', async () => {

        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutClening
        });

    });

    test('debe de iniciar el startLoginEmailPassword', async () => {

        const email = 'test@test.com';
        await store.dispatch(startLoginEmailPassword(email, '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiStartLoading
        });

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'drx1nfdqA7XIMyaDryXSrSh093n2',
                displayName: email
            }
        });

        expect(actions[2]).toEqual({
            type: types.uiFinishLoading
        });

    });



});
