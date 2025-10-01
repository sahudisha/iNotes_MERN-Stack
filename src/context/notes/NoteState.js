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
    const addNote = async (title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/notes/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhiOTRkNmFjYjZiY2ZhZDZlNTFhZWYyIn0sImlhdCI6MTc1Njk3NDQ0Mn0.0lPoPM7ySJHfHWqI9NVScim1D5W8r26Bp4q5z2zkR_k'
            },
            body: JSON.stringify({ title, description, tag })
        });

        const jsonResponse = await response.json();
        setNotes(notes.concat(jsonResponse));
    }

    //Delete a note
    const deleteNote = async (id) => {
        //API Call 
        const response = await fetch(`${host}/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhiOTRkNmFjYjZiY2ZhZDZlNTFhZWYyIn0sImlhdCI6MTc1Njk3NDQ0Mn0.0lPoPM7ySJHfHWqI9NVScim1D5W8r26Bp4q5z2zkR_k'
            }
        });
        const jsonResponse = await response.json();

        //Logic to delete in Client
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhiOTRkNmFjYjZiY2ZhZDZlNTFhZWYyIn0sImlhdCI6MTc1Njk3NDQ0Mn0.0lPoPM7ySJHfHWqI9NVScim1D5W8r26Bp4q5z2zkR_k'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const jsonResponse = await response.json();

        //Logic to Edit with Client
        setNotes(notes.map(note =>
            note._id === id ? { ...note, title, description, tag } : note
        ));

        // let newNotes = JSON.parse(JSON.stringify(notes));
        // for (let index = 0; index < newNotes.length; index++) {
        //     if (newNotes[index]._id === id) {
        //         newNotes[index].title = title;
        //         newNotes[index].description = description;
        //         newNotes[index].tag = tag;
        //         break;
        //     }
        // }
        // setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState