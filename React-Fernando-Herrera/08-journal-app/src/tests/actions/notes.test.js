 /** * @jest-environment node */


import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from "../../actions/notes";
import { db } from "../../firebase/firebase-config";
import { types } from "../../types/types";
import { fileUpload } from "../../helpers/fileUpload";

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '3BvJR5XKPr39Ovmlbnyc',
            title: 'Hola2',
            body: 'Mundo2'
        }
    }
}

let store = mockStore(initState)

describe('Pruebas con las acciones de notes', () => {

    // el before se va a ejecutar antes de cada test
    beforeEach(() => {
        store = mockStore(initState);
    });
  
    test('debe de crear una nueva nota startNewNote', async () => {      
        
        await store.dispatch(startNewNote());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        actions.forEach( async (action) => {
            const { id } = action.payload;
            await db.doc(`/TESTING/journal/notes/${id}`).delete();
        });      

    })

    test('startLoadingNotes debe cargar las notas', async () => {

        await store.dispatch(startLoadingNotes('TESTING'));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }        
      
        actions.forEach((action) => {
            action.payload.forEach((elem) => {
                expect(elem).toMatchObject(expected);
            })
        })
    })

    test('startSaveNote debe de actualizar la nota', async () => {

        const note = {
            id: '3BvJR5XKPr39Ovmlbnyc',
            title: 'titulo',
            body: 'body'
        }

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdated);
        expect(actions[0].payload).toMatchObject(note);

        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

        expect(docRef.data().title).toBe(note.title);
      
    })
    
    test('startUploading debe de actualizar el url del entry', async () => {
      
        fileUpload.mockReturnValue('https://hola-mundo.com/cosa.jpg');
        const file = [];
        await store.dispatch(startUploading(file));

        const docRef = await db.doc(`/TESTING/journal/notes/3BvJR5XKPr39Ovmlbnyc`).get();
        expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg');
    })
    
    
});
