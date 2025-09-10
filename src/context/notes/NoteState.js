import React, { useState } from 'react'
import noteContext from "./noteContext";


const NoteState = (props) => {

    const s1 = {
        "name": "Arunesh",
        "title": "Singh"
    }
    const [state, setstate] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setstate({
                "name": "Disha",
                "title": "Sahu"
            })
        }, 1000);
    }

    return (
        <noteContext.Provider value={{ state, update }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState