import React from 'react'
import Notes from './Notes'

const Home = (props) => {
    let { showAlert } = props;
    return (
        <>
            <Notes showAlert={showAlert} />
        </>
    )
}

export default Home