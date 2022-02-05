import { db } from "../firebase/firebase-config"


export const loadNotes = async (uid) => {

    //const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
    const ref = await db.collection(`${ uid }/journal/notes`);
    const notesSnap = await ref.orderBy('date', 'desc').get();
    const notes = [];

    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    return notes;
}