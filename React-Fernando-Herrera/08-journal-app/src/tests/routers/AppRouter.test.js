import React from "react";
import { mount } from 'enzyme';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom"; 
import Swal from 'sweetalert2';
import { act } from "react-dom/cjs/react-dom-test-utils.development";

import { AppRouter } from "../../routers/AppRouter";
import { login } from "../../actions/auth";
import { firebase } from "../../firebase/firebase-config";


jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'abc'
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();



describe('Pruebas en <AppRouter />', () => {
    
    test('debe de llamar el login si estoy autenticado ', async () => {
        
        let user;
        
        await act( async () => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@test.com', '123456');

            user = userCred.user;
            
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );

        });

        expect(login).toHaveBeenCalledWith("drx1nfdqA7XIMyaDryXSrSh093n2", null);
      
    })
    
  
})
