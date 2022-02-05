import React from "react";
import { mount } from 'enzyme';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNote } from "../../../actions/notes";

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '19a58YaV293XESUt1EZxJfW0Rzpy2',
        name: 'pepe'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'QNOp40h3shu6OP3slUQx',
            date: 1642955215207,
            title: 'Esta es una nota para Pepe',
            body: 'Hola pepe como estas?',
            url: 'https://res.cloudinary.com/dzk6hkcip/image/upload/v1642955249/ul8d2bcfy6drm16kqvho.jpg'
        },
        notes: []
    }
}

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <NoteScreen />
    </Provider>
)

describe('Pruebas en <NoteScreen />', () => {

    test('debe de mostrarse correctamente ', () => {

        expect(wrapper).toMatchSnapshot();

    });

    test('debe de disparar el active note', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        expect(activeNote).toHaveBeenLastCalledWith(
            'QNOp40h3shu6OP3slUQx',
            {
                body: 'Hola pepe como estas?',
                title: 'Hola de nuevo',
                id: 'QNOp40h3shu6OP3slUQx',
                date: 1642955215207,
                url: 'https://res.cloudinary.com/dzk6hkcip/image/upload/v1642955249/ul8d2bcfy6drm16kqvho.jpg'
            }
        )

    });


})
