import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input type="text" placeholder="Some awesome title" className="notes__title-input" autoComplete="off"/>

                <textarea placeholder="What happend today" className="notes__textarea">
                    
                </textarea>

                <div className="note__images">
                    <img  
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxFPqXmWa3ue-WYt2JhvSnydK5UNUYEzBKJQ&usqp=CAU" 
                        alt="imagen"/>

                </div>

            </div>
            
        </div>
    )
}
