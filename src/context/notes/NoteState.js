import React, { useState } from 'react'
import noteContext from "./noteContext";


const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "68ba9920f58c9669b5144bc4",
            "user": "68b94d6acb6bcfad6e51aef2",
            "title": "I am title",
            "description": "My Real Name is Disha Sahu",
            "tag": "personal",
            "date": "2025-09-05T08:02:40.692Z",
            "__v": 0
        },
        {
            "_id": "68c27f9f769c9cc4f7a119d3",
            "user": "68b94d6acb6bcfad6e51aef2",
            "title": "I am title",
            "description": "My Real Name is Disha Sahu",
            "tag": "personal",
            "date": "2025-09-11T07:51:59.196Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)
    return (
        <noteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState