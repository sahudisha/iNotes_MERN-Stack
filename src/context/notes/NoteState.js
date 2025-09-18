import React, { useState } from 'react'
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    const host = 'http://localhost:5000/api'
    const [notes, setNotes] = useState([])

    //Fetch all notes
    const fetchAllNotes = async () => {
        const response = await fetch(`${host}/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhiOTRkNmFjYjZiY2ZhZDZlNTFhZWYyIn0sImlhdCI6MTc1Njk3NDQ0Mn0.0lPoPM7ySJHfHWqI9NVScim1D5W8r26Bp4q5z2zkR_k'
            }
        });
        const parsedJson = await response.json();
        setNotes(parsedJson);
    }

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
    const editNote = (id, title, description, tag) => {

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState