import React, { useState } from 'react'
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "68ba9920f58c9669b5144bc1",
            "user": "68b94d6acb6bcfad6e51aef2",
            "title": "I am title",
            "description": "My Real Name is Disha Sahu",
            "tag": "personal",
            "date": "2025-09-05T08:02:40.692Z",
            "__v": 0
        },
        {
            "_id": "68c27f9f769c9cc4f7a119d2",
            "user": "68b94d6acb6bcfad6e51aef2",
            "title": "I am title",
            "description": "My Real Name is Disha Sahu",
            "tag": "personal",
            "date": "2025-09-11T07:51:59.196Z",
            "__v": 0
        }, {
            "_id": "68ba9920f58c9669b5144bc3",
            "user": "68b94d6acb6bcfad6e51aef2",
            "title": "I am title",
            "description": "My Real Name is Disha Sahu",
            "tag": "personal",
            "date": "2025-09-05T08:02:40.692Z",
            "__v": 0
        },
        {
            "_id": "68c27f9f769c9cc4f7a119d4",
            "user": "68b94d6acb6bcfad6e51aef2",
            "title": "I am title",
            "description": "My Real Name is Disha Sahu",
            "tag": "personal",
            "date": "2025-09-11T07:51:59.196Z",
            "__v": 0
        }, {
            "_id": "68ba9920f58c9669b5144bc5",
            "user": "68b94d6acb6bcfad6e51aef2",
            "title": "I am title",
            "description": "My Real Name is Disha Sahu",
            "tag": "personal",
            "date": "2025-09-05T08:02:40.692Z",
            "__v": 0
        },
        {
            "_id": "68c27f9f769c9cc4f7a119d6",
            "user": "68b94d6acb6bcfad6e51aef2",
            "title": "I am title",
            "description": "My Real Name is Disha Sahu",
            "tag": "personal",
            "date": "2025-09-11T07:51:59.196Z",
            "__v": 0
        }, {
            "_id": "68ba9920f58c9669b5144bc7",
            "user": "68b94d6acb6bcfad6e51aef2",
            "title": "I am title",
            "description": "My Real Name is Disha Sahu",
            "tag": "personal",
            "date": "2025-09-05T08:02:40.692Z",
            "__v": 0
        },
        {
            "_id": "68c27f9f769c9cc4f7a119d8",
            "user": "68b94d6acb6bcfad6e51aef2",
            "title": "I am title",
            "description": "My Real Name is Disha Sahu",
            "tag": "personal",
            "date": "2025-09-11T07:51:59.196Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)

    //Add a note
    const addNote = (title, description, tag) => {
        //ToDO API Calls
        console.log('Adding a note');
        const note = {
            "_id": "68c27f9f769c9cc4f7a139d8",
            "user": "68b94d6acb6bcfad6e51aef2",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-09-11T07:51:59.196Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }
    //Delete a note
    const deleteNote = (id) => {
        //TODO API Call 
        console.log('Deleting a note with id ' + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }
    //Edit a note
    const editNote = () => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState