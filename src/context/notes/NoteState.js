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

        const id = "TODO";
        //API Call
        const response = await fetch(`${host}/notes/updatenote/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhiOTRkNmFjYjZiY2ZhZDZlNTFhZWYyIn0sImlhdCI6MTc1Njk3NDQ0Mn0.0lPoPM7ySJHfHWqI9NVScim1D5W8r26Bp4q5z2zkR_k'
            },
            body: JSON.stringify({ title, description, tag })
        });

        //Login to add Note
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
    const deleteNote = async (id) => {
        //API Call 
        const response = await fetch(`${host}/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhiOTRkNmFjYjZiY2ZhZDZlNTFhZWYyIn0sImlhdCI6MTc1Njk3NDQ0Mn0.0lPoPM7ySJHfHWqI9NVScim1D5W8r26Bp4q5z2zkR_k'
            }
        });
        const parsedJson = await response.json();
        console.log(parsedJson)
        //Login to delete in Client
        console.log('Deleting a note with id ' + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }
    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/notes/updatenote/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhiOTRkNmFjYjZiY2ZhZDZlNTFhZWYyIn0sImlhdCI6MTc1Njk3NDQ0Mn0.0lPoPM7ySJHfHWqI9NVScim1D5W8r26Bp4q5z2zkR_k'
            },
            body: JSON.stringify({ title, description, tag })
        });
        const parsedJson = await response.json();

        //Login to Edit with Client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState