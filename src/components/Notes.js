import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, fetchAllNotes } = context;
    useEffect(() => {
        fetchAllNotes();
    }, [])

    return (
        <>
            <AddNote />
            <h2>Your Notes</h2>
            <div className="container-fluid row my-3">
                {notes.map((note) => {
                    return (
                        <NoteItem key={note._id} note={note} />
                    )
                })}
            </div>
        </>
    )
}

export default Notes