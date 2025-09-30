import React, { useContext, useEffect, useState, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, fetchAllNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: '', etag: '' })
    const ref = useRef(null)
    const refClose = useRef(null)

    useEffect(() => {
        fetchAllNotes();
        // eslint-disable-next-line
    }, [])
    
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote />
            {/* Modal Start */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="form-group">
                                    <label htmlFor="etitle">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' placeholder="Enter Title" onChange={onChange} value={note.etitle} minLength={5} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edescription">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' placeholder="Enter Description" value={note.edescription} onChange={onChange} minLength={5}  required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="etag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' placeholder="Enter Tag" value={note.etag} onChange={onChange} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal End */}
            <h2>Your Notes</h2>
            <div className="container-fluid row my-3">
                {notes.map((note) => {
                    return (
                        <NoteItem key={note._id} updateNote={updateNote} note={note} />
                    )
                })}
            </div>
        </>
    )
}

export default Notes