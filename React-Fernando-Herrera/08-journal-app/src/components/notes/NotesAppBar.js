import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector(state => state.notes);

    const noteDate = moment(note.date);

    const handleUpdateNote = () => {
        dispatch(startSaveNote(note));
    }

    const handlePicture = () => {
       document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if( file ) {
            dispatch( startUploading(file));
        }
    }

    return (
        <div className="notes_appbar">
            <span>{`${noteDate.format('D')} ${noteDate.format('MMMM')} ${noteDate.format('YYYY')} `}</span>

            <input 
                id="fileSelector"
                type="file"
                name="file"
                style={{display: 'none'}}
                onChange={ handleFileChange }
            />

            <div>
                <button className="btn" onClick={ handlePicture }>
                    Picture
                </button>

                <button className="btn" onClick={ handleUpdateNote }>
                    Save
                </button>
            </div>
        </div>
    )
}
